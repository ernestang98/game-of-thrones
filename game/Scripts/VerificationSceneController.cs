using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class VerificationSceneController : MonoBehaviour
{
    public bool cursorUnlock;
    public bool amController;
    public GameObject pauseMenu;
    public bool pauseMenuExists;
    public Transform trans;
    public bool iamtheverificationScene;
    public Invector.vCharacterController.vMeleeCombatInput combat;
    public Invector.vCharacterController.vThirdPersonInput userinput;

    // Start is called before the first frame update
    void Start()
    {
        pauseMenuExists = false;
    }

    // Update is called once per frame
    void Update()
    {
        if (cursorUnlock)
        {
            Cursor.lockState = CursorLockMode.Confined;
            Cursor.visible = true;
        }
        if (amController)
        {
            if (Input.GetKeyDown(KeyCode.Escape) && !pauseMenuExists)
            {
                openPauseMenu();
            }
        }
    }

    public void ClosePauseMenu()
    {
        GameObject controller = GameObject.Find("VerificationSceneController");
        controller.GetComponent<VerificationSceneController>().pauseMenuExists = false;
        GameObject obj = GameObject.Find("PauseCanvas(Clone)");
        if (obj)
        {
            GameObject.Destroy(obj);
        }
        obj = GameObject.Find("PauseCanvasLobby(Clone)");
        if (obj)
        {
            GameObject.Destroy(obj);
        }
        obj = GameObject.Find("PauseCanvasQuest(Clone)");
        if (obj)
        {
            GameObject.Destroy(obj);
        }
        if (!iamtheverificationScene)
        {
            unfreezeUser();
        }
    }

    public void QuitGame()
    {
        Application.Quit();
    }

    public void openPauseMenu()
    {
        GameObject controller = GameObject.Find("VerificationSceneController");
        pauseMenuExists = true;
        GameObject menu = Instantiate(pauseMenu);
        GameObject actualMenu = GameObject.Find("Pause Menu");
        Canvas cv = menu.GetComponent<Canvas>();
        actualMenu.transform.SetParent(cv.transform);
        actualMenu.transform.position = new Vector3(Screen.width / 2, Screen.height / 2, 0);

        if (!iamtheverificationScene)
        {
            freezeUser();
        }
    }

    public void Logout()
    {
        SceneManager.LoadScene("VerificationScene");
        reset();
    }

    public void leaveQuest()
    {
        GameObject obj = GameObject.Find("GameDataManager");
        GameDataManager mn = obj.GetComponent<GameDataManager>();
        mn.endQuest();
        SceneManager.LoadScene("LobbyScene");
    }

    private void reset()
    {
        GameObject obj = GameObject.Find("GameDataManager");
        GameDataManager mn = obj.GetComponent<GameDataManager>();
        mn.clearAllData();
    }

    void freezeUser(){
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


    void unfreezeUser(){
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

}
