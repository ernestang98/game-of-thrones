using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.Networking;
using SimpleJSON;
using DevionGames.UIWidgets;
using System;
using System.Text;


public class GameDataManager : MonoBehaviour
{
    private DialogBox m_DialogBox;
    public Sprite icon;
    public string[] options;

    private string baseURL;
    
    // Start is called before the first frame update
    void Start()
    {
        clearAllData();
        clearPointsCache();
        List<string> optionsList = new List<string>();
        optionsList.Add("Okay");
        options = optionsList.ToArray();
        this.m_DialogBox = FindObjectOfType<DialogBox>();
        baseURL = GlobalConstants.BASE_URL_FOR_API;
    }

    // Update is called once per frame
    void Awake()
    {
        //Debug.Log(Time.time);
    }

    private void printalldata()
    {
        Debug.Log(PlayerPrefs.GetString(GlobalConstants.PLAYERNAME));
    }

    public void onLogin(string? playerName = null, string? playerEmail = null, string? playerAvatar = null, int? playerPoints = null, string? playerRank = null, int? playerPosition = null, string? playerid = null)
    {
        setPlayerData(playerName, playerEmail, playerAvatar, playerPoints , playerRank, playerPosition, playerid);
    }


    public void onLogout()
    {
        clearAllData();
    }

    public void onStartQuest(string questCategory, int questNumber)
    {
        startQuest(questCategory, questNumber);
    }

    public void onEnd(bool completed)
    {
        if (completed)
        {
            float endingTime = Time.time;
            float startingTime = PlayerPrefs.GetFloat(GlobalConstants.QUESTSTARTINGTIME);
            float timeTaken = endingTime - startingTime;
            float pointsEarnedBeforeDefuction = PlayerPrefs.GetInt(GlobalConstants.TOTALPOINTSEARNEDSOFAR);
            float pointsEarnedAfterDeduction = pointsEarnedBeforeDefuction - getDeduction(timeTaken);
            StartCoroutine(checkForLastAttemptByStudent(pointsEarnedAfterDeduction, timeTaken));
     
        }
        else
        {
            // SceneManager.LoadScene("VerificationScene");
            endQuest();
            clearPointsCache();
        }
     
    }

    IEnumerator checkForLastAttemptByStudent(float pointsEarnedAfterDeduction, float timeTaken)
    {
        //baseURL = GlobalConstants.BASE_URL_FOR_API;

        //GameObject mnobj = GameObject.Find("GameDataManager");
        //GameDataManager mn = mnobj.GetComponent<GameDataManager>();
        //mn.onEnd(false);
        //mn.clearAllData();
        //mn.onLogin(playerName: "student ii", playerEmail: "ii@exmaple.com", playerPoints: 20);
        //mn.onStartQuest(CZ2006, CZ2006QUEST2NUMBER);
        //float pointsEarnedAfterDeduction = 100;
        //float timeTaken = 10;
        SceneManager.LoadScene("LobbyScene");
        float temp = -1;
        string tempemail = PlayerPrefs.GetString(GlobalConstants.PLAYEREMAIL);
        string tempquestcat = PlayerPrefs.GetString(GlobalConstants.QUESTCATEGORY);
        int tempquestno = PlayerPrefs.GetInt(GlobalConstants.QUESTNUMBER);
        UnityWebRequest www = UnityWebRequest.Get(baseURL + "attempt/?student_email=" + tempemail + "&quest_name=" + tempquestcat + "%20Quest%20" + tempquestno.ToString());
        yield return www.SendWebRequest();
        if (www.result != UnityWebRequest.Result.Success)
        {
            Debug.Log("FIRST REQUEST");
            Debug.Log(www.error);
            string title = "Error";
            string text = www.error;
            m_DialogBox.Show(title, text + "  " + "attempt/?student_email=" + tempemail + "&quest_name=" + tempquestcat + "%20Quest%20" + tempquestno.ToString(), icon, null, options);

        }
        else
        {
            var jsonstring = www.downloadHandler.text;
            var json = JSON.Parse(jsonstring);
            UnityWebRequest request = new UnityWebRequest();
            bool updateStudent = false;
            request.method = "GET";
            if (json.ToString() != "[]")
            {
                // there is a last attempt for that particular quest under that particular category!
                // PUT maybe
                var obj = json[0];
                Debug.Log("=====================");
                Debug.Log(json.ToString());
                int points_scored_from_last_attempt = obj["points_scored"];
                int points_scored_from_the_attempt = (int)pointsEarnedAfterDeduction;
                if (points_scored_from_last_attempt < points_scored_from_the_attempt)
                {
                    Debug.Log("PATCH REQUEST");
                    AttemptObj attemptUpdate = new AttemptObj();
                    attemptUpdate.quest_name = tempquestcat + " Quest " + tempquestno;
                    attemptUpdate.student_email = tempemail;
                    attemptUpdate.points_scored = (int)pointsEarnedAfterDeduction;
                    attemptUpdate.total_points = obj["total_points"] - obj["points_scored"] + (int)pointsEarnedAfterDeduction;
                    attemptUpdate.time_to_complete_in_seconds = (int)timeTaken;

                    DateTime dt = DateTime.Now;

                    String dts = String.Format("{0:s}", dt);
                    String jsonn = JsonUtility.ToJson(attemptUpdate);
                    String jsonnstart = jsonn.Substring(0, jsonn.Length - 1);
                    String jsonnend = jsonn.Substring(jsonn.Length - 1);

                    temp = obj["total_points"] - obj["points_scored"] + (int)pointsEarnedAfterDeduction;

                    jsonnstart += ",\"points_scored\":" + attemptUpdate.points_scored.ToString() + ",\"total_points\":" + attemptUpdate.total_points.ToString() + ",\"time_to_complete_in_seconds\":" + attemptUpdate.time_to_complete_in_seconds.ToString() + ",\"completion_datetime\":" + "\"" + dts.ToString() + "\"";
                    jsonnstart += jsonnend;

                    Debug.Log(jsonnstart);
                    byte[] bodyRaw = Encoding.UTF8.GetBytes(jsonnstart);
                    request = UnityWebRequest.Put(baseURL + "attempt/", jsonnstart);
                    request.method = "PATCH";
                    request.uploadHandler = (UploadHandler)new UploadHandlerRaw(bodyRaw);
                    request.downloadHandler = (DownloadHandler)new DownloadHandlerBuffer();
                    request.SetRequestHeader("Content-Type", "application/json");
                    updateStudent = true;
                    yield return request.SendWebRequest();
                    if (request.result != UnityWebRequest.Result.Success)
                    {
                        Debug.Log("SECOND REQUEST ERROR");
                        Debug.Log(request.error);
                        String title = "Error";
                        string text = request.error;
                        m_DialogBox.Show(title, text, icon, null, options);

                    }
                    else
                    {
                        Debug.Log("Successfully created student data: " + request.downloadHandler.text);
                    }
                }

            }
            else
            {
                Debug.Log("POST REQUEST");
                AttemptObj myobject = new AttemptObj();

                myobject.quest_name = tempquestcat + " Quest " + tempquestno;
                myobject.student_email = tempemail;
                myobject.points_scored = pointsEarnedAfterDeduction;
                myobject.total_points = PlayerPrefs.GetInt(GlobalConstants.PLAYERPOINTS) + pointsEarnedAfterDeduction;
                myobject.time_to_complete_in_seconds = timeTaken;


                /* this is working!
                    myobject.quest_name = "CZ2006 Quest 1";
                    myobject.student_email = "ERNE0009@e.ntu.edu.sg";
                    myobject.points_scored = 100;
                    myobject.total_points = PlayerPrefs.GetInt(GlobalConstants.PLAYERPOINTS) + 100;
                    myobject.time_to_complete_in_seconds = 10;
                 */

                var asd = JsonUtility.ToJson(myobject);

                Debug.Log(asd);

                DateTime dt = DateTime.Now;

                String dts = String.Format("{0:s}", dt);

                String jsonn = JsonUtility.ToJson(myobject);
                String jsonnstart = jsonn.Substring(0, jsonn.Length - 1);
                String jsonnend = jsonn.Substring(jsonn.Length - 1);
                jsonnstart += ",\"points_scored\":" + (100).ToString() + ",\"total_points\":" + myobject.total_points.ToString() + ",\"time_to_complete_in_seconds\":" + (10).ToString() + ",\"completion_datetime\":" + "\"" + dts.ToString() + "\"";
                jsonnstart += jsonnend;

                Debug.Log(jsonnstart);

                UnityWebRequest request1 = new UnityWebRequest(baseURL + "attempt/", "POST");
                byte[] bodyRaw = Encoding.UTF8.GetBytes(jsonnstart);
                request1.method = "POST";
                request1.uploadHandler = (UploadHandler)new UploadHandlerRaw(bodyRaw);
                request1.downloadHandler = (DownloadHandler)new DownloadHandlerBuffer();
                request1.SetRequestHeader("Content-Type", "application/json");

                yield return request1.SendWebRequest();

                if (request1.result != UnityWebRequest.Result.Success)
                {
                    Debug.Log("SECOND REQUEST ERROR");
                    Debug.Log(request1.error);
                    String title = "Error";
                    string text = request1.error;
                    m_DialogBox.Show(title, text + " " + jsonnstart, icon, null, options);

                }
                else
                {
                    String title = "Sucess";
                    string text = request1.error;
                    m_DialogBox.Show(title, text + " " + jsonnstart, icon, null, options);
                    Debug.Log("Successfully created student data: " + request1.downloadHandler.text);
                    updateStudent = true;
                }
            }

            // Updated student...
            if (updateStudent)
            {
                UnityWebRequest www1 = UnityWebRequest.Get(baseURL + "student/" + tempemail);
                yield return www1.SendWebRequest();
                if (www1.result != UnityWebRequest.Result.Success)
                {
                    Debug.Log("FIRST REQUEST");
                    Debug.Log(www.error);
                    string title = "Error";
                    string text = www.error;
                    m_DialogBox.Show(title, text + "  " + "attempt/?student_email=" + tempemail + "&quest_name=" + tempquestcat + "%20Quest%20" + tempquestno.ToString(), icon, null, options);

                }
                else
                {
                    var jsonstring1 = www.downloadHandler.text;
                    var json1 = JSON.Parse(jsonstring1);

                    request = new UnityWebRequest(baseURL + "student/", "POST");
                    PlayerObj updateStudentObj = new PlayerObj();
                    updateStudentObj.email = PlayerPrefs.GetString(GlobalConstants.PLAYEREMAIL);
                    updateStudentObj.name = PlayerPrefs.GetString(GlobalConstants.PLAYERNAME);

                    updateStudentObj.points = temp == -1 ? PlayerPrefs.GetInt(GlobalConstants.PLAYERPOINTS) + (int)pointsEarnedAfterDeduction : (int)temp;

                    string jso1n = JsonUtility.ToJson(updateStudentObj);
                    String jsonnstart = jso1n.Substring(0, jso1n.Length - 1);
                    String jsonnend = jso1n.Substring(jso1n.Length - 1);
                    jsonnstart += ",\"points\":" + updateStudentObj.points.ToString();
                    jsonnstart += jsonnend;

                    Debug.Log("................................................");
                    Debug.Log(jsonnstart);

                    byte[] bodyRaw = Encoding.UTF8.GetBytes(jsonnstart);
                    request.uploadHandler = (UploadHandler)new UploadHandlerRaw(bodyRaw);
                    request.downloadHandler = (DownloadHandler)new DownloadHandlerBuffer();
                    request.method = "PATCH";
                    request.SetRequestHeader("Content-Type", "application/json");

                    yield return request.SendWebRequest();
                    Debug.Log("Status Code: " + request.responseCode);
                    if (request.isNetworkError || request.isHttpError || request.result != UnityWebRequest.Result.Success)
                    {
                        Debug.Log("THIRD REQUEST REQUEST");
                        Debug.Log(request.error);
                        m_DialogBox.Show("Error", "Something went wrong!", icon, null, options);
                    }
                }
            }
        }
    }

    public void completeSubQuest(float pointsEarnedFromSubQuest)
    {
        // you are successful if you call this method
        if (PlayerPrefs.HasKey("lastplayedsubquestnumberpoints" + PlayerPrefs.GetInt(GlobalConstants.QUESTCURRENTSUBQUEST).ToString())) {
            float lastPlayed = PlayerPrefs.GetFloat("lastplayedsubquestnumberpoints" + PlayerPrefs.GetInt(GlobalConstants.QUESTCURRENTSUBQUEST).ToString());
            if (lastPlayed < pointsEarnedFromSubQuest)
            {
                PlayerPrefs.SetFloat("lastplayedsubquestnumberpoints" + PlayerPrefs.GetInt(GlobalConstants.QUESTCURRENTSUBQUEST).ToString(), pointsEarnedFromSubQuest);
                PlayerPrefs.SetInt(GlobalConstants.TOTALPOINTSEARNEDSOFAR, PlayerPrefs.GetInt(GlobalConstants.TOTALPOINTSEARNEDSOFAR) + ((int)pointsEarnedFromSubQuest) - (int) lastPlayed);
            }
        }
        else
        {
            PlayerPrefs.SetFloat("lastplayedsubquestnumberpoints" + PlayerPrefs.GetInt(GlobalConstants.QUESTCURRENTSUBQUEST).ToString(), pointsEarnedFromSubQuest);
            PlayerPrefs.SetInt(GlobalConstants.TOTALPOINTSEARNEDSOFAR, PlayerPrefs.GetInt(GlobalConstants.TOTALPOINTSEARNEDSOFAR) + ((int)pointsEarnedFromSubQuest));
            PlayerPrefs.SetInt(GlobalConstants.QUESTATTEMPTINGSUBQUEST, PlayerPrefs.GetInt(GlobalConstants.QUESTCURRENTSUBQUEST));
        }
    }

    private void clearPointsCache()
    {
        for (int i = GlobalConstants.MINSUBQUESTNUMBER; i < GlobalConstants.MAXSUBQUESTNUMBER; i++)
        {
            if (PlayerPrefs.HasKey("lastplayedsubquestnumberpoints" + i.ToString()))
            {
                PlayerPrefs.DeleteKey("lastplayedsubquestnumberpoints" + i.ToString());
            }
        }
    }

    public bool attemptSubQuest(int attemptingSubQuestNumber)
    {
        if (PlayerPrefs.GetInt(GlobalConstants.QUESTATTEMPTINGSUBQUEST) + 1 >= attemptingSubQuestNumber)
        {
            PlayerPrefs.SetInt(GlobalConstants.QUESTCURRENTSUBQUEST, attemptingSubQuestNumber);
            return true;
        }
        else
        {
            return false;
        }
    }

    private float getDeduction(float timeToCompleteSubQuest)
    {
        string playerRank = PlayerPrefs.GetString(GlobalConstants.PLAYERRANK);
        switch (playerRank)
        {
            default:
            case "1":
            case "2":
            case "3":
                return getPointDeduction("easy", timeToCompleteSubQuest);

            case "4":
            case "5":
            case "6":
            case "7":
                return getPointDeduction("medium", timeToCompleteSubQuest);

            case "8":
            case "9":
            case "10":
            case "11":
                return getPointDeduction("hard", timeToCompleteSubQuest);
        }
    }

    private float getPointDeduction(string cat, float time)
    {
        switch (cat)
        {
            default:
            case "easy":
                if (time > 600)
                {
                    return -50;
                }
                if (time > 720)
                {
                    return -100;
                }
                if (time > 840)
                {
                    return -150;
                }
                return 0;

            case "medium":
                if (time > 480)
                {
                    return -50;
                }
                if (time > 600)
                {
                    return -100;
                }
                if (time > 720)
                {
                    return -150;
                }
                return 0;

            case "hard":
                if (time > 360)
                {
                    return -50;
                }
                if (time > 480)
                {
                    return -100;
                }
                if (time > 600)
                {
                    return -150;
                }
                return 0;
        }
    }


    public void clearAllData()
    {
        Debug.Log("Clearing all dataaaaa....");
        PlayerPrefs.DeleteKey(GlobalConstants.ISLOGGEDIN);
        PlayerPrefs.DeleteKey(GlobalConstants.ISINAQUEST);

        PlayerPrefs.DeleteKey(GlobalConstants.QUESTCATEGORY);
        PlayerPrefs.DeleteKey(GlobalConstants.QUESTNUMBER);
        PlayerPrefs.DeleteKey(GlobalConstants.QUESTCURRENTSUBQUEST);
        PlayerPrefs.DeleteKey(GlobalConstants.QUESTATTEMPTINGSUBQUEST);
        PlayerPrefs.DeleteKey(GlobalConstants.QUESTSTARTINGTIME);
        PlayerPrefs.DeleteKey(GlobalConstants.QUESTENDINGTIME);
        PlayerPrefs.DeleteKey(GlobalConstants.TOTALPOINTSEARNEDSOFAR);

        PlayerPrefs.DeleteKey(GlobalConstants.PLAYERNAME);
        PlayerPrefs.DeleteKey(GlobalConstants.PLAYEREMAIL);
        PlayerPrefs.DeleteKey(GlobalConstants.PLAYERLASTPLAYEDAVATAR);
        PlayerPrefs.DeleteKey(GlobalConstants.PLAYERPOINTS);
        PlayerPrefs.DeleteKey(GlobalConstants.PLAYERRANK);
        PlayerPrefs.DeleteKey(GlobalConstants.PLAYERPOSITION);
        PlayerPrefs.DeleteKey(GlobalConstants.PLAYERID);
    }

    private void setPlayerData(string? playerName = null, string? playerEmail = null, string? playerAvatar = null, int? playerPoints = null, string? playerRank = null, int? playerPosition = null, string? playerid = null)
    {
        PlayerPrefs.SetInt(GlobalConstants.ISLOGGEDIN, 1);
        if (playerName != null)
        {
            PlayerPrefs.SetString(GlobalConstants.PLAYERNAME, playerName);
        }
        if (playerEmail != null)
        {
            PlayerPrefs.SetString(GlobalConstants.PLAYEREMAIL, playerEmail);
        }
        if (playerAvatar != null)
        {
            PlayerPrefs.SetString(GlobalConstants.PLAYERLASTPLAYEDAVATAR, playerAvatar);
        }
        if (playerPoints != null)
        {
            int temp = playerPoints == null ? default(int) : playerPoints.Value;
            PlayerPrefs.SetInt(GlobalConstants.PLAYERPOINTS, temp);
        }
        if (playerRank != null)
        {
            PlayerPrefs.SetInt(GlobalConstants.PLAYERRANK, int.Parse(playerRank));
        }
        if (playerPosition != null)
        {
            int temp = playerPosition == null ? default(int) : playerPosition.Value;
            PlayerPrefs.SetInt(GlobalConstants.PLAYERPOSITION, temp);
        }
        if (playerid != null)
        {
            PlayerPrefs.SetString(GlobalConstants.PLAYERID, playerid);
        }
    }

    private void setQuestData(string? questCat = null, int? questNumber = null, int? subQuestNumber = null, int? attemptingQuest = null, int? totalPointsEarnedSoFar = null)
    {
        if (questNumber != null)
        {
            int temp = questNumber == null ? default(int) : questNumber.Value;
            PlayerPrefs.SetInt(GlobalConstants.QUESTNUMBER, temp);
        }

        if (subQuestNumber != null)
        {
            int temp = subQuestNumber == null ? default(int) : subQuestNumber.Value;
            PlayerPrefs.SetInt(GlobalConstants.QUESTCURRENTSUBQUEST, temp);
        }

        if (totalPointsEarnedSoFar != null)
        {
            int temp = totalPointsEarnedSoFar == null ? default(int) : totalPointsEarnedSoFar.Value;
            PlayerPrefs.SetInt(GlobalConstants.TOTALPOINTSEARNEDSOFAR, temp);
        }

        if (questCat != null)
        {
            PlayerPrefs.SetString(GlobalConstants.QUESTCATEGORY, questCat);
        }

        if (attemptingQuest != null)
        {
            int temp = attemptingQuest == null ? default(int) : attemptingQuest.Value;
            PlayerPrefs.SetInt(GlobalConstants.QUESTATTEMPTINGSUBQUEST, temp);
        }
    }

    private void startQuest(string questCat, int questNo)
    {
        if (PlayerPrefs.GetInt(GlobalConstants.ISLOGGEDIN) != 1)
        {
            Debug.LogError("Something went wrong");
            return;
        }

        PlayerPrefs.SetFloat(GlobalConstants.QUESTSTARTINGTIME, Time.time);

        PlayerPrefs.SetInt(GlobalConstants.ISINAQUEST, 1);

        PlayerPrefs.SetInt(GlobalConstants.QUESTATTEMPTINGSUBQUEST, 0);

        setQuestData(questCat: questCat, questNumber: questNo);
    }

    public void endQuest()
    {
        PlayerPrefs.DeleteKey(GlobalConstants.QUESTCATEGORY);
        PlayerPrefs.DeleteKey(GlobalConstants.QUESTNUMBER);
        PlayerPrefs.DeleteKey(GlobalConstants.QUESTCURRENTSUBQUEST);
        PlayerPrefs.DeleteKey(GlobalConstants.QUESTATTEMPTINGSUBQUEST);
        PlayerPrefs.DeleteKey(GlobalConstants.QUESTSTARTINGTIME);
        PlayerPrefs.DeleteKey(GlobalConstants.QUESTENDINGTIME);
        PlayerPrefs.DeleteKey(GlobalConstants.TOTALPOINTSEARNEDSOFAR);
    }


}
