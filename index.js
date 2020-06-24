const inquirer = require("inquirer");
const fs = require("fs");
const generateMarkdown = require("./utils/generateMarkdown");
const axios = require ('axios');

const questions = [
        {
        type: 'input',
        name: 'username',
        message: 'What is your GitHub username?'        
        },

        {
        type: 'input',
        name: 'title',
        message: 'What is your project title?'
        },

        {
        type: 'input',
        name: 'description',
        message: 'Please decribe your project'
        },

        {
        type:'input',
        name: 'contents' ,
        message: 'Please present a table of contents',
        },

        {
        type:'input',
        name: 'installation' ,
        message:  'What method do you use to install your app?',
        },

        {
        type:'input',
        name: 'usage' ,
        message:  'What is your appication used for?',
        },

        {
        type:'input',
        name: 'license' ,
        message:  'What licenses are does the project include',
        },

        {
        type:'input',
        name: 'contributors' ,
        message:  'Who are the other contributors to the project',
        },

        {
        type:'input',
        name: 'tests' ,
        message:  'What tests have you run to make sure the app is working?',
        },

]

function init() {
    inquirer
        .prompt(questions)
        .then(answers => {
            console.log(answers)
            axios.get("https://api.github.com/users/" + answers.username)
                .then(response => {
                    console.log(response)
                    var imageURL = response.data.avatar_url
                    answers.image = imageURL;
                    console.log(imageURL);
                    fs.writeFile("README.md", generateMarkdown(answers), function (err) {
                        if (err) {
                            throw err;
                        }})
                })
            })

        }
    

init();
