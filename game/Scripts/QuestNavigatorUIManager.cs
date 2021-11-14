using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class QuestNavigatorUIManager : MonoBehaviour
{

    private string CZ2006 = "CZ2006";
    private string CZ3001 = "CZ3001";
    private string CZ3002 = "CZ3002";
    private string CZ3003 = "CZ3003";

    //private string CZ2006QUEST1SUBQUEST1NUMBER = "1";
    //private string CZ2006QUEST1SUBQUEST2NUMBER = "2";
    //private string CZ2006QUEST1SUBQUEST3NUMBER = "3";
    //private string CZ2006QUEST1SUBQUEST4NUMBER = "4";
    //private string CZ2006QUEST1SUBQUEST5NUMBER = "5";

    //private string CZ2006QUEST2SUBQUEST1NUMBER = "6";
    //private string CZ2006QUEST2SUBQUEST2NUMBER = "7";
    //private string CZ2006QUEST2SUBQUEST3NUMBER = "8";
    //private string CZ2006QUEST2SUBQUEST4NUMBER = "9";
    //private string CZ2006QUEST2SUBQUEST5NUMBER = "10";

    public bool CZ2006IsImplemented = true;
    public bool CZ3001IsImplemented = false;
    public bool CZ3002IsImplemented = false;
    public bool CZ3003IsImplemented = false;

    public GameObject CZ2006Tab;
    public GameObject CZ2006Content;
    public GameObject CZ3001Tab;
    public GameObject CZ3001Content;
    public GameObject CZ3002Tab;
    public GameObject CZ3002Content;
    public GameObject CZ3003Tab;
    public GameObject CZ3003Content;

    public GameObject menu;
    
    public Invector.vCharacterController.vMeleeCombatInput combat;
    public Invector.vCharacterController.vThirdPersonInput userinput;

    private string CZ2006QUEST1 = "Quest 1 V2";
    private string CZ2006QUEST2 = "Quest 2";
    private string CZ2006QUEST3 = "Quest 3";
    private string CZ2006QUEST4 = "Quest 4 V2";
    private string CZ2006QUEST5 = "Quest 5";

    private int CZ2006QUEST1NUMBER = 1;
    private int CZ2006QUEST2NUMBER = 2;
    private int CZ2006QUEST3NUMBER = 3;
    private int CZ2006QUEST4NUMBER = 4;
    private int CZ2006QUEST5NUMBER = 5;

    void Start()
    {
        FreezePlayer();
        unimplementedhenceDisable();
    }

    private void unimplementedhenceDisable()
    {
        if (!CZ2006IsImplemented)
        {
            CZ2006Tab.SetActive(false);
            CZ2006Content.SetActive(false);
        }
        else
        {
            CZ2006Tab.SetActive(true);
            CZ2006Content.SetActive(true);
        }
        if (!CZ3001IsImplemented)
        {
            CZ3001Tab.SetActive(false);
            CZ3001Content.SetActive(false);
        }
        else
        {
            CZ3001Tab.SetActive(true);
            CZ3001Content.SetActive(true);
        }
        if (!CZ3002IsImplemented)
        {
            CZ3002Tab.SetActive(false);
            CZ3002Content.SetActive(false);
        }
        else
        {
            CZ3002Tab.SetActive(true);
            CZ3002Content.SetActive(true);
        }
        if (!CZ3003IsImplemented)
        {
            CZ3003Tab.SetActive(false);
            CZ3003Content.SetActive(false);
        }
        else
        {
            CZ3003Tab.SetActive(true);
            CZ3003Content.SetActive(true);
        }
    }

    public void gotocz2006quest1()
    {
        SceneManager.LoadScene(CZ2006QUEST1);
        UnfreezePlayer();
        GameObject gamedatamanager = GameObject.Find("GameDataManager");
        GameDataManager mn = gamedatamanager.GetComponent<GameDataManager>();
        mn.onStartQuest(CZ2006, CZ2006QUEST1NUMBER);
    }
    public void gotocz2006quest2()
    {
        SceneManager.LoadScene(CZ2006QUEST2);
        UnfreezePlayer();
        GameObject gamedatamanager = GameObject.Find("GameDataManager");
        GameDataManager mn = gamedatamanager.GetComponent<GameDataManager>();
        mn.onStartQuest(CZ2006, CZ2006QUEST2NUMBER);
        //mn.onStartQuest(CZ2006, CZ2006QUEST2NUMBER);
    }
    public void gotocz2006quest3()
    {
        SceneManager.LoadScene(CZ2006QUEST3);
        UnfreezePlayer();
        GameObject gamedatamanager = GameObject.Find("GameDataManager");
        GameDataManager mn = gamedatamanager.GetComponent<GameDataManager>();
        mn.onStartQuest(CZ2006, CZ2006QUEST3NUMBER);
    }
    public void gotocz2006quest4()
    {
        SceneManager.LoadScene(CZ2006QUEST4);
        UnfreezePlayer();
        GameObject gamedatamanager = GameObject.Find("GameDataManager");
        GameDataManager mn = gamedatamanager.GetComponent<GameDataManager>();
        mn.onStartQuest(CZ2006, CZ2006QUEST4NUMBER);
    }
    public void gotocz2006quest5()
    {
        SceneManager.LoadScene(CZ2006QUEST5);
        UnfreezePlayer();
        GameObject gamedatamanager = GameObject.Find("GameDataManager");
        GameDataManager mn = gamedatamanager.GetComponent<GameDataManager>();
        mn.onStartQuest(CZ2006, CZ2006QUEST5NUMBER);
    }

    public void closeMenu()
    {
        UnfreezePlayer();
        GameObject.Destroy(menu);
    }

    void FreezePlayer(){
        combat = FindObjectOfType<Invector.vCharacterController.vMeleeCombatInput>();
        userinput = FindObjectOfType<Invector.vCharacterController.vThirdPersonInput>();
        userinput.DisablePlayerInput();
        combat.SetLockMeleeInput(true);
        combat.OnDisableAttack();
        var player = GameObject.FindGameObjectWithTag("Player");
        player.GetComponentInParent<Fire>().setCannotFire();
    }

    void UnfreezePlayer(){
        combat = FindObjectOfType<Invector.vCharacterController.vMeleeCombatInput>();
        userinput = FindObjectOfType<Invector.vCharacterController.vThirdPersonInput>();
        combat.SetLockMeleeInput(false);
        userinput.EnablePlayerInput();
        var player = GameObject.FindGameObjectWithTag("Player");
        player.GetComponentInParent<Fire>().setCanFire();
    }
}
