const inquirer = require("inquirer");
const axios = require("axios");
const electron = require("electron");
const generateHtml = require("./generateHtml");

inquirer.prompt([

{
    type: "input",
    message: "what is your github usernmae?",
    name: "username"
},
{
    type:"list",
    message: "whats your fave color?",
    choices: ["red", "blue", "pink"],
    name: "colors"
}

]).then(function(answers){
    console.log(answers);

    //this is where we will access the API and and do the axios call// 


    axios(`https://api.github.com/users/${answers.username}`)
    .then(function(data){


        console.log(data)

    })

    const objInfo = {
        color: answers.color,
        stars: fromStarts,
        user: data.user
    }
    const htmlDone = generateHtml(objInfo)




    



})