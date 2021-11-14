using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.Events;
using UnityEngine.SceneManagement;


public class VerificationMultiplayerManagerScript : MonoBehaviour, IPointerClickHandler
{
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    // add callbacks in the inspector like for buttons
    public UnityEvent onClick;

    public string gotowhere;

    public void OnPointerClick(PointerEventData pointerEventData)
    {
        // Output to console the clicked GameObject's name and the following message. You can replace this with your own actions for when clicking the GameObject.
        // Debug.Log(name + " Game Object Clicked!", this);

        if (gotowhere == "single")
        {
            SceneManager.LoadScene("VerificationScene");
            onClick.Invoke();
        }
        else if (gotowhere  == "login")
        {
            loginFromMultiplayer();
        }
        else
        {
            SceneManager.LoadScene("M-VerificationScene");
            onClick.Invoke();
        }
    }

    public void loginFromMultiplayer()
    {
        SceneManager.LoadScene("Menu");
    }
}
