using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using DevionGames.UIWidgets;
using UnityEngine.Networking;
using SimpleJSON;
using System;
using System.Text.RegularExpressions;
using System.Text;

public class SendChallengeScript : MonoBehaviour
{
    public Dropdown course;
    public Dropdown quest;
    public Dropdown difficulty;
    public Dropdown number;
    public InputField challengee;

    private DialogBox m_DialogBox;
    public Sprite icon;
    public string[] options;
    public string[] optionsForCancel;
    private string baseURL;

    public ChallengeManager challengemanagerbox;

    public ChallengeObj cache;

    private bool StartPolling = false;
    private bool StartedPolling = false;
    public PollForAcceptanceScript script;

    // Start is called before the first frame update
    void Start()
    {
        List<string> optionsList = new List<string>();
        optionsList.Add("Okay");
        options = optionsList.ToArray();

        List<string> optionsList2 = new List<string>();
        optionsList2.Add("Cancel Challenge!");
        optionsForCancel = optionsList2.ToArray();

        List<string> optionsList0 = new List<string>();
        optionsList.Add("Okay");
        options = optionsList0.ToArray();
        this.m_DialogBox = FindObjectOfType<DialogBox>();

        baseURL = GlobalConstants.BASE_URL_FOR_API;
    }

    // Update is called once per frame
    void Update()
    {
        if (script.StartQuiz)
        {
            GameObject btn = GameObject.Find("Rectangle Button LOL");
            SendChallengeScript cscript = btn.GetComponent<SendChallengeScript>();

            Debug.Log(cscript == null);

            FindObjectOfType<QuizManagerScript>().CHALLENGE_category_name = cscript.cache.category_name;
            FindObjectOfType<QuizManagerScript>().CHALLENGE_quest_name = cscript.cache.quest_name;
            FindObjectOfType<QuizManagerScript>().CHALLENGE_difficulty = cscript.cache.difficulty;
            FindObjectOfType<QuizManagerScript>().CHALLENGE_limit = cscript.cache.number_of_questions;
            FindObjectOfType<QuizManagerScript>().CHALLENGE = true;
            FindObjectOfType<QuizManagerScript>().setStartQuiz();

            challengemanagerbox.close();
            script.StartQuiz = false;
        }
    }

    public void SendChallenge()
    {
        String course1 = course.options[course.value].text;
        String quest1 = quest.options[quest.value].text;
        String difficulty1 = difficulty.options[difficulty.value].text;
        String number1 = number.options[number.value].text;
        String challengee1 = challengee.text;
        int difficulty2 = 1;

        switch (difficulty1)
        {
            default:
            case "Easy":
                difficulty2 = 1;
                break;
            case "Medium":
                difficulty2 = 2;
                break;
            case "Hard":
                difficulty2 = 3;
                break;
        }

        if (challengee1 == "" || challengee1 == null)
        {
            String title = "Error";
            String text = "Challengee Email field must be filled!";
            m_DialogBox.Show(title, text, icon, null, options);
        }

        else if (!validateEmail(challengee1))
        {
            String title = "Error";
            String text = "Invalid email format!";
            m_DialogBox.Show(title, text, icon, null, options);
        }
        else
        {
            cache = new ChallengeObj();

            cache.quest_name = course1.Substring(0, 6) + " " + quest1;
            cache.challengee_email = challengee1;
            cache.challenger_email = PlayerPrefs.HasKey(GlobalConstants.PLAYEREMAIL) ? PlayerPrefs.GetString(GlobalConstants.PLAYEREMAIL) : "student8@gmail.com";
            cache.category_name = course1;
            cache.difficulty = difficulty2;
            cache.number_of_questions = Int32.Parse(number1);

            StartCoroutine(startsendingthechallenge(cache));
        }
    }

    public void stopPolling()
    {
        script.toStartPolling = false;
    }

    IEnumerator startsendingthechallenge(ChallengeObj myobject)
    {
        //FindObjectOfType<QuizManagerScript>().setStartQuiz();
        var json = JsonUtility.ToJson(myobject);
        Debug.Log(json);
        UnityWebRequest request = new UnityWebRequest();
        request = new UnityWebRequest(baseURL + "challenge/", "POST");
        byte[] bodyRaw = Encoding.UTF8.GetBytes(json);
        request.method = "POST";
        request.uploadHandler = (UploadHandler)new UploadHandlerRaw(bodyRaw);
        request.downloadHandler = (DownloadHandler)new DownloadHandlerBuffer();
        request.SetRequestHeader("Content-Type", "application/json");
        yield return request.SendWebRequest();
        if (request.result != UnityWebRequest.Result.Success)
        {
            Debug.Log(request.error);
            string title = "Error";
            string text = request.error;
            m_DialogBox = FindObjectOfType<DialogBox>();
            m_DialogBox.Show(title, text, null, options);
        }
        else
        {
            script.toStartPolling = true;
            script.StartedPolling = false;
            script.challenger_email = myobject.challengee_email;
            script.challengee_email = myobject.challengee_email;
            script.quest_name = myobject.quest_name;
            script.category_name = myobject.category_name;
            challengemanagerbox.open();

            /*

            yield return new WaitForSeconds(3f);

            GameObject obj = GameObject.Find("QuizManager");
            QuizManagerScript qm = obj.GetComponent<QuizManagerScript>();
            qm.setStartQuiz();

            FindObjectOfType<QuizManagerScript>().CHALLENGE_category_name = "CZ2006 Software Engineering";
            FindObjectOfType<QuizManagerScript>().CHALLENGE_quest_name = "CZ2006 Quest 1";
            FindObjectOfType<QuizManagerScript>().CHALLENGE_difficulty = 1;
            FindObjectOfType<QuizManagerScript>().CHALLENGE_limit = 5;
            FindObjectOfType<QuizManagerScript>().CHALLENGE = true;
            FindObjectOfType<QuizManagerScript>().CHALLENGEE = false;
            FindObjectOfType<QuizManagerScript>().ASSIGNMENT = false;
            FindObjectOfType<QuizManagerScript>().setStartQuiz();

            challengemanagerbox.close();
            */

            /*
            m_DialogBox = FindObjectOfType<DialogBox>();
            m_DialogBox.challengeedit = true;
            Debug.Log(request.error);
            string title = "Success";
            string text = "Waiting for other player to accept...";
            m_DialogBox.Show(title, text, null, optionsForCancel);
            */
        }
    }

    private bool validateEmail(string email)
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
