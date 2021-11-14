using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class ChallengeSlotScript : MonoBehaviour
{
    public string nameX;
    public string desX;

    public string CHALLENGEE_EMAIL;
    public string CHALLENGE_category_name;
    public string CHALLENGE_quest_name;
    public int CHALLENGE_difficulty;
    public int CHALLENGE_limit;

    public UserMenuSlotsOnClickScript script;

    public GameObject namee;
    public GameObject des;

    // Start is called before the first frame update
    void Start()
    {

    }

    // Update is called once per frame
    void Update()
    {
        Text nameet = namee.GetComponent<Text>();
        nameet.text = nameX;

        Text dese = des.GetComponent<Text>();
        dese.text = desX;

        script.e = CHALLENGEE_EMAIL;
        script.cat = CHALLENGE_category_name;
        script.q = CHALLENGE_quest_name;
        script.d = CHALLENGE_difficulty;
        script.l = CHALLENGE_limit;

    }
}
