//Style
var style = document.getElementById("Style");

//Logos
var LogoDefault = "mainRes/Website/LogoDefault.png";
var LogoDefaultBlur = "mainRes/Website/LogoDefault.png";
var LogoFoods = "mainRes/Website/LogoFoods.png";
var LogoPolitics = "mainRes/Website/LogoPolitics.png";
var LogoSports = "mainRes/Website/LogoSports.png";

//Account Details
var Acc_Username = "Guest";
var Acc_Email = "";
var LoggedOn = false;

//Account Rules
var minimumPassLength = 8;

//#region Account Management
var Accounts = [];

//For Layout Refresh
var curtype = "Default";

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
        this.accounts.push(account);
    }
    isExists(name, pass) {
        let exists = false;
        this.accounts.forEach(thisAccount)

        function thisAccount(account){
            if (exists == false) {
                /*
                if (name == account.username) {console.log("username yes")} else {console.log("username no")}
                if (pass == account.password) {console.log("password yes")} else {console.log("password no")}
                */
                if ((name == account.username) && (pass == account.password)) {
                    exists = true;
                }
            }
        }
        return exists;
    }
    isExistsExtra(name, email) {
        let status = 0;
        this.accounts.forEach(thisAccount)

        function thisAccount(account){
            if (status == 0) {

                if (name == account.username) {console.log("username already exists")}
                if (email == account.email) {console.log("email already exists")
                    console.log("Email Used:" + email);
                    console.log("Email Exists:" + account.email);
                }

                if ((name == account.username)) {
                    status = 1;
                }
                if ((email == account.email)) {
                    status = 2;
                }
            }
        }
        return status;
    }
    getEmail(name) {
        let email = "";
        this.accounts.forEach(thisAccount)

        function thisAccount(account){
            if (email == "") {
                if (name == account.username) {
                    email = account.email;
                }
            }
        }
        return email;
    }
}
Accounts = new SetAccounts();

class NewsContent {
    constructor(id, type, title, desc, date, source, author){
        this.id = id; // This will be used to identify news content
        this.type = type; // Types are (sports, foods, politics)
        this.title = title;
        this.description = desc;
        this.date = date; // new Date(year,month,day)
        this.source = source; // Link to the website
        this.author = author; // name (Can be empty)
    }
}

class SetNewsContents {
    constructor() {
        this.contents = []
    }
    newAccount(content) {
        this.contents.push(content);
    }
}
NewsContents = new SetNewsContents();

//#region Preset Accounts
Accounts.newAccount(new Account("Randell", "adminroot123", "ragerock90@gmail.com"))
Accounts.newAccount(new Account("Arjay", "cuterj10", "root@example.com"))
Accounts.newAccount(new Account("Jasper", "pass2", "root@example.com"))
Accounts.newAccount(new Account("Hannah", "pass3", "root@example.com"))
Accounts.newAccount(new Account("Ramil", "pass4", "root@example.com"))
//#endregion

//#region Login

function Authenticate(username, password){
    if (Accounts.isExists(username, password))
    {
        console.log("Account " + Accounts.getEmail(username) + " Successfuly logged in");
        return true;
    }
    else
    {
        console.log("Wrong Password or Account Does not Exist");
        return false;
    } 
}

function Login(name, pass) {
    if (Authenticate(name, pass, "")) {
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

//#endregion

//#region Register

function Register(name, pass, cpass, email) {
    let register_error = document.getElementById('register_error');
    let register_password = document.getElementById('register_password');
    let register_cpassword = document.getElementById('register_cpassword');

    if (name == "" || pass == "" || cpass == "" || email== ""){
        //Form must be filled
        register_error.innerHTML = "The form must be filled."
        register_password.value = "";
        register_cpassword.value = "";
    }
    else if (cpass != pass) {
        //Password not same as confirmed password expression
        register_error.innerHTML = "Incorrect confirm password."
        register_password.value = "";
        register_cpassword.value = "";
    }
    else if (pass.length < minimumPassLength){
        //Password is too short
        register_error.innerHTML = "Password must have <br>atleast 8 characters."
        register_password.value = "";
        register_cpassword.value = "";
    }
    else if (!email.endsWith(".com") || (email.indexOf("@") == -1)) {
        //It is not a valid email
        register_error.innerHTML = "Email is invaild."
        console.log(email.endsWith(".com"));
        console.log((email.indexOf("@") != -1));
    }
    else {
        if (Accounts.isExistsExtra(name, email) == 0) {
            Accounts.newAccount(new Account(name, pass, email));
            Login(name, pass);
            LoadPage("Home");
        }
        else if (Accounts.isExistsExtra(name, email) == 1) {
            //username error
            register_error.innerHTML = "Username is already used."
        }
        else if (Accounts.isExistsExtra(name, email) == 2) {
            //email error
            register_error.innerHTML = "Email is already used."
        }
    }
}

//#endregion

//#region Forgot password

function CheckEmail(email) {
    if (!email.endsWith(".com") || (email.indexOf("@") == -1)) {
        //It is not a valid email
        document.getElementById('forgot_error').innerHTML = "Email is invaild."
        document.getElementById('forgot_error').style = "color: red";
    }
    else {
        document.getElementById('forgot_error').innerHTML = "Email sent.";
        document.getElementById('forgot_error').style = "color: black";
    }
}

//#endregion

//#region Logout

function Logout() {
    var hgreet = document.getElementById("Main_HGreetings");
    Acc_Username = "Guest";
    document.getElementById('Main_LogButton').innerHTML = "Login";
    LoggedOn = false;
    hgreet.innerHTML = "Greetings, <br>";
    hgreet.innerHTML += Acc_Username;
}

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
        document.getElementById('register_username').value = "";
        register_password.value = "";
        register_cpassword.value = "";
        document.getElementById('register_email').value = "";
        register_error.innerHTML = "";
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
        document.getElementById('login_username').value = "";
        document.getElementById('login_password').value = "";
        document.getElementById('login_error').innerHTML = "";
    }
    if (page == "Forgot") {
        SetCategoryTheme("Default");
        style.innerHTML += `
        #Global_Background {
            filter: blur(8px);
        }
        #Form_Forgot {
            display: grid;
        }
        `;
        document.getElementById('forgot_email').value = "";
        document.getElementById('forgot_error').innerHTML = "";
    }
    if (page == "Home") {
        SetCategoryTheme("Default");
        style.innerHTML += `
        #Form_Home {
            display: inline;
        }
        `;
    }
    if (page == "Privacy") {
        SetCategoryTheme("Default");
        style.innerHTML += `
        #Form_Privacy {
            display: inline;
        }
        `;
    }
    if (page == "Terms") {
        SetCategoryTheme("Default");
        style.innerHTML += `
        #Form_Terms {
            display: inline;
        }
        `;
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

function RegButton() {
    LoadPage("Register");
}

//#endregion

function SetCategoryTheme(type) {
    //Default
    //Sports
    //Politics
    //Foods
    let logo = document.getElementById("Main_Logo")
    
    if (type!="Refresh") {
        curtype = type;
    }
    if (curtype=="Default") {
        style.innerHTML = `
        #Global_Background {
            background-image: url('mainRes/Website/DefaultBG.png');
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
    if (curtype=="Sports") {
        style.innerHTML = `
        #Global_Background {
            background-image: url('mainRes/Website/SportsBG.jpg');
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
    if (curtype=="Politics") {
        style.innerHTML = `
        #Global_Background {
            background-image: url('mainRes/Website/PoliticsBG.jpg');
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
    if (curtype=="Foods") {
        style.innerHTML = `
        #Global_Background {
            background-image: url('mainRes/Website/FoodsBG.jpg');
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
    if (LoggedOn) {
        style.innerHTML += `
        #Main_RegButton { display: none; }
        `;
    }
}