using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class MailSlotScript : MonoBehaviour
{
    public string nameX;
    public string desX;

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
    }
}
