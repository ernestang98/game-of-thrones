using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using DevionGames.UIWidgets;
using UnityEngine.UI;

public class UserMenuSlotsOnClickScript : MonoBehaviour
{

    public string e;
    public string cat;
    public string q;
    public int d;
    public int l;

    // Start is called before the first frame update
    void Start()
    {

    }

    // Update is called once per frame
    void Update()
    {

    }

    public void pressbuttonforacceptingchallenge()
    {
        FindObjectOfType<QuizManagerScript>().CHALLENGEE = true;
        /*
        FindObjectOfType<QuizManagerScript>().CHALLENGE_category_name = cat;
        FindObjectOfType<QuizManagerScript>().CHALLENGE_quest_name = q;
        FindObjectOfType<QuizManagerScript>().CHALLENGE_difficulty = d;
        FindObjectOfType<QuizManagerScript>().CHALLENGE_limit = l;
        */
        FindObjectOfType<QuizManagerScript>().CHALLENGE_category_name = "CZ2006 Software Engineering";
        FindObjectOfType<QuizManagerScript>().CHALLENGE_quest_name = "CZ2006 Quest 1";
        FindObjectOfType<QuizManagerScript>().CHALLENGE_difficulty = 1;
        FindObjectOfType<QuizManagerScript>().CHALLENGE_limit = 1;
        FindObjectOfType<QuizManagerScript>().setStartQuiz();
    }

    public void pressbuttonforacceptingassignment()
    {
        FindObjectOfType<QuizManagerScript>().ASSIGNMENT_name = "CZ3001 Assignment 1";
        FindObjectOfType<QuizManagerScript>().ASSIGNMENT = true;
        FindObjectOfType<QuizManagerScript>().setStartQuiz();
    }

}
