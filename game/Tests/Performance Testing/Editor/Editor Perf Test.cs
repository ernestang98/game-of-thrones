using System.Collections;
using System.Collections.Generic;
using System;
using System.Diagnostics;
using System.Text;
using System.Threading;
using NUnit.Framework;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEditor.SceneManagement;
using UnityEngine.UI;
using Unity.PerformanceTesting.Meters;
using UnityEngine.TestTools;
using Unity.PerformanceTesting;
using Unity.PerformanceTesting.Measurements;
using UnityEngine.SceneManagement;
using UnityEngine.Networking;
using SampleGroup = Unity.PerformanceTesting.SampleGroup;


public class EditorPerfTest
{
    public static Stopwatch m_stopwatch = new Stopwatch();
    public InputField email;
    public InputField email1;
    public InputField password;

    // A Test behaves as an ordinary method
    [Test, Performance]
    public void MeasureLeaderboard()
    {
        var sg = new SampleGroup("Test", SampleUnit.Millisecond);
        
        Measure.Method(()=> 
        {
            
            GameObject obj2 = GameObject.Find("refresh");
            Button refresh_btn = obj2.GetComponent<Button>();
            refresh_btn.onClick.Invoke();
            
        })
        .WarmupCount(5)
        .MeasurementCount(15)
        .IterationsPerMeasurement(5)
        .SampleGroup(sg)
        .Run();
        
        var result = PerformanceTest.Active;
        Assert.AreEqual(1, result.SampleGroups.Count);
    }

    [Test, Performance]
    public void MeasureDatabaseAccess()
    {
        var sg = new SampleGroup("Test", SampleUnit.Millisecond);
        
        Measure.Method(()=> 
        {
            UnityWebRequest.Get("https://fastapi-ernestang98.cloud.okteto.net/");
        })
        .WarmupCount(5)
        .MeasurementCount(15)
        .IterationsPerMeasurement(5)
        .SampleGroup(sg)
        .Run();
        
        var result = PerformanceTest.Active;
        Assert.AreEqual(1, result.SampleGroups.Count);
    }

    [Test, Performance]
    public void MeasureDisplaySubquest()
    {
        // Use the Assert class to test conditions
        var sg = new SampleGroup("Test", SampleUnit.Millisecond);
        
        Measure.Method(()=> 
        {
            UnityWebRequest.Get("https://fastapi-ernestang98.cloud.okteto.net/assignmentQuestion/?assignment_name=CZ3001 Subquest 1");
        })
        .WarmupCount(5)
        .MeasurementCount(15)
        .IterationsPerMeasurement(5)
        .SampleGroup(sg)
        .Run();
        
        var result = PerformanceTest.Active;
        Assert.AreEqual(1, result.SampleGroups.Count);
        
    }
    
    //[Test, Performance]
    //public void MeasureSubquestAnswerCheck()
    //{
        // Use the Assert class to test conditions
        
    //}

    // A UnityTest behaves like a coroutine in Play Mode. In Edit Mode you can use
    // `yield return null;` to skip a frame.
    [Test, Performance]
    public void MeasureLogin()
    {
        var sg = new SampleGroup("Test", SampleUnit.Millisecond);
        
        Measure.Method(()=> 
        {
            
            GameObject obj2 = GameObject.Find("Login Button");
            Button login_btn = obj2.GetComponent<Button>();
            //var ped = new PointerEventData(EventSystem.current);
            //ExecuteEvents.Execute(login_btn, ped, ExecuteEvents.pointerEnterHandler);
            //ExecuteEvents.Execute(login_btn, ped, ExecuteEvents.submitHandler);

            login_btn.onClick.Invoke();
            //m_stopwatch.Reset();
            //m_stopwatch.Start();
            //Scene currentScene = SceneManager.GetActiveScene ();

            //while(currentScene.name != "MLobbyScene"){
                //currentScene = SceneManager.GetActiveScene ();
            //}

            //m_stopwatch.Stop();
        })
        .WarmupCount(5)
        .MeasurementCount(15)
        .IterationsPerMeasurement(5)
        .SampleGroup(sg)
        .SetUp( () =>
            {
                GameObject obj1 = GameObject.Find("Email Input");
                email = obj1.GetComponent<InputField>();
                email.text = "zlek001@e.ntu.edu.sg";

                GameObject obj2 = GameObject.Find("Verification Input");
                password = obj2.GetComponent<InputField>();
                password.text = "180026";

            }
        )
        .Run();
        
        var result = PerformanceTest.Active;
        Assert.AreEqual(1, result.SampleGroups.Count);
        // Use the Assert class to test conditions.
        // Use yield to skip a frame.
        //yield return null;
    }

    [Test, Performance]
    public void MeasureResend()
    {
        var sg = new SampleGroup("Test", SampleUnit.Millisecond);
        
        Measure.Method(()=> 
        {
            
            GameObject obj2 = GameObject.Find("Resend Button");
            Button resend_btn = obj2.GetComponent<Button>();
            resend_btn.onClick.Invoke();
        })
        .WarmupCount(5)
        .MeasurementCount(15)
        .IterationsPerMeasurement(5)
        .SampleGroup(sg)
        .SetUp( () =>
            {
                GameObject obj1 = GameObject.Find("Email Input");
                email = obj1.GetComponent<InputField>();
                email.text = "zlek001@e.ntu.edu.sg";
            }
        )
        .Run();
        
        var result = PerformanceTest.Active;
        Assert.AreEqual(1, result.SampleGroups.Count);

    }

    [Test, Performance]
    public void MeasureSendPvP()
    {
        var sg = new SampleGroup("Test", SampleUnit.Millisecond);
        
        Measure.Method(()=> 
        {
            
            GameObject obj2 = GameObject.Find("issue challenge");
            Button issue_challenge = obj2.GetComponent<Button>();
            issue_challenge.onClick.Invoke();

            GameObject obj1 = GameObject.Find("InputField");
            email = obj1.GetComponent<InputField>();
            email.text = "zlek001@e.ntu.edu.sg";

            GameObject obj3 = GameObject.Find("Button");
            Button send_btn = obj3.GetComponent<Button>();
            send_btn.onClick.Invoke();

        })
        .WarmupCount(5)
        .MeasurementCount(15)
        .IterationsPerMeasurement(5)
        .SampleGroup(sg)
        .Run();
        
        var result = PerformanceTest.Active;
        Assert.AreEqual(1, result.SampleGroups.Count);

    }

    [Test, Performance]
    public void MeasureUpdateProfile()
    {
        var sg = new SampleGroup("Test", SampleUnit.Millisecond);
        
        Measure.Method(()=> 
        {
            
            GameObject obj2 = GameObject.Find("Rectangle Button");
            Button update_btn = obj2.GetComponent<Button>();
            update_btn.onClick.Invoke();

        })
        .WarmupCount(5)
        .MeasurementCount(15)
        .IterationsPerMeasurement(5)
        .SampleGroup(sg)
        .SetUp( () =>
            {
                GameObject obj1 = GameObject.Find("InputField-1");
                email = obj1.GetComponent<InputField>();
                email.text = "LZY";

                GameObject obj2 = GameObject.Find("InputField-2");
                password = obj2.GetComponent<InputField>();
                password.text = "zlek001@e.ntu.edu.sg";

            }
        )
        .Run();
        
        var result = PerformanceTest.Active;
        Assert.AreEqual(1, result.SampleGroups.Count);

    }


    [Test, Performance]
    public void MeasureLoadLobbyScene()
    {
        var sg = new SampleGroup("Test", SampleUnit.Second);
        
        Measure.Method(() => {
    
            EditorSceneManager.OpenScene("Assets/Shared/CZ3003/Scenes/LobbyScene.unity");
            
        })
        .WarmupCount(3)
        .MeasurementCount(1)
        .SampleGroup(sg)
        .Run();
        
        var result = PerformanceTest.Active;
        Assert.AreEqual(1, result.SampleGroups.Count);
    }

    [Test, Performance]
    public void MeasureQuest1Scene()
    {
        var sg = new SampleGroup("Test", SampleUnit.Second);
        
        Measure.Method(() => {
    
            EditorSceneManager.OpenScene("Assets/Shared/CZ3003/Scenes/Quest 1 V2.unity");
            
        })
        .WarmupCount(3)
        .MeasurementCount(1)
        .SampleGroup(sg)
        .Run();
        
        var result = PerformanceTest.Active;
        Assert.AreEqual(1, result.SampleGroups.Count);
    }

    [Test, Performance]
    public void MeasureQuest2Scene()
    {
        var sg = new SampleGroup("Test", SampleUnit.Second);
        
        Measure.Method(() => {
    
            EditorSceneManager.OpenScene("Assets/Shared/CZ3003/Scenes/Quest 2.unity");
            
        })
        .WarmupCount(3)
        .MeasurementCount(1)
        .SampleGroup(sg)
        .Run();
        
        var result = PerformanceTest.Active;
        Assert.AreEqual(1, result.SampleGroups.Count);
    }

    [Test, Performance]
    public void MeasureQuest3Scene()
    {
        var sg = new SampleGroup("Test", SampleUnit.Second);
        
        Measure.Method(() => {
    
            EditorSceneManager.OpenScene("Assets/Shared/CZ3003/Scenes/Quest 3.unity");
            
        })
        .WarmupCount(3)
        .MeasurementCount(1)
        .SampleGroup(sg)
        .Run();
        
        var result = PerformanceTest.Active;
        Assert.AreEqual(1, result.SampleGroups.Count);
    }

    [Test, Performance]
    public void MeasureQuest4Scene()
    {
        var sg = new SampleGroup("Test", SampleUnit.Second);
        
        Measure.Method(() => {
    
            EditorSceneManager.OpenScene("Assets/Shared/CZ3003/Scenes/Quest 4.unity");
            
        })
        .WarmupCount(3)
        .MeasurementCount(1)
        .SampleGroup(sg)
        .Run();
        
        var result = PerformanceTest.Active;
        Assert.AreEqual(1, result.SampleGroups.Count);
    }

    [Test, Performance]
    public void MeasureQuest5Scene()
    {
        var sg = new SampleGroup("Test", SampleUnit.Second);
        
        Measure.Method(() => {
    
            EditorSceneManager.OpenScene("Assets/Shared/CZ3003/Scenes/Quest 5.unity");
            
        })
        .WarmupCount(3)
        .MeasurementCount(1)
        .SampleGroup(sg)
        .Run();
        
        var result = PerformanceTest.Active;
        Assert.AreEqual(1, result.SampleGroups.Count);
    }

    [Test, Performance]
    public void MeasureVerificationScene()
    {
        var sg = new SampleGroup("Test", SampleUnit.Second);
        
        Measure.Method(() => {
    
            EditorSceneManager.OpenScene("Assets/Shared/CZ3003/Scenes/VerificationScene.unity");
            
        })
        .WarmupCount(3)
        .MeasurementCount(1)
        .SampleGroup(sg)
        .Run();
        
        var result = PerformanceTest.Active;
        Assert.AreEqual(1, result.SampleGroups.Count);
    }
    
    [Test, Performance]
    public void StressTestDatabase()
    {
        // Use the Assert class to test conditions
        var sg = new SampleGroup("Test", SampleUnit.Second);
        Measure.Method(() => {
    
            UnityWebRequest.Get("https://fastapi-ernestang98.cloud.okteto.net/authentication/validate?email_address=zlek001@e.ntu.edu.sg&otp=180026");
            
        })
        .WarmupCount(3)
        .MeasurementCount(1)
        .SampleGroup(sg)
        .Run();
        
        var result = PerformanceTest.Active;
        Assert.AreEqual(1, result.SampleGroups.Count);
    }

    [Test, Performance]
    public void StresstestDisplaySubquest()
    {
        // Use the Assert class to test conditions
        var sg = new SampleGroup("Test", SampleUnit.Millisecond);
        
        Measure.Method(()=> 
        {
            UnityWebRequest.Get("https://fastapi-ernestang98.cloud.okteto.net/assignmentQuestion/?assignment_name=CZ2006 Subquest 1");
        })
        .WarmupCount(5)
        .MeasurementCount(15)
        .IterationsPerMeasurement(5)
        .SampleGroup(sg)
        .Run();
        
        var result = PerformanceTest.Active;
        Assert.AreEqual(1, result.SampleGroups.Count);
        
    }

}
