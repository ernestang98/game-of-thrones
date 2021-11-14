using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class LeaderboardSlotScript : MonoBehaviour
{

    public string nameX;
    public string emailX;
    public int pointsX;
    public string rankX;
    public int globalPos;
    public Image theimage;

    public GameObject namee;
    public GameObject des;
    public GameObject pos;
    public GameObject Global;

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
        dese.text = emailX + "\n" +
            "<color=teal>Number of points: " + pointsX.ToString() + "</color>\n" +
            "<color=green>Rank: " + rankX + "</color>";

        Text pos1 = pos.GetComponent<Text>();
        pos1.text = globalPos.ToString();


        Text Globalq = Global.GetComponent<Text>();
        Globalq.text = "Position " + globalPos.ToString();

    }
    public void setNewImage(Sprite img)
    {
        theimage.sprite = img;
    }

}
