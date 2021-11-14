using System.Collections;
using System.Text.RegularExpressions;
using System.Threading;
using NUnit.Framework;
using UnityEngine;
using Unity.PerformanceTesting;
using UnityEngine.Profiling;
using UnityEngine.TestTools;

public class UnitTesting
{
    [UnityTest]
    public IEnumerator Enter_Multiplayer()
    {
        using (Measure.Frames().Scope())
        {
            yield return null;
            yield return null;
        }

        var test = PerformanceTest.Active;
        Assert.AreEqual(1, test.SampleGroups.Count);
        Assert.AreEqual(2, test.SampleGroups[0].Samples.Count);
        Assert.IsTrue(AllSamplesHigherThan0(test));
    }

    [UnityTest]
    public IEnumerator Basic_Locomotion()
    {
        var sg = new SampleGroup("TEST", SampleUnit.Second);
        using (Measure.Frames().Scope(sg))
        {
            yield return null;
            yield return null;
        }

        var test = PerformanceTest.Active;
        Assert.AreEqual(1, test.SampleGroups.Count);
        Assert.AreEqual(test.SampleGroups[0].Samples.Count, 2);
        Assert.AreEqual(sg.Name, test.SampleGroups[0].Name);
        Assert.AreEqual(sg.Unit, test.SampleGroups[0].Unit);
        Assert.IsTrue(AllSamplesHigherThan0(test));
    }

    [UnityTest]
    public IEnumerator Interact_With_NPC()
    {
        yield return Measure.Frames().Run();

        var test = PerformanceTest.Active;
        Assert.AreEqual(1, test.SampleGroups.Count);
        Assert.Greater(test.SampleGroups[0].Samples.Count, 0);
        Assert.IsTrue(AllSamplesHigherThan0(test));
    }

    [UnityTest]
    public IEnumerator Simple_Object_Collision()
    {
        yield return Measure.Frames()
            .SampleGroup("TIME")
            .Run();

        var test = PerformanceTest.Active;
        Assert.AreEqual(1, test.SampleGroups.Count);
        Assert.AreEqual("TIME", test.SampleGroups[0].Name);
        Assert.AreEqual(SampleUnit.Millisecond, test.SampleGroups[0].Unit);
    }

    [UnityTest]
    public IEnumerator Fall_Animation()
    {
        yield return Measure.Frames().DontRecordFrametime().Run();

        var test = PerformanceTest.Active;
        Assert.AreEqual(0, test.SampleGroups.Count);
    }

    [UnityTest]
    public IEnumerator Open_Close_Menu()
    {
        var obj = new GameObject("MeasureFrames_WithRecordingDisabled_RecordsNoSampleGroups");
        obj.AddComponent<CreateMarkerOnUpdate>();

        yield return Measure.Frames()
            .ProfilerMarkers("TEST_MARKER")
            .DontRecordFrametime()
            .Run();

        var test = PerformanceTest.Active;
        Assert.AreEqual(1, test.SampleGroups.Count);
        Assert.AreEqual("TEST_MARKER", test.SampleGroups[0].Name);
        Assert.AreEqual(SampleUnit.Nanosecond, test.SampleGroups[0].Unit);
        Assert.IsTrue(AllSamplesHigherThan0(test));
    }

    [UnityTest]
    public IEnumerator Drop_Player_From_Multiplayer()
    {
        var obj = new GameObject("MeasureFrames_WithRecordingDisabled_RecordsNoSampleGroups");
        obj.AddComponent<CreateMarkerOnUpdate>();

        yield return Measure.Frames()
            .ProfilerMarkers("TEST_MARKER")
            .DontRecordFrametime()
            .Run();

        var test = PerformanceTest.Active;
        Assert.AreEqual(1, test.SampleGroups.Count);
        Assert.AreEqual("TEST_MARKER", test.SampleGroups[0].Name);
        Assert.AreEqual(SampleUnit.Nanosecond, test.SampleGroups[0].Unit);
        Assert.IsTrue(AllSamplesHigherThan0(test));
    }

    [UnityTest]
    public IEnumerator Multiplay_Quiz()
    {
        yield return Measure.Frames()
            .WarmupCount(10)
            .MeasurementCount(10)
            .Run();

        var test = PerformanceTest.Active;
        Assert.AreEqual(1, test.SampleGroups.Count);
        Assert.AreEqual(10, test.SampleGroups[0].Samples.Count);
    }

    [UnityTest]
    public IEnumerator Pull_Questions_From_Database()
    {
        LogAssert.Expect(LogType.Error, new Regex(".+frames measurement"));
        yield return Measure.Frames()
            .WarmupCount(10)
            .Run();

        var test = PerformanceTest.Active;
        Assert.AreEqual(0, test.SampleGroups.Count);
    }

    [UnityTest]
    public IEnumerator Leaderboard_Updates_Results()
    {
        var sg = new SampleGroup("TEST", SampleUnit.Second);
        var sgMarker = new SampleGroup("TEST_MARKER", SampleUnit.Nanosecond);

        yield return Measure.Frames().SampleGroup(sg).ProfilerMarkers(sgMarker).Run();

        var test = PerformanceTest.Active;
        Assert.AreEqual(2, test.SampleGroups.Count);
        Assert.AreEqual(sg.Unit, test.SampleGroups[0].Unit);
        Assert.AreEqual(sg.Name, test.SampleGroups[0].Name);
        Assert.AreEqual(sgMarker.Unit, test.SampleGroups[1].Unit);
        Assert.AreEqual(sgMarker.Name, test.SampleGroups[1].Name);
        Assert.Greater(test.SampleGroups[0].Samples.Count, 0);
        Assert.Greater(test.SampleGroups[1].Samples.Count, 0);
    }

    private static bool AllSamplesHigherThan0(PerformanceTest test)
    {
        foreach (var sampleGroup in test.SampleGroups)
        {
            foreach (var sample in sampleGroup.Samples)
            {
                if (sample <= 0) return false;
            }
        }

        return true;
    }

    public class CreateMarkerOnUpdate : MonoBehaviour
    {
        private CustomSampler m_CustomSampler;

        private void OnEnable()
        {
            m_CustomSampler = CustomSampler.Create("TEST_MARKER");
        }

        private void Update()
        {
            m_CustomSampler.Begin();
            Thread.Sleep(1);
            m_CustomSampler.End();
        }
    }
}
