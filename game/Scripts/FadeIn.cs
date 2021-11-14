using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class FadeIn : MonoBehaviour
{
    public Image whiteFade;
    // Start is called before the first frame update
    void Start()
    {
        whiteFade.canvasRenderer.SetAlpha(1.0f);
        StartCoroutine(fade());
    }

    // Update is called once per frame
    public IEnumerator fade()
    {
        whiteFade.CrossFadeAlpha(0, 1f, false);
        yield return new WaitForSeconds(1);
        whiteFade.enabled = false;
        yield return new WaitForSeconds(1);
    }
}
