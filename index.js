const inquirer = require("inquirer");
const axios = require("axios");
const generateHtml = require("./generateHtml");
const fs = require('fs');


//This is where we will obtain the info from the github call
const objInfo = {
    color: "",
    username: "",
    blog: "https://www.linkedin.com/in/clarisse-moraes-9b0054150/",
    stars: 0,
    info: "",
}

//This is where we will ask the user for their information for their profile
inquirer
    .prompt([
{
    type: "input",
    message: "What is your Github username?",
    name: "username"
},
{
    type:"list",
    message: "Select the best color:",
    choices: ["pink", "blue", "green", "red"],
    name: "color"


}

//This is where we will call for the information from github for the profile
]).then(function (answers) {
    objInfo.username = answers.username;
    objInfo.color = answers.color;

    getDeveloperProfile();
});


function getDeveloperProfile(){
    const queryUrl = `https://api.github.com/users/${objInfo.username}`;
    const starsURL = `https://api.github.com/users/${objInfo.username}/repos`;

    axios.get(queryUrl)
    .then(function (response){
        objInfo.info= response.data;
    
    //This is where we will get the Github Stars//
        axios.get(starsURL)
        .then(function(response){
        
            // Loop through response.data (array of repos)
            // Count stargazers_count for each repo
            // saved to objInfo.stars

        // for (let index = 0; index < array.length; index++) {
        //     const element = array[index];
            
        // }

        const html = generateHtml(objInfo);

        fs.writeFile(`${objInfo.username}.html`, html, function (err) {

            if (err) {
                return console.log(err);
            }
        
            console.log("Success!");
        
        });
        
        });


  



    })

    .catch(function (error) {
        console.log(error);
    })
    .finally(function () {

    });
}










// function makePDFFile() {
// const html = fs.readFileSync(`./html/${username}.html`, 'utf8');
// const options = {
//     "height": "14in",
//     "width": "12in",
// };

// pdf.create(html, options).toFile(`./pdf/${username}.pdf`, function (err, res) {
//     if (err) return console.log(err);
//     console.log(res);
// });
// }