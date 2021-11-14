using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Audio;
using UnityEngine.UI;

public class VerificationSceneAudioManager : MonoBehaviour
{

    public Slider slider;

    // Start is called before the first frame update
    void Start()
    {
        slider.value = PlayerPrefs.GetFloat("MusicVolume", 0.75f);
    }

    // Update is called once per frame
    void Update()
    {

    }

    public void SetMaster(float sliderValue)
    {
        GameObject obj = GameObject.Find("BackgroundMusic");
        AudioSource src = obj.GetComponent<AudioSource>();
        src.volume = sliderValue;
        PlayerPrefs.SetFloat("MusicVolume", sliderValue);
    }

    public void SetSFX(float sliderValue)
    {
        if (ifMenuExists())
        {
            GameObject obj = GameObject.Find("Pause Menu");
            AudioSource src = obj.GetComponent<AudioSource>();
            src.volume = sliderValue;
            PlayerPrefs.SetFloat("MusicVolume", sliderValue);
        }
    }

    private bool ifMenuExists()
    {
        return GameObject.Find("VerificationSceneController").GetComponent<VerificationSceneController>().pauseMenuExists;
    }

}
