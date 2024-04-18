//Style
var style = document.getElementById("Style");

//Logos
var LogoDefault = "mainRes/LogoDefault.png";
var LogoDefaultBlur = "mainRes/LogoDefault.png";
var LogoFoods = "mainRes/LogoFoods.png";
var LogoPolitics = "mainRes/LogoPolitics.png";
var LogoSports = "mainRes/LogoSports.png";

//Account Details
var Acc_Username = "Guest";
var Acc_Email = "";
var LoggedOn = false;

//#region Account Management
var Accounts = []

class Account {
    constructor(name, pass, email){
        this.username = name;
        this.password = pass;
        this.email = email;
    }
}

class SetAccounts {
    constructor() {
        this.accounts = []
    }
    newAccount(account) {
        let a = account;
        this.accounts.push(account);
    }
    isExists(name, pass) {
        let exists = false;
        this.accounts.forEach(thisAccount)

        function thisAccount(account){
            if (exists == false) {
                if (name == account.username) {console.log("username yes")} else {console.log("username no")}
                if (pass == account.password) {console.log("password yes")} else {console.log("password no")}

                if ((name == account.username) && (pass == account.password)) {
                    exists = true;
                }
            }
        }
        return exists;
    }
}
Accounts = new SetAccounts();
Accounts.newAccount(new Account("root", "admin", "root@example.com"))
Accounts.newAccount(new Account("acc1", "pass1", "root@example.com"))
Accounts.newAccount(new Account("acc2", "pass2", "root@example.com"))

//#region Login

function Authenticate(username, password){
    if (Accounts.isExists(username, password))
    {
        console.log("Account Successfuly logged in");
        return true;
    }
    else
    {
        console.log("Account Does not Exist");
        return false;
    } 
}

function Login(name, pass) {
    if (Authenticate(name, pass)) {
        Acc_Username = name;
        document.getElementById('Main_LogButton').innerHTML = "Log out";
        LoggedOn = true;

        var hgreet = document.getElementById("Main_HGreetings");
        hgreet.innerHTML = "Greetings, <br>";
        hgreet.innerHTML += Acc_Username;

        LoadPage("Home");
    }
    else {
        document.getElementById('login_error').innerHTML = "Login Error.";
        document.getElementById('login_password').value = "";
    }
}

function Logout() {
    var hgreet = document.getElementById("Main_HGreetings");
    Acc_Username = "Guest";
    document.getElementById('Main_LogButton').innerHTML = "Login";
    LoggedOn = false;
    hgreet.innerHTML = "Greetings, <br>";
    hgreet.innerHTML += Acc_Username;
}

//#endregion

//#endregion

//#region Navigational
function LoadPage(page) {

    if (page == "Register") {
        SetCategoryTheme("Default");
        style.innerHTML += `
        #Global_Background {
            filter: blur(8px);
        }
        #Form_Register {
            display: grid;
        }
        `;
    }
    if (page == "Login") {
        SetCategoryTheme("Default");
        style.innerHTML += `
        #Global_Background {
            filter: blur(8px);
        }
        #Form_Login {
            display: grid;
        }
        `;
    }
    if (page == "Home") {
        SetCategoryTheme("Default");
    }
}
//#endregion

//#region Layout Functions
function ToggleCategory() {
    var content = document.getElementById("Main_AsideCategory");
    //this.classList.toggle("active");
    if (content.style.display === "block") {
    content.style.display = "none";
    } else {
    content.style.display = "block";
    }
}

function LogButton() {
    if (LoggedOn) {
        Logout();
    }
    else
    {
        LoadPage("Login");
    }
}
//#endregion

function SetCategoryTheme(type) {
    //Default
    //Sports
    //Politics
    //Foods
    let logo = document.getElementById("Main_Logo")
    
    if (type=="Default") {
        style.innerHTML = `
        #Global_Background {
            background-image: url('mainRes/DefaultBG.png');
            background-size:100%;
            background-attachment: fixed;
        }
        #Main_Header {
            background-color:rgb(0, 0, 100);
        }
        #Main_AsideCategory {
            background-color:blue;
        }
        .Main_CategoryListButton {
            background-color:blue;
        }
        #Main_Footer {
            background-color:rgb(128, 128, 255);
            color:white;
        }
        #Content_Layout_Border {
            background-color:white;
            border-color:blue;
        }
        #Content_Article_Content {
            border-color:blue;
            border-style:dashed;
        }
        #Content_Suggestions {
            border-color:blue;
            border-style:dashed;
        }
        `;
        logo.src = LogoDefault;
    }
    if (type=="Sports") {
        style.innerHTML = `
        #Global_Background {
            background-image: url('mainRes/SportsBG.jpg');
            background-size:100%;
            background-attachment: fixed;
        }
        #Main_Header {
            background-color:#792845;
        }
        #Main_AsideCategory {
            background-color:#d883a1;
        }
        .Main_CategoryListButton {
            background-color:#c34773;
        }
        #Content_Layout_Border {
            background-color:white;
            border-color:#792845;
        }
        #Content_Article_Content {
            border-color:#792845;
            border-style:dashed;
        }
        #Content_Suggestions {
            border-color:#792845;
            border-style:dashed;
        }
        `;
        logo.src = LogoSports;
    }
    if (type=="Politics") {
        style.innerHTML = `
        #Global_Background {
            background-image: url('mainRes/PoliticsBG.jpg');
            background-size:100%;
            background-attachment: fixed;
        }
        #Main_Header {
            background-color:rgb(100, 0, 0);
        }
        #Main_AsideCategory {
            background-color:red;
        }
        .Main_CategoryListButton {
            background-color:red;
        }
        #Main_Footer {
            background-color:rgb(255, 125, 125);
            color:white;
        }
        #Content_Layout_Border {
            background-color:white;
            border-color:red;
        }
        #Content_Article_Content {
            border-color:red;
            border-style:dashed;
        }
        #Content_Suggestions {
            border-color:red;
            border-style:dashed;
        }
        `;
        logo.src = LogoPolitics;
    }
    if (type=="Foods") {
        style.innerHTML = `
        #Global_Background {
            background-image: url('mainRes/FoodsBG.jpg');
            background-size:100%;
            background-attachment: fixed;
        }
        #Main_Header {
            background-color:rgb(0, 66, 0);
        }
        #Main_AsideCategory {
            background-color:green;
        }
        .Main_CategoryListButton {
            background-color:green;
        }
        #Main_Footer {
            background-color:greenyellow;
            color:white;
        }
        #Content_Layout_Border {
            background-color:white;
            border-color:green;
        }
        #Content_Article_Content {
            border-color:green;
            border-style:dashed;
        }
        #Content_Suggestions {
            border-color:green;
            border-style:dashed;
        }
        `;
        logo.src = LogoFoods;
    }
}