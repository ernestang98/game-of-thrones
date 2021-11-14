using System.Collections;
using System.Text.RegularExpressions;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;
using DevionGames.UIWidgets;
using UnityEngine.Networking;
using SimpleJSON;
using System.Text;
using System;

public class VerificationScript : MonoBehaviour
{

    private string CZ2006 = "CZ2006";
    private int CZ2006QUEST2NUMBER = 2;

    private DialogBox m_DialogBox;
    public Sprite icon;
    public string[] options;

    private string baseURL;

    public Button btn;
    public InputField email;
    public InputField password;
    public float counter;

    public string title;
    [TextArea]
    public string text;

    void Start()
    {
        //GameObject mnobj = GameObject.Find("GameDataManager");
        //GameDataManager ad = mnobj.GetComponent<GameDataManager>();
        //ad.onEnd(false);
        //ad.clearAllData();
        //ad.onLogin(playerName: "student 8", playerEmail: "student8@gmail.com", playerPoints: 0, playerRank: "Herald", playerPosition: 1000);
        //ad.onStartQuest(CZ2006, CZ2006QUEST2NUMBER);
        try
        {
            this.m_DialogBox = FindObjectOfType<DialogBox>();
            baseURL = GlobalConstants.BASE_URL_FOR_API;

            GameObject obj = GameObject.Find("Resend Button");
            Button btn1 = obj.GetComponent<Button>();
            TooltipTrigger trigger = btn1.GetComponent<TooltipTrigger>();
            trigger.enabled = false;

            GameObject asd = GameObject.Find("GameDataManager");
            GameDataManager mn = asd.GetComponent<GameDataManager>();
            mn.onLogout();
        }
        catch (Exception ex) { }

        //StartCoroutine(testRoutine());
        //StartCoroutine(testttt());
        //StartCoroutine(asd());

        //StartCoroutine(lol());
    }

    IEnumerator lol()
    {
        Debug.Log("POST REQUEST");
        AttemptObj myobject = new AttemptObj();

        myobject.quest_name = "CZ2006 Quest 1";
        myobject.student_email = "ERNE0009@e.ntu.edu.sg";
        myobject.points_scored = 100;
        myobject.total_points = PlayerPrefs.GetInt(GlobalConstants.PLAYERPOINTS) + 100;
        myobject.time_to_complete_in_seconds = 10;

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


        UnityWebRequest request = new UnityWebRequest(baseURL + "attempt/", "POST");
        byte[] bodyRaw = Encoding.UTF8.GetBytes(jsonnstart);
        request.method = "POST";
        request.uploadHandler = (UploadHandler)new UploadHandlerRaw(bodyRaw);
        request.downloadHandler = (DownloadHandler)new DownloadHandlerBuffer();
        request.SetRequestHeader("Content-Type", "application/json");

        yield return request.SendWebRequest();

        if (request.result != UnityWebRequest.Result.Success)
        {
            Debug.Log("SECOND REQUEST ERROR");
            Debug.Log(request.error);
            String title = "Error";
            string text = request.error;
            m_DialogBox.Show(title, text + " " + jsonnstart, icon, null, options);

        }
        else
        {
            String title = "Sucess";
            string text = request.error;
            m_DialogBox.Show(title, text + " " + jsonnstart, icon, null, options);
            Debug.Log("Successfully created student data: " + request.downloadHandler.text);
        }
    }

    IEnumerator getdemchallenges()
    {
        Debug.Log("aksdtfasukd");
        UnityWebRequest www = UnityWebRequest.Get(baseURL + "challenge/?challengee_email=" + "student8@gmail.com");
        yield return www.SendWebRequest();
        if (www.result != UnityWebRequest.Result.Success)
        {
            Debug.Log(www.error);
            string title = "Error";
            string text = www.error;
            m_DialogBox.Show(title, text, icon, null, options);

        }
        else
        {
            Debug.Log("aukyjdgkasidgasd");
            var jsonstring = www.downloadHandler.text;
            var json = JSON.Parse(jsonstring);
            if (json.ToString() != "[]")
            {
                for (int i = 0; i < 10000; i++)
                {
                    www = UnityWebRequest.Get(baseURL + "student/" + json[i]["challenger_email"]);
                    yield return www.SendWebRequest();
                    if (www.result != UnityWebRequest.Result.Success)
                    {
                        Debug.Log(www.error);
                        string title = "Error";
                        string text = www.error;
                        m_DialogBox.Show(title, text, icon, null, options);

                    }
                    else
                    {
                        var jsonstring1 = www.downloadHandler.text;
                        var json1 = JSON.Parse(jsonstring);
                        Debug.Log(json1);
                        //var temp = Instantiate(challenges, parentCanvas1.transform);
                        //ChallengeSlotScript mq = temp.GetComponent<ChallengeSlotScript>();
                        //String lol = json[i]["quest_name"];
                        //mq.nameX = json1["name"];
                        //mq.desX = json[i]["category_name"] + ", " + lol.Substring(7) + ", Difficulty: " + json[i]["difficulty"];
                    }
                }
            }
        }
    }

    IEnumerator testttt()
    {
        baseURL = GlobalConstants.BASE_URL_FOR_API;

        GameObject mnobj = GameObject.Find("GameDataManager");
        GameDataManager mn = mnobj.GetComponent<GameDataManager>();
        mn.onEnd(false);
        mn.clearAllData();
        mn.onLogin(playerName: "student ii", playerEmail: "ii@exmaple.com", playerPoints: 20);
        mn.onStartQuest(CZ2006, CZ2006QUEST2NUMBER);

        float pointsEarnedAfterDeduction = 100;
        float timeTaken = 10;

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

                var asd = JsonUtility.ToJson(myobject);

                Debug.Log(asd);

                DateTime dt = DateTime.Now;

                String dts = String.Format("{0:s}", dt);

                String jsonn = JsonUtility.ToJson(myobject);
                String jsonnstart = jsonn.Substring(0, jsonn.Length - 1);
                String jsonnend = jsonn.Substring(jsonn.Length - 1);
                jsonnstart += ",\"points_scored\":" + pointsEarnedAfterDeduction.ToString() + ",\"total_points\":" + myobject.total_points.ToString() + ",\"time_to_complete_in_seconds\":" + timeTaken.ToString() + ",\"completion_datetime\":" + "\"" + dts.ToString() + "\"";
                jsonnstart += jsonnend;

                Debug.Log(jsonnstart);


                request = new UnityWebRequest(baseURL + "attempt/", "POST");
                byte[] bodyRaw = Encoding.UTF8.GetBytes(jsonnstart);
                request.method = "POST";
                request.uploadHandler = (UploadHandler)new UploadHandlerRaw(bodyRaw);
                request.downloadHandler = (DownloadHandler)new DownloadHandlerBuffer();
                request.SetRequestHeader("Content-Type", "application/json");
                updateStudent = true;

                yield return request.SendWebRequest();
                if (request.result != UnityWebRequest.Result.Success)
                {
                    //Debug.Log("SECOND REQUEST ERROR");
                    //Debug.Log(request.error);
                    //String title = "Error";
                    //string text = request.error;
                    //m_DialogBox.Show(title, text, icon, null, options);

                }
                else
                {
                    Debug.Log("Successfully created student data: " + request.downloadHandler.text);
                }
            }

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

                    updateStudentObj.points = temp == -1 ? PlayerPrefs.GetInt(GlobalConstants.PLAYERPOINTS) + (int)pointsEarnedAfterDeduction : (int) temp;

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
        SceneManager.LoadScene("LobbyScene");
    }

    IEnumerator testRoutine()
    {
        PlayerObj player = new PlayerObj();

        player.name = "asdjkhgasdkjghasdfyasdf";
        player.id = "2167eb61-1c96-43d6-a161-512857b6e6d7";
        player.email = "ernestang98@gmail.com";

        string json = JsonUtility.ToJson(player);
        byte[] bodyRaw = Encoding.UTF8.GetBytes(json);
        UnityWebRequest request = UnityWebRequest.Put(baseURL + "student/", json);
        request.method = "PATCH";
        request.uploadHandler = (UploadHandler)new UploadHandlerRaw(bodyRaw);
        request.downloadHandler = (DownloadHandler)new DownloadHandlerBuffer();
        request.SetRequestHeader("Content-Type", "application/json");
        yield return request.SendWebRequest();

        if (request.isNetworkError || request.isHttpError || request.result != UnityWebRequest.Result.Success)
        {
            m_DialogBox.Show(request.responseCode.ToString(), request.error, icon, null, options);
        }
        else
        {
            Debug.Log("Successfully created student data: " + request.downloadHandler.text);
            m_DialogBox.Show(request.responseCode.ToString(), request.downloadHandler.text, icon, null, options);
            var data = JSON.Parse(request.downloadHandler.text);
            GameObject obj = GameObject.Find("GameDataManager");
            GameDataManager mn = obj.GetComponent<GameDataManager>();
            mn.onLogin(playerName: data["name"], playerEmail: data["email"], playerPoints: data["points"], playerid: data["points"]);
        }
    }

    void Update()
    {
        if (counter > 1)
        {
            counter -= Time.deltaTime;
            if (counter >= 10)
            {
                string temp = counter.ToString();
                temp = temp.Substring(0, 2);
                btn.GetComponentInChildren<Text>().text = temp.ToString() + "s";
            }
            else
            {
                string temp = counter.ToString();
                temp = temp.Substring(0, 1);
                btn.GetComponentInChildren<Text>().text = temp.ToString() + "s";
            }
        }
    }

    public void login()
    {
        if (email.text == "" || password.text == "")
        {
            title = "Error";
            text = "Both fields must be filled!";
            m_DialogBox.Show(title, text, icon, null, options);
        }
        else
        {
            StartCoroutine(dothelogin());
            GameObject thebutton = GameObject.Find("Resend Button");
            Button thebutton2 = thebutton.GetComponent<Button>();
            thebutton2.enabled = false;
            thebutton2.enabled = true;
        }
    }

    public void requestForCode()
    {
        if (email.text == "")
        {
            title = "Error";
            text = "NTU Email field must be filled!";
            m_DialogBox.Show(title, text, icon, null, options);
            return;
        }
        else if (!validateEmail(email.text))
        {
            title = "Error";
            text = "Please enter a valid email!";
            m_DialogBox.Show(title, text, icon, null, options);
            return;
        }
        else
        {
            StartCoroutine(sendtheemail());
        }
    }

    IEnumerator dothelogin()
    {
        UnityWebRequest www = UnityWebRequest.Get(baseURL + "authentication/validate?email_address=" + email.text + "&otp="+ password.text);
        yield return www.SendWebRequest();
        if (www.result != UnityWebRequest.Result.Success)
        {
            Debug.Log(www.error);
            title = "Error";
            text = www.error;
            m_DialogBox.Show(title, text, icon, null, options);

        }
        else
        {
            Debug.Log("Success");
            www = UnityWebRequest.Get(baseURL + "student/" + email.text);
            yield return www.SendWebRequest();
            if (www.result != UnityWebRequest.Result.Success)
            {
                Debug.Log(www.error);
                title = "Error";
                text = "6 digit code and email does not match!";
                m_DialogBox.Show(title, text, icon, null, options);

            }
            else
            {
                var data = JSON.Parse(www.downloadHandler.text);
                Debug.Log(www.downloadHandler.text);
                if (data == "" || data == null)
                {
                    PlayerObj myobject = new PlayerObj();
                    myobject.name = generateName();
                    myobject.email = email.text;
                    myobject.points = 0;
                    myobject.password = "password";

                    string json = JsonUtility.ToJson(myobject);

                    var request = new UnityWebRequest(baseURL + "student/", "POST");
                    byte[] bodyRaw = Encoding.UTF8.GetBytes(json);
                    request.uploadHandler = (UploadHandler)new UploadHandlerRaw(bodyRaw);
                    request.downloadHandler = (DownloadHandler)new DownloadHandlerBuffer();
                    request.SetRequestHeader("Content-Type", "application/json");
                    yield return request.SendWebRequest();
                    Debug.Log("Status Code: " + request.responseCode);
                    if (request.isNetworkError || request.isHttpError || request.result != UnityWebRequest.Result.Success)
                    {
                        Debug.Log(request.error);
                        title = "Error";
                        text = "Something went wrong...";
                        m_DialogBox.Show(title, text, icon, null, options);
                    }
                    else
                    {
                        Debug.Log("Successfully created student data: " + request.downloadHandler.text);
                        var data2 = JSON.Parse(request.downloadHandler.text);
                        GameObject obj = GameObject.Find("GameDataManager");
                        GameDataManager mn = obj.GetComponent<GameDataManager>();
                        mn.onLogin(playerName: data2["name"], playerEmail: data2["email"], playerPoints: data2["points"], playerid: data2["id"], playerRank: data2["rank"], playerPosition: data2["position"]);
                    }
                }
                else
                {
                    GameObject obj = GameObject.Find("GameDataManager");
                    GameDataManager mn = obj.GetComponent<GameDataManager>();
                    mn.onLogin(playerName: data["name"], playerEmail: data["email"], playerPoints: data["points"], playerid: data["id"], playerRank: data["rank"], playerPosition: data["position"]);
                }
            }

            SceneManager.LoadScene("LobbyScene");
        }
        //else
        //{
        //    // Show results as text
        //    //Debug.Log(www.downloadHandler.text);
        //    //var N = JSON.Parse(www.downloadHandler.text);
        //    //Debug.Log(N["data"][0]["fact"]);
        //    //GameObject hand = GameObject.Find("TextTest");
        //    //Text lol = hand.GetComponent<Text>();
        //    //lol.text = N["data"][0]["fact"];


        //    // TODO: Make API call and check if email exists in database,
        //    // if not create new student
        //    // https://stackoverflow.com/questions/62580399/randomname-generator-in-unity
        //    // https://docs.unity3d.com/Manual/JSONSerialization.html
        //    // call game data manager and 

        //    www = UnityWebRequest.Get("https://0kftyn.deta.dev/student?email=" + email.text);
        //    yield return www.SendWebRequest();
        //    if (www.result != UnityWebRequest.Result.Success)
        //    {
        //        PlayerObj myobject = new PlayerObj();
        //        myobject.name = generateName();
        //        myobject.email = email.text;
        //        myobject.points = 0;
        //        myobject.password = "password";

        //        string json = JsonUtility.ToJson(myobject);
        //        UnityWebRequest webRequest = new UnityWebRequest("https://0kftyn.deta.dev/student", "POST");
        //        byte[] encodedPayload = new System.Text.UTF8Encoding().GetBytes(json);
        //        webRequest.uploadHandler = (UploadHandler)new UploadHandlerRaw(encodedPayload);
        //        webRequest.downloadHandler = (DownloadHandler)new DownloadHandlerBuffer();
        //        webRequest.SetRequestHeader("Content-Type", "application/json");
        //        webRequest.SetRequestHeader("cache-control", "no-cache");

        //        UnityWebRequestAsyncOperation requestHandel = webRequest.SendWebRequest();
        //        requestHandel.completed += delegate (AsyncOperation pOperation) {
        //            Debug.Log(webRequest.responseCode);
        //            Debug.Log(webRequest.downloadHandler.text);
        //        };

        //    }

        //}
    }

    IEnumerator sendtheemail()
    {
        UnityWebRequest www = UnityWebRequest.Get(baseURL + "authentication/send?email_address=" + email.text);
        yield return www.SendWebRequest();
        if (www.result != UnityWebRequest.Result.Success)
        {
            Debug.Log(www.error);
            title = "Error";
            text = www.error;
            m_DialogBox.Show(title, text, icon, null, options);
            
        }
        else
        {
            Debug.Log("Success");
            title = "Success";
            text = "Please check " + email.text + " for the verification pin";
            m_DialogBox.Show(title, text, icon, null, options);
            StartCoroutine(disableFor30Seconds());
        }
    }

    private string generateName()
    {
        string[] firstName = new string[] { "Ernest", "Noelyn", "Jazz", "Sophia", "Shannon", "Jethro", "Alvin", "Alicia", "Jeff", "John", "Smith", "Alan", "Charles", "William", "Felix" };
        string[] lastName = new string[] { "Tan", "Low", "Lim", "Lee", "Li", "An", "Ang", "Koh", "Chew", "Yong", "Toh", "Chua", "Ying", "Yang", "Tiew", "Dew", "Few", "Loa" };
        return firstName[UnityEngine.Random.Range(0, firstName.Length)] + " " + lastName[UnityEngine.Random.Range(0, lastName.Length)];
    }

    IEnumerator disableFor30Seconds()
    {
        counter = 30;
        counter += 1;
        btn.interactable = false;
        btn.GetComponentInChildren<Text>().text = counter.ToString() + "s";
        GameObject obj = GameObject.Find("Resend Button");
        Button btn1 = obj.GetComponent<Button>();
        TooltipTrigger trigger = btn.GetComponent<TooltipTrigger>();
        trigger.tooltip = "Please wait before sending another 6 digit verification pin!";
        trigger.enabled = true;
        yield return new WaitForSeconds(counter);
        btn.interactable = true;
        trigger.enabled = false;
        btn.GetComponentInChildren<Text>().text = "Send";
    }

    public bool validateEmail(string email)
    {
        string MatchEmailPattern = @"(@)(.+)$";

        if (string.IsNullOrWhiteSpace(email))
            return false;

        if (email != null)
            return Regex.IsMatch(email, MatchEmailPattern, RegexOptions.IgnoreCase);
        else
            return false;
    }

}
