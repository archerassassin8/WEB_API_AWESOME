using System.Collections;
using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Networking;
using System.Text;
using TMPro;
using UnityEngine.UI;

//using UnityEngine.UIElements;

public class UnityHTTPRequest : MonoBehaviour
{
    //public string nameData;
    public TMP_InputField nameInput;
    public TMP_InputField scoreInput;
    public TMP_InputField healthInput;

    public TMP_InputField editInput;
    public TMP_InputField nameEdit;
    public TMP_InputField scoreEdit;
    public TMP_InputField healthEdit;

    public TMP_Text log;

    [SerializeField]
    public Toggle deadInput;
    public Toggle deadEdit;


    string postData;

    [Serializable]
    public class MyData { 
        //Change Data for whatever you need
        public string myName;
        public int myScore;
        public float myHealth;
        public bool isDead;

    } 

    // Start is called before the first frame update
    void Start()
    {
        //StartCoroutine(MakeWebRequest());
    }

    IEnumerator MakeWebRequest()
    {
        //GET Request Example
        var getRequest = new UnityWebRequest($"http://localhost:3000/unity");
        getRequest.downloadHandler = new DownloadHandlerBuffer();
        yield return getRequest.SendWebRequest();
        //Debug.Log(getRequest.downloadHandler.text);
        log.text = getRequest.downloadHandler.text;


        //CreateSingleObjectFromData(getRequest);
        //CreateObjectsFromArray(jsonData);
    }
    IEnumerator PostRequest(string sendData)
    {
        var request = new UnityWebRequest("http://localhost:3000/unityPost", "POST");
        byte[] bodyData = Encoding.UTF8.GetBytes(sendData);
        request.uploadHandler = new UploadHandlerRaw(bodyData);
        request.downloadHandler = new DownloadHandlerBuffer();
        request.SetRequestHeader("Content-Type", "application/json");
        yield return request.SendWebRequest();

    }

    IEnumerator MakeWebRequestSingle()
    {
        string nameData = editInput.text;

        //GET Request Example with Query
        var getRequest = new UnityWebRequest($"http://localhost:3000/unityGetOne?name={nameData}");
        getRequest.downloadHandler = new DownloadHandlerBuffer();
        yield return getRequest.SendWebRequest();
        //Debug.Log(getRequest.downloadHandler.text);

        log.text = getRequest.downloadHandler.text;


        //CreateSingleObjectFromData(getRequest);
        //CreateObjectsFromArray(jsonData);
    }

    IEnumerator MakeWebRequestSingleEdit(string sendData)
    {
        var request = new UnityWebRequest("http://localhost:3000/unityPut", "PUT");
        byte[] bodyData = Encoding.UTF8.GetBytes(sendData);
        request.uploadHandler = new UploadHandlerRaw(bodyData);
        request.downloadHandler = new DownloadHandlerBuffer();
        request.SetRequestHeader("Content-Type", "application/json");
        yield return request.SendWebRequest();

    }

    IEnumerator MakeWebRequestDelete()
    {
        string nameData = editInput.text;

        Debug.Log(nameData);
        //GET Request Example with Query
        var getRequest = new UnityWebRequest($"http://localhost:3000/unityDelete?myName={nameData}", "POST");
        getRequest.downloadHandler = new DownloadHandlerBuffer();
        yield return getRequest.SendWebRequest();
        //Debug.Log(getRequest.downloadHandler.text);


    }

    private static void CreateSingleObjectFromData(UnityWebRequest getRequest)
    {
        var deserializedJson = JsonUtility.FromJson<MyData>(getRequest.downloadHandler.text);
        Debug.Log(deserializedJson.myName);
    }

    private void CreateObjectsFromArray(string jsonData)
    {
        string jsonString = fixJson(jsonData);
        MyData[] objData = JsonHelper.FromJson<MyData>(jsonString);  
        //create data object array here
    }

    

    public void SendData() {
        MyData sendData = new MyData();
        sendData.myName = nameInput.text;
        sendData.myScore = int.Parse(scoreInput.text);
        sendData.myHealth = float.Parse(healthInput.text);
        sendData.isDead = deadInput.isOn;
        var postData = JsonUtility.ToJson(sendData);
        Debug.Log(postData);
        StartCoroutine(PostRequest(postData)); 
    
    }

    public void GetAll()
    {
        StartCoroutine(MakeWebRequest());
    }

    public void GetOne()
    {
        StartCoroutine(MakeWebRequestSingle());
    }

    public void Edit()
    {
        Debug.Log("Pressed");
        MyData sendData = new MyData();
        sendData.myName = nameEdit.text;
        sendData.myHealth = float.Parse(healthEdit.text);
        sendData.myScore = int.Parse(scoreEdit.text);
        sendData.isDead = deadEdit.isOn;
        var postData = JsonUtility.ToJson(sendData);
        Debug.Log(postData);
        StartCoroutine(MakeWebRequestSingleEdit(postData));
    }

    public void Delete()
    {
        StartCoroutine(MakeWebRequestDelete());
    }

    string fixJson(string value)
    {
        value = "{\"Items\":" + value + "}";
        return value;
    }

    public static class JsonHelper
    {
        public static T[] FromJson<T>(string json)
        {
            Wrapper<T> wrapper = JsonUtility.FromJson<Wrapper<T>>(json);
            Debug.Log(wrapper.Items);
            return wrapper.Items;
        }

        public static string ToJson<T>(T[] array)
        {
            Wrapper<T> wrapper = new Wrapper<T>();
            wrapper.Items = array;
            return JsonUtility.ToJson(wrapper);
        }

        public static string ToJson<T>(T[] array, bool prettyPrint)
        {
            Wrapper<T> wrapper = new Wrapper<T>();
            wrapper.Items = array;
            return JsonUtility.ToJson(wrapper, prettyPrint);
        }

        [Serializable]
        private class Wrapper<T>
        {
            public T[] Items;
        }
    }
}
