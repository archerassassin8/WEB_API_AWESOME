using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MenuScript : MonoBehaviour
{
    public GameObject characterScreen;
    public GameObject findOne;
    public GameObject menu;
    public GameObject signIn;
    public GameObject gameStuff;

    // Start is called before the first frame update
    void Start()
    {

    }

    // Update is called once per frame
    void Update()
    {

    }

    public void Menu()
    {
        findOne.SetActive(false);
        characterScreen.SetActive(false);
        menu.SetActive(true);
    }

    public void createNew()
    {
        characterScreen.SetActive(true);
        menu.SetActive(false);
    }

    public void signIns()
    {
        findOne.SetActive(true);
        menu.SetActive(false);
    }

    public void signInd()
    {
        signIn.SetActive(false);
        gameStuff.SetActive(true);
    }

}
