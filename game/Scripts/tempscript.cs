using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class tempscript : MonoBehaviour
{

    public GameObject questNaviMenu;
    public GameObject thecanvas;
    // Start is called before the first frame update
    void Start()
    {
        GameObject menu = Instantiate(questNaviMenu, new Vector3(0, 0, 0), Quaternion.identity) as GameObject;
        menu.transform.SetParent(thecanvas.transform, false);
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
