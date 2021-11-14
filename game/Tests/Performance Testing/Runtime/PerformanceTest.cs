using System.Collections;
using System.Collections.Generic;
using System;
using System.Diagnostics;
using System.Text;
using System.Threading;
using NUnit.Framework;
using UnityEngine;
using UnityEngine.UI;
using Unity.PerformanceTesting.Meters;
using UnityEngine.TestTools;
using Unity.PerformanceTesting;
using Unity.PerformanceTesting.Measurements;
using UnityEngine.SceneManagement;
using UnityEngine.EventSystems;
using NUnit.Framework;
using SampleGroup = Unity.PerformanceTesting.SampleGroup;
//using Verification;

public class PerformanceTest
{
    public InputField email;
    public InputField password;
    public static Stopwatch m_stopwatch = new Stopwatch();
    // A Test behaves as an ordinary method
    [UnityTest, Performance]
    public IEnumerator MeasureVerificationScene()
    {
        var sg = new SampleGroup("Test", SampleUnit.Second);
        
        Measure.Method(() => {

            SceneManager.LoadScene("VerificationScene");

        })
        .WarmupCount(3)
        .MeasurementCount(1)
        .SampleGroup(sg)
        .Run();
        
        // Use the Assert class to test conditions.
        // Use yield to skip a frame.
        yield return null;
    }

    // A UnityTest behaves like a coroutine in Play Mode. In Edit Mode you can use
    // `yield return null;` to skip a frame.
    [UnityTest, Performance]
    public IEnumerator MeasureLoadLobbyScene()
    {
        var sg = new SampleGroup("Test", SampleUnit.Second);
        
        Measure.Method(() => {

            SceneManager.LoadScene("LobbyScene");
        })
        .WarmupCount(3)
        .MeasurementCount(1)
        .SampleGroup(sg)
        .Run();
        
        // Use the Assert class to test conditions.
        // Use yield to skip a frame.
        yield return null;
    }

    [UnityTest, Performance]
    public IEnumerator MeasureLoadQuest1Scene()
    {
        var sg = new SampleGroup("Test", SampleUnit.Second);
        
        Measure.Method(() => {
            SceneManager.LoadScene("Quest 1 V2");
            
        })
        .WarmupCount(3)
        .MeasurementCount(1)
        .SampleGroup(sg)
        .Run();
        
        //UnityEngine.Debug.LogException();
        // Use the Assert class to test conditions.
        // Use yield to skip a frame.
        yield return null;
    }

    [UnityTest, Performance]
    public IEnumerator MeasureLoadQuest2Scene()
    {
        var sg = new SampleGroup("Test", SampleUnit.Second);
        
        Measure.Method(() => {
            SceneManager.LoadScene("Quest 2");
        })
        .WarmupCount(3)
        .MeasurementCount(1)
        .SampleGroup(sg)
        .Run();
        
        // Use the Assert class to test conditions.
        // Use yield to skip a frame.
        yield return null;
    }

    [UnityTest, Performance]
    public IEnumerator MeasureLoadQuest3Scene()
    {
        var sg = new SampleGroup("Test", SampleUnit.Second);
        
        Measure.Method(() => {
            SceneManager.LoadScene("Quest 3");
        })
        .WarmupCount(3)
        .MeasurementCount(1)
        .SampleGroup(sg)
        .Run();
        
        // Use the Assert class to test conditions.
        // Use yield to skip a frame.
        yield return null;
    }

    [UnityTest, Performance]
    public IEnumerator MeasureLoadQuest4Scene()
    {
        var sg = new SampleGroup("Test", SampleUnit.Second);
        
        Measure.Method(() => {
            SceneManager.LoadScene("Quest 4");
        })
        .WarmupCount(3)
        .MeasurementCount(1)
        .SampleGroup(sg)
        .Run();
        
        // Use the Assert class to test conditions.
        // Use yield to skip a frame.
        yield return null;
    }

    [UnityTest, Performance]
    public IEnumerator MeasureLoadQuest5Scene()
    {
        var sg = new SampleGroup("Test", SampleUnit.Second);
        
        Measure.Method(() => {
            SceneManager.LoadScene("Quest 5");
        })
        .WarmupCount(3)
        .MeasurementCount(1)
        .SampleGroup(sg)
        .Run();
        
        // Use the Assert class to test conditions.
        // Use yield to skip a frame.
        yield return null;
    }

}
