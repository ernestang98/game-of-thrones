using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using System;
using UnityEngine.Networking;
using System.Text;
using SimpleJSON;
using DevionGames.UIWidgets;

public class UserMenuManagerScript : MonoBehaviour
{

    public Sprite rank1;
    public Sprite rank2;
    public Sprite rank3;
    public Sprite rank4;
    public Sprite rank5;
    public Sprite rank6;
    public Sprite rank7;
    public Sprite rank8;
    public Sprite rank9;
    public Sprite rank10;
    public Sprite rank11;

    public bool cursorUnlock;

    public Dictionary<string, string> initialData;
    public GameObject btn;

    public GameObject leaderboard;
    public GameObject parentCanvas;

    public GameObject challenges;
    public GameObject parentCanvas1;

    public GameObject miniquests;
    public GameObject parentCanvas2;

    public GameObject announcments;
    public GameObject parentCanvas3;

    private DialogBox m_DialogBox;
    public Sprite icon;
    public string[] options;

    public Invector.vCharacterController.vMeleeCombatInput combat;
    public Invector.vCharacterController.vThirdPersonInput userinput;
    public DevionGames.UIWidgets.UIWidget UI;

    private string baseURL;

    // Start is called before the first frame update
    void Start()
    {
        //GameObject mnobj = GameObject.Find("GameDataManager");
        //GameDataManager mn = mnobj.GetComponent<GameDataManager>();
        //mn.onEnd(false);
        //mn.clearAllData();
        //mn.onLogin(playerName: "student 8", playerEmail: "student8@gmail.com", playerPoints: 0, playerRank: "Herald", playerPosition: 1000);

        List<string> optionsList = new List<string>();
        optionsList.Add("Okay");
        options = optionsList.ToArray();
        this.m_DialogBox = FindObjectOfType<DialogBox>();
        baseURL = GlobalConstants.BASE_URL_FOR_API;
        // First try block is for player settings
        try
        {
            Dictionary<string, string> data = loadData();
            initialData = data;
            btn.SetActive(false);
            GameObject name = GameObject.Find("InputField-1");
            InputField nameI = name.GetComponent<InputField>();
            GameObject name1 = GameObject.Find("InputField-2");
            InputField name1I = name1.GetComponent<InputField>();
            GameObject name2 = GameObject.Find("points_field");
            Text name2I = name2.GetComponent<Text>();
            GameObject name3 = GameObject.Find("rank_field");
            Text name3I = name3.GetComponent<Text>();
            GameObject name4 = GameObject.Find("position_field");
            Text name4I = name4.GetComponent<Text>();
            //GameObject name5 = GameObject.Find("avatar_field");
            //Text name5I = name5.GetComponent<Text>();
            nameI.text = data["name"];
            name1I.text = data["email"];
            name2I.text = data["points"];
            name3I.text = data["rank"];
            name4I.text = data["position"];
            //name5I.text = data["avatar"];
        }
        catch (Exception e)
        {
            Debug.Log(e);
        }


        try
        {
            loadLeaderboard();
            loadChallenges();
            loadMiniQuests();
            loadMail();
        }
        catch (Exception e)
        {
            Debug.Log(e);
        }
    }

    public void refreshleaderboard()
    {
        GameObject[] gos;
        gos = GameObject.FindGameObjectsWithTag("leaderboardslot");
        foreach (GameObject obj in gos)
        {
            Destroy(obj);
        }
        loadLeaderboard();
    }

    public void refreshMail()
    {
        GameObject[] gos;
        gos = GameObject.FindGameObjectsWithTag("mailslot");
        foreach (GameObject obj in gos)
        {
            Destroy(obj);
        }
        loadMail();
    }

    public void refreshChallenge()
    {
        GameObject[] gos;
        gos = GameObject.FindGameObjectsWithTag("challengeslot");
        foreach (GameObject obj in gos)
        {
            Destroy(obj);
        }
        loadChallenges();
    }

    public void refreshAssignment()
    {
        GameObject[] gos;
        gos = GameObject.FindGameObjectsWithTag("miniquestslot");
        foreach (GameObject obj in gos)
        {
            Destroy(obj);
        }
        loadMiniQuests();
    }

    // Update is called once per frame
    void Update()
    {

        if (cursorUnlock)
        {
            Cursor.lockState = CursorLockMode.Confined;
            Cursor.visible = true;
        }
        try
        {

            GameObject window = GameObject.Find("Window");
            DevionGames.UIWidgets.UIWidget UI = window.GetComponent<DevionGames.UIWidgets.UIWidget>();
            if (UI.getUIShowing())
            {
                freezeUser();
                Debug.Log("User Frozen");
            }
            else
            {
                unfreezeUser();
                Debug.Log("User Unfrozen");
            }
            GameObject manager = GameObject.Find("User Menu Manager");
            UserMenuManagerScript script = manager.GetComponent<UserMenuManagerScript>();
            initialData = script.initialData;
            if (
                initialData["name"] != getState()["name"] ||
                initialData["email"] != getState()["email"]
                //initialData["points"] != getState()["points"] ||
                //initialData["rank"] != getState()["rank"] ||
                //initialData["position"] != getState()["position"] ||
                //initialData["avatar"] != getState()["avatar"]
                )
            {
                btn.SetActive(true);
            }
            else
            {
                btn.SetActive(false);
            }
        }
        catch (Exception e)
        {
            //Debug.Log(e);
        }
    }
    private void freezeUser()
    {
        combat = FindObjectOfType<Invector.vCharacterController.vMeleeCombatInput>();
        userinput = FindObjectOfType<Invector.vCharacterController.vThirdPersonInput>();
        userinput.DisablePlayerInput();
        combat.SetLockMeleeInput(true);
        combat.OnDisableAttack();
        var player = GameObject.FindGameObjectWithTag("Player");
        try
        {
            player.GetComponentInParent<Fire>().setCannotFire();
        }
        catch (Exception e)
        {

        }
    }


    private void unfreezeUser()
    {
        combat = FindObjectOfType<Invector.vCharacterController.vMeleeCombatInput>();
        userinput = FindObjectOfType<Invector.vCharacterController.vThirdPersonInput>();
        combat.SetLockMeleeInput(false);
        userinput.EnablePlayerInput();
        var player = GameObject.FindGameObjectWithTag("Player");
        try
        {
            player.GetComponentInParent<Fire>().setCanFire();
        }
        catch (Exception e)
        {

        }
    }
    private Dictionary<string, string> loadData()
    {
        Dictionary<string, string> dummydata = new Dictionary<string, string>();

        dummydata.Add("name", PlayerPrefs.GetString(GlobalConstants.PLAYERNAME));
        dummydata.Add("email", PlayerPrefs.GetString(GlobalConstants.PLAYEREMAIL));
        dummydata.Add("points", PlayerPrefs.GetInt(GlobalConstants.PLAYERPOINTS).ToString());
        dummydata.Add("rank", rankConverter(PlayerPrefs.GetInt(GlobalConstants.PLAYERRANK)));
        dummydata.Add("position", PlayerPrefs.GetInt(GlobalConstants.PLAYERPOSITION).ToString());
        //dummydata.Add("avatar", "The Destroyer");

        return dummydata;
    }

    private String rankConverter(int val)
    {
        switch (val)
        {
            case 1:
                return "Herald";
            case 2:
                return "Guardian";
            case 3:
                return "Crusader";
            case 4:
                return "Archon";
            case 5:
                return "Legend";
            case 6:
                return "Ancient";
            case 7:
                return "Divine";
            case 8:
                return "Immortal";
            case 9:
                return "Genesis";
            case 10:
                return "Challenger";
            case 11:
                return "Platinum ";
            default:
                return "Herald";
        }
    }

    private Sprite spriteConverter(int val)
    {
        switch (val)
        {
            default:
            case 1:
                return rank1;
            case 2:
                return rank2;
            case 3:
                return rank3;
            case 4:
                return rank4;
            case 5:
                return rank5;
            case 6:
                return rank6;
            case 7:
                return rank7;
            case 8:
                return rank8;
            case 9:
                return rank9;
            case 10:
                return rank10;
            case 11:
                return rank11;
        }
    }

    private Dictionary<string, string>? getState()
    {
        try
        {
            GameObject name = GameObject.Find("InputField-1");
            InputField nameI = name.GetComponent<InputField>();
            string nameIs = nameI.text;
            GameObject name1 = GameObject.Find("InputField-2");
            InputField name1I = name1.GetComponent<InputField>();
            string name1Is = name1I.text;
            GameObject name2 = GameObject.Find("points_field");
            Text name2I = name2.GetComponent<Text>();
            string name2Is = name2I.text;
            GameObject name3 = GameObject.Find("rank_field");
            Text name3I = name3.GetComponent<Text>();
            string name3Is = name3I.text;
            GameObject name4 = GameObject.Find("position_field");
            Text name4I = name4.GetComponent<Text>();
            string name4Is = name4I.text;
            //GameObject name5 = GameObject.Find("avatar_field");
            //Text name5I = name5.GetComponent<Text>();
            //string name5Is = name5I.text;

            Dictionary<string, string> dummydata = new Dictionary<string, string>();
            dummydata.Add("name", nameIs);
            dummydata.Add("email", name1Is);
            dummydata.Add("points", name2Is);
            dummydata.Add("rank", name3Is);
            dummydata.Add("position", name4Is);
            //dummydata.Add("avatar", name5Is);
            //freezeUser();
            return dummydata;
        }
        catch (Exception e)
        {
            Debug.Log(e);
            //unfreezeUser();
            return null;
        }
    }

    private void loadLeaderboard()
    {
        StartCoroutine(getdemleaderboard());
        //getdemleaderboard();
    }

    IEnumerator getdemleaderboard()
    {
        
        UnityWebRequest www = UnityWebRequest.Get(baseURL + "leaderboard/");
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

            var jsonstring = www.downloadHandler.text;
            var json = SimpleJSON.JSON.Parse(jsonstring);
            for (int a = 0; a < 10000; a++)
            {
                if(json[a] != null)
                {
                    var mail = json[a];
                    var temp = Instantiate(leaderboard, parentCanvas.transform);
                    var script = temp.GetComponent<LeaderboardSlotScript>();
                    script.nameX = mail["name"];
                    script.emailX = mail["email"];
                    script.pointsX = mail["points"];
                    script.rankX = rankConverter(mail["rank"]);
                    script.globalPos = mail["position"];
                    script.setNewImage(spriteConverter(mail["rank"]));
                }
                else
                {
                    break;
                }
            }
        }
        
    }

    private void loadChallenges()
    {
        StartCoroutine(getdemchallenges());
    }

    IEnumerator getdemchallenges()
    {
        UnityWebRequest www = UnityWebRequest.Get(baseURL + "challenge/?challengee_email=" + PlayerPrefs.GetString(GlobalConstants.PLAYEREMAIL));
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
            var jsonstring = www.downloadHandler.text;
            var json = JSON.Parse(jsonstring);
            if (json.ToString() != "[]")
            {
                for (int i = 0; i < 10000; i++)
                {
                    if (json[i] != null)
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
                            Debug.Log(www.error);
                            var jsonstring1 = www.downloadHandler.text;
                            var json1 = JSON.Parse(jsonstring1);
                            var temp = Instantiate(challenges, parentCanvas1.transform);
                            ChallengeSlotScript mq = temp.GetComponent<ChallengeSlotScript>();
                            mq.nameX = "Challenger: " + json1["name"];
                            String lol = json[i]["quest_name"];
                            mq.desX = json[i]["category_name"] + ", " + "\n" + lol.Substring(7) + ", Difficulty: " + json[i]["difficulty"];

                            mq.CHALLENGEE_EMAIL = json[i]["challenger_email"];
                            mq.CHALLENGE_category_name = json[i]["category_name"];
                            mq.CHALLENGE_quest_name = json[i]["quest_name"];
                            mq.CHALLENGE_difficulty = json[i]["difficulty"];
                            mq.CHALLENGE_limit = json[i]["number_of_questions"];
                        }
                    }
                    else
                    {
                        break;
                    }

                }
            }
        }
    }

    private void loadMiniQuests()
    {
        //var temp = Instantiate(miniquests, parentCanvas2.transform);
        //MiniQuestSlotScript mq = temp.GetComponent<MiniQuestSlotScript>();
        //mq.nameX = "Professor Shang";
        //mq.desX = "Software Systems Analysis and Design";

        //temp = Instantiate(miniquests, parentCanvas2.transform);
        //mq = temp.GetComponent<MiniQuestSlotScript>();
        //mq.nameX = "Professor Sourav";
        //mq.desX = "Blockchain Cryptography things";

        //temp = Instantiate(miniquests, parentCanvas2.transform);
        //mq = temp.GetComponent<MiniQuestSlotScript>();
        //mq.nameX = "Professor Goh";
        //mq.desX = "HCI CZ2004 Ad-Hoc Quiz";
        StartCoroutine(getmaminiquests());
    }

    IEnumerator getmaminiquests()
    {
        UnityWebRequest www = UnityWebRequest.Get(baseURL + "assignment/?assignee=" + PlayerPrefs.GetString(GlobalConstants.PLAYEREMAIL));
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
            var jsonstring = www.downloadHandler.text;
            var json = JSON.Parse(jsonstring);
            if (json.ToString() != "[]")
            {
                for (int i = 0; i < 10000; i++)
                {
                    if (json[i] != null)
                    {
                        var mq = json[i];
                        var temp = Instantiate(miniquests, parentCanvas2.transform);
                        MiniQuestSlotScript mq1 = temp.GetComponent<MiniQuestSlotScript>();
                        mq1.nameX = mq["assigner"];
                        mq1.desX = mq["description"];
                    }
                    else
                    {
                        break;
                    }
                }
            }
        }
    }

    private void loadMail()
    {
        StartCoroutine(getmaemails());
    }

    IEnumerator getmaemails()
    {
        UnityWebRequest www = UnityWebRequest.Get(baseURL + "mail/");
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
            var jsonstring = www.downloadHandler.text;
            var json = JSON.Parse(jsonstring);
            for (int i = 0; i < 10000; i++)
            {
                if (json[i] != null)
                {
                    var mail = json[i];
                    if (mail["recipient"] == PlayerPrefs.GetString(GlobalConstants.PLAYEREMAIL))
                    {
                        var temp = Instantiate(announcments, parentCanvas3.transform);
                        MailSlotScript mq = temp.GetComponent<MailSlotScript>();
                        mq.nameX = mail["subject"] + "\nfrom: " + mail["sender"];
                        mq.desX = mail["body_text"] + " lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

                        print(mail["subject"] + "\nfrom: " + mail["sender"]);
                        print(mail["body_text"] + " lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.");
                    }
                }
                else
                {
                    break;
                }
            }
        }
    }

    public void updateParticulars()
    {
        GameObject manager = GameObject.Find("User Menu Manager");
        UserMenuManagerScript script = manager.GetComponent<UserMenuManagerScript>();
        StartCoroutine(updatedemparticulars());
        script.initialData = getState();
    }

    IEnumerator updatedemparticulars()
    {
        string tempid = PlayerPrefs.GetString(GlobalConstants.PLAYERID);
        string tempname = getState()["name"];
        string tempemail = getState()["email"];

        PlayerObj player = new PlayerObj();

        player.name = tempname;
        player.id = tempid;
        player.email = tempemail;

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
            // m_DialogBox.Show(request.responseCode.ToString(), request.error + " something went wronggg\n" + tempname + " " + tempid + " " + tempemail, icon, null, options);

        }
        else
        {
            Debug.Log("Successfully created student data: " + request.downloadHandler.text);
            m_DialogBox.Show(request.responseCode.ToString(), "Success!", icon, null, options);
            var data = JSON.Parse(request.downloadHandler.text);
            GameObject obj = GameObject.Find("GameDataManager");
            GameDataManager mn = obj.GetComponent<GameDataManager>();
            mn.onLogin(playerName: data["name"], playerEmail: data["email"], playerPoints: data["points"], playerid: data["points"]);
        }

    }


}
