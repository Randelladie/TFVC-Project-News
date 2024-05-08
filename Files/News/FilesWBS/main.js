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

//Account Management
var Accounts = [];

//For Miscellanous
var curtype = "Default"; //Layout Refresh, Current type Sports, Foods, Politics, General
var rdir = "mainRes/Reports/"; // Reports Directory

//for NewsList
var curpage = 0;
var highestpage = 0;
var curnewstype = "";
var curcontent;

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
        hgreet.innerHTML = "Greetings, ";
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
    hgreet.innerHTML = "Greetings, ";
    hgreet.innerHTML += Acc_Username;

    style.innerHTML += `
    #Main_RegButton { display: inline; }
    `;
}

//#endregion

//#region Navigational
function LoadPage(page) {

    //Account
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

    // News pages
    if (page == "Home") {
        SetCategoryTheme("Default");
        style.innerHTML += `
        #Form_Home {
            display: grid;
        }
        `;
    }

    if (page == "NewsList") {
        style.innerHTML += `
        #NewsList_Border {
            display: grid;
        }
        `;
    }

    if (page == "NewsContent") {
        style.innerHTML += `
        #Content_Layout_Border {
            display: grid;
        }
        `;
    }

    // Information pages
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
    if (page == "Support") {
        SetCategoryTheme("Default");
        style.innerHTML += `
        #Form_Support {
            display: inline;
        }
        `;
    }
    if (page == "About") {
        SetCategoryTheme("Default");
        style.innerHTML += `
        #Form_About {
            display: inline;
        }
        `;
    }
    var content = document.getElementById("Main_AsideCategory");
    content.style.display = "none";
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
            background-color:rgb(109 150 237);
        }
        .Main_CategoryListButton {
            background-color:#4a8ff1;
        }
        #Main_Footer {
            background-color:rgb(178, 178, 255);
            color:white;
        }

        #Content_Layout_Border {
            background-color:white;
            border-color:blue;
        }
        #Content_Article_Content {
            border-color:blue;
            border-style:solid;
        }
        #Content_Suggestions {
            border-color:blue;
            border-style:solid;
        }
        #Content_Categories {
            background-color:white;
            border-color:blue;
        }

        #NewsList_Border {
            background-color:white;
            border-color:blue;
        }
        #NewsList_Main_Content {
            border-color:blue;
            border-style:solid;
        }
        #NewsList_Categories {
            background-color:white;
            border-color:blue;
        }

        #Main_TopRight {
            background-color:rgb(40, 40, 140);
        }
        #Main_CategoryButtonBackground {
            background-color:rgb(69, 111, 188);
        }
        #Main_LogButton {
            background-color:rgb(69, 111, 188);
        }
        #Main_RegButton {
            background-color:rgb(69, 111, 188);
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
            border-style:solid;
        }
        #Content_Suggestions {
            border-color:#792845;
            border-style:solid;
        }
        #Content_Categories {
            background-color:white;
            border-color:#792845;
        }

        #NewsList_Border {
            background-color:white;
            border-color:#792845;
        }
        #NewsList_Main_Content {
            border-color:#792845;
            border-style:solid;
        }
        #NewsList_Categories {
            background-color:white;
            border-color:#792845;
        }

        #Main_TopRight {
            background-color:rgb(145 20 79);
        }
        #Main_CategoryButtonBackground {
            background-color:rgb(191 0 152);
        }
        #Main_LogButton {
            background-color:rgb(191 0 152);
        }
        #Main_RegButton {
            background-color:rgb(191 0 152);
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
            border-style:solid;
        }
        #Content_Suggestions {
            border-color:red;
            border-style:solid;
        }
        #Content_Categories {
            border-color:red;
            border-style:solid;
        }

        #NewsList_Border {
            background-color:white;
            border-color:red;
        }
        #NewsList_Main_Content {
            border-color:red;
            border-style:solid;
        }
        #NewsList_Categories {
            border-color:red;
            border-style:solid;
        }

        #Main_TopRight {
            background-color:rgb(129 10 10);
        }
        #Main_CategoryButtonBackground {
            background-color:rgb(255 0 0);
        }
        #Main_LogButton {
            background-color:rgb(255 0 0);
        }
        #Main_RegButton {
            background-color:rgb(255 0 0);
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
            border-style:solid;
        }
        #Content_Suggestions {
            border-color:green;
            border-style:solid;
        }
        #Content_Categories {
            border-color:green;
            border-style:solid;
        }

        #NewsList_Border {
            background-color:white;
            border-color:green;
        }
        #NewsList_Main_Content {
            border-color:green;
            border-style:solid;
        }
        #NewsList_Categories {
            border-color:green;
            border-style:solid;
        }

        #Main_TopRight {
            background-color:rgb(7 91 1);
        }
        #Main_CategoryButtonBackground {
            background-color:rgb(43 159 12);
        }
        #Main_LogButton {
            background-color:rgb(43 159 12);
        }
        #Main_RegButton {
            background-color:rgb(43 159 12);
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

//#region News Content

class NewsContent {
    constructor(id, type, title, desc, date, source, author, html){
        this.id = id; // This will be used to identify news content
        this.type = type; // Types are (sports, foods, politics)
        this.title = title;
        this.description = desc;
        this.date = date; // new Date(year,month,day)
        this.source = source; // Link to the website
        this.author = author; // name (Can be empty)
        this.html = html; // The html content
    }
}

function Search(contents, index) {
    let rcontents = [];
    filter = index.toUpperCase();
    for (i = 0; i < contents.length; i++) {
        content = contents[i].title;
        if (content.toUpperCase().indexOf(filter) > -1) {
            rcontents.push(contents[i]);
        }
    }
    return rcontents;
}

function Shuffle(array) {
    let currentIndex = array.length;
    let sarray = array;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [sarray[currentIndex], sarray[randomIndex]] = [
        sarray[randomIndex], sarray[currentIndex]];
    }
    console.log(sarray);
    return sarray;
}
  

class SetNewsContents {
    constructor() {
        this.contents = []
    }
    newContent(content) {
        this.contents.push(content);
    }
    getContent(id) {
        let getcontent;
        this.contents.forEach(thisContent)

        function thisContent(content){
            if (content.id == id) {
                getcontent = content;
            }
        }
        return getcontent;
    }
    loadContent(content) {
        curcontent = content;
        switch(content.type) {
            case 0:
                SetCategoryTheme("Default");
                LoadNews("ContentAside", "RandomGeneral", 3)
                break;
            case 1:
                SetCategoryTheme("Sports");
                LoadNews("ContentAside", "RandomSports", 3)
                break;
            case 2:
                SetCategoryTheme("Foods");
                LoadNews("ContentAside", "RandomFoods", 3)
                break;
            case 3:
                SetCategoryTheme("Politics");
                LoadNews("ContentAside", "RandomPolitics", 3)
                break;
        }
        LoadPage("NewsContent");

        let cac = document.getElementById("Content_Article_Content");
        let cdir = rdir + content.id + "/";
        cac.innerHTML = content.html;

        let etitle = document.getElementById("InContent_Title");
        let edate = document.getElementById("InContent_Date");
        let formattedDate = content.date.toLocaleString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
            timeZone: "Asia/Hong_Kong"
          });
        let eauthor = document.getElementById("InContent_Author");
        let esource = document.getElementById("InContent_Source");

        etitle.innerHTML = content.title;
        edate.innerHTML = formattedDate;
        if (content.author != "") { eauthor.innerHTML = content.author; }
        esource.innerHTML = content.source; 
        esource.href = content.source;

        let eimgs = document.getElementsByClassName("InContent_Imgs");

        for (let eimg of eimgs){
            let src = eimg.src.split('/').pop();
            eimg.src = cdir + src;
            console.log("loading image file: "+ cdir + src);
        }

        eimgs = document.getElementsByClassName("InContent_Imgs_port");

        for (let eimg of eimgs){
            let src = eimg.src.split('/').pop();
            eimg.src = cdir + src;
            console.log("loading image file: "+ cdir + src);
        }
    }
    getContents(type) {
        //Type
        //0 = all
        //1 = Sports
        //2 = Foods
        //3 = Politics
        let scontents = [];

        if (type==0) {
            scontents = this.contents;
            let scontents_sortdate = scontents.sort((a, b) => Date.parse(b.date)/1000 - Date.parse(a.date)/1000);
            return scontents_sortdate;
        }
        if (type==1) {
            for (let i = 0; i < this.contents.length; i++){
                let icontent = this.contents[i];
                if (icontent.type == 1) { scontents.push(icontent); }
            }
            let scontents_sortdate = scontents.sort((a, b) => Date.parse(b.date)/1000 - Date.parse(a.date)/1000);
            return scontents_sortdate;
        }
        if (type==2) {
            for (let i = 0; i < this.contents.length; i++){
                let icontent = this.contents[i];
                if (icontent.type == 2) { scontents.push(icontent); }
            }
            let scontents_sortdate = scontents.sort((a, b) => Date.parse(b.date)/1000 - Date.parse(a.date)/1000);
            return scontents_sortdate;
        }
        if (type==3) {
            for (let i = 0; i < this.contents.length; i++){
                let icontent = this.contents[i];
                if (icontent.type == 3) { scontents.push(icontent); }
            }
            let scontents_sortdate = scontents.sort((a, b) => Date.parse(b.date)/1000 - Date.parse(a.date)/1000);
            return scontents_sortdate;
        }
        return [];
    }

    getSearchContents(type, index) {
        //Type
        //0 = all
        //1 = Sports
        //2 = Foods
        //3 = Politics
        let scontents = [];

        if (type==0) {
            
            scontents = this.contents;
            let scontents_searched = Search(scontents, index);
            let scontents_sortdate = scontents_searched.sort((a, b) => Date.parse(b.date)/1000 - Date.parse(a.date)/1000);
            return scontents_sortdate;
        }
        if (type==1) {
            for (let i = 0; i < this.contents.length; i++){
                let icontent = this.contents[i];
                if (icontent.type == 1) { scontents.push(icontent); }
            }
            let scontents_searched = Search(scontents, index);
            let scontents_sortdate = scontents_searched.sort((a, b) => Date.parse(b.date)/1000 - Date.parse(a.date)/1000);
            return scontents_sortdate;
        }
        if (type==2) {
            for (let i = 0; i < this.contents.length; i++){
                let icontent = this.contents[i];
                if (icontent.type == 2) { scontents.push(icontent); }
            }
            let scontents_searched = Search(scontents, index);
            let scontents_sortdate = scontents_searched.sort((a, b) => Date.parse(b.date)/1000 - Date.parse(a.date)/1000);
            return scontents_sortdate;
        }
        if (type==3) {
            for (let i = 0; i < this.contents.length; i++){
                let icontent = this.contents[i];
                if (icontent.type == 3) { scontents.push(icontent); }
            }
            let scontents_searched = Search(scontents, index);
            let scontents_sortdate = scontents_searched.sort((a, b) => Date.parse(b.date)/1000 - Date.parse(a.date)/1000);
            return scontents_sortdate;
        }
        return [];
    }
    getRandomContents(type, currentcontent) {
        //Type
        //0 = all
        //1 = Sports
        //2 = Foods
        //3 = Politics
        let scontents = [];
        let lcontents = [];

        if (type==0) {
            for (let i = 0; i < this.contents.length; i++){
                let icontent = this.contents[i];
                if (icontent.title != currentcontent.title) { scontents.push(icontent); }
            }
            let scontents_shuffled = Shuffle(scontents);
            return scontents_shuffled;
        }
        if (type==1) {
            for (let i = 0; i < this.contents.length; i++){
                let icontent = this.contents[i];
                if (icontent.type == 1) { lcontents.push(icontent); }
            }
            for (let j = 0; j < lcontents.length; j++){
                let jcontent = lcontents[j];
                if (jcontent.title != currentcontent.title) { scontents.push(jcontent); }
            }
            let scontents_shuffled = Shuffle(scontents);
            return scontents_shuffled;
        }
        if (type==2) {
            for (let i = 0; i < this.contents.length; i++){
                let icontent = this.contents[i];
                if (icontent.type == 2) { lcontents.push(icontent); }
            }
            for (let j = 0; j < lcontents.length; j++){
                let jcontent = lcontents[j];
                if (jcontent.title != currentcontent.title) { scontents.push(jcontent); }
            }
            let scontents_shuffled = Shuffle(scontents);
            return scontents_shuffled;
        }
        if (type==3) {
            for (let i = 0; i < this.contents.length; i++){
                let icontent = this.contents[i];
                if (icontent.type == 3) { lcontents.push(icontent); }
            }
            for (let j = 0; j < lcontents.length; j++){
                let jcontent = lcontents[j];
                if (jcontent.title != currentcontent.title) { scontents.push(jcontent); }
            }
            let scontents_shuffled = Shuffle(scontents);
            return scontents_shuffled;
        }
        return [];
    }
    loadNewsList(type) {
        //Type
        //0 = all
        //1 = Sports
        //2 = Foods
        //3 = Politics

        let cac = document.getElementById("Content_Article_Content");

        if (type==0) {
            SetCategoryTheme("Default");
            LoadPage("NewsList");
            LoadNews("NewsList", "RecentGeneral", 1);
            document.getElementById("NewsList_SearchButton").setAttribute('onclick',"LoadNews('NewsList', 'SearchGeneral', 1);")
            document.getElementById("NewsList_SearchIndex").value = "";
        }
        if (type==1) {
            SetCategoryTheme("Sports");
            LoadPage("NewsList");
            LoadNews("NewsList", "RecentSports", 1);
            document.getElementById("NewsList_SearchButton").setAttribute('onclick',"LoadNews('NewsList', 'SearchSports', 1);")
            document.getElementById("NewsList_SearchIndex").value = "";
        }
        if (type==2) {
            SetCategoryTheme("Foods");
            LoadPage("NewsList");
            LoadNews("NewsList", "RecentFoods", 1);
            document.getElementById("NewsList_SearchButton").setAttribute('onclick',"LoadNews('NewsList', 'SearchFoods', 1);")
            document.getElementById("NewsList_SearchIndex").value = "";
        }
        if (type==3) {
            SetCategoryTheme("Politics");
            LoadPage("NewsList");
            LoadNews("NewsList", "RecentPolitics", 1);
            document.getElementById("NewsList_SearchButton").setAttribute('onclick',"LoadNews('NewsList', 'SearchPolitics', 1);")
            document.getElementById("NewsList_SearchIndex").value = "";
        }
    }
}
NewsContents = new SetNewsContents();
// Types
// Default = 0
// Sports = 1
// Foods = 2
// Politics = 3

let cid = 0;
let ctype = 0;
let ctitle = "";
let cdesc = "";
let cdate = new Date();
let csource = "";
let cauthor = "";
let chtml = "";

//#region Reports
// REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS
// PORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS R
// RTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REP

//#region Report 1

ctitle = "Golden State Warriors down Portland Trail Blazers to enter three-way tie in thrilling Play-In race";
cdesc = "The Golden State Warriors edged past the Portland Trail Blazers 100-92 and are now tied on a 45-35 record with the Sacramento Kings and Los Angeles Lakers as the NBA regular season winds down to its final two games.";
cdate = new Date("2024-04-24T06:09:00");
csource = "https://edition.cnn.com/2024/04/12/sport/golden-state-warriors-portland-trail-blazers-play-in-race-spt-intl/index.html";
cauthor = "Matias Grez, CNN";

chtml = `
<!-- You may edit this (optional)
    ctitle = "Golden State Warriors down Portland Trail Blazers to enter three-way tie in thrilling Play-In race";
    cdesc = "The Golden State Warriors edged past the Portland Trail Blazers 100-92 and are now tied on a 45-35 record with the Sacramento Kings and Los Angeles Lakers as the NBA regular season winds down to its final two games.";
    cdate = new Date("2024-04-24T06:09:00");
    csource = "https://edition.cnn.com/2024/04/12/sport/golden-state-warriors-portland-trail-blazers-play-in-race-spt-intl/index.html";
    cauthor = "Matias Grez, CNN";
-->

<style>
    #InContent { width:786px; }
    #InContent img { width:100%; }
</style>

<div id="InContent">

    <!-- Content Info -->
    <h1 id="InContent_Title">Title</h1>
    <div><label>Date: </label><span id="InContent_Date">January 1, 1970</span></div>
    <div><label>Author: </label><span id="InContent_Author">Unknown</span></div>

    <hr> <!-- Inside the Content (Only edit this) -->

    <img class="InContent_Imgs" src="p1.png"> 
    <p>
The Golden State Warriors edged past the Portland Trail Blazers 100-92 and are now tied on a 45-35 record with the Sacramento Kings and Los Angeles Lakers as the NBA regular season winds down to its final two games.
The Warriors held a narrow one-point lead over the struggling Blazers going into the fourth quarter but pulled away down the stretch behind a team-high 22 points from Steph Curry.
It was a tough shooting night for the two-time MVP, who shot just 36.4% from the floor, but he got it done elsewhere by adding eight assists, seven rebounds, two blocks and a steal.
"You know they're going to play hard and with a lot of energy, and for the most part, it worked for about 42 minutes, but we just got really disciplined down the stretch, had great point of attack defense," Curry said, per ESPN.
"We just competed and that last six minutes was hard-nosed basketball. That's what it took to win."
Deandre Ayton scored a game-high 25 points for Portland to go with 11 rebounds, while rookie Scoot Henderson continued his late season improvement with 18 points and 12 assists.
It was Henderson's eighth game of the season with double-digit assists, the most of any rookie in the NBA.
    </p>
    <img class="InContent_Imgs" src="p2.png">
    <p>
The Warriors appear to have caught the winning bug at just the right time with their third straight victory, while the Kings and Lakers have both lost two on the bounce.
After a huge 135-123 win at Sacramento on Thursday, the New Orleans Pelicans currently sit in the sixth and final automatic playoff spot, one game ahead of the Phoenix Suns in seventh as both teams desperately try and avoid the Play-In Tournament.
In what should be a thrilling end to the season, the Pelicans will travel to Golden State before ending their campaign at home to the Lakers, while the Suns' final two games are away versus the Kings and the No. 2 seeded Minnesota Timberwolves.
After the Warriors host the Pelicans on Friday, Steve Kerr's team will then welcome the No. 12 seed Utah Jazz in its season finale.
"It's a loaded conference. Everybody's good," Kerr said. "It's just tough to make up ground."
    </p>

    <hr> <!-- Outside the Content (Never edit past this) -->

    <label>Source: </label>
    <a id="InContent_Source">
    </a>
</div>
`

NewsContents.newContent(new NewsContent(1, 1, ctitle, cdesc, cdate, csource, cauthor, chtml));

//#endregion

//#region Report 2

ctitle = "PVL: Akari continues learning process";
cdesc = "With the tools to contend but considered an underachiever thus far, Akari has been doing the best it can to complete its preliminary round schedule in the PVL All-Filipino Conference in a positive way, even if there is practically no guarantee that a semifinal seat is at the end of all its hard work.";
cdate = new Date("2024-04-12T05:25:00")
csource = "https://sports.inquirer.net/561376/pvl-akari-continues-learning-process"
cauthor = "Angel B. Dukha III";

chtml = `
<!-- You may edit this (optional)
    //type: Sports, 1
    //id: 2
    ctitle = "PVL: Akari continues learning process";
    cdesc = "With the tools to contend but considered an underachiever thus far, Akari has been doing the best it can to complete its preliminary round schedule in the PVL All-Filipino Conference in a positive way, even if there is practically no guarantee that a semifinal seat is at the end of all its hard work.";
    cdate = new Date("2024-04-12T05:25:00")
    csource = "https://sports.inquirer.net/561376/pvl-akari-continues-learning-process"
    cauthor = "Angel B. Dukha III";
-->

<style>
    #InContent { width:786px; }
    #InContent img { width:100%; }
</style>

<div id="InContent">

    <!-- Content Info -->
    <h1 id="InContent_Title">Title</h1>
    <div><label>Date: </label><span id="InContent_Date">January 1, 1970</span></div>
    <div><label>Author: </label><span id="InContent_Author">Unknown</span></div>

    <hr> <!-- Inside the Content (Only edit this) -->

    <img class="InContent_Imgs" src="p1.jpg"> 
    <p>
With the tools to contend but considered an underachiever thus far, Akari has been doing the best it can to complete its preliminary round schedule in the PVL All-Filipino Conference in a positive way, even if there is practically no guarantee that a semifinal seat is at the end of all its hard work.
The Chargers won a second straight game after blanking Capital1 on Thursday, 25-17, 25-14, 25-20, but the door for them to advance past the elimination round has been virtually shut, with their chances resting on powerhouse defending champion Creamline losing an unlikely three games in a row in closing out their own elimination round schedule.
"We need help from the other teams," Akari coach Raffy Mosuela said in Filipino, as the Cool Smashers can eliminate the Chargers even with just a win in their last three games, which will be against Nxled, Choco Mucho and PLDT.
As things stand, the Flying Titans and High Speed Hitters share the lead at 7-1, with the Cool Smashers and Petro Gazz Angels tied for third at 6-2. Chery Tiggo and Cignal, who are at 5-2, are still playing at press time, with the loser moving closer to elimination as only the top four teams will advance.
That's why Mosuela remains realistic about their chances and would just want a grand exit as a consolation prize.
'Our target is to beat Chery [Tiggo for us] to at least finish with a winning record,' he said as his charges continue to learn playing with one another and hopefully give the powerhouses a better fight in the next conference.
'The team is starting to have good chemistry [in just a] short period of time this conference where we had two new additions apart from myself,' Mosuela said. 'It takes around six months to fully get the team chemistry [we need], so as we near the end of the conference, it starts to add up.'
The veteran Dindin Santiago-Manabat has gone on to lead the efforts of the Chargers, topscoring with 25 points against the Solar Spikers. Her total featured 20 points off attacks as she simply towered over the Capital1 defense. She also had three blocks and two aces.

'What's good with our team is that everyone is staying patient, so even if we lose or encounter challenges, we really work hard and everyone keeps showing up and working hard,' said Fifi Sharma, one of the league's top blockers here.
'Hopefully, these remaining games we get to showcase what we are working for these past few months,' she added.
    </p>

    <hr> <!-- Outside the Content (Never edit past this) -->

    <label>Source: </label>
    <a id="InContent_Source">
    </a>
</div>
`

NewsContents.newContent(new NewsContent(2, 1, ctitle, cdesc, cdate, csource, cauthor, chtml));

//#endregion

//#region Report 3

ctitle = "President orders review of soldiers' benefits";
cdesc = "President Ferdinand Marcos Jr. on Tuesday ordered concerned agencies to review the prevailing compensation program for soldiers wounded in the line of duty amid the effects of inflation on the cost of basic goods.";
cdate = new Date("2024-04-10T05:30:00");
csource = "https://newsinfo.inquirer.net/1928225/president-orders-review-of-soldiers-benefits"
cauthor = " Julie M. Aurelio, Melvin Gascon";

chtml = `
<!-- You may edit this (optional)
    //type: Politics, 3
    //id: 3
    ctitle = "President orders review of soldiers' benefits";
    cdesc = "President Ferdinand Marcos Jr. on Tuesday ordered concerned agencies to review the prevailing compensation program for soldiers wounded in the line of duty amid the effects of inflation on the cost of basic goods.";
    cdate = new Date("2024-04-10T05:30:00") 05:30 AM April 10, 2024
    csource = "https://newsinfo.inquirer.net/1928225/president-orders-review-of-soldiers-benefits"
    cauthor = " Julie M. Aurelio, Melvin Gascon";
-->

<style>
    #InContent { width:786px; }
    #InContent img { width:100%; }
</style>

<div id="InContent">

    <!-- Content Info -->
    <h1 id="InContent_Title">Title</h1>
    <div><label>Date: </label><span id="InContent_Date">January 1, 1970</span></div>
    <div><label>Author: </label><span id="InContent_Author">Unknown</span></div>

    <hr> <!-- Inside the Content (Only edit this) -->

    <img class="InContent_Imgs" src="p1.jpg"> 
    <p>
PILAR, BATAAN, Philippines - President Ferdinand Marcos Jr. on Tuesday ordered concerned agencies to review the prevailing compensation program for soldiers wounded in the line of duty amid the effects of inflation on the cost of basic goods.
In his speech during the commemoration of the 82nd Araw ng Kagitingan (Day of Valor) here, the president paid tribute to the sacrifices the troops gave for the country but lamented that they may not have been amply repaid.
"In recognition of (soldiers') bravery and sacrifices, I am directing the defense, budget and finance departments to study the existing separation benefits of soldiers who incurred total permanent disability in the line of duty to see if these are commensurate to the sacrifices they have made and submit their recommendation while taking stock of the national government's position,'" he said. 
In his speech, Marcos said the annual Araw ng Kagitingan remembrance is a tribute to Filipino war heroes from both past and present times.
<h2>'Most important guests' for Marcos</h2>
He referred to the war heroes who attended the event, led by about 40 seated behind him onstage, as the "most important guests.'"
In his visit to Veterans Memorial Medical Center in Quezon City on Tuesday, the President assured war veterans of improved access to health care under his watch.
Marcos released a P150-million check to buy the hospital's magnetic resonance imaging (MRI) machine.

"Excited for our new MRI at VMMC! With government support, we will continue to broaden access to vital treatments for our veterans and their families,'" the President said in a post on Instagram.
In a statement, Malacanang said procuring a new, high-resolution MRI machine would enable VMMC's doctors to "accurately diagnose critical cases.'"

The P150 million came from the Office of the President's Socio-Civic Projects Fund, formerly known as the President's Social Fund, which is often tapped for medical and special financial assistance requests.

It was in response to the request of the Department of National Defense (DND) for funds to buy a new MRI machine for VMMC after its only MRI machine - bought in 2011 - conked out last year.
<h2>Hospital expansion</h2>
Marcos visited the VMMC's Renal Dialysis Center as the country remembered the heroism of soldiers and guerrillas who fought during World War II.

VMMC is a tertiary-level government hospital with a 766-bed capacity providing health care and treatment to Filipino war veterans and retired military personnel.

Its Renal Dialysis Center offers free dialysis treatment and medicines to more than 200 patients, mostly war veterans, retired soldiers, and their dependents.

Malacanang said the center was also planning an expansion to accommodate more hemodialysis patients and establish a kidney transplant center in the next five years to improve the quality of life of patients suffering from renal diseases.

"We will forever be in debt to our heroes - those who perished and the survivors who stared death in the eye and lived to tell the tale. Some of whom are with us here today,'" he said.

Aside from directing a review of current pension rates, Marcos also vowed that the government would ensure that the Armed Forces of the Philippines are well-equipped to face "new and growing challenges.'"

He directed the DND and the AFP to assess and submit a report on the responsiveness of the current inventory of military supplies and equipment.
"We are doubling our efforts to enhance their operational capability. We must, therefore, also ensure their safety by procuring the right equipment,'" he said.
    </p>

    <hr> <!-- Outside the Content (Never edit past this) -->

    <label>Source: </label>
    <a id="InContent_Source">
    </a>
</div>
`

NewsContents.newContent(new NewsContent(3, 3, ctitle, cdesc, cdate, csource, cauthor, chtml));

//#endregion

//#region Report 4

cid = 4
ctype = 2 //Sports=1, Foods=2, Politics=3
ctitle = "Man-go crazy! Get 4 kilos of Guimaras mangoes for P820 from island farmers";
cdesc = `If you can't get enough of Philippine sweet mangoes, you'll love Rural Rising's newest mango-nificent deal - the socio-agricultural enterprise is holding a Guimaras RR Mango Rescue Buy, where four kilos of the "sweetest mangoes in the world" will cost P820, hand-picked by Guimaras Island's farmers.`;
cdate = new Date("2024-04-10T02:49:00"); //APR 10, 2024 2:49 PM PHT
csource = "https://www.rappler.com/life-and-style/food-drinks/guimaras-mangoes-rescue-buy-rural-rising-april-2024/"
cauthor = "";

chtml = `
<!-- You may edit this (optional)
    cid = 4
    ctype = 2 //Sports=1, Foods=2, Politics=3
    ctitle = "Man-go crazy! Get 4 kilos of Guimaras mangoes for P820 from island farmers";
    cdesc = "If you can't get enough of Philippine sweet mangoes, you'll love Rural Rising's newest mango-nificent deal - the socio-agricultural enterprise is holding a Guimaras RR Mango Rescue Buy, where four kilos of the "sweetest mangoes in the world" will cost P820, hand-picked by Guimaras Island's farmers.";
    cdate = new Date("2024-04-10T02:49:00"); //APR 10, 2024 2:49 PM PHT
    csource = "https://www.rappler.com/life-and-style/food-drinks/guimaras-mangoes-rescue-buy-rural-rising-april-2024/"
    cauthor = "";
-->

<style>
    #InContent { width:786px; }
    #InContent .InContent_Imgs { width:100%; }
    #InContent .InContent_Div { text-align: center; }
    #inContent .InContent_Imgs_port { height:640px; }
</style>

<div id="InContent">

    <!-- Content Info -->
    <h1 id="InContent_Title">Title</h1>
    <div><label>Date: </label><span id="InContent_Date">January 1, 1970</span></div>
    <div><label>Author: </label><span id="InContent_Author">Unknown</span></div>

    <hr> <!-- Inside the Content (Only edit this) -->

    <img class="InContent_Imgs" src="p1.png"> 

    <p>
        MANILA, Philippines - If you can't get enough of Philippine sweet mangoes, you'll love Rural Rising's newest mango-nificent deal - the socio-agricultural enterprise is holding a Guimaras RR Mango Rescue Buy, where four kilos of the "sweetest mangoes in the world" will cost P820, hand-picked by Guimaras Island's farmers.

Rural Rising has over a boatload of authentic mangoes from the island that need a new home. The term "RR" means that they are "second-class fruits," meaning they will "never see the insides of an air-conditioned mall or a grocery."

<div class="InContent_Div">
<img class="InContent_Imgs_port" src="p2.png">
</div>

"Good mangoes are nurtured and protected on the tree. What about its RR mangoes? An RR is left to survive and grow as best it can at the mercy of the unforgiving insect and unforgiving buyer. They are not lovingly covered with paper like 'legitimate' mangoes - they find no love, they grow small," RuRi wrote.

<div class="InContent_Div">
<img class="InContent_Imgs_port" src="p3.png">
</div>

"This unwanted child has so much to prove and it dies. But you know what? On the Brix sweetness score it is EQUAL OR BETTER than good mangoes, even if they are smaller," they added.

RuRi is helping several mango farmers in Guimaras Island by buying all their RR mangoes at a good price. As of writing, there are 80 orders in stock on RuRi's website.

The dispatch date has yet to be announced. Order pick-ups can be done at any of RuRi's three points: RuRi Central in Avida Towers Centera, EDSA cor. Reliance Street, Mandaluyong City; RuRi North in 22 Congressional Avenue, Project 8, Quezon City; and RuRi in South Old Transport Terminal Bldg., Alabang Town Center, Theater Dr., Ayala Alabang, Muntinlupa.

RuRi advises customers to claim their produce within 48 hours of the dispatch date, as fresh produce spoils quickly.

"In context of these Rescue Buys, it will be a tragedy to save produce from one place only to have it spoil in our hands. We shall donate all unclaimed produce in your name to hungry communities like Barangay Tatalon in Quezon City," they said.

Rural Rising has been actively supporting local farming communities by hosting regular rescue buys. Campaigns have contributed to the sale of kamote from Guimaras, basil from Pampanga, sweet corn from Pangasinan, and pineapples from Isabela, among many others. - Steph Arnaldo/Rappler.com
    </p>

    <hr> <!-- Outside the Content (Never edit past this) -->

    <label>Source: </label>
    <a id="InContent_Source">
    </a>
</div>
`

NewsContents.newContent(new NewsContent(cid, ctype, ctitle, cdesc, cdate, csource, cauthor, chtml));

//#endregion

//#region Report 5

cid = 5
ctype = 3 //Sports=1, Foods=2, Politics=3
ctitle = "As Iran attacks Israel, Biden confronts an escalating Middle East crisis he had hoped to avoid";
cdesc = "For President Joe Biden, an attack on Israel launched from Iranian soil amounts to a scenario he'd greatly sought to avoid since the start of the current Middle East conflict.";
cdate = new Date("2024-04-14T08:18:00"); //8:18 AM EDT, Sun April 14, 2024
csource = "https://edition.cnn.com/2024/04/13/politics/biden-iran-israel-attack/index.html"
cauthor = "Kevin Liptak and MJ Lee, CNN";

chtml = `
<!-- You may edit this (optional)
    cid = 5
    ctype = 3 //Sports=1, Foods=2, Politics=3
    ctitle = "As Iran attacks Israel, Biden confronts an escalating Middle East crisis he had hoped to avoid";
    cdesc = "For President Joe Biden, an attack on Israel launched from Iranian soil amounts to a scenario he'd greatly sought to avoid since the start of the current Middle East conflict.";
    cdate = new Date("2024-04-14T08:18:00"); //8:18 AM EDT, Sun April 14, 2024
    csource = "https://edition.cnn.com/2024/04/13/politics/biden-iran-israel-attack/index.html"
    cauthor = "Kevin Liptak and MJ Lee, CNN";
-->

<style>
    #InContent { width:786px; }
    #InContent img { width:100%; }
</style>

<div id="InContent">

    <!-- Content Info -->
    <h1 id="InContent_Title">Title</h1>
    <div><label>Date: </label><span id="InContent_Date">January 1, 1970</span></div>
    <div><label>Author: </label><span id="InContent_Author">Unknown</span></div>

    <hr> <!-- Inside the Content (Only edit this) -->

    <img class="InContent_Imgs" src="p1.png">

    <p>
    For President Joe Biden, an attack on Israel launched from Iranian soil amounts to a scenario he'd greatly sought to avoid since the start of the current Middle East conflict.

    The reprisals heighten the risk of a wider regional conflict that could directly draw in the United States, along with other countries.
    
    And they place Biden - again - in the tenuous position of pledging stalwart support for Israel while also trying to prevent a new conflagration from exploding with the United States involved.
    
    What comes next is unknown. In the immediate aftermath of Iran's attacks, American officials acknowledged they were entering uncharted territory. One significant question mark is how proxies might potentially join Iranian efforts to target Israel and add a new layer of unpredictability. And with Israel's plans for a response still being formed, Biden administration officials are expected to continue advising their Israeli counterparts – with the desire for containment in mind.
    
    In a call with Israeli Prime Minister Benjamin Netanyahu on Saturday night, in which Biden told Netanyahu to consider Saturday a win because the US assessed Iran's attacks had been largely unsuccessful and demonstrated Israel's superior military capability, Biden made clear that the US will not participate in any offensive operations against Iran in response, a senior administration official told CNN.
    
    But in the hours following Iran's attack, it became clear the president faces a severe challenge putting a lid on the flare-up between Iran and Israel and stopping a full-scale regional war breaking out.
    
    Israel will respond to Iran's attack, but the scope of that response has yet to be determined, an Israeli official told CNN's Jeremy Diamond on Sunday.
    
    The official said Israel is yet to determine whether to try to "break all the dishes" or do something more measured.
    
    Israeli Defense Minister Yoav Gallant warned that the confrontation with Iran is "not over yet." The country's response options are expected to be discussed in detail during a meeting of Israel's war cabinet meeting on Sunday.
    
    The Commander of Iran's Islamic Revolutionary Guard Corps Hossein Salami warned that Tehran would respond directly if Israel retaliates saying a "new equation" had been created.
    
    Biden is also operating within the fraught politics of an election year, lending outsized importance to his upcoming decisions. The eruption of the Israel-Hamas war on October 7 has hurt Biden at home, eroding his support with key constituencies as he has declined to call for a permanent ceasefire in Gaza.
    
    One of the reasons Biden returned urgently to the White House from his beach house in Delaware Saturday afternoon was the ongoing nature of the attack, one official said, with the Situation Room better equipped for real-time monitoring of events.
    
    Administration officials saw Iran's attacks on Israel Saturday as disproportionate to Israel's strikes in Damascus that prompted the retaliation, a US official told CNN.
    
    That view has been an important factor in the discussions taking place in the White House throughout the day on next steps, particularly as Biden is set on preventing a full-scale regional conflict from erupting.
    
    There is also a recognition that what Israel is likely to do in response will depend on a full damage assessment, including potential casualties, so the Biden administration's advice to Israel will depend on that picture coming into focus, the official added.
    
    In the immediate aftermath of the Israeli strikes in Syria that killed top Iranian commanders, US officials monitored Iran gearing up to launch a major attack on Israel, seeing it as inevitable. As the US, in close consultation with Israel, sought to figure out exactly how, when and where exactly Iran would retaliate, administration officials never fully ruled out Iran trying to strike inside Israel as well as American personnel and assets in the region.
    
    The most likely "worst case scenario," one senior administration official said in the days leading up to Iran's Saturday attacks, was a direct attack by Iran on Israel, and the eruption of a state-on-state conflict that could very well prompt the beginning of a wider regional conflict that the US has been working to prevent since the immediate aftermath of Hamas' October 7 attacks.
    
    Despite his current tensions with Netanyahu over the war in Gaza, Biden and his top officials have sought over the past week to diminish any daylight between the US and Israel when it comes to Israel's defense against Iran.
    
    In the hours before Iran launched its attack, the US defense secretary and national security adviser spoke with their counterparts in Israel to reiterate that support. And last week, Gen. Erik Kurilla, the commander of US Central Command, was in Israel discussing contingencies with officials ahead of the expected attack.
    
    Biden kept to his Friday promise that "the US is devoted to the defense of Israel," with defense officials telling CNN that the US military successfully intercepted some Iranian missiles on Saturday.
    
    Contained within the conversations about preparations for Iran's attack and coordinating a response were also implicit encouragement to the Israeli government to not allow the situation to spiral out of control if Iran's response was limited in nature, officials familiar with the matter said.
    
    The US also sent messages publicly and privately to Iran warning about escalating the crisis further and pressed European and Arab allies to use their own leverage with Tehran to deliver similar messages.
    
    As Iran's plans to attack Israel grew clearer, American officials increasingly assessed that Tehran was not seeking direct conflict with the United States. Ahead of the drone attack launched by Iran on Saturday, US officials said they did not expect the targets to include American forces in the region.
    
    That is a change from earlier in the conflict, when Iran-backed militias regularly attacked US troops in the Middle East, including in a strike that killed three Americans stationed in Jordan. After the US launched retaliatory strikes, the attacks by Iranian proxies waned.
    
    Yet the simmering tensions between Iran and Israel have not let up. Without any direct channels of communication between the two countries, the risk of miscalculation is amplified.
    
    CNN's Oren Liebermann contributed reporting.
    </p>

    <hr> <!-- Outside the Content (Never edit past this) -->

    <label>Source: </label>
    <a id="InContent_Source">
    </a>
</div>
`

NewsContents.newContent(new NewsContent(cid, ctype, ctitle, cdesc, cdate, csource, cauthor, chtml));

//#endregion

//#region Report 6

cid = 6
ctype = 2 //Sports=1, Foods=2, Politics=3
ctitle = "Balai Pandesal emerges as new challenger to Julie's Bakeshop, Pan de Manila";
cdesc = "Who says the Philippines' national bread - pan de sal (bread of salt) - can't carry a food and beverage company to greater heights?";
cdate = new Date("2024-04-14T11:20:00"); //APR 14, 2024 7:20 PM PHT+8
csource = "https://www.rappler.com/business/balai-pandesal-emerges-new-challenger-julies-bakeshop-pan-de-manila/"
cauthor = "ISAGANI DE CASTRO JR.";

chtml = `
<!-- You may edit this (optional)
    cid = 6
    ctype = 2 //Sports=1, Foods=2, Politics=3
    ctitle = "Balai Pandesal emerges as new challenger to Julie's Bakeshop, Pan de Manila";
    cdesc = "Who says the Philippines' national bread - pan de sal (bread of salt) - can't carry a food and beverage company to greater heights?";
    cdate = new Date("2024-04-14T11:20:00"); //APR 14, 2024 7:20 PM PHT+8
    csource = "https://www.rappler.com/business/balai-pandesal-emerges-new-challenger-julies-bakeshop-pan-de-manila/"
    cauthor = "ISAGANI DE CASTRO JR.";
-->

<style>
    #InContent { width:786px; }
    #InContent .InContent_Imgs { width:100%; }
    #InContent .InContent_Div { text-align: center; }
    #inContent .InContent_Imgs_port { height:640px; }
</style>

<div id="InContent">

    <!-- Content Info -->
    <h1 id="InContent_Title">Title</h1>
    <div><label>Date: </label><span id="InContent_Date">January 1, 1970</span></div>
    <div><label>Author: </label><span id="InContent_Author">Unknown</span></div>

    <hr> <!-- Inside the Content (Only edit this) -->

    <img class="InContent_Imgs" src="pcover.png"> 

    <p>
    Who says the Philippines' national bread - pan de sal (bread of salt) - can't carry a food and beverage company to greater heights? 

Although the average size of pan de sal has gotten smaller through the years, symbolizing its decline as a source of nutrition in the Filipino diet, emerging food and beverage firm Balai ni Fruitas is proving that it can be a source of strength for the company.

Balai ni Fruitas is known for its Buko ni Fruitas, its first brand which sells fresh coconut-based drinks and coconut-based desserts. Related to this is its smaller brand Fruitas House of Desserts. 

In 2021, in response to the COVID-19 pandemic which badly hit the company, Yu acquired Balai Pandesal bakery and put up its first community store in Kamuning, Quezon City. It turned out to be a wise move since the company has seen its bakery business grow fast. 
    </p>

    <div class="InContent_Div">
        <img class="InContent_Imgs_port" src="p1.png"> 
    </div>

    <p>
From only 5 outlets in June 2021, it now has 50 Balai Pandesal stores, effectively become a challenger in the "mid-price counter service retail bakery" to industry leaders 43-year-old Julie's Bakeshop, as well as 25-year-old Pan de Manila.

In this segment, Julie's Bakeshop had a nearly 40% market share in 2022, while Pan Manila had a 36% share, according to an industry study in 2022 cited by Balai ni Fruitas. Other key players in this segment are BreadTalk, French Baker, and Panaderia All-Day Hot Pandesal. 
    </p>

    <img class="InContent_Imgs" src="p2.png"> 

    <p>
"We responded to the pandemic by acquiring Balai Pandesal and rolling out community stores and we are glad that this strategy paid off. We are now growing same store sales by earning customer loyalty and constantly improving our product offerings," said Yu. 

"We believe we have also barely scratched the surface in terms of provincial expansion and we have already started to build capacity to serve this market," he added. 
    </p>

    <img class="InContent_Imgs" src="p3.png"> 

    <p>
Aside from selling pan de sal, Balai Pandesal has introduced new new baked goods such as malunggay bread and wheat pan de sal. It also widened its offerings of bakery products from third-party suppliers. 
    </p>

    <div class="InContent_Div">
        <img class="InContent_Imgs_port" src="p4.png"> 
    </div>

    <p>
BREAD. Balai ni Fruitas Inc. President and CEO Lester Yu (extreme left) shows Manila Bulletin President Dr. Emilio Yap III (center) a Balai Pandesal branch in E. Rodriguez, Quezon City, in September 2022. Balai Pandesal Facebook
Balai ni Fruitas, a subsidiary of Chinese-Filipino businessman Lester Yu's Fruitas Holdings Incorporated, disclosed on Thursday, April 11, that its revenues rose 57% from P341 million in 2022 to P535 million in 2023. Its net income increased by 58% from P37 million in 2022 to P59 million in 2023. It is publicly listed on the Small, Medium and Emerging Board of the Philippine Stock Exchange (PSE). Fruitas Holdings filed for a P1.2 billion Initial Public Offering (IPO) in 2019. It is using most of the funds raised from the IPO to expand its network of stores.

"2023 marked significant milestones for Balai [ni Fruitas] as we passed 100 stores and the half-billion peso revenue level," Yu said.

According to Balai ni Fruitas, its revenue growth of 57% in 2023 is higher than the revenue growth of select PSE-listed food service firms.
    </p>

    <hr> <!-- Outside the Content (Never edit past this) -->

    <label>Source: </label>
    <a id="InContent_Source">
    </a>
</div>
`

NewsContents.newContent(new NewsContent(cid, ctype, ctitle, cdesc, cdate, csource, cauthor, chtml));

//#endregion

//#region Report 7

cid = 7
ctype = 3 //Sports=1, Foods=2, Politics=3
ctitle = "Belgium to investigate suspected Russian interference in EU election sa";
cdesc = `Belgium will investigate suspected Russian meddling in European Parliament elections after the country's intelligence services found evidence of "pro-Russian interference networks," Prime Minister Alexander De Croo said on Friday.`;
cdate = new Date("2024-04-17T07:06:00"); //7:06 PM EDT, Wed April 17, 2024
csource = "https://edition.cnn.com/2024/04/12/europe/european-elections-russian-interference-intl"
cauthor = "Eve Brennan and Luke McGee and Xiaofei Xu, CNN";

chtml = `
<!-- You may edit this (optional)
    cid = 7
    ctype = 3 //Sports=1, Foods=2, Politics=3
    ctitle = "Belgium to investigate suspected Russian interference in EU election sa";
    cdesc = "Belgium will investigate suspected Russian meddling in European Parliament elections after the country's intelligence services found evidence of "pro-Russian interference networks," Prime Minister Alexander De Croo said on Friday.";
    cdate = new Date("2024-04-17T07:06:00"); //7:06 PM EDT, Wed April 17, 2024
    csource = "https://edition.cnn.com/2024/04/12/europe/european-elections-russian-interference-intl"
    cauthor = "Eve Brennan and Luke McGee and Xiaofei Xu, CNN";
-->

<!--

<img class="InContent_Imgs" src="pcover.png"> 

<div class="InContent_Div">
    <img class="InContent_Imgs_port" src="p1.png"> 
</div>

-->

<style>
    #InContent { width:786px; }
    #InContent .InContent_Imgs { width:100%; }
    #InContent .InContent_Div { text-align: center; }
    #inContent .InContent_Imgs_port { height:640px; }
</style>

<div id="InContent">

    <!-- Content Info -->
    <h1 id="InContent_Title">Title</h1>
    <div><label>Date: </label><span id="InContent_Date">January 1, 1970</span></div>
    <div><label>Author: </label><span id="InContent_Author">Unknown</span></div>

    <hr> <!-- Inside the Content (Only edit this) -->

    <img class="InContent_Imgs" src="pcover.png"> 

    <p>
        
Belgium will investigate suspected Russian meddling in European Parliament elections after the country's intelligence services found evidence of "pro-Russian interference networks," Prime Minister Alexander De Croo said on Friday.

Moscow's objective "is to help elect more pro-Russian candidates to the European Parliament" in order to weaken the EU's support for Ukraine, De Croo told reporters.

A recent investigation by Czech authorities uncovered a "pro-Russian influence operation in Europe" involving espionage, said De Croo, which highlighted that Moscow has approached EU members of parliament and even paid some to promote a "Russian agenda."

"Belgian intelligence services confirmed the existence of pro-Russian interference networks" with activities in several European countries including Belgium, said De Croo, adding that Belgium's judicial authorities confirmed that Russian interference would be subject to prosecution.

"The cash payments did not take place in Belgium, but the interference does," De Croo added.

He did not name suspects or give further details of agencies or people alleged to be involved in the influence peddling.

On Wednesday, in a statement co-signed by the Czech Prime Minister Petr Fiala, De Croo called on other EU member states to consider the creation of a new framework to counter Russian interference and said he would bring up the topic during the EU leaders' summit on April 17 and 18.
    </p>

    <h1>'A new reality'</h1>

    <p>
        "The goal is very clear: a weakened European support for Ukraine serves Russia on the battlefield, and that is the real aim of what has been uncovered in the last weeks," he said. "These are very serious concerns and that is why I have taken action... we cannot allow this type of Russian menace in our midst. We need to act and we need to act both on the national level and we also need to act on the EU level."

He went on to say that Belgium has a responsibility as one of the seats of EU institutions "to uphold that every citizen's right to a free and safe vote can be maintained," but that "more tools to fight Russian propaganda and to fight Russian disinformation" are also needed on an "EU level."

"We are in a new reality and we need to adapt to that new reality," he said.

Belgium currently holds the presidency of the EU. The next elections to the European Parliament will take place from June 6-9, according to the European Council. 

The EU has donated billions to Ukraine in military support since the start of Russia's invasion in February 2022 and has sanctioned Russian officials. But Viktor Orban - Hungarian Prime Minister and ally of Russian President Vladimir Putin - has held up Kyiv's membership negotiations with the EU and delayed aid deals.

Far-right and populist parties, some of whom are considered sympathetic to the Kremlin, are expected to make gains at the European Parliament elections. There are concerns that this would influence - and possibly weaken - the EU's overall support for Ukraine.

European support for Ukraine has become increasingly important as US support for Kyiv has faltered in recent months. European officials regularly discuss how possible it would be for the gap in funding to be plugged and fear what implications a Donald Trump return to the White House might mean.
    </p>

    <hr> <!-- Outside the Content (Never edit past this) -->

    <label>Source: </label>
    <a id="InContent_Source">
    </a>
</div>
`

NewsContents.newContent(new NewsContent(cid, ctype, ctitle, cdesc, cdate, csource, cauthor, chtml));

//#endregion

//#region Report 8

cid = 8
ctype = 2 //Sports=1, Foods=2, Politics=3
ctitle = "Of Course Meghan Markle Is Doing a Cooking Show";
cdesc = "Just one month after announcing plans to launch her forthcoming lifestyle brand, American Riviera Orchard, Meghan Markle, aka Meghan, Duchess of Sussex, is preparing to further solidify her new role as a food influencer with a brand new cooking show that's set to debut on Netflix in the coming months.";
cdate = new Date("2024-04-12T12:13:00"); //Apr 12, 2024, 12:13pm EDT
csource = "https://www.eater.com/24128497/meghan-markle-cooking-show-netflix-relatability-american-riviera-orchard"
cauthor = "Amy McCarthy";

chtml = `
<!-- You may edit this (optional)
    cid = 8
    ctype = 2 //Sports=1, Foods=2, Politics=3
    ctitle = "Of Course Meghan Markle Is Doing a Cooking Show";
    cdesc = "Just one month after announcing plans to launch her forthcoming lifestyle brand, American Riviera Orchard, Meghan Markle, aka Meghan, Duchess of Sussex, is preparing to further solidify her new role as a food influencer with a brand new cooking show that's set to debut on Netflix in the coming months.";
    cdate = new Date("2024-04-12T12:13:00"); //Apr 12, 2024, 12:13pm EDT
    csource = "https://www.eater.com/24128497/meghan-markle-cooking-show-netflix-relatability-american-riviera-orchard"
    cauthor = "Amy McCarthy";
-->

<!-- Shortcuts

<img class="InContent_Imgs" src="pcover.png"> 

<div class="InContent_Div">
    <img class="InContent_Imgs_port" src="p1.png"> 
</div>

-->

<style>
    #InContent { width:786px; }
    #InContent .InContent_Imgs { width:100%; }
    #InContent .InContent_Div { text-align: center; }
    #inContent .InContent_Imgs_port { height:640px; }
</style>

<div id="InContent">

    <!-- Content Info -->
    <h1 id="InContent_Title">Title</h1>
    <div><label>Date: </label><span id="InContent_Date">January 1, 1970</span></div>
    <div><label>Author: </label><span id="InContent_Author">Unknown</span></div>

    <hr> <!-- Inside the Content (Only edit this) -->

    <img class="InContent_Imgs" src="p1.png"> 

    <p>
    Just one month after announcing plans to launch her forthcoming lifestyle brand, American Riviera Orchard, Meghan Markle, aka Meghan, Duchess of Sussex, is preparing to further solidify her new role as a food influencer with a brand new cooking show that's set to debut on Netflix in the coming months.

The as-yet-untitled television show will, according to Deadline, "celebrate the joys of cooking, gardening, entertaining, and friendship," a description that makes it sound a lot like a millennial's take on Barefoot Contessa. With this announcement, Markle joins a growing crop of celebrity cooking shows, including Selena + Chef, which is helmed by the same showrunner as Markle's forthcoming series. But given Markle's royal ties and her experience as an wildly popular influencer, she may soon outshine them all.

Markle isn't new to the world of food, either. She may not have formal training as a chef, but in her former life as an actress and lifestyle influencer, she regularly shared recipes for dishes like matzo ball soup and ginger berry crumble on her now-defunct blog the Tig. In fact, cooking has always been part of the royal love story that captured the world's attention. When Markle and Prince Harry got engaged in 2018, Markle later told reporters that he got down on one knee to propose while she was cooking him a roast chicken.

It's unclear what exactly viewers can expect from the show, beyond "cooking" and "friendship." (Maybe "friendship" means she'll bring on her famous friends like Tyler Perry and Mindy Kaling.) But it's both fascinating — and unsurprising — that Markle has chosen food as her next act.

The new series offers Markle the opportunity to distance herself from the drama and (often racist) gossip that plagued her brief time as a member of the British royal family, while reintroducing her to American audiences as something more than that girl from Suits who went off to marry a prince. Now that Markle has the opportunity to reinvent herself, a cooking show might be the best way to make people remember that she is an actual human being, not just fodder for the gossip rags. Because food is the ultimate vehicle for relatability. You may not be able to replicate her impeccable outfits or the Sussexes' beautiful home in Montecito, but you can roast a chicken.

At the same time, though, Markle's connection to the royals offers cachet that most other influencers simply can't replicate. She can position herself as an expert on entertaining because she's learned all the best tips from royal party planners. Perhaps she's discussed organic gardening at length with King Charles, a noted enthusiast of the hobby. Even as she pursues a "normal" life in the States, Markle can capitalize on her royal experiences in a way that balances her desire to look accessible — at least, as much as is possible for someone who got married at a literal castle to an actual prince.
    </p>

    <hr> <!-- Outside the Content (Never edit past this) -->

    <label>Source: </label>
    <a id="InContent_Source">
    </a>
</div>
`

NewsContents.newContent(new NewsContent(cid, ctype, ctitle, cdesc, cdate, csource, cauthor, chtml));

//#endregion

//#region Report 9

cid = 9
ctype = 1 //Sports=1, Foods=2, Politics=3
ctitle = "PBA: Barroca, Sangalang lead bench mob as Magnolia takes down Phoenix";
cdesc = "Veterans Mark Barroca and Ian Sangalang sparked off the bench to lead Magnolia's 107-93 mastery over Phoenix in the PBA Philippine Cup on Sunday at the Ninoy Aquino Stadium.";
cdate = new Date("2024-04-14T18:05:00"); //4/14/2024 18:05:00
csource = "https://www.gmanetwork.com/news/sports/volleyball/903625/pba-barroca-sangalang-lead-bench-mob-as-magnolia-takes-down-phoenix/story/"
cauthor = "";

chtml = `
<!-- You may edit this (optional)
    cid = 9
    ctype = 1 //Sports=1, Foods=2, Politics=3
    ctitle = "PBA: Barroca, Sangalang lead bench mob as Magnolia takes down Phoenix";
    cdesc = "Veterans Mark Barroca and Ian Sangalang sparked off the bench to lead Magnolia's 107-93 mastery over Phoenix in the PBA Philippine Cup on Sunday at the Ninoy Aquino Stadium.";
    cdate = new Date("2024-04-14T18:05:00"); //4/14/2024 18:05:00
    csource = "https://www.gmanetwork.com/news/sports/volleyball/903625/pba-barroca-sangalang-lead-bench-mob-as-magnolia-takes-down-phoenix/story/"
    cauthor = "";
-->

<!-- Shortcuts

<img class="InContent_Imgs" src="pcover.png"> 

<div class="InContent_Div">
    <img class="InContent_Imgs_port" src="p1.png"> 
</div>

-->

<style>
    #InContent { width:786px; }
    #InContent .InContent_Imgs { width:100%; }
    #InContent .InContent_Div { text-align: center; }
    #inContent .InContent_Imgs_port { height:640px; }
</style>

<div id="InContent">

    <!-- Content Info -->
    <h1 id="InContent_Title">Title</h1>
    <div><label>Date: </label><span id="InContent_Date">January 1, 1970</span></div>
    <div><label>Author: </label><span id="InContent_Author">Unknown</span></div>

    <hr> <!-- Inside the Content (Only edit this) -->

    <img class="InContent_Imgs" src="p1.png"> 

    <p>
        Veterans Mark Barroca and Ian Sangalang sparked off the bench to lead Magnolia's 107-93 mastery over Phoenix in the PBA Philippine Cup on Sunday at the Ninoy Aquino Stadium.

        advertisement
        
        Barroca tied his career-high after pouring in 27 points alongside four assists, one steal, and one rebound while the seasoned big man followed up his previous outing last game against NorthPort with 23 markers, nine boards, five dimes, and one block. 
        
        The Hotshots have now won back-to-back games to improve to 3-2 while the Fuel Masters dropped to 2-5 just two days after a tight victory against Converge. 
        
        Magnolia pulled away for good in the fourth quarter, extending a two-point lead at the end of the third, 79-77, to an 18-point cushion late in the game following a three-pointer from Barroca, 105-87. 
        
        Prior to that, the Hotshots had to overcome a double-digit deficit early in the second half after RJ Jazul buried a triple to give Phoenix a 60-49 advantage. 
        
        Scores:
        
        Magnolia 107 - Barroca 27, Sangalang 23, Jalalon 13, Eriobu 11, Tratter 8, Dionisio 7, Lee 7, Abueva 6, Balanza 2, Mendoza 2, Reavis 1, Escoto 0, Laput 0.
        
        Phoenix 93 - Jazul 21, Tuffin 17, Perkins 16, Mocon 11, Salado 8, Verano 8, Alejandro 6, Rivero 6, Muyang 0, Camacho 0, Daves 0, Lalata 0.
        
        Quarters: 28-18, 47-57, 79-77, 107-93.    
    </p>

    <hr> <!-- Outside the Content (Never edit past this) -->

    <label>Source: </label>
    <a id="InContent_Source">
    </a>
</div>
`

NewsContents.newContent(new NewsContent(cid, ctype, ctitle, cdesc, cdate, csource, cauthor, chtml));

//#endregion

//#region Report 10

cid = 10
ctype = 3 //Sports=1, Foods=2, Politics=3
ctitle = "For Many Western Allies, Sending Weapons to Israel Gets Dicey";
cdesc = "As civilian casualties in Gaza spiral, some nations are suspending sales amid accusations of abetting genocide and war crimes.";
cdate = new Date("2024-04-13T19:20:00"); //APR 13, 2024 7:20 PM PHT+8
csource = "https://www.nytimes.com/2024/04/13/world/europe/israel-weapons-sales-genocide.html"
cauthor = "Lara Jakes.";

chtml = `
<!-- You may edit this (optional)
    cid = 10
    ctype = 3 //Sports=1, Foods=2, Politics=3
    ctitle = "For Many Western Allies, Sending Weapons to Israel Gets Dicey";
    cdesc = "As civilian casualties in Gaza spiral, some nations are suspending sales amid accusations of abetting genocide and war crimes.";
    cdate = new Date("2024-04-13T19:20:00"); //APR 13, 2024 7:20 PM PHT+8
    csource = "https://www.nytimes.com/2024/04/13/world/europe/israel-weapons-sales-genocide.html"
    cauthor = "Lara Jakes.";
-->

<style>
    #InContent { width:786px; }
    #InContent .InContent_Imgs { width:100%; }
    #InContent .InContent_Div { text-align: center; }
    #inContent .InContent_Imgs_port { height:640px; }
</style>

<div id="InContent">

    <!-- Content Info -->
    <h1 id="InContent_Title">Title</h1>
    <div><label>Date: </label><span id="InContent_Date">January 1, 1970</span></div>
    <div><label>Author: </label><span id="InContent_Author">Unknown</span></div>

    <hr> <!-- Inside the Content (Only edit this) -->

    <img class="InContent_Imgs" src="pcover.png"> 
    <h5>Israeli soldiers in January in the central Gaza Strip. The war there has prompted war crimes charges against Israel and allies that sell it weapons.Credit...Avishag Shaar-Yashuv for The New York Times</h5>

    <p>
        For months, Western governments have provided military support for Israel while fending off accusations that their weapons were being used to commit war crimes in Gaza. But as a global outcry over the growing death toll in Gaza mounts, maintaining that balance is becoming increasingly difficult, as was clear on a single day this past week. 

        On Tuesday, in a United Nations court, Germany found itself having to defend against accusations that it was complicit in genocide against Palestinians in Gaza by exporting weapons to Israel.

        A few hours later, in Washington, a top Democrat and Biden administration ally, Representative Gregory W. Meeks of New York, said he might block an $18 billion deal to sell F-15 fighter jets to Israel unless he was assured that Palestinian civilians would not be indiscriminately bombed.
        
        And two miles away, at a media briefing at the State Department, Britain's foreign minister, David Cameron, was pressed on what his government had concluded after weeks of internal review about whether Israel has breached international humanitarian law during its offensive in Gaza.
        The governments of Germany and the United States remain the backbone of international military support for Israel, accounting for 95 percent of major weapons systems sent to Israel, according to the Stockholm International Peace Research Institute, which tracks the global weapons trade. So far, the pressure has not swayed them or Britain, though President Biden this month went further than he ever had, threatening to condition future support for Israel on how it addresses his concerns about civilian casualties and the humanitarian crisis in Gaza.

Mr. Cameron also equivocated, if only a bit. After defending Israel at the briefing and suggesting that the recent advice he had received did not conclude that arms exports should be halted, he said that the British government's position reflected only "the latest assessment" of the issue, implying some flexibility.

Global outrage over a war that the Gazan health authorities say has killed more than 33,000 Palestinians, including 13,000 children, has already upended geopolitics and could help determine the outcome of the American presidential election in November. Increasingly, it also raises the threat of war crimes charges against governments that export weapons in conflicts where opponents argue international humanitarian law has been violated. 
    </p>

    <img class="InContent_Imgs" src="p1.png"> 
    <h5>Palestinians on Wednesday carrying the bodies of several people, all members of one family, who were killed in an overnight bombardment in the Nuseirat neighborhood in central Gaza.Credit...Agence France-Presse - Getty Images</h5>

    <p>
        Such concerns were raised recently by more than 600 lawyers and retired judges who urged the British government to freeze weapons shipments to Israel, citing a "plausible risk" of genocide in Gaza.
        Israel vigorously denies accusations of genocide, arguing that it needs to defend itself against Hamas, which led the Oct. 7 attack that Israeli officials say killed about 1,200 people.
        A threatened Iranian strike on Israel in retaliation for the Damascus bombing that killed a number of high-ranking Iranian officers seems certain to shake up an already volatile situation.

Nevertheless, as the death toll has risen in Gaza, Belgium, Canada, Italy, the Netherlands and Spain have all halted arms deals with Israel. The European Union's top diplomat, Josep Borrell Fontelles, has appeared to discourage sending more weapons, wryly noting in February that "if the international community believes that this is a slaughter, that too many people are being killed, maybe they have to think about the provision of arms."

The hearings this past week against Germany, at the U.N.'s International Court of Justice, was the most recent chilling factor for Israel's arms suppliers. And matters could grow even worse if Israel follows through on its plans to invade Rafah, the city in southern Gaza where hundreds of thousands of displaced Gazans are sheltering.



 
    </p>


    <img class="InContent_Imgs" src="p2.png"> 
    <h5>The International Court of Justice convening to hear the case against Germany's financial and military aid to Israel, brought by Nicaragua, on Tuesday in The Hague.Credit...Robin Van Lonkhuijsen/EPA, via Shutterstock
    </h5>

    <p>
        The case, brought by Nicaragua, highlighted concerns that foreign weapons sales to Israel have done as much to kill Palestinians as they have to help protect the Jewish state. Israel has strongly denied that it is committing genocide, but it was ordered by the court in February, in a separate case brought by South Africa, to take steps to prevent atrocities.
        Germany is estimated to have approved about $353 million in arms exports to Israel last year, although officials have said most military aid provided since the war began was nonlethal. Accusations that its weapons might have contributed to genocide has stung Germany, given its World War II-era crimes, although public opposition to the war and concerns about being liable for atrocities have grown.

"This was such an emotional wave that went through parts of German society - so many people were taking sides," said Christian Mölling, the research director for the German Council on Foreign Relations. But, he said, it is unclear if public antipathy toward Israel will ultimately cut off weapons sales, in part because "the overall amount of delivery is astonishingly low."

Approving weapons exports to Israel is also landing its allies in local or national courts. That has ramped up anxiety for governments that assumed their arms shipments were too small to attract international rage.

In the Netherlands, a state court in February ordered the government to stop sending parts for F-35 fighter jets to Israel, calling it "undeniable that there is a clear risk" of the equipment being used "in serious violations of international humanitarian law."
The Dutch government is appealing the decision, arguing that the jets are crucial for Israel's security against regional enemies like Iran and Hezbollah. Total exports of military goods to Israel from the Netherlands in 2022, the most recent figures available, amounted to about $11 million, officials said.

    </p>

    <img class="InContent_Imgs" src="p3.png"> 
     <h5>A protester in February outside a building in The Hague, where a court was weighing whether the Netherlands could send F-35 fighter jet parts to Israel.Credit...Lex Van Lieshout/Agence France-Presse - Getty Images</h5>
    <p>
        In Italy, the government halted its arms trade with Israel only weeks after the war in Gaza began, in "a suspension that continues to this day," Guido Crosetto, the Italian defense minister, told Parliament last month. Officials said that decision was made to ensure Italy was compliant with international humanitarian laws and a national policy against supplying arms to countries at war.

        Although Italy delivered some weapons late last year to fulfill pre-existing contracts, Mr. Crosetto said they "do not concern materials that could be used with repercussions on the civilian population of Gaza." Only about 2 percent of Israel's imported weapons come from Italy, amounting to about $9.6 million in 2022. Yet Italy ranked as the third-largest foreign supplier of major weapons systems to Israel in the years leading up to the war, according to the Stockholm International Peace Research Institute, which tracks arms transfers.
        
        By far the largest exporter of weapons to Israel is the United States, which committed in 2016 to a 10-year, $38 billion military aid package, including $5 billion for missile defense, with grants that underwrite Israeli purchases from American defense companies.
        The Biden administration is assessing whether Israel has violated international law in Gaza and, as of last week, "we've not seen any indication they have," said John F. Kirby, a White House spokesman. The government is required by law to cut off American military support to countries that restrict humanitarian aid deliveries, as Israel is widely accused of doing in Gaza.

More than one million Palestinians are facing famine and more than 200 aid workers have been killed, including seven killed this month in airstrikes on a World Central Kitchen convoy.

Over the past six months, President Biden has repeatedly proclaimed his "unwavering" support for Israel and its right to defend itself - not only from Hamas but also from Iran and allied militants in Lebanon and Yemen. "We're going to do all we can to protect Israel's security," he said at the White House on Wednesday.

Yet Mr. Biden has gradually taken a tougher tone against Israel as the war wears on, and the bombing and invasion have sent civilian casualties spiraling. "They need to do more," Mr. Biden said of Israel's government during the same White House news conference. .
    </p>

    <img class="InContent_Imgs" src="p4.png"> 
     <h5>A vehicle used by World Central Kitchen that was hit last week in an Israeli attack in Deir al Balah, in the central Gaza Strip, killing seven aid workers.Credit...Ismael Abu Dayyah/Associated Press</h5>
    <p>
        But that has not been enough to satisfy Americans who want Mr. Biden to use the threat of an arms cutoff to pressure the Israelis to accept a cease-fire. That sentiment is being echoed by some Democrats who worry about his re-election prospects and the dismal down-ballot effect it could have on the rest of the party.

In a recent flurry of letters, at least seven Democratic senators and more than 50 House Democrats, including Representative Nancy Pelosi, Democrat of California and a former House speaker, have urged Mr. Biden to halt all weapons transfers to Israel.

Adding to the pressure, a coalition of a dozen liberal organizations and labor unions that will be a key part of Mr. Biden's re-election campaign demanded in a letter on Thursday that he end military aid to Israel until its government lifts restrictions on humanitarian aid to Gaza.

If not, he could risk losing support from reliable Democratic voters - particularly younger people, said Cristina Tzintzun Ramirez, the president of NextGen America, which focuses on driving voter turnout and was part of the coalition.

"We are concerned with the humanitarian and moral implications," said Ms. Tzintzun Ramirez, "and the political survival of the administration."

Jason Horowitz and Reid J. Epstein contributed reporting.

Lara Jakes, based in Rome, reports on diplomatic and military efforts by the West to support Ukraine in its war with Russia. She has been a journalist for nearly 30 years. More about Lara Jakes
    <p>
     
    <hr> <!-- Outside the Content (Never edit past this) -->

    <label>Source: </label>
    <a id="InContent_Source">
    </a>
</div>
`

NewsContents.newContent(new NewsContent(cid, ctype, ctitle, cdesc, cdate, csource, cauthor, chtml));

//#endregion

//#region Report 11

cid = 11
ctype = 3 //Sports=1, Foods=2, Politics=3
ctitle = "NBI ordered to investigate deep fake video of President";
cdesc = "MANILA CITY, Philippines - Justice Secretary Jesus Crispin Remulla has ordered the National Bureau of Investigation (NBI) to investigate the recent circulation of deep fake audio recording of President Ferdinand Marcos Jr. purportedly instructing the military to act against China.";
cdate = new Date("2024-04-25T19:08:00"); //APR 25, 2024 7:08 PM PHT+8
csource = "https://newsinfo.inquirer.net/1933697/remulla-on-deep-fake-audio"
cauthor = "Tetch Torres-Tupas.";

chtml = `
<!-- You may edit this (optional)
    cid = 11
    ctype = 3 //Sports=1, Foods=2, Politics=3
    ctitle = "NBI ordered to investigate deep fake video of President";
    cdesc = "MANILA CITY, Philippines - Justice Secretary Jesus Crispin Remulla has ordered the National Bureau of Investigation (NBI) to investigate the recent circulation of deep fake audio recording of President Ferdinand Marcos Jr. purportedly instructing the military to act against China.";
    cdate = new Date("2024-04-25T19:08:00"); //APR 25, 2024 7:08 PM PHT+8
    csource = "https://newsinfo.inquirer.net/1933697/remulla-on-deep-fake-audio"
    cauthor = "Tetch Torres-Tupas.";
-->

<style>
    #InContent { width:786px; }
    #InContent .InContent_Imgs { width:100%; }
    #InContent .InContent_Div { text-align: center; }
    #inContent .InContent_Imgs_port { height:640px; }
</style>

<div id="InContent">

    <!-- Content Info -->
    <h1 id="InContent_Title">Title</h1>
    <div><label>Date: </label><span id="InContent_Date">January 1, 1970</span></div>
    <div><label>Author: </label><span id="InContent_Author">Unknown</span></div>

    <hr> <!-- Inside the Content (Only edit this) -->

    <img class="InContent_Imgs" src="pcover.png"> 
    <p>
        
        MANILA CITY, Philippines - Justice Secretary Jesus Crispin Remulla has ordered the National Bureau of Investigation (NBI) to investigate the recent circulation of deep fake audio recording of President Ferdinand Marcos Jr. purportedly instructing the military to act against China.

Remulla's order came after the Presidential Communications Office (PCO) and the Department of Information and Communications Technology (DICT) said that the manipulated audio was made using artificial intelligence (AI).

The audio clip was uploaded in a popular streaming platform and eventually gained traction across various social media channels.

"I am instructing [the NBI] to file the necessary legal action, if warranted, against those behind this fake news," Remulla said in a statement Thursday.

"Hold accountable the personalities behind this deceiving act, and make the investigation swift and comprehensive to ascertain the truth," he said.
    </p>
     
    <hr> <!-- Outside the Content (Never edit past this) -->

    <label>Source: </label>
    <a id="InContent_Source">
    </a>
</div>
`

NewsContents.newContent(new NewsContent(cid, ctype, ctitle, cdesc, cdate, csource, cauthor, chtml));

//#endregion

//#region Report 12

cid = 12
ctype = 3 //Sports=1, Foods=2, Politics=3
ctitle = "INQToday: Quiboloy still in the Philippines, says DOJ";
cdesc = "Here's a quick roundup of today's top stories: Philippines, US, France start joint patrols in West PH Sea The navies of the Philippines, United States, and France officially began Thursday their multilateral maritime exercise in the West Philippine Sea, which saw an increase in the presence of Chinese vessels ahead of the trilateral patrols.";
cdate = new Date("2024-04-25T18:08:00"); //APR 25, 2024 6:08 PM PHT+8
csource = "https://newsinfo.inquirer.net/1933663/inqtoday-quiboloy-still-in-the-philippines-says-doj"
cauthor = "DOJ.";

chtml = `
<!-- You may edit this (optional)
    cid = 12
    ctype = 3 //Sports=1, Foods=2, Politics=3
    ctitle = "INQToday: Quiboloy still in the Philippines, says DOJ";
    cdesc = "Here's a quick roundup of today's top stories:
Philippines, US, France start joint patrols in West PH Sea
The navies of the Philippines, United States, and France officially began Thursday their multilateral maritime exercise in the West Philippine Sea, which saw an increase in the presence of Chinese vessels ahead of the trilateral patrols.";
    cdate = new Date("2024-04-25T18:08:00"); //APR 25, 2024 6:08 PM PHT+8
    csource = "https://newsinfo.inquirer.net/1933663/inqtoday-quiboloy-still-in-the-philippines-says-doj"
    cauthor = "DOJ.";
-->

<style>
    #InContent { width:786px; }
    #InContent .InContent_Imgs { width:100%; }
    #InContent .InContent_Div { text-align: center; }
    #inContent .InContent_Imgs_port { height:640px; }
</style>

<div id="InContent">

    <!-- Content Info -->
    <h1 id="InContent_Title">Title</h1>
    <div><label>Date: </label><span id="InContent_Date">January 1, 1970</span></div>
    <div><label>Author: </label><span id="InContent_Author">Unknown</span></div>

    <hr> <!-- Inside the Content (Only edit this) -->

    <img class="InContent_Imgs" src="pcover.png"> 
    <p>
        Here's a quick roundup of today's top stories:

Philippines, US, France start joint patrols in West PH Sea
The navies of the Philippines, United States, and France officially began Thursday their multilateral maritime exercise in the West Philippine Sea, which saw an increase in the presence of Chinese vessels ahead of the trilateral patrols.

Captain Ariel Coloma, spokesperson of the Armed Forces of the Philippines' Western Command, said that BRP Ramon Alcaraz and BRP Davao del Sur left Puerto Princesa, Palawan, at about 9:00 a.m., marking the start of the drills.

Quiboloy still in the Philippines, says DOJ
Religious leader Apollo Quiboloy, who faces two cases of child abuse and qualified trafficking, is still in the Philippines, the Department of Justice (DOJ) spokesperson, Assistant Secretary Mico Clavano, said on Thursday.

Asked during a Palace briefing if the self-proclaimed son of God is still in the country, Clavano said: "We do have information that he is still within the country unless there are new developments from the country, but as far as our information is concerned at the DOJ, he is still currently in the country."

DOJ: Gov't officials who work with ICC may face punishment
Government officials who work with the International Criminal Court (ICC) could be punished under the law, said Department of Justice (DOJ) spokesperson Asec. Mico Clavano on Thursday.

According to former Senator Antonio Trillanes III, the ICC has already spoken to 50 former and present Philippine National Police officers regarding their involvement in former President Rodrigo Duterte's war on drugs.

DOJ cites gains in operation vs Teves in Timor Leste
While the National Bureau Investigation (NBI) was unable to bring former Negros Oriental Rep. Arnolfo Teves Jr. back to the Philippines from East Timor, Department of Justice (DOJ) Spokesperson Assistant Secretary Mico Clavano still called their mission a success.

The DOJ is still awaiting the decision of Timor Leste courts on the Philippines' request for extradition.

Arrest of ex-BuCor chief Bantag a matter of time, needs patience - DOJ
The Department ofJustice (DOJ) on Thursday asked for patience in the manhunt for former Bureau of Corrections (BuCor) chief turned fugitive Gerald Bantag.

DOJ Spokesperson Mico Clavano, in a Palace briefing, said that authorities are still searching for Bantag, more than a year since the Philippine National Police declared him a fugitive. 
SWS: 46% of Filipino families felt poor in March 2024
The percentage of families in the country who considered themselves poor has decreased by one percent from December 2023, the Social Weather Stations (SWS) said on Wednesday.

According to its latest survey conducted in March 2024, 46 percent of families said they were poor, 33 percent said they were on the borderline, and 23 percent said they were not poor.
<p>
     
    <hr> <!-- Outside the Content (Never edit past this) -->

    <label>Source: </label>
    <a id="InContent_Source">
    </a>
</div>
`

NewsContents.newContent(new NewsContent(cid, ctype, ctitle, cdesc, cdate, csource, cauthor, chtml));

//#endregion

//#region Report 13

cid = 13
ctype = 3 //Sports=1, Foods=2, Politics=3
ctitle = "Padilla hits cops' reported interaction with ICC probers";
cdesc = "MANILA, Philippines - Senator Robinhood Padilla on Thursday took a swipe at police officers who allegedly communicated with International Criminal Court (ICC) investigators about the role they played in the bloody war on drugs waged by former president Rodrigo Duterte.";
cdate = new Date("2024-04-25T18:01:00"); //APR 25, 2024 6:01 PM PHT+8
csource = "https://newsinfo.inquirer.net/1933665/fwd-robin-padilla-to-police-re-icc-bakit-kayo-papasailalim-dyan"
cauthor = "Charie Abarca.";

chtml = `
<!-- You may edit this (optional)
    cid = 13
    ctype = 3 //Sports=1, Foods=2, Politics=3
    ctitle = "Padilla hits cops' reported interaction with ICC probers";
    cdesc = "MANILA, Philippines - Senator Robinhood Padilla on Thursday took a swipe at police officers who allegedly communicated with International Criminal Court (ICC) investigators about the role they played in the bloody war on drugs waged by former president Rodrigo Duterte.";
    cdate = new Date("2024-04-25T18:01:00"); //APR 25, 2024 6:01 PM PHT+8
    csource = "https://newsinfo.inquirer.net/1933665/fwd-robin-padilla-to-police-re-icc-bakit-kayo-papasailalim-dyan"
    cauthor = "Charie Abarca.";
-->

<style>
    #InContent { width:786px; }
    #InContent .InContent_Imgs { width:100%; }
    #InContent .InContent_Div { text-align: center; }
    #inContent .InContent_Imgs_port { height:640px; }
</style>

<div id="InContent">

    <!-- Content Info -->
    <h1 id="InContent_Title">Title</h1>
    <div><label>Date: </label><span id="InContent_Date">January 1, 1970</span></div>
    <div><label>Author: </label><span id="InContent_Author">Unknown</span></div>

    <hr> <!-- Inside the Content (Only edit this) -->

    <img class="InContent_Imgs" src="pcover.png"> 
    <p>
        MANILA, Philippines - Senator Robinhood Padilla on Thursday took a swipe at police officers who allegedly communicated with International Criminal Court (ICC) investigators about the role they played in the bloody war on drugs waged by former president Rodrigo Duterte.

"Pwede naman sila tumangi. Bakit kayo magpapasailalim dyan e pulis kayo dito sa Pilipinas?," said Padilla in a Kapihan sa Senado forum.

(They could've refused. Why would you subject yourself to them when you're a police officer in the Philippines?)
Former Senator Antonio Trillanes IV earlier disclosed that ICC investigators contacted more than 50 former and active police officers who served under the Duterte administration.

"Based on highly credible information, the ICC investigators have already directly communicated with more than 50 active and former PNP officials regarding their being implicated in the crimes against humanity case of Rodrigo Duterte at the ICC," Trillanes said.

According to the former senator, this means that if these officers do not "immediately signify their intention to cooperate with the investigators, their status would be elevated to being suspects."

Padilla, on the other hand, maintained that President Ferdinand "Bongbong" Marcos had already stated that the Philippine government would not lift a finger to help the ICC probe.

"Matigas ang ulo nitong ICC na ito, eh hindi ko naman sila masisi kung pinipilit nila yan. Pero malinaw naman ang guidance ng ating mahal na Pangulo na hindi tayo mag cooperate dyan sa ICC," said Padilla.

(This ICC is stubborn, but I can't blame them if they are pushing for that. But it is clear under the guidance of the President that we will not cooperate with the ICC.)

<p>
     
    <hr> <!-- Outside the Content (Never edit past this) -->

    <label>Source: </label>
    <a id="InContent_Source">
    </a>
</div>
`

NewsContents.newContent(new NewsContent(cid, ctype, ctitle, cdesc, cdate, csource, cauthor, chtml));

//#endregion

//#region Report 14

cid = 14
ctype = 3 //Sports=1, Foods=2, Politics=3
ctitle = "Marcos appoints Cacdac Secretary of Department of Migrant Workers";
cdesc = "MANILA, Philippines -- President Ferdinand Marcos Jr on Thursday named Department of Migrant Workers (DMW) Officer-in-Charge Usec. Hans Leo Cacdac as the new Migrant Workers Secretary.";
cdate = new Date("2024-04-25T17:52:00"); //APR 25, 2024 5:52 PM PHT+8
csource = "https://newsinfo.inquirer.net/1933665/fwd-robin-padilla-to-police-re-icc-bakit-kayo-papasailalim-dyan"
cauthor = "Jean Mangaluz.";

chtml = `
<!-- You may edit this (optional)
    cid = 14
    ctype = 3 //Sports=1, Foods=2, Politics=3
    ctitle = "Marcos appoints Cacdac Secretary of Department of Migrant Workers";
    cdesc = "MANILA, Philippines -- President Ferdinand Marcos Jr on Thursday named Department of Migrant Workers (DMW) Officer-in-Charge Usec. Hans Leo Cacdac as the new Migrant Workers Secretary.";
    cdate = new Date("2024-04-25T17:52:00"); //APR 25, 2024 5:52 PM PHT+8
    csource = "https://newsinfo.inquirer.net/1933665/fwd-robin-padilla-to-police-re-icc-bakit-kayo-papasailalim-dyan"
    cauthor = "Jean Mangaluz.";
-->

<style>
    #InContent { width:786px; }
    #InContent .InContent_Imgs { width:100%; }
    #InContent .InContent_Div { text-align: center; }
    #inContent .InContent_Imgs_port { height:640px; }
</style>

<div id="InContent">

    <!-- Content Info -->
    <h1 id="InContent_Title">Title</h1>
    <div><label>Date: </label><span id="InContent_Date">January 1, 1970</span></div>
    <div><label>Author: </label><span id="InContent_Author">Unknown</span></div>

    <hr> <!-- Inside the Content (Only edit this) -->

    <img class="InContent_Imgs" src="pcover.png"> 
    <h5>Hans Leo Cacdac, OIC, Department of Migrant Workers    </h5>
    <p>
        MANILA, Philippines -- President Ferdinand Marcos Jr on Thursday named Department of Migrant Workers (DMW) Officer-in-Charge Usec. Hans Leo Cacdac as the new Migrant Workers Secretary.

"President Ferdinand R. Marcos Jr. has appointed Department of Migrant Workers Undersecretary Hans Leo Cacdac to head the department, a year after he was designated as the officer-in-charge on April 8, 2023," said the Palace in a statement.

According to Marcos' letter of appointment to Cacdac dated April 25, the decision was made pursuant to Article VII of the 1987 Constitution, which enumerated the powers of the Executive Branch.

"You are hereby appointed ad interim Secretary, Department of Migrant Workers," said Marcos.

"By virtue thereof, you may qualify and perform the duties of the office, furnishing the Office of the President and the Civil Service Commission with copies of your Oath of Office," he added.

Prior to Cacdac, Susan Ople headed the DMW until her death due to breast cancer in August 2023.  

Cacdac's official appointment as DMW Secretary comes seven months after being named as the agency's OIC in September 2023.

Before his appointment, Cacdac was a former Executive Director V of the Overseas Workers Welfare Administration, Executive Director V of the Philippine Overseas Employment Administration , and Undersecretary at the Department of Labor and Employment.

<p>
     
    <hr> <!-- Outside the Content (Never edit past this) -->

    <label>Source: </label>
    <a id="InContent_Source">
    </a>
</div>
`

NewsContents.newContent(new NewsContent(cid, ctype, ctitle, cdesc, cdate, csource, cauthor, chtml));

//#endregion

//#region Report 15

cid = 15
ctype = 3 //Sports=1, Foods=2, Politics=3
ctitle = "Japan struggles to nail down date for Biden-Kishida follow-up";
cdesc = "Meeting of 2+2 ministers likely pushed back to summer due to Blinken's busy calendar";
cdate = new Date("2024-04-25T21:24:00"); //APR 25, 2024 9:24 PM PHT+8
csource = "https://asia.nikkei.com/Politics/International-relations/Indo-Pacific/Japan-struggles-to-nail-down-date-for-Biden-Kishida-follow-up"
cauthor = "KEN MORIYASU, Nikkei Asia diplomatic correspondent.";

chtml = `
<!-- You may edit this (optional)
    cid = 15
    ctype = 3 //Sports=1, Foods=2, Politics=3
    ctitle = "Japan struggles to nail down date for Biden-Kishida follow-up";
    cdesc = "Meeting of 2+2 ministers likely pushed back to summer due to Blinken's busy calendar";
    cdate = new Date("2024-04-25T21:24:00"); //APR 25, 2024 9:24 PM PHT+8
    csource = "https://asia.nikkei.com/Politics/International-relations/Indo-Pacific/Japan-struggles-to-nail-down-date-for-Biden-Kishida-follow-up"
    cauthor = "KEN MORIYASU, Nikkei Asia diplomatic correspondent.";
-->

<style>
    #InContent { width:786px; }
    #InContent .InContent_Imgs { width:100%; }
    #InContent .InContent_Div { text-align: center; }
    #inContent .InContent_Imgs_port { height:640px; }
</style>

<div id="InContent">

    <!-- Content Info -->
    <h1 id="InContent_Title">Title</h1>
    <div><label>Date: </label><span id="InContent_Date">January 1, 1970</span></div>
    <div><label>Author: </label><span id="InContent_Author">Unknown</span></div>

    <hr> <!-- Inside the Content (Only edit this) -->

    <img class="InContent_Imgs" src="pcover.png"> 
    <h5>U.S. President Joe Biden is flanked by Secretary of State Antony Blinken, left, and Secretary of Defense Lloyd Austin at a cabinet meeting at the White House in October 2023. Blinken and Austin have been tasked with deepening U.S.-Japan defense relations through the 2+2 meeting. © Reuters</h5>
    <p>
        WASHINGTON -- The U.S. has pushed back plans to hold crucial defense meetings with Japan that were set to follow April's bilateral summit where the two countries' leaders forged closer security ties, Nikkei Asia has learned, amid continuing tensions in the Middle East.

Japanese Prime Minister Fumio Kishida and U.S. President Joe Biden announced a slew of agreements on defense cooperation in Washington on April 10. Among the discussions, the two leaders tasked their respective defense and foreign ministries to lay out specific plans to deepen the defense relationship through the Security Consultative Committee, also known as the 2+2 meeting.

But the two countries are struggling to set a date for when U.S. Secretary of State Antony Blinken, Defense Secretary Lloyd Austin, Japanese Foreign Minister Yoko Kamikawa and Defense Minister Minoru Kihara can come together. The steepest hurdle is to find time in Blinken's busy schedule as the Israel-Iran confrontation mounts and the Gaza humanitarian crisis persists. This week, he is in Beijing to thaw U.S.-China friction and press China to stop its firms from supporting Russia's war machine.

Initially, there were talks of holding a 2+2 in May. Then, there were talks about convening the 2+2 on the sidelines of the Shangri-La Dialogue -- a defense symposium held by the International Institute for Strategic Studies -- in Singapore held between May 31 and June 2. But neither plans crystalized because Blinken "has so many fires to extinguish," a U.S. official said.

Sources said that it could take until July or August for the meeting to take place. Blinken is planning a summer visit to Japan, which could be a venue, if Austin's schedule permits.

"To hold a 2+2, we would need to prepare a joint statement. That requires extensive preparations and we are nowhere near that stage," a Japanese official who spoke on the condition of anonymity told Nikkei Asia.

Currently, both Austin and Kihara are scheduled to attend a change of command ceremony for the U.S. Indo-Pacific Command in Hawaii on May 3. The two are likely to meet on the sidelines to advance some of the agreements by the two leaders.

<p>
    <img class="InContent_Imgs" src="p1.png"> 
    <h5>U.S. Navy Adm. Samuel Paparo, then-commander of the U.S. Pacific Fleet, addresses newly commissioned Japan Maritime Self-Defense Force officers aboard the JS Kashima about the honor of naval service on Joint Base Pearl Harbor-Hickam, Hawaii in October 2023. Paparo will take over command at the Indo-Pacific Command next month. (U.S. Navy photo)
    </h5>
    <p>One of those is to upgrade the respective command and control frameworks of the U.S. forces in Japan and the Japanese Self-Defense Forces to integrate operations and enable joint planning.

        The Japanese side is in the process of creating a joint operations command to direct all SDF operations, including ground, air and maritime operations, by March 2025.
        
        The U.S. side will discuss ways to establish a matching structure that places the Navy, Marine Corps, Air Force, and Army under one command.
        
        The U.S. Congress has tasked the Pentagon to submit by June 1 a feasibility study on how to modify U.S. command structures in Japan
        
        "The clock is ticking on this," Jim Schoff, senior director at Sasakawa Peace Foundation USA, said.
        
        But Schoff predicted the June date could be missed because the Indo-Pacific Commander in Hawaii, to whom the new commander in Japan will report, will swap next month. Discussions can only proceed once Adm. Samuel Paparo, the new Indo-Pacific Commander, settles into his job, Schoff said.
    </p>
    <img class="InContent_Imgs" src="p2.png"> 
    <h5>Sailors assigned to the Ticonderoga-class guided-missile cruiser USS Shiloh man the rails throughout the ship in Yokosuka, Japan in September 2023. The ships stationed in Yokosuka currently report to the Indo-Pacific Command in Hawaii and not to the commander of the U.S. Forces Japan in Tokyo. (U.S. Navy photo)
    </h5>
    <p>Christopher Johnstone, Japan chair at the Washington think tank Center for Strategic and International Studies, said, "A short delay in the timing of the 2+2 would not be harmful, because it would give the Department of Defense additional time -- with a new Indo-Pacific commander in place in May -- to develop a detailed concept for the future of alliance Command and Control."

        Aspects to be determined include "the missions it would be responsible for, its area of responsibility, and its relationship with Japan's new Joint Operations Command," he said.
        
        But the Pentagon "needs to move quickly or momentum will flag," he said.
        
        Yuki Tatsumi, director of the Japan program at the Stimson Center, said that the joint statements that emerge after a 2+2 meeting is typically "a result of complicated bottom-up consultation process that is shouldered by the bureacracy on both sides."
        
        Tatsumi, who previously worked as a special assistant for political affairs at the Embassy of Japan in Washington, pointed to the revision of the U.S.-Japan Guidelines for Defense Cooperation in the mid-90s as an example.
        
        That took more than a year after leaders of both countries ordered the change in 1996. What Biden and Kishida have ordered is "a task of similar magnitude for the bureaucracies of the U.S. and Japan," she added.
        
        </p>

    <hr> <!-- Outside the Content (Never edit past this) -->

    <label>Source: </label>
    <a id="InContent_Source">
    </a>
</div>
`

NewsContents.newContent(new NewsContent(cid, ctype, ctitle, cdesc, cdate, csource, cauthor, chtml));

//#endregion

//#region Report 16

cid = 16
ctype = 3 //Sports=1, Foods=2, Politics=3
ctitle = "Pakistan and Iran agree to boost trade, but Washington casts long shadow";
cdesc = "Sanction fears could make it tough for neighbors to expand bilateral business";
cdate = new Date("2024-04-25T18:28:00"); //APR 25, 2024 6:28 PM PHT+8
csource = "https://asia.nikkei.com/Politics/International-relations/Pakistan-and-Iran-agree-to-boost-trade-but-Washington-casts-long-shadow"
cauthor = "ADNAN AAMIR, Contributing writer.";

chtml = `
<!-- You may edit this (optional)
    cid = 16
    ctype = 3 //Sports=1, Foods=2, Politics=3
    ctitle = "Pakistan and Iran agree to boost trade, but Washington casts long shadow";
    cdesc = "Sanction fears could make it tough for neighbors to expand bilateral business";
    cdate = new Date("2024-04-25T18:28:00"); //APR 25, 2024 6:28 PM PHT+8
    csource = "https://asia.nikkei.com/Politics/International-relations/Pakistan-and-Iran-agree-to-boost-trade-but-Washington-casts-long-shadow"
    cauthor = "ADNAN AAMIR, Contributing writer.";
-->

<style>
    #InContent { width:786px; }
    #InContent .InContent_Imgs { width:100%; }
    #InContent .InContent_Div { text-align: center; }
    #inContent .InContent_Imgs_port { height:640px; }
</style>

<div id="InContent">

    <!-- Content Info -->
    <h1 id="InContent_Title">Title</h1>
    <div><label>Date: </label><span id="InContent_Date">January 1, 1970</span></div>
    <div><label>Author: </label><span id="InContent_Author">Unknown</span></div>

    <hr> <!-- Inside the Content (Only edit this) -->

    <img class="InContent_Imgs" src="pcover.png"> 
    <h5>Pakistani Prime Minister Shehbaz Sharif, right, walks with Iranian President Ebrahim Raisi in Islamabad on April 22. (prime minister's office handout via Reuters)
    </h5>
    <p>
        ISLAMABAD -- As Iranian President Ebrahim Raisi wrapped up a trip to Pakistan this week, the two sides agreed to boost trade and work on rebuilding trust in the wake of border clashes in January. But experts say that pressure from Washington will continue to overshadow the relationship, making it tough for Islamabad to ramp up business with its neighbor.

Raisi visited the Pakistani capital along with the major cities of Lahore and Karachi from Monday through Wednesday, meeting the nation's president and prime minister as well as the chief ministers of Punjab and Sindh provinces.

It marked the first visit by any head of state to Pakistan since general elections in February and the first trip there by an Iranian president since 2017.

During the tour, the countries agreed to increase the annual value of bilateral trade to $10 billion over the next five years, from $2 billion currently. A statement from the two also referred to setting up joint border markets, economic free zones and working on the long-touted Iran-Pakistan gas pipeline.

Iran completed its section of the pipeline in 2013, but Pakistan has yet to start construction on its segment amid fears of U.S. sanctions. Indeed, experts believe that despite the joint statement, Pakistan is unlikely to move ahead on the pipeline or increase trade volumes with Iran due to American pressure.

Asked about Islamabad's efforts to expand economic engagement with Iran, Vedant Patel, a spokesman for the U.S. State Department, told media on Tuesday, "Let me say broadly we advise anyone considering business deals with Iran to be aware of the potential risk of sanctions."

Muhammad Shoaib, an assistant professor of American studies at Quaid-i-Azam University Islamabad, said that the South Asian country cannot afford to annoy Washington at this time. "Pakistan is pursuing a loan deal with the IMF (International Monetary Fund), which is not possible to get without the consent of the U.S."

However, Qamar Cheema, executive director of the Sanober Institute think tank in Islamabad, said Pakistan would probably try to persuade the U.S. over the issue of the pipeline. "Pakistan will try to convince Americans that cheap gas is necessary for Pakistan to keep inflation down and stop any uprising against the government in case of massive inflation."

The joint statement also touched on border security. "Both sides reiterated the importance of forging regular cooperation and exchange of views between political, military and security officials of the two countries to combat threats such as terrorism, narcotics smuggling, human trafficking, hostage-taking, money laundering and abduction," it read.

Some had hoped for substantial discussions on the issue of cross-border attacks by proxy groups based in the border areas of both countries. But background interviews with multiple officials with knowledge of the visit suggested there were no developments on this topic.

Despite that, experts believe that Pakistan's security institutions want to engage with Iran to curb mistrust between the two sides. "Since Pakistan has a large informal economy, so it will be beneficial to engage more with Iran's informal economy," Cheema said.

Analysts said the primary goal of Raisi's visit was to remove mistrust created after the two countries carried out strikes on each other's territory in January, targeting militants.

"The Iranian government wants to connect with Pakistani society keeping in mind recent Iran-Pakistan tensions," said Cheema.

Shoaib from Quaid-i-Azam University agreed. "This trip was meant to restore the positive public perception of Iran in Pakistan, which was damaged due to the January incident."

Raisi's trip also included visits to the mausoleums of Pakistan's founder Muhammad Ali Jinnah and national poet Allama Iqbal. His wife visited an orphanage and addressed students at multiple universities.

Sabookh Syed, a political analyst based in Islamabad, told Nikkei Asia that goodwill toward Iran has increased in Pakistan after it "stood up to Israel" over the conflict in Gaza. "[Raisi] wanted to further solidify the support for Iran among Pakistani people through public engagement," he added.

Cheema of the Sanober Institute said that Raisi "wanted to cash in on anti-Israel sentiment in Pakistan and wanted [to develop] a connection with the masses knowing the government [of Pakistan] is compromised and has to manage its foreign policy by looking at Western and Arab states."
<p>
    <hr> <!-- Outside the Content (Never edit past this) -->

    <label>Source: </label>
    <a id="InContent_Source">
    </a>
</div>
`

NewsContents.newContent(new NewsContent(cid, ctype, ctitle, cdesc, cdate, csource, cauthor, chtml));

//#endregion

//#region Report 17

cid = 17
ctype = 2 //Sports=1, Foods=2, Politics=3
ctitle = "Quezon City Halo-halo stand-alone store opens 4th branch in time for summer";
cdesc = "MANILA, Philippines - Halo-Halo Story has opened its fourth stand-alone take-away outlet in White Plains West, Quezon City.";
cdate = new Date("2024-04-7T12:00:00"); //APR 7, 2024 12:00 PM PHT+8
csource = "https://www.philstar.com/lifestyle/food-and-leisure/2024/04/07/2345797/quezon-city-halo-halo-stand-alone-store-opens-4th-branch-time-summer"
cauthor = "Dolly Dy-Zulueta.";

chtml = `
<!-- You may edit this (optional)
    cid = 17
    ctype = 2 //Sports=1, Foods=2, Politics=3
    ctitle = "Quezon City Halo-halo stand-alone store opens 4th branch in time for summer";
    cdesc = "MANILA, Philippines - Halo-Halo Story has opened its fourth stand-alone take-away outlet in White Plains West, Quezon City.";
    cdate = new Date("2024-04-7T12:00:00"); //APR 7, 2024 12:00 PM PHT+8
    csource = "https://www.philstar.com/lifestyle/food-and-leisure/2024/04/07/2345797/quezon-city-halo-halo-stand-alone-store-opens-4th-branch-time-summer"
    cauthor = "Dolly Dy-Zulueta.";
-->

<style>
    #InContent { width:786px; }
    #InContent .InContent_Imgs { width:100%; }
    #InContent .InContent_Div { text-align: center; }
    #inContent .InContent_Imgs_port { height:640px; }
</style>

<div id="InContent">

    <!-- Content Info -->
    <h1 id="InContent_Title">Title</h1>
    <div><label>Date: </label><span id="InContent_Date">January 1, 1970</span></div>
    <div><label>Author: </label><span id="InContent_Author">Unknown</span></div>

    <hr> <!-- Inside the Content (Only edit this) -->

    <img class="InContent_Imgs" src="pcover.png"> 
    <h5>Enjoy a tall glass of Halo-Halo Story's best-selling Ubeng Ubeng Ube flavor.    </h5>
    <p>
        MANILA, Philippines - Halo-Halo Story has opened its fourth stand-alone take-away outlet in White Plains West, Quezon City.

        It has already been drawing lines of customers eager to beat the summer heat with a serving of the brand's versions of the popular Filipino cold dessert, Halo-halo. Opening at 11 a.m. daily, the store usually runs out of Halo-halo to sell not too long after.
        
        "It's a problem that I'm glad to do something about," said brand founder and product developer Duncan Yu, who marked the opening of his fourth branch by offering the best-selling Ubeng-Ubeng Ube flavor for only P4 per serving to the first 100 customers who came.
        
        The idea to open Halo-Halo Story came to Yu during the pandemic. "You can find Halo-halo everywhere, but it's just part of a restaurant's menu," he explained. "There's no specialty store for it. Well, there may be a few, but there's no Starbucks of Halo-halo, so to speak."
        
        Thus, Halo-Halo Story came to be, with Yu and his team developing 10 variants with catchy names such as Halo-Halo ng Kapitbahay, Klasik Iskrambol and Ubeng Ube, as well as the uniquely surprising concoctions like Buko Pie, Maja Blanca and Four Cheese.
        
        For this summer, the store offers a special seasonal flavor, Buco Pandan, which is available until May. Also up for grabs is Cinnamon Saba Con Hielo, a variation of another all-time favorite cold refreshment, Saging con Hielo. 
    <p>
    <img class="InContent_Imgs" src="p1.png"> 
    <h5>The fourth store of Halo-Halo Story has been drawing crowds everyday    </h5>
    <p>The three other outlets are located in SM Pasig and SM Sta. Mesa food halls, and a drive-through along Quezon Ave. in Quezon City.

        Halo-Halo Story is among the new breed of Halo-halo brands that has replaced shaved ice with frozen milk as base. "It's the consistency and taste of the frozen milk we use which sets us apart," Yu said. "Others have followed our style for texture, but we manage to make every serving consistent." 
    </p>

    <hr> <!-- Outside the Content (Never edit past this) -->

    <label>Source: </label>
    <a id="InContent_Source">
    </a>
</div>
`

NewsContents.newContent(new NewsContent(cid, ctype, ctitle, cdesc, cdate, csource, cauthor, chtml));

//#endregion

//#region Report 18

cid = 18
ctype = 2 //Sports=1, Foods=2, Politics=3
ctitle = "Valerie Bertinelli says she's 'speechless' after receiving Emmy noms for canceled Food Network show";
cdesc = "Bertinelli's comments come after she was let go from her two Food Network shows in the past year.";
cdate = new Date("2024-04-21T3:53:00"); //APR 21, 2024 3:53 AM PHT+8
csource = "https://www.today.com/food/news/valerie-bertinelli-food-network-rcna147321"
cauthor = "Samantha Kubota";

chtml = `
<!-- You may edit this (optional)
    cid = 18
    ctype = 2 //Sports=1, Foods=2, Politics=3
    ctitle = "Valerie Bertinelli says she's 'speechless' after receiving Emmy noms for canceled Food Network show";
    cdesc = "Bertinelli's comments come after she was let go from her two Food Network shows in the past year.";
    cdate = new Date("2024-04-21T3:53:00"); //APR 21, 2024 3:53 AM PHT+8
    csource = "https://www.today.com/food/news/valerie-bertinelli-food-network-rcna147321"
    cauthor = "By Samantha Kubota.";
-->

<style>
    #InContent { width:786px; }
    #InContent .InContent_Imgs { width:100%; }
    #InContent .InContent_Div { text-align: center; }
    #inContent .InContent_Imgs_port { height:640px; }
</style>

<div id="InContent">

    <!-- Content Info -->
    <h1 id="InContent_Title">Title</h1>
    <div><label>Date: </label><span id="InContent_Date">January 1, 1970</span></div>
    <div><label>Author: </label><span id="InContent_Author">Unknown</span></div>

    <hr> <!-- Inside the Content (Only edit this) -->

    <img class="InContent_Imgs" src="pcover.png"> 
    <p>
        Congrats are in order to longtime Food Network star and actor Valerie Bertinelli.

On April 19, Bertinelli's now-canceled Food Network show, "Valerie's Home Cooking," was nominated for two Daytime Emmys: one for outstanding culinary series, and one for Bertinelli as outstanding culinary host.

After the nominations were announced, the celeb chef took to her Instagram Stories to react to the news.

In one post she wrote, "I am speechless!!" over a screenshot of the Daytime Emmy announcement.

In a following slide, which highlighted the show's two nominations, she captioned a similar screenshot with the message, "I can't believe it!"

She also shouted out her show's team, calling them "The absolute best team," in a third Instagram Story.
    <p>

    <div class="InContent_Div">
        <img class="InContent_Imgs_port" src="p1.png"> 
    </div>

    <h5>Valerie Bertinelli shares her Daytime Emmy nomination.@wolfiesmom / Instagram    </h5>
    <p>
        Bertinelli's Emmy nods come after the Food Network star revealed that she was unhappy with the current direction of network.

        In a post shared to Threads on April 9, Bertinelli responded to a post that reminisced about "actual cooking shows" on the network.
        </p>

    <hr> <!-- Outside the Content (Never edit past this) -->

    <label>Source: </label>
    <a id="InContent_Source">
    </a>
</div>
`

NewsContents.newContent(new NewsContent(cid, ctype, ctitle, cdesc, cdate, csource, cauthor, chtml));

//#endregion

//#region Report 19

cid = 19
ctype = 2 //Sports=1, Foods=2, Politics=3
ctitle = "GoGo squeeZ debuts snack pouches for active lifestyles";
cdesc = "NEW YORK - MOM Group brand GoGo squeeZ has unveiled a new shelf-stable fruit snack made for active teenagers and young adults.";
cdate = new Date("2024-04-24T21:24:00"); //APR 24, 2024 9:24 PM PHT+8
csource = "https://www.foodbusinessnews.net/articles/25954-gogo-squeez-debuts-snack-pouches-for-active-lifestyles"
cauthor = "Caleb Wilson";

chtml = `
<!-- You may edit this (optional)
    cid = 19
    ctype = 2 //Sports=1, Foods=2, Politics=3
    ctitle = "GoGo squeeZ debuts snack pouches for active lifestyles";
    cdesc = "NEW YORK - MOM Group brand GoGo squeeZ has unveiled a new shelf-stable fruit snack made for active teenagers and young adults.";
    cdate = new Date("2024-04-24T21:24:00"); //APR 24, 2024 9:24 PM PHT+8
    csource = "https://www.foodbusinessnews.net/articles/25954-gogo-squeez-debuts-snack-pouches-for-active-lifestyles"
    cauthor = "By Caleb Wilson.";
-->

<style>
    #InContent { width:786px; }
    #InContent .InContent_Imgs { width:100%; }
    #InContent .InContent_Div { text-align: center; }
    #inContent .InContent_Imgs_port { height:640px; }
</style>

<div id="InContent">

    <!-- Content Info -->
    <h1 id="InContent_Title">Title</h1>
    <div><label>Date: </label><span id="InContent_Date">January 1, 1970</span></div>
    <div><label>Author: </label><span id="InContent_Author">Unknown</span></div>

    <hr> <!-- Inside the Content (Only edit this) -->

    <img class="InContent_Imgs" src="pcover.png"> 
    <h5>U.S. President Joe Biden is flanked by Secretary of State Antony Blinken, left, and Secretary of Defense Lloyd Austin at a cabinet meeting at the White House in October 2023. Blinken and Austin have been tasked with deepening U.S.-Japan defense relations through the 2+2 meeting. Copyright Reuters</h5>
    <p>
        NEW YORK - MOM Group brand GoGo squeeZ has unveiled a new shelf-stable fruit snack made for active teenagers and young adults.

        Packaged within a convenient, squeezable pouch format, GoGo squeeZ Active Fruit Blend contains electrolytes, antioxidants and vitamins C, A and E. The snack is designed specifically to help recover potassium, sodium and magnesium expended during physical activity, and each serving contains 60 calories per serving and between 11 to 12 grams of sugar. Flavors at launch include strawberry pineapple orange, cherry raspberry lime and blueberry strawberry lemon.
        
        "We are energized to introduce GoGo squeeZ Active Fruit Blend with electrolytes to active individuals who are on-the-go," said Mark Anthony Edmonson, chief marketing officer for the company.
        
        The product is now available in 18-count quantities at Sam's Club stores for $14.98 and in 10-count quantities for $9.99 at Target locations. GoGo squeeZ expects to add additional retail availability for the 10-count packs beginning in May, including Walmart, Kroger and online through Amazon.
    <p>
    <hr> <!-- Outside the Content (Never edit past this) -->

    <label>Source: </label>
    <a id="InContent_Source">
    </a>
</div>
`

NewsContents.newContent(new NewsContent(cid, ctype, ctitle, cdesc, cdate, csource, cauthor, chtml));

//#endregion

//#region Report 20

cid = 20
ctype = 2 //Sports=1, Foods=2, Politics=3
ctitle = "Slideshow: Getting saucy with the latest condiment innovation";
cdesc = "KANSAS CITY - Restaurant-inspired flavors are sweeping through the condiment aisle, as more food manufacturers are updating sauce portfolios.";
cdate = new Date("2024-04-24T21:24:00"); //APR 24, 2024 9:24 PM PHT+8
csource = "https://www.foodbusinessnews.net/articles/25953-slideshow-getting-saucy-with-the-latest-condiment-innovation"
cauthor = "Sarah Straughn.";

chtml = `
<!-- You may edit this (optional)
    cid = 20
    ctype = 2 //Sports=1, Foods=2, Politics=3
    ctitle = "Slideshow: Getting saucy with the latest condiment innovation";
    cdesc = "KANSAS CITY - Restaurant-inspired flavors are sweeping through the condiment aisle, as more food manufacturers are updating sauce portfolios.";
    cdate = new Date("2024-04-24T21:24:00"); //APR 24, 2024 9:24 PM PHT+8
    csource = "https://www.foodbusinessnews.net/articles/25953-slideshow-getting-saucy-with-the-latest-condiment-innovation"
    cauthor = "Sarah Straughn.";
-->

<style>
    #InContent { width:786px; }
    #InContent .InContent_Imgs { width:100%; }
    #InContent .InContent_Div { text-align: center; }
    #inContent .InContent_Imgs_port { height:640px; }
</style>

<div id="InContent">

    <!-- Content Info -->
    <h1 id="InContent_Title">Title</h1>
    <div><label>Date: </label><span id="InContent_Date">January 1, 1970</span></div>
    <div><label>Author: </label><span id="InContent_Author">Unknown</span></div>

    <hr> <!-- Inside the Content (Only edit this) -->

    <img class="InContent_Imgs" src="pcover.png"> 
    <p>
        KANSAS CITY - Restaurant-inspired flavors are sweeping through the condiment aisle, as more food manufacturers are updating sauce portfolios.

Companies like Primal Kitchen are bringing restaurant-inspired flavors into their portfolios. The brand recently expanded with four condiments, including a Chicken Dippin' sauce, a Special sauce, a Yum Yum sauce, and an avocado lime sauce.

"Dipping sauces have quickly become a pantry staple for consumers, with one in four US households now purchasing the subcategory," said Audrey Burger, head of commercial strategy, insights and planning at Primal Kitchen. "However, the current options at shelf rely heavily on seed oils, like soybean or canola, refined sugars and artificial ingredients. Our new dipping sauces bring you all the flavor of restaurant favorites, with the high-quality ingredients you've grown to expect from Primal Kitchen."

The Kraft Heinz Co. also is throwing its hat into the restaurant-inspired ring with its latest launch from the newly formed Kraft Sauces portfolio.

"We know that 30% of our consumers are already purchasing Kraft sauces in multiple categories," said Alan Kleinerman, vice president of global disruptive innovation at Kraft Heinz. "By uniting our sauces, spreads and salad dressings under one masterbrand, we're transforming Kraft Sauces to create a toolkit of flavorful enhancers that consumers can use however they like and drive greater value."

To mark the rebrand and first logo chancge in 10 years, Kraft Sauces debuted a Creamy Sauces line, which features offerings like garlic aioli, chipotle aioli, burger aioli, smoky hickory bacon-flavored aioli and Buffalo-style mayonnaise dressing.

"Our insights show 77% of consumers are eager to explore new aioli flavors, so we saw an opportunity to give our consumers what they're looking for while also strengthening our position as a leader in sauce innovation," Kleinerman said.

San Diego-based Chosen Foods debuted its own take on restaurant sauces with the introduction of the "Dip & Drizzle" line. The line includes three sauces, a chicken sauce, which features a mustardy kick and a sweet finish; a burger sauce, which is a blend of tangy, mustardy and oniony flavors; and an everything bagel sauce, which has a creamy and garlic flavor with poppy seeds.


    <p>
    <hr> <!-- Outside the Content (Never edit past this) -->

    <label>Source: </label>
    <a id="InContent_Source">
    </a>
</div>
`

NewsContents.newContent(new NewsContent(cid, ctype, ctitle, cdesc, cdate, csource, cauthor, chtml));

//#endregion

//#region Report 21

cid = 21
ctype = 2 //Sports=1, Foods=2, Politics=3
ctitle = "New school meal standards take aim at added sugars";
cdesc = "WASHINGTON - The US Department of Agriculture is seeking to reduce the added sugars and further reduce the sodium formulated into school meals, according to a final rule published April 24 in the Federal Register.";
cdate = new Date("2024-04-24T21:24:00"); //APR 24, 2024 9:24 PM PHT+8
csource = "https://www.foodbusinessnews.net/articles/25959-new-school-meal-standards-take-aim-at-added-sugars"
cauthor = "Keith Nunes";

chtml = `
<!-- You may edit this (optional)
    cid = 21
    ctype = 2 //Sports=1, Foods=2, Politics=3
    ctitle = "New school meal standards take aim at added sugars";
    cdesc = "WASHINGTON - The US Department of Agriculture is seeking to reduce the added sugars and further reduce the sodium formulated into school meals, according to a final rule published April 24 in the Federal Register.";
    cdate = new Date("2024-04-24T21:24:00"); //APR 24, 2024 9:24 PM PHT+8
    csource = "https://www.foodbusinessnews.net/articles/25959-new-school-meal-standards-take-aim-at-added-sugars"
    cauthor = "By Keith Nunes.";
-->

<style>
    #InContent { width:786px; }
    #InContent .InContent_Imgs { width:100%; }
    #InContent .InContent_Div { text-align: center; }
    #inContent .InContent_Imgs_port { height:640px; }
</style>

<div id="InContent">

    <!-- Content Info -->
    <h1 id="InContent_Title">Title</h1>
    <div><label>Date: </label><span id="InContent_Date">January 1, 1970</span></div>
    <div><label>Author: </label><span id="InContent_Author">Unknown</span></div>

    <hr> <!-- Inside the Content (Only edit this) -->

    <img class="InContent_Imgs" src="pcover.png"> 
    <p>
        WASHINGTON - The US Department of Agriculture is seeking to reduce the added sugars and further reduce the sodium formulated into school meals, according to a final rule published April 24 in the Federal Register.

        The agency is planning to implement a two-phase approach to lowering added sugars levels. Phase 1 will target the added sugar content of specific products and phase 2 will establish weekly limits.
        
        Beginning July 1, 2025, breakfast cereals served in schools may have no more than 6 grams of added sugars per dry ounce; yogurt may have no more than 12 grams of added sugars per 6 ounces (2 grams of added sugars per ounce); and flavored milk may have no more than 10 grams of added sugars per fluid ounces or, for flavored milk sold as a competitive food for middle and high schools, 15 grams of added sugars per 12 fluid ounce.
        
        Beginning July 1, 2027, in addition to the product-based limits included in phase 1, the USDA has established a dietary specification limiting added sugars to less than 10% of calories across the week in the school lunch and breakfast programs.
        
        "Schools have many ways to reduce the amounts of added sugars in their menus, such as using fruit as a sweetener in recipes and reducing the frequency of high-sugar items offered during the week," according to the USDA.
        
        "As we have repeatedly made clear, the Sugar Association supports the Dietary Guidelines for Americans (DGA) recommendation to limit added sugars to 10% of total calories, as part of healthy dietary patterns," said Courtney Gaine, president and chief executive officer of the Sugar Association. "While limiting added sugars to 10% of each week's school meals menu is consistent with the DGA, applying arbitrary sugar limits to individual products like cereals and flavored dairy is certainly not."     
        
        The USDA also is focused on further reducing the amount of sodium school children consume. Beginning July 1, 2027, schools will implement an approximate 15% reduction in sodium for lunch and an approximate 10% reduction for breakfast from the current sodium limits. The reductions will mean children eating school lunches that are in kindergarten through 5th grade will be limited to no more than 935 mg of sodium; children in grades 6th to 8th will be limited to 1,035 mg; and children in grades 9th to 12th will be limited to 1,080 mg. For breakfast, the groups will be limited to 485 mg, 535 mg and 570 mg, respectively.
        
        In the rule, the USDA emphasized that the limits apply to the average amount of sodium in lunch and breakfast menus offered during a school week. The sodium limits do not apply per day, per meal, or per menu item.  
        
        The USDA also updated how it defines the phrase "whole-grain rich" to indicate the grain content of a product is between 50% and 100% whole grain with any remaining grains being enriched.
        
        "This definition aligns with the current definition and meaning of whole grain-rich in school meals, which was previously included only in USDA policy guidance," according to the agency. 
<p>
    <hr> <!-- Outside the Content (Never edit past this) -->

    <label>Source: </label>
    <a id="InContent_Source">
    </a>
</div>
`

NewsContents.newContent(new NewsContent(cid, ctype, ctitle, cdesc, cdate, csource, cauthor, chtml));

//#endregion

//#region Report 22

cid = 22
ctype = 2 //Sports=1, Foods=2, Politics=3
ctitle = "GNT names color directions affecting food, beverage industry";
cdesc = `MIERLO, THE NETHERLANDS -  GNT, a supplier of plant-based Exberry colors, said "Regeneration Rising" is becoming a popular trend among the food and beverage industries.`;
cdate = new Date("2024-04-24T21:24:00"); //APR 24, 2024 9:24 PM PHT+8
csource = "https://www.foodbusinessnews.net/articles/25958-gnt-names-color-directions-affecting-food-beverage-industry"
cauthor = "Brooke Just";

chtml = `
<!-- You may edit this (optional)
    cid = 22
    ctype = 2 //Sports=1, Foods=2, Politics=3
    ctitle = "GNT names color directions affecting food, beverage industry";
    cdesc = "MIERLO, THE NETHERLANDS -  GNT, a supplier of plant-based Exberry colors, said "Regeneration Rising" is becoming a popular trend among the food and beverage industries.";
    cdate = new Date("2024-04-24T21:24:00"); //APR 24, 2024 9:24 PM PHT+8
    csource = "https://www.foodbusinessnews.net/articles/25958-gnt-names-color-directions-affecting-food-beverage-industry"
    cauthor = "By Brooke Just.";
-->

<style>
    #InContent { width:786px; }
    #InContent .InContent_Imgs { width:100%; }
    #InContent .InContent_Div { text-align: center; }
    #inContent .InContent_Imgs_port { height:640px; }
</style>

<div id="InContent">

    <!-- Content Info -->
    <h1 id="InContent_Title">Title</h1>
    <div><label>Date: </label><span id="InContent_Date">January 1, 1970</span></div>
    <div><label>Author: </label><span id="InContent_Author">Unknown</span></div>

    <hr> <!-- Inside the Content (Only edit this) -->

    <img class="InContent_Imgs" src="pcover.png"> 
    <p>
        MIERLO, THE NETHERLANDS -  GNT, a supplier of plant-based Exberry colors, said "Regeneration Rising" is becoming a popular trend among the food and beverage industries.

"Regeneration Rising" consists of three color directions of "Elevated Earth," "Nature Lab," and "Wholesome Nostalgia."

"Elevated Earth" features earthy shades, including red-browns, warm oranges, textured purples and inky teals. These colors may help elevate products with an organic but premium look and feel, according to the company.

"Nature Lab" encompasses a range of colors from green, pink, red, yellow, orange and blue.

"Wholesome Nostalgia" welcomes such colors as yellow, green, blue, peach and pink that offer a velvet-like to milky, translucent, muted and dreamlike appeal, the company said.

"Consumers of all ages are developing a much stronger interest in sustainability and rebuilding their relationships with the natural world," said Dieuwertje Raaijmakers, marketing communications specialist at GNT Group. "To appeal to these shoppers, food and beverage companies have to showcase their commitment to the planet. Color can play an important role in telling that story, helping brands create appealing products that send out strong visual signals about how they're produced."
<p>
    <hr> <!-- Outside the Content (Never edit past this) -->

    <label>Source: </label>
    <a id="InContent_Source">
    </a>
</div>
`

NewsContents.newContent(new NewsContent(cid, ctype, ctitle, cdesc, cdate, csource, cauthor, chtml));

//#endregion

//#region Report 23

cid = 23
ctype = 2 //Sports=1, Foods=2, Politics=3
ctitle = "Pet Food Processing Exchange announces speaker lineup";
cdesc = "KANSAS CITY - Pet Food Processing magazine and parent company Sosland Publishing Company announce the speaker lineup for the inaugural Pet Food Processing Exchange, an educational and networking event to be held Oct. 7 to 8 in Kansas City, at the InterContinental on the Country Club Plaza. The goal of the inaugural event is to unite industry influencers, thought leaders and decision makers.";
cdate = new Date("2024-04-24T21:24:00"); //APR 24, 2024 9:24 PM PHT+8
csource = "https://www.foodbusinessnews.net/articles/25950-pet-food-processing-exchange-announces-speaker-lineup"
cauthor = "Kimberlie Clyma";

chtml = `
<!-- You may edit this (optional)
    cid = 23
    ctype = 2 //Sports=1, Foods=2, Politics=3
    ctitle = "Pet Food Processing Exchange announces speaker lineup";
    cdesc = "KANSAS CITY - Pet Food Processing magazine and parent company Sosland Publishing Company announce the speaker lineup for the inaugural Pet Food Processing Exchange, an educational and networking event to be held Oct. 7 to 8 in Kansas City, at the InterContinental on the Country Club Plaza. The goal of the inaugural event is to unite industry influencers, thought leaders and decision makers.";
    cdate = new Date("2024-04-24T21:24:00"); //APR 24, 2024 9:24 PM PHT+8
    csource = "https://www.foodbusinessnews.net/articles/25950-pet-food-processing-exchange-announces-speaker-lineup"
    cauthor = "By Kimberlie Clyma.";
-->

<style>
    #InContent { width:786px; }
    #InContent .InContent_Imgs { width:100%; }
    #InContent .InContent_Div { text-align: center; }
    #inContent .InContent_Imgs_port { height:640px; }
</style>

<div id="InContent">

    <!-- Content Info -->
    <h1 id="InContent_Title">Title</h1>
    <div><label>Date: </label><span id="InContent_Date">January 1, 1970</span></div>
    <div><label>Author: </label><span id="InContent_Author">Unknown</span></div>

    <hr> <!-- Inside the Content (Only edit this) -->

    <img class="InContent_Imgs" src="pcover.png"> 
    <p>
        KANSAS CITY - Pet Food Processing magazine and parent company Sosland Publishing Company announce the speaker lineup for the inaugural Pet Food Processing Exchange, an educational and networking event to be held Oct. 7 to 8 in Kansas City, at the InterContinental on the Country Club Plaza. The goal of the inaugural event is to unite industry influencers, thought leaders and decision makers.

Attendees will include pet food and treat manufacturers as well as professionals involved in animal nutrition, ingredient development, food science, product development, food safety, processing and packaging technologies.

"The inaugural Pet Food Processing Exchange will offer attendees the chance to expand their knowledge about the formulation, production and safety of pet food through topical presentations given by leaders in the industry," said Dave Crost, publisher of Pet Food Processing. "Our team has put together an agenda covering topics ranging from ingredient formulation, supply chain challenges, exporting opportunities, recall protection, sustainable packaging and so much more.

"You also won't want to miss the perspectives and insights that will be shared by our State of the Industry panel and during the Plant of the Future session," Crost added.

Speakers presenting during the 1 1/2-day event represent pet food processing organizations, industry associations and supplier companies. Other subject matter experts from the fields of animal nutrition, data analysis, supply chain logistics, legal, design and automation will share their knowledge on-stage.

The Pet Food Processing Exchange agenda includes:

A Look at the Pet Food Industry: Today and Tomorrow - A broad look at today's pet food and treat industry, the trends affecting the industry, and where things are headed. (Seth Kaufman and Nate Thomas, co-founders of BSM Partners)

All About the Ingredients - Pet food processors look to the latest and greatest ingredients when formulating new pet food and treat products. Find out what new and existing ingredients are finding their way into today's pet food formulations. (Brittany White, Ph.D., senior director of product development, innovation and applied research, Simmons Pet Food)

Finding Partners: Co-manufacturing Opportunities - With the increasing influx of new pet food products entering the market annually, the persistent obstacle lies in discovering suitable manufacturers to produce them. In this session, you'll gain insight into the essential qualities to look for in a co-manufacturing partner. (Worth Turner, chief executive officer, Custom Veterinary Services)

Supply Chain Challenges, Transportation and Industry Economics - Learn how to navigate ongoing supply chain obstacles and transportation challenges while maintaining profitability. (Jim Ritchie, CEO, RedStone Logistics, and instructor, University of Kansas School of Business)

Global Market Opportunities: Expansion Through Exporting - With the remarkable surge in pet food sales worldwide, find out how you can capitalize on this growth and successfully navigate this potentially arduous process. (Mallory Gaines, director of market access and trade policy, American Feed Industry Association)

Leveraging Data for Business Growth - From market research to consumer data, how can processors use valuable data-driven insights to help guide product development and drive profitability? (Andrea Binder, vice president of retail account development, NielsenIQ)

State of the Industry Panel - Hear from leaders in the pet food and treat industry as they share insights into the state of today's ever-changing pet food industry. (Jeremy Couture, director of business development – Pet Specialty Group, Nestlé Purina PetCare; Scott Krebs, president, Wenger Group; Amy Patterson, president, Petsource by Scoular; and Tom Rychlewski, vice president, Food and Beverage Operations, CRB)

The Plant of the Future - As pet food processors strategize their long-term capital investments, what would be the optimal blueprint for the plant of tomorrow? (Tyler Cundiff, president, Integrated Process Group, Gray; Billy Gillispie, client delivery partner, Microsoft; and Brian Lakari, vice president of operations, Carnivore Meat Company)

Recall Protection and Prevention: Keeping Pets and Pet Food Safe - Processors are tasked with delivering safe pet food to the pet parents that rely on them. Learn about how processors can keep those products safe during and after processing. (Billie Johnson, Ph.D., food safety and regulatory compliance manager, BHJ North America)

Sustainability and Pet Food Packaging - How can pet food manufacturers make conscious choices regarding packaging that's right for their products and that align in terms of design, functionality and branding, all while considering the environmental impacts? (Ali Boden, senior packaging manager, Pet Sustainability Coalition)

Legal Considerations for Overseas Partnerships - As US pet food processors consider overseas distribution, it's important to understand the legal requirements surrounding potential sales, manufacturing, and joint development arrangements. (Fang Shen, partner, Husch Blackwell)

Emerging Trends in New Product Development - What factors are fueling the latest advancements in pet food, treats and supplements? (Stephanie Clark, Ph.D., companion animal nutritionist, BSM Partners)
<p>
    <hr> <!-- Outside the Content (Never edit past this) -->

    <label>Source: </label>
    <a id="InContent_Source">
    </a>
</div>
`

NewsContents.newContent(new NewsContent(cid, ctype, ctitle, cdesc, cdate, csource, cauthor, chtml));

//#endregion

//#region Report 24

cid = 24
ctype = 2 //Sports=1, Foods=2, Politics=3
ctitle = "Quaker recalls continue to cut into PepsiCo results";
cdesc = "PURCHASE, NY. - PepsiCo, Inc. posted revenue growth of 2.3% in the first quarter ended March 23 despite the impact of product recalls at Quaker Foods North America and comparisons against high revenue growth in the previous year's first quarter.";
cdate = new Date("2024-04-24T21:24:00"); //APR 24, 2024 9:24 PM PHT+8
csource = "https://www.foodbusinessnews.net/articles/25951-quaker-recalls-continue-to-cut-into-pepsico-results"
cauthor = "Jeff Gelski";

chtml = `
<!-- You may edit this (optional)
    cid = 24
    ctype = 2 //Sports=1, Foods=2, Politics=3
    ctitle = "Quaker recalls continue to cut into PepsiCo results";
    cdesc = "PURCHASE, NY. - PepsiCo, Inc. posted revenue growth of 2.3% in the first quarter ended March 23 despite the impact of product recalls at Quaker Foods North America and comparisons against high revenue growth in the previous year's first quarter.";
    cdate = new Date("2024-04-24T21:24:00"); //APR 24, 2024 9:24 PM PHT+8
    csource = "https://www.foodbusinessnews.net/articles/25951-quaker-recalls-continue-to-cut-into-pepsico-results"
    cauthor = "By Jeff Gelski.";
-->

<style>
    #InContent { width:786px; }
    #InContent .InContent_Imgs { width:100%; }
    #InContent .InContent_Div { text-align: center; }
    #inContent .InContent_Imgs_port { height:640px; }
</style>

<div id="InContent">

    <!-- Content Info -->
    <h1 id="InContent_Title">Title</h1>
    <div><label>Date: </label><span id="InContent_Date">January 1, 1970</span></div>
    <div><label>Author: </label><span id="InContent_Author">Unknown</span></div>

    <hr> <!-- Inside the Content (Only edit this) -->

    <img class="InContent_Imgs" src="pcover.png"> 
S    <p>
        PURCHASE, NY. - PepsiCo, Inc. posted revenue growth of 2.3% in the first quarter ended March 23 despite the impact of product recalls at Quaker Foods North America and comparisons against high revenue growth in the previous year's first quarter.

Net income increased 6% to $2.04 billion, or $1.48 per share on the common stock, from $1.93 billion, or $1.40 per share, in the previous year's first quarter. Revenues of $18.25 billion were up from $17.85 billion.

Organic revenue increased 2.7%, which compared with 14% in the previous year's first quarter. The recalls at QFNA had a negative impact of one percentage point on organic revenue in this year's first quarter.  PepsiCo continues to expect at least 4% organic revenue growth in the fiscal year.

BofA maintained a "buy" rating for PepsiCo, noting organic sales growth was in line with BofA's estimates.

"We believe (PepsiCo's) premium to non-alcoholic beverage peer average of 23 times is warranted by their strengthened position and pricing power to manage through the ongoing inflationary environment," said Bryan D. Spillane, research analyst at BofA.

PepsiCo gave its financial results on April 23. The company's stock price on the Nasdaq that day closed at $171.22 per share, which was down 3% from an April 22 close of $176.46.

Ramon Luis Laguarta, chief executive officer of PepsiCo, said he sees two reasons for optimism in North America.

"No. 1, I think wages are growing above inflation, and we see that not only in the US but across the world, and we see our consumer packaged food inflation below, I would say, total CPI (Consumer Price Index)," he said in an April 23 earnings call. "So those two numbers make us feel comfortable that the consumers will start coming back to our categories."

Within Frito-Lay North America, revenue rose 1.7% to $5.68 billion from $5.58 billion. An organic revenue increase of 2% compared to 16% in the previous year's first quarter. Cheetos and Doritos delivered mid-single-digit revenue growth while smaller brands like Miss Vickie's and Bare that are geared to specialty occasions or positive choices had double-digit revenue growth. SunChips had high single-digit revenue growth. PopCorners and Stacy's each delivered mid-single-digit revenue growth.

Within PepsiCo Beverages North America, revenue increased 1.2% to $5.87 billion from $5.80 billion. Zero-sugar varieties of the brands Pepsi and Mountain Dew powered the revenue increase. Market share in Gatorade improved. Organic revenue at PBNA increased 1%, which compared with 12% in the previous year's first quarter.

While Laguarta acknowledged volumes were weak for Gatorade in the quarter, he added the brand and Mountain Dew gained market share.

"So that's a meaningful good performance, I would say," he said. "Now Gatorade, as you mentioned, a little bit of weather impact. So we're not concerned about Gatorade this year as the weather improves, I think we have the right investments, the right commercial programs."

PepsiCo plans to "de-emphasize" certain low-profit or no-profit product and package combinations within PBNA.

Revenue at QFNA plunged 24% to $593 million from $777 million while volume fell 22%. The operating loss at QFNA was $49 million. As the year progresses PepsiCo expects QFNA production to increase and financial impacts associated with the product recalls to moderate.

Last December a voluntary recall at Quaker involved select granola bars and cereals in the United States, Puerto Rico, Guam and Spain due to potential contamination of Salmonella. Quaker in April of this year said it permanently will close a facility in Danville, Ill., linked to the recall.

Internationally, sales increased 16% to $2.01 billion in Latin America, 2.7% to $1.94 billion in Europe, 2.1% to $1.04 billion in Africa, Middle East and Southeast Asia, and 6% to $1.06 billion in Asia Pacific, Australia and New Zealand, and China. PepsiCo recently opened a factory in Poland and plans to open factories in Vietnam, China, India and Mexico, Laguarta said.


<p>
    <hr> <!-- Outside the Content (Never edit past this) -->

    <label>Source: </label>
    <a id="InContent_Source">
    </a>
</div>
`

NewsContents.newContent(new NewsContent(cid, ctype, ctitle, cdesc, cdate, csource, cauthor, chtml));

//#endregion

//#region Report 25

cid = 25
ctype = 2 //Sports=1, Foods=2, Politics=3
ctitle = "Mang Inasal launches all-in-one meal via Solo Fiesta";
cdesc = "As an answer to the public's strong desire for a complete Ihaw-Sarap and Unli-Saya experience, Mang Inasal, the Philippines' Grill Expert, introduces the all-in-one meal perfect for all Mang Inasal fans - the Solo Fiesta!";
cdate = new Date("2024-04-5T16:45:00"); //APR 5, 2024 5:45 PM PHT+8
csource = "https://business.inquirer.net/453480/mang-inasal-launches-all-in-one-meal-via-solo-fiesta"
cauthor = "Mang Inasal President Mike V. Castro.";

chtml = `
<!-- You may edit this (optional)
    cid = 25
    ctype = 2 //Sports=1, Foods=2, Politics=3
    ctitle = "Mang Inasal launches all-in-one meal via Solo Fiesta";
    cdesc = "As an answer to the public's strong desire for a complete Ihaw-Sarap and Unli-Saya experience, Mang Inasal, the Philippines' Grill Expert, introduces the all-in-one meal perfect for all Mang Inasal fans - the Solo Fiesta!";
    cdate = new Date("2024-04-5T16:45:00"); //APR 5, 2024 5:45 PM PHT+8
    csource = "https://business.inquirer.net/453480/mang-inasal-launches-all-in-one-meal-via-solo-fiesta"
    cauthor = "Mang Inasal President Mike V. Castro.";
-->

<style>
    #InContent { width:786px; }
    #InContent .InContent_Imgs { width:100%; }
    #InContent .InContent_Div { text-align: center; }
    #inContent .InContent_Imgs_port { height:640px; }
</style>

<div id="InContent">

    <!-- Content Info -->
    <h1 id="InContent_Title">Title</h1>
    <div><label>Date: </label><span id="InContent_Date">January 1, 1970</span></div>
    <div><label>Author: </label><span id="InContent_Author">Unknown</span></div>

    <hr> <!-- Inside the Content (Only edit this) -->

    <img class="InContent_Imgs" src="pcover.png"> 
    <p>
        "The Mang Inasal Solo Fiesta combines all of our customers' favorites - from Chicken Inasal Paa or Pecho and Pork BBQ, to Palabok, Lumpiang Togue, and Java Rice," said Mang Inasal President Mike V. Castro. "It's something that we are excited for everyone to enjoy because a lot have requested for a solo version of our Fiesta bundles. And now, our customers in Luzon can try it." 

Starting at a dine-in price of P189, Solo Fiesta comes in five different bundles perfect for anyone's cravings. It is a complete meal with the Ihaw-Sarap Mang Inasal Chicken Inasal and/or Pork BBQ, combined with Palabok, Java Rice, and their recently launched Lumpiang Togue.

Enjoy Mang Inasal Solo Fiesta now through dine-in or takeout at Mang Inasal stores in Luzon It can also be ordered via delivery through the Mang Inasal Delivery App, https://manginasaldelivery.com.ph/ or through food delivery apps GrabFood and FoodPanda. 
<p>

    <div class="InContent_Div">
    <img class="InContent_Imgs_port" src="p1.png"> 
</div>

    <p>Want more Mang Inasal exclusives NOW? Visit www.manginasal.ph for the latest news, https://manginasaldelivery.com.ph for delivery deals, and follow Mang Inasal on social media for more Ihaw-Sarap and Unli-Saya updates!
    </p>

    <hr> <!-- Outside the Content (Never edit past this) -->

    <label>Source: </label>
    <a id="InContent_Source">
    </a>
</div>
`

NewsContents.newContent(new NewsContent(cid, ctype, ctitle, cdesc, cdate, csource, cauthor, chtml));

//#endregion

//#region Report 26

cid = 26
ctype = 2 //Sports=1, Foods=2, Politics=3
ctitle = "Craving for Lumpiang Togue? Mang Inasal offers it for only P29";
cdesc = "Mang Inasal, the Philippines' Grill Expert, has recently launched its new Lumpiang Togue at all its stores in Luzon.";
cdate = new Date("2024-03-16T13:40:00"); //MARCH 16, 2024 1:40 PM PHT+8
csource = "https://business.inquirer.net/450418/craving-for-lumpiang-togue-mang-inasal-offers-it-for-only-%e2%82%b129"
cauthor = "Mang Inasal President Mike V. Castro..";

chtml = `
<!-- You may edit this (optional)
    cid = 26
    ctype = 2 //Sports=1, Foods=2, Politics=3
    ctitle = "Craving for Lumpiang Togue? Mang Inasal offers it for only P29";
    cdesc = "Mang Inasal, the Philippines' Grill Expert, has recently launched its new Lumpiang Togue at all its stores in Luzon.";
    cdate = new Date("2024-03-16T13:40:00"); //MARCH 16, 2024 1:40 PM PHT+8
    csource = "https://business.inquirer.net/450418/craving-for-lumpiang-togue-mang-inasal-offers-it-for-only-%e2%82%b129"
    cauthor = "Mang Inasal President Mike V. Castro..";
-->

<style>
    #InContent { width:786px; }
    #InContent .InContent_Imgs { width:100%; }
    #InContent .InContent_Div { text-align: center; }
    #inContent .InContent_Imgs_port { height:640px; }
</style>

<div id="InContent">

    <!-- Content Info -->
    <h1 id="InContent_Title">Title</h1>
    <div><label>Date: </label><span id="InContent_Date">January 1, 1970</span></div>
    <div><label>Author: </label><span id="InContent_Author">Unknown</span></div>

    <hr> <!-- Inside the Content (Only edit this) -->

    <img class="InContent_Imgs" src="pcover.png"> 
    <p>
        "This is our response to our customers who have been requesting for the return of their favorite snack at Mang Inasal," said Mang Inasal President Mike V. Castro. "Now, they can enjoy our crispy, crunchy, and delicious Lumpiang Togue anytime they want. It's a perfect add-on to our Ihaw-Sarap rice meals and even as an individual snack!"

    </p>
    <div class="InContent_Div">
        <img class="InContent_Imgs_port" src="p1.png"> 
    </div>
    <p>For as low as P29 per piece as an add-on to your rice meal, Mang Inasal Lumpiang Togue can now be enjoyed via dine-in, takeout, and delivery at all stores in Luzon. Customers can also order two pieces or six pieces Lumpiang Togue, which are perfect for takeout or delivery.

    </p>
    <div class="InContent_Div">
        <img class="InContent_Imgs_port" src="p2.png"> 
    </div>
    <p>Want more Mang Inasal exclusives NOW? Visit www.manginasal.ph for the latest news, https://manginasaldelivery.com.ph for delivery deals, and follow Mang Inasal on social media for more Ihaw-Sarap and Unli-Saya updates!

        </p>

    <hr> <!-- Outside the Content (Never edit past this) -->

    <label>Source: </label>
    <a id="InContent_Source">
    </a>
</div>
`

NewsContents.newContent(new NewsContent(cid, ctype, ctitle, cdesc, cdate, csource, cauthor, chtml));

//#endregion

//#region Report 27

cid = 27
ctype = 2 //Sports=1, Foods=2, Politics=3
ctitle = "PH seen to import more rice as harvest may fall short this year";
cdesc = "The Philippines is seen to import more rice than earlier expected this year-remaining as the biggest rice buyer in the global market-amid a likely larger shortfall in local harvest.";
cdate = new Date("2024-03-11T2:11:00"); //MARCH 11, 2024 2:11 AM PHT+8
csource = "https://business.inquirer.net/449449/ph-seen-to-import-more-rice-as-harvest-may-fall-short-this-year"
cauthor = "Jordeene B. Lagare";

chtml = `
<!-- You may edit this (optional)
    cid = 27
    ctype = 2 //Sports=1, Foods=2, Politics=3
    ctitle = "PH seen to import more rice as harvest may fall short this year";
    cdesc = "The Philippines is seen to import more rice than earlier expected this year-remaining as the biggest rice buyer in the global market-amid a likely larger shortfall in local harvest.";
    cdate = new Date("2024-03-11T2:11:00"); //MARCH 11, 2024 2:11 AM PHT+8
    csource = "https://business.inquirer.net/449449/ph-seen-to-import-more-rice-as-harvest-may-fall-short-this-year"
    cauthor = " Jordeene B. Lagare.";
-->

<style>
    #InContent { width:786px; }
    #InContent .InContent_Imgs { width:100%; }
    #InContent .InContent_Div { text-align: center; }
    #inContent .InContent_Imgs_port { height:640px; }
</style>

<div id="InContent">

    <!-- Content Info -->
    <h1 id="InContent_Title">Title</h1>
    <div><label>Date: </label><span id="InContent_Date">January 1, 1970</span></div>
    <div><label>Author: </label><span id="InContent_Author">Unknown</span></div>

    <hr> <!-- Inside the Content (Only edit this) -->

    <img class="InContent_Imgs" src="pcover.png"> 
    <h5>Imported rice from Vietnam being unloaded in Surigao City port. -FILE PHOTO    </h5>
    <p>
        The Philippines is seen to import more rice than earlier expected this year-remaining as the biggest rice buyer in the global market-amid a likely larger shortfall in local harvest.

This is according to the Foreign Agricultural Service of US Department of Agriculture (USDA), which estimated that the country would import 4.1 million metric tons (MT) of rice this year, up by 200,000 MT or 5.1 percent from the previous estimate of 3.9 million MT in February due to "smaller crop" from local farms.

If reached, this would be nearly 14 percent more than the 3.6 million MT of rice that entered the archipelago in 2023.

The latest forecast is aligned with the report of the USDA unit that global rice imports would rise to 53.3 million MT from 52.38 million MT mainly due to higher demand from Indonesia and the Philippines.

It also estimated that the country would remain as the leading rice importer worldwide, followed by Indonesia, China and the European Union.

READ: Farmers: PH lost P7.2B in 2023 due to undervalued rice imports

In the first two months of 2024, the country imported 728,254.49 MT of rice, based on a tally from the Bureau of Plant Industry. Like in the past years, Vietnam accounted for the majority of the supply, amounting to 390,997.22 MT.

This was as the USDA lowered its projection on domestic rice production this year to 12.3 million MT from the previous estimate of 12.5 million MT. This is contrary to its outlook that global rice output will increase to 515.4 million MT, due to larger crop expected from India.

Local production
The Philippines produced a total of 20.06 million MT of rice in 2023, up by 1.5 percent, based on data from the Philippine Statistics Authority (PSA). Last year's output surpassed the previous record output of 19.96 million MT in 2021.

Central Luzon was the leading producer of palay with 3.64 million MT or a share of 18.1 percent, followed by Cagayan Valley and Western Visayas with 3.03 million MT and 2.26 million MT, respectively.

READ: El Niño won't necessarily spell doomsday to rice farmers, says DA

Philippine rice self-sufficiency level declined to 77 percent in 2022 from 81.5 percent in 2021, based on PSA figures.

The DA, through the Masagana program, is aiming for a 97-percent rice self-sufficiency by 2028.

Meanwhile, the United Broiler Raisers Association (Ubra) anticipates poultry production to reach at least 1.8 million kilograms to as much as 1.9 million kg this year, up 2 percent from a year prior.

Ubra chair Elias Jose Inciong said this outlook is "conservative," noting that normal growth is 4 to 7 percent a year.
<p>
    <hr> <!-- Outside the Content (Never edit past this) -->

    <label>Source: </label>
    <a id="InContent_Source">
    </a>
</div>
`

NewsContents.newContent(new NewsContent(cid, ctype, ctitle, cdesc, cdate, csource, cauthor, chtml));

//#endregion

//#region Report 28

cid = 28
ctype = 2 //Sports=1, Foods=2, Politics=3
ctitle = "Jollibee Group, San Miguel Foods in long-term cooperation to nourish Filipinos with delicious quality food";
cdesc = "Jollibee Group celebrates its 45th anniversary with strengthened partnerships";
cdate = new Date("2024-08-25T9:00:00"); //AUG 25, 2024 9:00 AM PHT+8
csource = "https://business.inquirer.net/417515/jollibee-group-san-miguel-foods-in-long-term-cooperation-to-nourish-filipinos-with-delicious-quality-food"
cauthor = "Jollibee Foods Corporation (JFC).";

chtml = `
<!-- You may edit this (optional)
    cid = 28
    ctype = 2 //Sports=1, Foods=2, Politics=3
    ctitle = "Jollibee Group, San Miguel Foods in long-term cooperation to nourish Filipinos with delicious quality food";
    cdesc = "Jollibee Group celebrates its 45th anniversary with strengthened partnerships";
    cdate = new Date("2024-08-25T9:00:00"); //AUG 25, 2024 9:00 AM PHT+8
    csource = "https://business.inquirer.net/417515/jollibee-group-san-miguel-foods-in-long-term-cooperation-to-nourish-filipinos-with-delicious-quality-food"
    cauthor = "Jollibee Foods Corporation (JFC).";
-->

<style>
    #InContent { width:786px; }
    #InContent .InContent_Imgs { width:100%; }
    #InContent .InContent_Div { text-align: center; }
    #inContent .InContent_Imgs_port { height:640px; }
</style>

<div id="InContent">

    <!-- Content Info -->
    <h1 id="InContent_Title">Title</h1>
    <div><label>Date: </label><span id="InContent_Date">January 1, 1970</span></div>
    <div><label>Author: </label><span id="InContent_Author">Unknown</span></div>

    <hr> <!-- Inside the Content (Only edit this) -->
    <p>For 45 years, home-grown Jollibee Foods Corporation (JFC)  strived to only work with reputable suppliers that share the same passion for food quality, food safety, and go beyond these to extend themselves towards driving sustainable operations.

        It is no surprise then that San Miguel Foods Incorporated (SMFI) has been a partner to JFC across decades with SMFI supplying fresh, quality poultry products for Jollibee Chickenjoy, and providing other products such as pizza toppings, hams, bacon, butter, cheese and flour for the different restaurant brands of JFC .</p>
    <img class="InContent_Imgs" src="pcover.png"> 
    <p>
        As Filipino-owned companies deeply rooted in the value of malasakit or concern for others, both SMFI and JFC work hard every day to nourish and nurture Filipinos by providing food that is fresh, delicious, safe, high in quality, and offer value for money. Both companies are proud in being Filipino-born companies competing in the global arena, being professionally managed, customer-centered, strategic and yet, flexible.

Beyond common values, the longstanding cooperation of JFC and SMFI is attributable to strategically aligned goals further strengthened by mutual respect, transparency of business directions and challenges, and commitment to find solutions to address ever-changing consumer demands. 

Sustainability 

Both JFC and SMFI's commitment towards improving its impact towards society and environment has been manifested in each company's sustainability architecture. For Jollibee Group, it has made significant strides over its 45-year history in various community and energy saving projects, and is now consolidating all its sustainability efforts into "Joy for Tomorrow," the company's Global Sustainability Agenda. 

The "Joy for Tomorrow" centers on three pillars-food, people, and the planet. This is a more cohesive framework that unites the Jollibee Group community, including employees, business partners, suppliers, vendors, and other stakeholders, toward a set of shared sustainability goals. 

On SMFI's end, its sustainability agenda focuses on four overarching goals which are to establish a circular economy approach by 2040, to achieve Net Zero by 2050, to uplift the lives of at least 15 million people by 2030 and have a fully sustainable and ethical supply chain by 2040. 

To achieve these targets, it has implemented key initiatives that help reduce its impact on the environment and improve the quality of life of Filipinos.  These include repurposing some by-products from its production as raw materials for feeds, installing rainwater harvest systems in its facilities to conserve water, and tapping renewable energy sources such as solar energy and biomass.  

Outlook

As the two companies further extend its collaboration, both remain focused on being customer-centric, from the area of product innovations to market reach expansion.    

SMFI lauds JFC for prioritizing listening to its consumers and knowing them well, enabling it to develop the most innovative products that directly meet the customer's wants and needs.  Hence, it sees JFC not only retaining its market leadership in the Philippines but also continuing its successful expansion to other parts of the world. 

JFC recognizes the depth and breadth of SMFI's initiatives to instill high standards of quality in its food offerings and new product development and to deliver these with minimal impact to the planet while maximizing its positive effect to communities.  It applauds SMFI for exhibiting characteristics of a world-class food producer and counts on it as one of its top suppliers that helps the Jollibee Group fulfill its mission to serve great tasting food that brings joy to everyone. 
<p>
    <hr> <!-- Outside the Content (Never edit past this) -->

    <label>Source: </label>
    <a id="InContent_Source">
    </a>
</div>
`

NewsContents.newContent(new NewsContent(cid, ctype, ctitle, cdesc, cdate, csource, cauthor, chtml));

//#endregion

//#region Report 29

cid = 29
ctype = 1 //Sports=1, Foods=2, Politics=3
ctitle = "Track Nations Cup: Katie Archibald & Neah Evans win madison, Ethan Hayter claims omnium";
cdesc = "Katie Archibald and Neah Evans won madison gold while GB team-mate Ethan Hayter clinched the omnium title on day two of the Track Nations Cup in Canada.";
cdate = new Date("2024-04-14T21:24:00"); //APR 14, 2024 9:24 PM PHT+8
csource = "https://www.bbc.com/sport/cycling/68811048"
cauthor = "";

chtml = `
<!-- You may edit this (optional)
    cid = 29
    ctype = 1 //Sports=1, Foods=2, Politics=3
    ctitle = "Track Nations Cup: Katie Archibald & Neah Evans win madison, Ethan Hayter claims omnium";
    cdesc = "Katie Archibald and Neah Evans won madison gold while GB team-mate Ethan Hayter clinched the omnium title on day two of the Track Nations Cup in Canada.";
    cdate = new Date("2024-04-14T21:24:00"); //APR 14, 2024 9:24 PM PHT+8
    csource = "https://www.bbc.com/sport/cycling/68811048"
    cauthor = "";
-->

<style>
    #InContent { width:786px; }
    #InContent .InContent_Imgs { width:100%; }
    #InContent .InContent_Div { text-align: center; }
    #inContent .InContent_Imgs_port { height:640px; }
</style>

<div id="InContent">

    <!-- Content Info -->
    <h1 id="InContent_Title">Title</h1>
    <div><label>Date: </label><span id="InContent_Date">January 1, 1970</span></div>
    <div><label>Author: </label><span id="InContent_Author">Unknown</span></div>

    <hr> <!-- Inside the Content (Only edit this) -->

    <img class="InContent_Imgs" src="pcover.png"> 
    <h5>Ethan Hayter is a two-time world and European champion in the omnium    </h5>
    <p>
        Katie Archibald and Neah Evans won madison gold while GB team-mate Ethan Hayter clinched the omnium title on day two of the Track Nations Cup in Canada.

Archibald and Evans topped the madison standings on 37 points, beating pairs from France and the United States.

In the men's omnium, Hayter won both the elimination and points races, taking a lap in the final moments of the latter to secure the overall win.

Jack Carlin also won keirin bronze to add to Friday's team sprint silver.

On the final lap, he took the inside line to finish behind Dutch duo Harrie Lavreysen and Jeffrey Hoogland.

This weekend's competition in Milton is the third and final round of the 2024 Track Nations Cup and is the final opportunity for GB's track cyclists to race on the boards before this summer's Olympics in Paris.


<p>

    <hr> <!-- Outside the Content (Never edit past this) -->

    <label>Source: </label>
    <a id="InContent_Source">
    </a>
</div>
`

NewsContents.newContent(new NewsContent(cid, ctype, ctitle, cdesc, cdate, csource, cauthor, chtml));

//#endregion

//#region Report 30

cid = 30
ctype = 1 //Sports=1, Foods=2, Politics=3
ctitle = "Red-hot San Beda still unbeaten with four-set romp of San Sebastian | NCAA Philippines";
cdesc = "San Beda University shrugged off a third set hiccup to overcome San Sebastian College-Recoletos, 25-17, 25-19, 22-25, 25-18, in the NCAA Season 99 men's volleyball tournament on Sunday at the FilOil EcoOil Centre.";
cdate = new Date("2024-04-14T19:37:00"); //APR 14, 2024 7:37 PM PHT+8
csource = "https://www.gmanetwork.com/ncaa/sports/volleyball/903631/red-hot-san-beda-still-unbeaten-with-four-set-romp-of-san-sebastian/story/"
cauthor = "BEA MICALLER,GMA Integrated News.";

chtml = `
<!-- You may edit this (optional)
    cid = 30
    ctype = 3 //Sports=1, Foods=2, Politics=3
    ctitle = "Red-hot San Beda still unbeaten with four-set romp of San Sebastian | NCAA Philippines";
    cdesc = "San Beda University shrugged off a third set hiccup to overcome San Sebastian College-Recoletos, 25-17, 25-19, 22-25, 25-18, in the NCAA Season 99 men's volleyball tournament on Sunday at the FilOil EcoOil Centre.";
    cdate = new Date("2024-04-14T19:37:00"); //APR 14, 2024 7:37 PM PHT+8
    csource = "https://www.gmanetwork.com/ncaa/sports/volleyball/903631/red-hot-san-beda-still-unbeaten-with-four-set-romp-of-san-sebastian/story/"
    cauthor = "BEA MICALLER,GMA Integrated News.";
-->

<style>
    #InContent { width:786px; }
    #InContent .InContent_Imgs { width:100%; }
    #InContent .InContent_Div { text-align: center; }
    #inContent .InContent_Imgs_port { height:640px; }
</style>

<div id="InContent">

    <!-- Content Info -->
    <h1 id="InContent_Title">Title</h1>
    <div><label>Date: </label><span id="InContent_Date">January 1, 1970</span></div>
    <div><label>Author: </label><span id="InContent_Author">Unknown</span></div>

    <hr> <!-- Inside the Content (Only edit this) -->

    <img class="InContent_Imgs" src="pcover.png"> 
    <p>
        San Beda University shrugged off a third set hiccup to overcome San Sebastian College-Recoletos, 25-17, 25-19, 22-25, 25-18, in the NCAA Season 99 men's volleyball tournament on Sunday at the FilOil EcoOil Centre.

The Red Spikers remained unscathed with a 3-0 card while inflicting the Stags their first taste of defeat to fall to 2-1.

Rookie Van Book continued his stellar outing with an all-around showing of 21 points anchored on 15 attacks, four blocks, and two aces while also making his presence felt on defense with six receptions. 

The 20-year-old outside hitter unloaded back-to-back blocks to give San Beda a 24-17 lead before Ralph Cabalsa punched the game-winning point to deny the Stags from forcing a decider. 

Anrie Bakil chipped in 19 points built on 14 attacks while Ralph Cabalsa and Alener Munsing chipped in 12 and 11 markers apiece. 

Sophomore Kyle Villamor led San Sebastian with 15 points together with three digs and 11 receptions while Joshua Espenida chimed in with 13.
<p>
    <hr> <!-- Outside the Content (Never edit past this) -->

    <label>Source: </label>
    <a id="InContent_Source">
    </a>
</div>
`

NewsContents.newContent(new NewsContent(cid, ctype, ctitle, cdesc, cdate, csource, cauthor, chtml));

//#endregion

//#region Report 31

cid = 31
ctype = 1 //Sports=1, Foods=2, Politics=3
ctitle = "On parallel bars, Carlos Yulo has third shot at Olympic glory";
cdesc = "Carlos Yulo is expected to battle for a medal in the floor exercise and the vault, two disciplines in artistic gymnastics where the Filipino spark plug has won world titles.";
cdate = new Date("2024-04-25T5:20:00"); //APR 25, 2024 5:20 AM PHT+8
csource = "https://sports.inquirer.net/562958/on-parallel-bars-yulo-has-third-shot-at-olympic-glory"
cauthor = "June Navarro - Reporter / @junavINQ";

chtml = `
<!-- You may edit this (optional)
    cid = 31
    ctype = 1 //Sports=1, Foods=2, Politics=3
    ctitle = "On parallel bars, Carlos Yulo has third shot at Olympic glory";
    cdesc = "Carlos Yulo is expected to battle for a medal in the floor exercise and the vault, two disciplines in artistic gymnastics where the Filipino spark plug has won world titles.";
    cdate = new Date("2024-04-25T5:20:00"); //APR 25, 2024 5:20 AM PHT+8
    csource = "https://sports.inquirer.net/562958/on-parallel-bars-yulo-has-third-shot-at-olympic-glory"
    cauthor = "By: June Navarro - Reporter / @junavINQ.";
-->

<style>
    #InContent { width:786px; }
    #InContent .InContent_Imgs { width:100%; }
    #InContent .InContent_Div { text-align: center; }
    #inContent .InContent_Imgs_port { height:640px; }
</style>

<div id="InContent">

    <!-- Content Info -->
    <h1 id="InContent_Title">Title</h1>
    <div><label>Date: </label><span id="InContent_Date">January 1, 1970</span></div>
    <div><label>Author: </label><span id="InContent_Author">Unknown</span></div>

    <hr> <!-- Inside the Content (Only edit this) -->

    <img class="InContent_Imgs" src="pcover.png">
    <h5>Carlos Yulo has had success in the parallel bars, winning a gold medal during the Southeast Asian Games. -CONTRIBUTED PHOTO    </h5> 
    <p>
        (Last of a series)

Carlos Yulo is expected to battle for a medal in the floor exercise and the vault, two disciplines in artistic gymnastics where the Filipino spark plug has won world titles.

But don't be surprised if Yulo will find himself in contention in one more apparatus in the 2024 Paris Olympics.

As earlier mentioned, there are three events where Yulo could tab a podium finish.

One of them is the parallel bars (p-bar).

READ: World champ in vault, Carlos Yulo goes after Paris Olympics glory
The apparatus features two horizontal bars 3.35 meters long and about 2 m high. To kick off his routine, Yulo will initiate his parallel bar mount or his run-up from a still stand with legs together.

The moment the feet leave the ground simultaneously, the quest begins. A vaulting board placed at the height of the landing mats is permitted for the mount.

Yulo has so far used the following moves in the p-bars:

1. Healy-a skill that involves performing a 180-degree turnaround one of the parallel bars while transitioning from a support hold to a handstand.

2. Press Handstand-lifting one's body from a straddle L position to a handstand without any swinging or momentum. It can be performed with hands on one rail or two rails.

3. Stutz Handstand-a swing down from the handstand, then releasing both hands and twisting the body a half turn prior to holding again onto the bar in a handstand.

4. Diamidov-named to celebrate the feat of Russian gymnast Sergey Diomidov in the event, it consists of a swing down from handstand, through support, then releasing one hand and twisting the body a full turn, before ending things with a handstand.

5. Tippelt-Perfected by German gymnast Sven Tippelt, the maneuver sets out from a handstand, swings forward and straddles backward to handstand.

6. Bhavsar-Stephen Raj Bhavsar of the United States gymnastics team created and performed the act in 2009 at the Moscow World Cup. It's a release move from a handstand, a swing forward, a straddle backward and a regrasp with a horizontal straight body. The move starts on one end of the bars and finishes on the other.

READ: Carlos Yulo has deep bag of tricks for Paris Olympics bid

Yulo mixes these elements and normally executes a double front salto dismount in most of his performances in this event.

Regulated by the Code of Points, scoring at the Olympics consists of two panels of judges for each routine-one assesses the difficulty and the other evaluates the execution, after which the final score is the combined accumulation of these two scores.

"I understand that [all my opponents are] getting better, so I have to improve my skills,'' said Yulo, who will fly to the French capital on July 6 and arrange another training camp until July 21 before entering the Olympic village on July 22.

READ: Carlos Yulo snares Doha Worlds bars gold; PH qualifies two more for Paris Olympics

"Aside from proper execution, this is definitely a test of mental strength. It's going to be me versus me,'' said Yulo.
<p>
    
    <hr> <!-- Outside the Content (Never edit past this) -->

    <label>Source: </label>
    <a id="InContent_Source">
    </a>
</div>
`

NewsContents.newContent(new NewsContent(cid, ctype, ctitle, cdesc, cdate, csource, cauthor, chtml));

//#endregion

//#region Report 32

cid = 32
ctype = 1 //Sports=1, Foods=2, Politics=3
ctitle = "PBA: TNT remains wary despite latest win amid tight playoff race";
cdesc = "MANILA, Philippines-TNT coach Chot Reyes remained wary of the PBA Philippine Cup playoff race even after defeating Phoenix at Ninoy Aquino Stadium on Wednesday.";
cdate = new Date("2024-04-25T18:44:00"); //APR 25, 2024 6:244 PM PHT+8
csource = "https://https://sports.inquirer.net/563001/pba-tnt-remains-wary-amid-tight-playoff-race-despite-latest-win"
cauthor = "Rommel Fuertes Jr";

chtml = `
<!-- You may edit this (optional)
    cid = 32
    ctype = 1 //Sports=1, Foods=2, Politics=3
    ctitle = "PBA: TNT remains wary despite latest win amid tight playoff race";
    cdesc = "MANILA, Philippines-TNT coach Chot Reyes remained wary of the PBA Philippine Cup playoff race even after defeating Phoenix at Ninoy Aquino Stadium on Wednesday.";
    cdate = new Date("2024-04-25T18:44:00"); //APR 25, 2024 6:244 PM PHT+8
    csource = "https://https://sports.inquirer.net/563001/pba-tnt-remains-wary-amid-tight-playoff-race-despite-latest-win"
    cauthor = "By: Rommel Fuertes Jr.";
-->

<style>
    #InContent { width:786px; }
    #InContent .InContent_Imgs { width:100%; }
    #InContent .InContent_Div { text-align: center; }
    #inContent .InContent_Imgs_port { height:640px; }
</style>

<div id="InContent">

    <!-- Content Info -->
    <h1 id="InContent_Title">Title</h1>
    <div><label>Date: </label><span id="InContent_Date">January 1, 1970</span></div>
    <div><label>Author: </label><span id="InContent_Author">Unknown</span></div>

    <hr> <!-- Inside the Content (Only edit this) -->

    <img class="InContent_Imgs" src="pcover.png"> 
    <h5>TNT Tropang Giga coach Chot Reyes during a huddle in a PBA Philippine Cup game. –PBA IMAGES    </h5>
    <p>
        MANILA, Philippines-TNT coach Chot Reyes remained wary of the PBA Philippine Cup playoff race even after defeating Phoenix at Ninoy Aquino Stadium on Wednesday.

Despite the close 108-101 win over the Fuel Masters, Tropang Giga are still in the middle of the pack where no other team has a clear view of a playoff spot except unbeaten San Miguel.

"Dikit-dikit lahat (Everyone's neck-and-neck). Nobody has a lock on anything right now, I think only San Miguel. Other than that, everyone else's one loss means a lot in the scheme of things," said Reyes.

READ: PBA: TNT rallies from 20 down to beat Phoenix in crucial win

"It's been very difficult for us. Before in Talk N' Text, after a bad game, we know certain games are sure wins. That's no longer the case. Every game now, it doesn't matter who we play, we know it's going to be a challenge that demands our best."
After the TNT win on Wednesday, the Tropang Giga improved to 5-4 in the standings to momentarily sit at the fifth seed. But like how Reyes put it, one loss can alter the complexion of the playoff race.

One defeat from the TNT side will slide Reyes' wards to 5-5 and create a logjam for the sixth seed with Terrafirma and Rain or Shine, which hold identical records with Tropang Giga.

The Beermen are the only lock for the quarters as of writing with an unscathed 7-0 record.

READ: PBA: TNT ends slide but Chot Reyes wants to ‘fix ourselves first'

Kelly Williams, who dropped a stellar double-double of 17 points and 13 rebounds, also acknowledged how TNT, once portrayed as one of the league's juggernauts, is now uncertain about making the quarterfinals.

All that could be traced to how young the Tropang Giga squad is with the addition of new blood and retirements of old squad remnants.

"In past teams and groups, we've had difficult conferences as well. Now, we have a lot of young and skilled guys who are learning the system and culture of how we manage each other," said Williams.

"There's a lot of learning and adjustments. Coach is big on being able to pivot and adjust at different times. We're all learning and we have the capability to be where we want to be but it's just going to take some time... We'll need to throw our biggest punches in these last few games and hopefully get to the playoffs," the veteran big added.

Tropang Giga will have two games left in the elimination round but wins and losses on those bouts still wouldn't determine where they'd stand with a tight race at hand.

<p>

    <hr> <!-- Outside the Content (Never edit past this) -->

    <label>Source: </label>
    <a id="InContent_Source">
    </a>
</div>
`

NewsContents.newContent(new NewsContent(cid, ctype, ctitle, cdesc, cdate, csource, cauthor, chtml));

//#endregion

//#region Report 33

cid = 33
ctype = 1 //Sports=1, Foods=2, Politics=3
ctitle = "Blow-By-Blow: Unbeaten Albert Francisco wins PH Youth belt";
cdesc = "MANILA, Philippines-Albert Francisco stopped Dennis Endar in the eighth round to snatch the Philippine Youth flyweight crown during Manny Pacquiao Presents: Blow-By-Blow Friday at San Andres Sports Complex.";
cdate = new Date("2024-04-13T22:48:00"); //APR 13, 2024 10:48 PM PHT+8
csource = "https://sports.inquirer.net/561639/blow-by-blow-unbeaten-albert-francisco-wins-ph-youth-belt"
cauthor = "";

chtml = `
<!-- You may edit this (optional)
    cid = 33
    ctype = 1 //Sports=1, Foods=2, Politics=3
    ctitle = "Blow-By-Blow: Unbeaten Albert Francisco wins PH Youth belt";
    cdesc = "MANILA, Philippines-Albert Francisco stopped Dennis Endar in the eighth round to snatch the Philippine Youth flyweight crown during Manny Pacquiao Presents: Blow-By-Blow Friday at San Andres Sports Complex.";
    cdate = new Date("2024-04-13T22:48:00"); //APR 13, 2024 10:48 PM PHT+8
    csource = "https://sports.inquirer.net/561639/blow-by-blow-unbeaten-albert-francisco-wins-ph-youth-belt"
    cauthor = "";
-->

<style>
    #InContent { width:786px; }
    #InContent .InContent_Imgs { width:100%; }
    #InContent .InContent_Div { text-align: center; }
    #inContent .InContent_Imgs_port { height:640px; }
</style>

<div id="InContent">

    <!-- Content Info -->
    <h1 id="InContent_Title">Title</h1>
    <div><label>Date: </label><span id="InContent_Date">January 1, 1970</span></div>
    <div><label>Author: </label><span id="InContent_Author">Unknown</span></div>

    <hr> <!-- Inside the Content (Only edit this) -->
    <img class="InContent_Imgs" src="pcover.png"> 
    <h5>Albert Francisco wins the Philippine Youth flyweight crown in the main event of Blow-By-Blow.-CONTRIBUTED PHOTO    </h5>
    <p>
        MANILA, Philippines-Albert Francisco stopped Dennis Endar in the eighth round to snatch the Philippine Youth flyweight crown during Manny Pacquiao Presents: Blow-By-Blow Friday at San Andres Sports Complex.

The end came at the 1:28 mark of the eighth round as Francisco rained punches on the fading Endar, forcing the referee to call a halt to the intense encounter between the promising 112-pounders.

It was a back-and-forth battle that had Francisco on the receiving end of Endar's heavy blows to the head and body.

READ: Blow-By-Blow: Albert Francisco, Dennis Endar vie for PH Youth belt
But owing to his superb conditioning, Francisco, fighting out the Johnny Elorde Stable, managed to weather each assault and fought back with his own combinations.

Early in the eighth, Endar, probably sensing that he had to win by stoppage, went on the attack and had Francisco on the retreat as the small but boisterous and appreciative crowd roared in delight.

But Endar, representing MP Boxing Gym of Davao, simply could not sustain it and he got caught with Francisco's well-timed connections to send him across his foe's corner where he got pummeled until the third man stepped in.

READ: Fast-rising Eman Bacosa impresses in Blow-By-Blow
The victory raised Francisco's unbeaten slate to 12-0 with eight knockouts while the defeat dropped Endar's slate to 6-2-1 with five wins inside the distance.

"A rematch could be underway," said Marife Barrera, who heads Blow-By-Blow.

Eight-division legend Manny Pacquiao, who resurrected Blow-By-Blow in late-2022, guarantees that more lively action will be seen in the coming months.

<p>
    <hr> <!-- Outside the Content (Never edit past this) -->

    <label>Source: </label>
    <a id="InContent_Source">
    </a>
</div>
`

NewsContents.newContent(new NewsContent(cid, ctype, ctitle, cdesc, cdate, csource, cauthor, chtml));

//#endregion

//#region Report 34

cid = 34
ctype = 1 //Sports=1, Foods=2, Politics=3
ctitle = "ONE: Jeremy Pacatiw returns with statement win";
cdesc = "MANILA. Philippines-After being sidelined for 16 months, Filipino fighter Jeremy Pacatiw returned in a triumphant way to announce his comeback in ONE Championship.";
cdate = new Date("2024-04-06T17:20:00"); //APR 04, 2024 5:20 PM PHT+8
csource = "https://sports.inquirer.net/560547/one-jeremy-pacatiw-returns-with-statement-win"
cauthor = "Rommel Fuertes Jr";

chtml = `
<!-- You may edit this (optional)
    cid = 34
    ctype = 1 //Sports=1, Foods=2, Politics=3
    ctitle = "ONE: Jeremy Pacatiw returns with statement win";
    cdesc = "MANILA. Philippines-After being sidelined for 16 months, Filipino fighter Jeremy Pacatiw returned in a triumphant way to announce his comeback in ONE Championship.";
    cdate = new Date("2024-04-06T17:20:00"); //APR 04, 2024 5:20 PM PHT+8
    csource = "https://sports.inquirer.net/560547/one-jeremy-pacatiw-returns-with-statement-win"
    cauthor = "  Rommel Fuertes Jr.";
-->

<style>
    #InContent { width:786px; }
    #InContent .InContent_Imgs { width:100%; }
    #InContent .InContent_Div { text-align: center; }
    #inContent .InContent_Imgs_port { height:640px; }
</style>

<div id="InContent">

    <!-- Content Info -->
    <h1 id="InContent_Title">Title</h1>
    <div><label>Date: </label><span id="InContent_Date">January 1, 1970</span></div>
    <div><label>Author: </label><span id="InContent_Author">Unknown</span></div>

    <hr> <!-- Inside the Content (Only edit this) -->

    <img class="InContent_Imgs" src="pcover.png"> 
    <h5>Jeremy Pacatiw during the ONE Fight Night 21: Eersel vs. Nicolas. -ONE CHAMPIONSHIP    </h5>
    <p>
        MANILA. Philippines-After being sidelined for 16 months, Filipino fighter Jeremy Pacatiw returned in a triumphant way to announce his comeback in ONE Championship.

        Pacatiw made quick and easy work of China's Wang Shuo, winning via first round submission in ONE Fight Night 21: Eersel vs. Nicolas at Lumpinee Boxing Stadium on Saturday.
        
        Pacatiw made a leap to the bantamweight division with his victory as he improved to a 13-5 record.
        
        READ: Jeremy Pacatiw's kickboxing silver wraps up PH's SEA Games campaign
        
        Pacatiw was expected to pull out a slow-paced opening round with this being his first match in a long while.
        
        But instead of getting his feet wet, the Lions Nation MMA combatant immediately jumped his Chinese foe with punches and strikes that seemed to have caught Wang by surprise.
        
        Wang, though, wasn't any slack as he matched Pacatiw's energy in the striking department but the fight immediately took a turn when it hit the mat.
        
        The 27-year-old fighter from Benguet took charge and locked Wang to a rear-naked choke which made the latter tap in the 2:07 mark of the opening round.
        
        In the main event, Alexis Nicolas defeated Regian Eersel via unanimous decision to win the ONE Lightweight Kickboxing World Championship.
        
        
<p>
    <hr> <!-- Outside the Content (Never edit past this) -->

    <label>Source: </label>
    <a id="InContent_Source">
    </a>
</div>
`

NewsContents.newContent(new NewsContent(cid, ctype, ctitle, cdesc, cdate, csource, cauthor, chtml));

//#endregion

//#region Report 35
cid = 35
ctype = 1 //Sports=1, Foods=2, Politics=3
ctitle = "ANALYSIS: This Gilas Pilipinas team has already proven its worth";
cdesc = "On a particular Saturday midmorning, Gilas Pilipinas assembled in a well-lit, air-conditioned gym six floors up in a roadside building in Quezon City.";
cdate = new Date("2024-04-18T18:10:00"); //APR 18, 2024 6:10 PM PHT+8
csource = "https://sports.inquirer.net/505676/analysis-this-gilas-pilipinas-team-has-already-proven-its-worth"
cauthor = "Francis T.J. Ochoa";

chtml = `
<!-- You may edit this (optional)
    cid = 35
    ctype = 1 //Sports=1, Foods=2, Politics=3
    ctitle = "ANALYSIS: This Gilas Pilipinas team has already proven its worth";
    cdesc = "On a particular Saturday midmorning, Gilas Pilipinas assembled in a well-lit, air-conditioned gym six floors up in a roadside building in Quezon City.";
    cdate = new Date("2024-04-18T18:10:00"); //APR 18, 2024 6:10 PM PHT+8
    csource = "https://sports.inquirer.net/505676/analysis-this-gilas-pilipinas-team-has-already-proven-its-worth"
    cauthor = "Francis T.J. Ochoa.";
-->

<style>
    #InContent { width:786px; }
    #InContent .InContent_Imgs { width:100%; }
    #InContent .InContent_Div { text-align: center; }
    #inContent .InContent_Imgs_port { height:640px; }
</style>

<div id="InContent">

    <!-- Content Info -->
    <h1 id="InContent_Title">Title</h1>
    <div><label>Date: </label><span id="InContent_Date">January 1, 1970</span></div>
    <div><label>Author: </label><span id="InContent_Author">Unknown</span></div>

    <hr> <!-- Inside the Content (Only edit this) -->

    <img class="InContent_Imgs" src="pcover.png"> 
    <h5>National team coach Pat Aquino and the Gilas Pilipinas Women. -FRANCIS OCHOA    </h5>
    <p>
        On a particular Saturday midmorning, Gilas Pilipinas assembled in a well-lit, air-conditioned gym six floors up in a roadside building in Quezon City.

        There were 15 of them, dressed up for a scrimmage against a younger but more physical and more athletic squad.
        
        Toward the end of the match, up 11 and the clock dwindling to its final minutes, Gilas continued to apply full-court pressure. One of the team's guards, a star from Ateneo in the UAAP, nearly forced a turnover, only to get clocked-hard-in the jaw by an inadvertent elbow.
        
        The Eagles' playmaker shook the hit off, stood up and chased down the opposing player and continued to hound him.
        
        Later, after ditching the No. 15 Pilipinas jersey for a white shirt, the player was asked about the elbow.
        
        The only answer offered was a shrug and a smile.
        
        "Part of the game." Another smile.
<p>

    <img class="InContent_Imgs" src="p1.png"> 

    <p>Except that this was just a tuneup match and Gilas Pilipinas was nursing an 11-point lead and the player was defending like it was the last few seconds of a one-possession ballgame in an Ateneo-La Salle championship decider in the UAAP.

Another shrug. In the dictionary of sports nonverbal language, the usually means: "It's nothing."

This time, the player meant: "It's nothing new."

This is how Gilas Pilipinas has been preparing for the Southeast Asian Games. Bodies crashing everywhere, lung-busting full-court pressure from start to finish, everyone rolling up their sleeves and fighting hard for one of 12 slots in the final roster.

"I've been hit a lot of times so..." Jhazmine Jason said.

Oh, yes, this is the Gilas Pilipinas women's team. The oft-ignored, out-of-spotlight, underfunded Gilas Pilipinas squad that will be the only national basketball team defending a gold medal in Cambodia.

And there's a reason why the team, a collection of nonsalaried standouts showing up for practice every day, prepares with a sense of urgency as the SEA Games draws near.

"We are the target of every team," coach Pat Aquino told the Inquirer. "We can't even prepare for one country anymore. Everyone wants to beat us."

"We know it's gonna be hard, just like every other year, nothing's gonna be given," said guard Ella Fajardo. "But the things that we do behind the scenes, practicing every day ... it [will show] on the court when we're there [in Cambodia]. We're doing everything on our part to prepare."

That means playing against teams like a boys squad from high school powerhouse Xavier and taking everything thrown at them, and using uncanny teamwork to negate their opponents' strength and athleticism.

"These girls are more than ready. They will mix it up regardless of who you put in front of them," Aquino said.

In Cambodia, the women will face teams that are looking to stop the Philippines from completing a "three-peat" and which have done extensive preparation-including competing among themselves-just to strip Gilas of its gold.

But ask the women about the pressure that comes with that and they will just smile it off.

"Pressure will always be there," said Jack Animam, whose return to the national squad has generated a huge wave of optimism among her teammates. "We know that whatever we do, there will always be pressure. But among ourselves, we keep saying, 'let's not think about it, do what we're supposed to do and just follow coach's game plan.'"


    </p>

    <img class="InContent_Imgs" src="p2.png"> 
    <h5>Gilas Pilipinas Women in training. -FRANCIS OCHOA    </h5>
    <p>That last part is what thrills Aquino the most.

        "You know, I've said this before, as a coach, whatever I teach them, I see them doing it," Aquino said. "They can get really physical, sometimes more physical than men. If they want to grab for the ball they go out there and just dive for it. They really want to show everybody what they can do."
        
        "They've won the gold medal back-to-back and yet, there they are, just eager to show more and prove themselves more," Aquino added.
        That need to prove themselves more produces most of the pressure the team feels nowadays.
        
        "It seems like there's a lot of pressure from the outside because we're trying to get support, to try to hype up that we're trying to get the three-peat," Fajardo said. "But I think within ourselves, we're very good at staying together ... and building our confidence every day. We just focus on ourselves."
        
        "We just ask the fans to continue the support," Animam said. "We have something to prove, we're exciting to watch and we're doing this not just for ourselves but for our country."
        
        "We hope to show fans that we deserve their trust and that we can play at a really high level," team captain Janine Pontejos said.
        
        And so they collect floor burns while diving for loose balls and get hit hard in the jaw while applying pressure at garbage time-all during an exhibition match-just to earn a little of a country's love and attention.
        
        These girls don't know it yet, but they're not the Gilas Pilipinas that has something to prove.
      
        </p>

    <hr> <!-- Outside the Content (Never edit past this) -->

    <label>Source: </label>
    <a id="InContent_Source">
    </a>
</div>
`

NewsContents.newContent(new NewsContent(cid, ctype, ctitle, cdesc, cdate, csource, cauthor, chtml));

//#endregion

//#region Report 36

cid = 36
ctype = 1 //Sports=1, Foods=2, Politics=3
ctitle = "MLB: Shohei Ohtani has 3 doubles as Dodgers rout Nationals";
cdesc = "WASHINGTON - Shohei Ohtani had three doubles to improve his major league-leading batting average to .371, rookie Landon Knack got his first victory and the Los Angeles Dodgers routed the Washington Nationals 11-2 in the MLB on Wednesday night.";
cdate = new Date("2024-04-25T17:39:00"); //APR 25, 2024 2:39 PM PHT+8
csource = "https://sports.inquirer.net/563047/mlb-shohei-ohtani-has-3-doubles-as-dodgers-rout-nationals"
cauthor = "Mang Inasal President Mike V. Castro.";

chtml = `
<!-- You may edit this (optional)
    cid = 36
    ctype = 1 //Sports=1, Foods=2, Politics=3
    ctitle = "MLB: Shohei Ohtani has 3 doubles as Dodgers rout Nationals";
    cdesc = "WASHINGTON - Shohei Ohtani had three doubles to improve his major league-leading batting average to .371, rookie Landon Knack got his first victory and the Los Angeles Dodgers routed the Washington Nationals 11-2 in the MLB on Wednesday night.";
    cdate = new Date("2024-04-25T17:39:00"); //APR 25, 2024 2:39 PM PHT+8
    csource = "https://sports.inquirer.net/563047/mlb-shohei-ohtani-has-3-doubles-as-dodgers-rout-nationals"
    cauthor = "Mang Inasal President Mike V. Castro.";
-->

<style>
    #InContent { width:786px; }
    #InContent .InContent_Imgs { width:100%; }
    #InContent .InContent_Div { text-align: center; }
    #inContent .InContent_Imgs_port { height:640px; }
</style>

<div id="InContent">

    <!-- Content Info -->
    <h1 id="InContent_Title">Title</h1>
    <div><label>Date: </label><span id="InContent_Date">January 1, 1970</span></div>
    <div><label>Author: </label><span id="InContent_Author">Unknown</span></div>

    <hr> <!-- Inside the Content (Only edit this) -->

    <img class="InContent_Imgs" src="pcover.png"> 
    <h5>Los Angeles Dodgers designated hitter Shohei Ohtani prepares to bat during the sixth inning of the team's MLB game against the Washington Nationals at Nationals Park, Wednesday, April 24, 2024, in Washington. ( AP Photo/Alex Brandon)    </h5>
    <p>
        WASHINGTON - Shohei Ohtani had three doubles to improve his major league-leading batting average to .371, rookie Landon Knack got his first victory and the Los Angeles Dodgers routed the Washington Nationals 11-2 in the MLB on Wednesday night.

The Dodgers had a season-high 20 hits en route to their third straight victory, with Mookie Betts and Will Smith each having four hits and Andy Pages homering.

Nick Senzel homered for Washington. The Nationals didn't have a baserunner after the second inning.

Ohtani went 3 for 6, hitting RBI doubles in the eighth and ninth innings. He leads the majors in slugging percentage (.695), OPS (1.128), extra-base hits (21) and doubles (14). He is hitting .429 during his nine-game hitting streak.

READ: Ohtani passes Matsui for most MLB homers by Japanese-born player

"His average exit velocity on balls he puts in play, he's got to be in a category by himself," Dodgers manager Dave Roberts said. "The ball just does different things when it comes off his bat."

A night after ripping a 118.7 mph solo shot in the ninth inning - the hardest-hit home run of his career - Ohtani smashed a 115.6 mph double to right-center in the first inning off Jake Irvin (1-2). Ohtani came around two batters later on Smith's single.

Betts pushed the lead to 3-0 in the second on a two-run single against a drawn-in infield.

Senzel led off the Nationals' second with a homer into the bushes in the visiting bullpen in left. Washington then scored again without putting the ball in plan, sandwiching two walks around a hit batsman before Joey Meneses pushed in a run with a walk.

READ: MLB: Shohei Ohtani delivers for Dodgers in home opener

That was all the Nationals managed against Knack (1-1), who lost his debut against Washington last week. Knack retired his last 13 batters and struck out five over six innings.

"I was just kind of missing off the edges," Knack said about his second inning. "I'm a guy who really needs to be more north and south with everything, so it was basically just trying to get everything back over instead of trying to be too perfect, especially with the slider and changeup. It was just trying to figure it out and execute quick."

Max Muncy hit an RBI single in the third and Lux chased Irvin with a two-out, two-run single in the fifth. Irvin allowed six runs on 12 hits in 4 2/3 innings while striking out three.

"He made some good pitches at times," Washington manager Dave Martinez said. "He just didn't have any consistency today. He fell behind, and that's what got him."

Pages homered with one out in the eighth off Tanner Rainey, and Betts and Ohtani followed with back-to-back doubles to score another run.

TRAINER'S ROOM
Dodgers: RHP Blake Treinen (bruised lung) allowed three runs while getting one out Tuesday in his first rehabilitation appearance for Triple-A Oklahoma City. ... RHP Walker Buehler (elbow) allowed five runs (three earned) and struck out five in four innings Wednesday for Oklahoma City.

Nationals: Washington placed OF Lane Thomas (sprained left MCL) on the 10-day injured list and recalled INF Trey Lipscomb from Triple-A Rochester. Thomas was injured stealing second base in the fifth inning Monday.

<p>
    <hr> <!-- Outside the Content (Never edit past this) -->

    <label>Source: </label>
    <a id="InContent_Source">
    </a>
</div>
`

NewsContents.newContent(new NewsContent(cid, ctype, ctitle, cdesc, cdate, csource, cauthor, chtml));

//#endregion

//#region Report 37

cid = 37
    ctype = 1 //Sports=1, Foods=2, Politics=3
    ctitle = "Messi's new Inter Miami soccer jersey replaces crypto firm logo with cruise operator icon";
    cdesc = `Argentinian superstar Lionel Messi and his teammates at Major League Soccer's Inter Miami will wear the icon of Royal Caribbean International on their jerseys for the upcoming campaign. The Florida-based cruise operator revealed the news at an unveiling event and described the transaction as a "multiyear partnership." The club's sponsorship switch appeared to mark another step away from the crypto industry in Miami.`;
    cdate = new Date("2024-01-25T5:02:00"); //JAN 25, 2024 5:02 AM PHT+8
    csource = "https://www.cnbc.com/2024/01/25/lionel-messi-inter-miami-soccer-jersey-replaces-crypto-with-cruises.html"
    cauthor = "Sam Meredith";

chtml = `
<!-- You may edit this (optional)
    cid = 37
    ctype = 1 //Sports=1, Foods=2, Politics=3
    ctitle = "Messi's new Inter Miami soccer jersey replaces crypto firm logo with cruise operator icon";
    cdesc = "Argentinian superstar Lionel Messi and his teammates at Major League Soccer's Inter Miami will wear the icon of Royal Caribbean International on their jerseys for the upcoming campaign.
             The Florida-based cruise operator revealed the news at an unveiling event and described the transaction as a "multiyear partnership."
             The club's sponsorship switch appeared to mark another step away from the crypto industry in Miami.";
    cdate = new Date("2024-01-25T5:02:00"); //JAN 25, 2024 5:02 AM PHT+8
    csource = "https://www.cnbc.com/2024/01/25/lionel-messi-inter-miami-soccer-jersey-replaces-crypto-with-cruises.html"
    cauthor = "Sam Meredith.";
-->

<style>
    #InContent { width:786px; }
    #InContent .InContent_Imgs { width:100%; }
    #InContent .InContent_Div { text-align: center; }
    #inContent .InContent_Imgs_port { height:640px; }
</style>

<div id="InContent">

    <!-- Content Info -->
    <h1 id="InContent_Title">Title</h1>
    <div><label>Date: </label><span id="InContent_Date">January 1, 1970</span></div>
    <div><label>Author: </label><span id="InContent_Author">Unknown</span></div>

    <hr> <!-- Inside the Content (Only edit this) -->

    <img class="InContent_Imgs" src="pcover.png"> 
    <h5>Benjamin Cremaschi #30, Lionel Messi #10 and Luis Suarez #9 of Inter Miami CF unveil new jerseys during the Royal Carribean & Inter Miami CF Launch Event on January 23, 2024 in Miami, Florida.
        Megan Briggs | Getty Images Sport | Getty Images</h5>
S    <p>
    Argentinian superstar Lionel Messi and his teammates at Major League Soccer's Inter Miami will wear the icon of Royal Caribbean International on their jerseys for the upcoming campaign, replacing crypto investment firm XBTO as the club's main sponsor.

    In a statement published Tuesday, Royal Caribbean International announced it would soon "make its mark front and center" on the Inter Miami's team's soccer jerseys.
    
    The Florida-based company, one of the world's largest cruise line operators, revealed the news at an unveiling event and described the transaction as a "multiyear partnership." It did not disclose financial details of the agreement.
    
    "It's exciting to now combine forces, and I can't wait for the future that our two organizations will forge for our industries, for our fans around the world, and of course, for our local communities here in South Florida," said Royal Caribbean Group President and CEO Jason Liberty in the statement.
    
    The sponsorship deal is likely seeking to harness Messi's popularity ahead of the eight-time Ballon d'Or winner's second season at Inter Miami.
    
    Alongside partnering with Hard Rock International for a "Milanese style" chicken sandwich, Messi recently helped Royal Caribbean International to launch its enormous "Icon of the Seas" ship.

<p>
    <img class="InContent_Imgs" src="p1.png"> 
<p>XBTO, a global cryptofinance firm, had previously announced a multi-year partnership with Inter Miami in September 2021 in what was thought to have been among the biggest MLS deals.

    Inter Miami said at the time that the XBTO agreement represented a "significant milestone in the mainstream acceptance of crypto" and inched Miami "closer to becoming the mecca of the crypto world."
    
    The club's sponsorship switch for the forthcoming MLS campaign, which gets underway next month, appeared to mark another step away from the crypto industry in Miami.
    
    Last year, for example, the home arena for the NBA's Miami Heat changed its name from the FTX Arena to the Kaseya Center. Crypto exchange FTX, once valued at $32 billion, collapsed in November 2022 following a liquidity crisis.
    
    Inter Miami's pivot to a cruise operator comes as the industry continues to recover from the Covid-19 pandemic. U.S. cruise operators and travel agents told Reuters late last year that 2024 was looking like a banner year for cruise vacations after being badly hit during the Covid-19 crisis.
    
    </p>
    <hr> <!-- Outside the Content (Never edit past this) -->

    <label>Source: </label>
    <a id="InContent_Source">
    </a>
</div>
`

NewsContents.newContent(new NewsContent(cid, ctype, ctitle, cdesc, cdate, csource, cauthor, chtml));

//#endregion

//#region Report 38

cid = 38
ctype = 1 //Sports=1, Foods=2, Politics=3
ctitle = "'Let's make it a cage fight': Miami Heat shock Boston Celtics to level first-round playoff series";
cdesc = "The Miami Heat stunned the Boston Celtics 111-101 at TD Garden on Wednesday to level their first-round playoff series at 1-1.";
cdate = new Date("2024-04-25T5:32:00"); //APR 25, 2024 5:32 AM PHT+8
csource = "https://edition.cnn.com/2024/04/25/sport/miami-heat-shock-boston-celtics-playoffs-spt-intl/index.html"
cauthor = "Matias Grez, CNN";

chtml = `
<!-- You may edit this (optional)
    cid = 38
    ctype = 1 //Sports=1, Foods=2, Politics=3
    ctitle = "'Let's make it a cage fight': Miami Heat shock Boston Celtics to level first-round playoff series";
    cdesc = "The Miami Heat stunned the Boston Celtics 111-101 at TD Garden on Wednesday to level their first-round playoff series at 1-1.";
    cdate = new Date("2024-04-25T5:32:00"); //APR 25, 2024 5:32 AM PHT+8
    csource = "https://edition.cnn.com/2024/04/25/sport/miami-heat-shock-boston-celtics-playoffs-spt-intl/index.html"
    cauthor = "Matias Grez, CNN.";
-->

<style>
    #InContent { width:786px; }
    #InContent .InContent_Imgs { width:100%; }
    #InContent .InContent_Div { text-align: center; }
    #inContent .InContent_Imgs_port { height:640px; }
</style>

<div id="InContent">

    <!-- Content Info -->
    <h1 id="InContent_Title">Title</h1>
    <div><label>Date: </label><span id="InContent_Date">January 1, 1970</span></div>
    <div><label>Author: </label><span id="InContent_Author">Unknown</span></div>

    <hr> <!-- Inside the Content (Only edit this) -->

    <img class="InContent_Imgs" src="pcover.png"> 
    <h5>The Miami Heat upset the Boston Celtics to level the series. David Butler II/USA TODAY Sports/Reuters    </h5>
    <p>
        The Miami Heat stunned the Boston Celtics 111-101 at TD Garden on Wednesday to level their first-round playoff series at 1-1.

The Heat, playing without injured talisman Jimmy Butler, knocked down a franchise playoff record of 23 three-pointers to upset the Celtics, with Tyler Herro hitting six of them to lead the team in scoring with 24 points.

Herro also recorded 14 assists, while teammate Bam Adebayo also notched a double-double with 21 points and 10 rebounds.

The Heat also got a big night from Caleb Martin, who matched Adebayo's 21 points, including making five of his six three-point attempts.

After a beatdown by the Celtics in Game 1, few would have expected such a drastic turnaround in Game 2.

However, this is the Heat, a team used to pulling off the improbable, and Miami fans will perhaps start to feel confident of emulating last season's incredible playoff run, when the team reached the NBA Finals after entering via the play-in.

Herro admitted the team "lost bad" in the series opener but was proud of how "everybody responded" on Wednesday night.

"We've been doubted a lot through our playoff runs, people saying we couldn't do a lot of stuff that we [eventually] did," Adebayo added, per ESPN.

"So for me and my team, why lose belief now? Our backs are against the wall. Everybody's against us. So just use that as fuel.

<p>
    <img class="InContent_Imgs" src="p1.png"> 
    <h5>Tyler Herro knocked down six three-pointers for Miami. Brian Babineau/NBAE/Getty Images    </h5>
    <p>"Our guys believe we can win. So, let's make it mano a mano - a cage fight. Let's hoop."

        Feeling confident, Butler posted a photo on Instagram of his face photoshopped onto Celtics star Jaylen Brown's body. Beneath is Brown's quote from last season's Conference Finals when the Celtics were 3-0 down to the Heat: "Don't let us get one."
        
        The Heat eventually won the series in seven.
        
        Brown scored a game high 33 points for the Celtics, with Jason Tatum adding 28.
        
        The teams now head to Miami to play the first of two games on Saturday.
        
        OKC hammer the Pelicans
        Elsewhere, the youthful Oklahoma City Thunder thrashed the New Orleans Pelicans 124-92 to open up a 2-0 series lead.
        
        Shai Gilgeous-Alexander scored a game high and a personal playoff high 33 points on 68.4% shooting, while Chet Holmgren added 26 points and Jalen Williams 21 points.
        
        The Pelicans, still without Zion Williamson due to a hamstring injury picked up during the play-in, were led by 19 points from big man Jonas Valanciunas, while Brandon Ingram and Herb Jones each added 18 points.
    </p>

    <hr> <!-- Outside the Content (Never edit past this) -->

    <label>Source: </label>
    <a id="InContent_Source">
    </a>
</div>
`

NewsContents.newContent(new NewsContent(cid, ctype, ctitle, cdesc, cdate, csource, cauthor, chtml));

//#endregion

//#region Report 39

cid = 39
ctype = 1 //Sports=1, Foods=2, Politics=3
ctitle = "'I walked through the fire.' Ryan Garcia was three pounds overweight for major fight. It went ahead and he shocked the world";
cdesc = "He came, he saw, he jabbed and then his life outside of the ring appeared to unravel.";
cdate = new Date("2024-04-24T11:32:00"); //APR 24, 2024 11:32 AM PHT+8
csource = "https://edition.cnn.com/2024/04/24/sport/ryan-garcia-devin-haney-boxing-spt-intl/index.html"
cauthor = "Jonny Velasquez and Ben Morse";

chtml = `
<!-- You may edit this (optional)
    cid = 39
    ctype = 1 //Sports=1, Foods=2, Politics=3
    ctitle = "'I walked through the fire.' Ryan Garcia was three pounds overweight for major fight. It went ahead and he shocked the world";
    cdesc = "He came, he saw, he jabbed and then his life outside of the ring appeared to unravel.";
    cdate = new Date("2024-04-24T11:32:00"); //APR 24, 2024 11:32 AM PHT+8
    csource = "https://edition.cnn.com/2024/04/24/sport/ryan-garcia-devin-haney-boxing-spt-intl/index.html"
    cauthor = "Jonny Velasquez and Ben Morse.";
-->

<style>
    #InContent { width:786px; }
    #InContent .InContent_Imgs { width:100%; }
    #InContent .InContent_Div { text-align: center; }
    #inContent .InContent_Imgs_port { height:640px; }
</style>

<div id="InContent">

    <!-- Content Info -->
    <h1 id="InContent_Title">Title</h1>
    <div><label>Date: </label><span id="InContent_Date">January 1, 1970</span></div>
    <div><label>Author: </label><span id="InContent_Author">Unknown</span></div>

    <hr> <!-- Inside the Content (Only edit this) -->

    <img class="InContent_Imgs" src="pcover.png"> 
    <h5>Ryan Garcia reacts during his fight against Devin Haney. Al Bello/Getty Images    </h5>
    <p>
        He came, he saw, he jabbed and then his life outside of the ring appeared to unravel.

        Ryan Garcia was seen as poster boy for boxing, training alongside the likes of Canelo Alvarez and Oscar Valdez. The boxer would also frequently reference the importance of his religious faith.
        
        "Thank you, the Lord Jesus Christ. The King of Kings, Lord of Lords, thank you," Garcia said at a pre-fight media conference.
        
        Then in January 2024, Garcia and his wife Andrea Celina, who have two children, announced their divorce.
        
        Boxing redemption
        Garcia has a big smile on his face. He does a little dance and shakes his shoulders in a relaxed manner.
        
        His joyous, carefree attitude belies what's at stake. Garcia is within seconds of beating undefeated WBC super lightweight champion Haney in a performance which has got the boxing world talking - and then some.
        
        Ahead of the fight, Garcia missed the weight limit for the bout, which ended his chances of competing for a world title on April 20. To miss the weight limit for a world title fight isn't unheard of, but it's rare.
        
        Nonetheless, the 25-year-old Garcia knocked down Haney three times in a majority decision victory last Saturday in front of a sold-out crowd at Barclays Center in Brooklyn, New York.
        
        It's a result which not only reestablishes Garcia atop the boxing food chain, but also caps off a surreal week in his life.
        
        "I don't give a f**k what people say about me," Garcia said after the fight. "I walked through the fire and still held it down and still beat f**king Devin Haney and still drink every day."
        
        "Not necessarily proud of that, but I'm just saying it was a statement to show you, you guys can't really f**k with me."
        <p>

            <img class="InContent_Imgs" src="p1.png"> 
            <h5>Garcia celebrates after knocking down Haney. Cris Esqueda/Golden Boy/Getty Images  </h5>
            <p>Maverick
                From Muhammad Ali and Mike Tyson to Tyson Fury and Deontay Wilder, boxing has had plenty of maverick fighters.
                
                However, the behavior of Garcia, who had previously had the reputation of a clean-cut boxing talent with the world at his feet, was so erratic on social media in the weeks preceding Saturday's bout that some people thought the 25-year-old shouldn't have been allowed to fight Haney.
                
                "In the ring, I'm gonna beat your a**," Garcia posted on Instagram ahead of the fight. "You thought I wasn't gonna make it to the fight. I bet you hoped I would've got pulled out. I bet you hoped it was some kind of mental health issues."
                
                Many speculated that Ryan was going through a mental health crisis, including boxing promoter Eddie Hearn.
                
                "It's like the Truman Show, watching Ryan Garcia implode," Hearn said in an interview with Boxing Social.
                
                Garcia hasn't shied away from talking about his struggles with mental health. After a knockout win over Luke Campbell in 2021, he stepped away from the sport of boxing to deal with his psychological struggles.
                
                "I had no choice. It was so intense. Usually, I can get past things because I'm mentally strong," Garcia told The Breakfast Club.
                
                "This one was different. It was like nope, you're not getting up today. It was everything. I thought I was losing my mind."
                
                Garcia returned to the sport in April 2022 to secure a unanimous decision win over Emmanuel Tagoe in San Antonio, Texas.
                
                'I'm perfect'
                Fast forward to April 2024 and Garcia ramps up the braggadocio levels ahead of his fight with Haney, taking to Instagram to say he's been cleared to fight after a mandatory drug test and mental health evaluation.
                
                "I proved to everybody that I don't do drugs. I'm perfect," Garcia said in a video. "I'm perfectly fine. I've been evaluated. I had a meeting with the state commission. I don't understand why people continue to judge me so hard. I'm just having fun."
                
                CNN asked the New York State Athletic Commission for details as to how it evaluated Garcia's fitness to fight.
                
                "The commission works to protect the health and safety of all participants in combative sports, and to preserve the integrity of combative sport competition in New York State," said the Commission in a statement.
                
                "The Commission has broad authority to assess the medical fitness of professional athletes (mental and physical health included), and engages in a thorough case-by-case diligence process with every professional athlete based on their personal medical history and circumstances prior to their participation in competition.
                
                "No match is held until the professional athletes are found medically fit for competition. The Commission will not comment on the specific medical testing and evaluations of any particular person."
                
                CNN has also reached out to Garcia's representatives to offer the boxer the opportunity to comment.
                
                Underdog
                However, at the weigh-in, Garcia takes to the stage and chugs what appeared to be a beer. He later told Youtuber and fighter Jake Paul in a recorded call that it was apple juice and sparkling water.
                
                The weight for the fight had been set at 140 pounds, but, to the surprise of many, Garcia came in at just over 143 pounds.
                
                One who wasn't surprised was Haney, who throughout the pre-fight press conference, predicted Garcia would miss weight.
                
                During the press conference for the fight, Haney asked Garcia to pay him $500,000 per pound if he missed weight. Haney later said that Garcia honored the agreement by paying him the $1.5 million.
                
                According to sources who spoke to ESPN, Garcia forfeited upward of $600,000 of his purse to step into the ring with Haney.
                
                As a result, Garcia's shot at winning the WBC super lightweight was lost but he still fought Haney, despite coming into the bout as a huge underdog.
                
                In the first round, Garcia pounced on Haney with constant pressure. Haney felt his power when he connected flush with a left hook. In the second, third and fourth rounds, Haney made adjustments and won by utilizing his jab.
                
                <p>
                <img class="InContent_Imgs" src="p2.png"> 
                <h5>Garcia throws a punch at Haney. Cris Esqueda/Golden Boy/Getty Images</h5>
                <p>But Garcia's speed and power proved to be too much as the fight entered the later rounds. For the first time in Haney's professional career, Garcia was able to knock him to the canvas in the seventh, 10th and 11th rounds.

                    In the end, Garcia's hand was raised, winning by the judges' scores of 115-109, 114-110 and 112-112.
                    
                    Although he missed a shot at claiming a championship belt, Garcia exited Saturday's fight with his reputation greatly enhanced after handing Haney his first professional defeat.
                    
                    And if Garcia's reputation as one of the most exciting boxing talents took a hit last year when he suffered his first professional defeat to Gervonta Davis, Saturday's victory is a giant step in rebuilding his boxing pedigree.
                    
                    "Come on, guys, you really thought I was crazy? You all lost your own minds." Garcia said in his post-fight interview. "You guys overegg everything."
                    
                    Garcia and Haney fought six times in the amateurs, each winning three fights. After Saturday night's fight, both boxers agreed to a rematch.
                    
                    </p>


    <hr> <!-- Outside the Content (Never edit past this) -->

    <label>Source: </label>
    <a id="InContent_Source">
    </a>
</div>
`

NewsContents.newContent(new NewsContent(cid, ctype, ctitle, cdesc, cdate, csource, cauthor, chtml));

//#endregion

/*

//#region Report Template

cid = 10
ctype = 3 //Sports=1, Foods=2, Politics=3
ctitle = "For Many Western Allies, Sending Weapons to Israel Gets Dicey";
cdesc = "As civilian casualties in Gaza spiral, some nations are suspending sales amid accusations of abetting genocide and war crimes.";
cdate = new Date("2024-04-13T19:20:00"); //APR 13, 2024 7:20 PM PHT+8
csource = "https://www.nytimes.com/2024/04/13/world/europe/israel-weapons-sales-genocide.html"
cauthor = "Lara Jakes.";

chtml = `

`

NewsContents.newContent(new NewsContent(cid, ctype, ctitle, cdesc, cdate, csource, cauthor, chtml));

//#endregion

*/

// REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS
// PORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS R
// RTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REP
//#endregion

//#region News

//SetCategoryTheme("Default");

//#endregion

//#endregion

function PagesNews(page, maxpage) {

//element.setAttribute('onclick','NewsContents.loadContent(NewsContents.getContent('+ (rcontents[i].id).toString() +'));');

    let prevpage = document.getElementById("NewsList_PrevPage");
    let pageindex = [
        document.getElementById("NewsList_Index1"), //0
        document.getElementById("NewsList_Index2"), //1
        document.getElementById("NewsList_Index3"), //2
        document.getElementById("NewsList_Index4"), //3
        document.getElementById("NewsList_Index5"), //4
        document.getElementById("NewsList_Index6"), //5
        document.getElementById("NewsList_Index7")  //6
    ];
    let nextpage = document.getElementById("NewsList_NextPage");

    //reset
    prevpage.style.display = 'none';
    nextpage.style.display = 'none';
    for (let i = 0; i < 7; i++) {
        pageindex[i].style.display = 'none';
        pageindex[i].style.fontWeight = 'normal';
        pageindex[i].innerHTML = i+1;
    }
    //if page is equals to 1
    if (maxpage==1) {
        pageindex[0].style.display = 'inline';
        pageindex[0].innerHTML = 1;
    }
    //if less than 8
    if (maxpage<8) {
        if (page != 1) {
            prevpage.style.display = 'inline';
            prevpagenum = page-1;
            prevpage.setAttribute('onclick','LoadNews("NewsList","' + curnewstype +  '",' + (prevpagenum) + ')');
        }
        if (page != maxpage) {
            nextpagenum = page+1;
            nextpage.style.display = 'inline';
            nextpage.setAttribute('onclick','LoadNews("NewsList","' + curnewstype +  '",' + (nextpagenum) + ')');
        }
        for (let i = 0; i < maxpage; i++) {
            pageindex[i].style.display = 'inline';
            let setpage = i+1;
            pageindex[i].setAttribute('onclick','LoadNews("NewsList","' + curnewstype +  '",' + setpage + ')');
        }
        pageindex[page-1].style.fontWeight = 'bold';
    }
    if (maxpage>7) {
        if (page != 1) {
            prevpage.style.display = 'inline';
            prevpagenum = page-1;
            prevpage.setAttribute('onclick','LoadNews("NewsList","' + curnewstype +  '",' + (prevpagenum) + ')');
        }
        if (page != maxpage) {
            nextpagenum = page+1;
            nextpage.style.display = 'inline';
            nextpage.setAttribute('onclick','LoadNews("NewsList","' + curnewstype +  '",' + (nextpagenum) + ')');
        }
        for (let i = 0; i < 7; i++) {
            pageindex[i].style.display = 'inline';
            let setpage = i+1;
            pageindex[i].setAttribute('onclick','LoadNews("NewsList","' + curnewstype +  '",' + setpage + ')');
        }

        if ((page-3 > 0) && (page+3 < maxpage)) {
            for (let i = 0; i < 7; i++) {
                rpage = i+page-3;
                pageindex[i].style.display = 'inline';
                let setpage = rpage;
                pageindex[i].setAttribute('onclick','LoadNews("NewsList","' + curnewstype +  '",' + setpage + ')');
                pageindex[i].innerHTML = rpage;
            }
            pageindex[3].style.fontWeight = 'bold';
        }
        else if (page-3 <= 0) {
            pageindex[page-1].style.fontWeight = 'bold';
        }
        else if (page+3 >= maxpage) {
            for (let i = 0; i < 7; i++) {
                rpage = i+maxpage-6;
                pageindex[i].style.display = 'inline';
                let setpage = rpage;
                pageindex[i].setAttribute('onclick','LoadNews("NewsList","' + curnewstype +  '",' + setpage + ')');
                pageindex[i].innerHTML = rpage;
            }

            pageindex[6-(maxpage-page)].style.fontWeight = 'bold';
        }

        if (page+3 < maxpage) {
            let maxpagenum = maxpage;
            pageindex[6].setAttribute('onclick','LoadNews("NewsList","' + curnewstype +  '",' + maxpagenum + ')');
            pageindex[6].innerHTML = '...';
        }
        if (page-4 > 0) {
            let minpagenum = 1;
            pageindex[0].setAttribute('onclick','LoadNews("NewsList","' + curnewstype +  '",' + minpagenum + ')');
            pageindex[0].innerHTML = '...';
        }
        console.log(page);
    }
}

function LoadNews(name, type, count) {
    let rcontents;
    let e;
    curnewstype = type;

    // Names:
    // HomeSports
    // HomeFoods
    // HomePolitics
    // NewsList - On a News List
    // ContentAside - On a News Content

    // type:
    // RecentGeneral
    // RecentSports
    // RecentFoods
    // RecentPolitics
    // RandomNews

    if (name == "NewsList") {
        //count is converted into page
        let page = 0;
        page = count;
        count = 5;

        if (type == "RecentGeneral") {
            
            rcontents = NewsContents.getContents(0);
            highestpage = Math.ceil((rcontents.length)/count);

            for (let i = 1; i < count+1; i++) {
                let ipage = i+((page-1)*(count))-1;
                if (ipage>=rcontents.length) {
                    e = ItemSuggestid(name, "Title", i-1);
                    e.style.display = 'none';
                    e = ItemSuggestid(name, "Info", i-1);
                    e.style.display = 'none';
                    e = ItemSuggestid(name, "BInfo", i-1);
                    e.style.display = 'none';
                    continue;
                }
                e = ItemSuggestid(name, "Title", i-1);
                e.innerHTML = rcontents[ipage].title;
                e.style.display = '-webkit-box';
                e.setAttribute('onclick','NewsContents.loadContent(NewsContents.getContent('+ (rcontents[ipage].id).toString() + '));');
                e = ItemSuggestid(name, "Info", i-1);
                e.style.display = 'flex';
                //nothing lmao
                e = ItemSuggestid(name, "Cover", i-1);
                e.src = rdir + rcontents[ipage].id + "/pcover.png";
                e = ItemSuggestid(name, "Description", i-1);
                e.innerHTML = rcontents[ipage].description;

                e = ItemSuggestid(name, "BInfo", i-1);
                e.style.display = 'block';
                e = ItemSuggestid(name, "Date", i-1);
                let formattedDate = rcontents[ipage].date.toLocaleString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    timeZone: "Asia/Hong_Kong"
                  });
                e.innerHTML = formattedDate;
                e = ItemSuggestid(name, "Author", i-1);
                e.innerHTML = rcontents[ipage].author;
                e = ItemSuggestid(name, "Source", i-1);
                e.innerHTML = rcontents[ipage].source;
            }
        }
        if (type == "RecentSports") {
            
            rcontents = NewsContents.getContents(1);
            highestpage = Math.ceil((rcontents.length)/count);

            for (let i = 1; i < count+1; i++) {
                let ipage = i+((page-1)*(count))-1;
                if (ipage>=rcontents.length) {
                    e = ItemSuggestid(name, "Title", i-1);
                    e.style.display = 'none' 
                    e = ItemSuggestid(name, "Info", i-1);
                    e.style.display = 'none'
                    e = ItemSuggestid(name, "BInfo", i-1);
                    e.style.display = 'none'
                    continue;
                }
                e = ItemSuggestid(name, "Title", i-1);
                e.innerHTML = rcontents[ipage].title;
                e.style.display = '-webkit-box';
                e.setAttribute('onclick','NewsContents.loadContent(NewsContents.getContent('+ (rcontents[ipage].id).toString() + '));');
                e = ItemSuggestid(name, "Info", i-1);
                e.style.display = 'flex';
                //nothing lmao
                e = ItemSuggestid(name, "Cover", i-1);
                e.src = rdir + rcontents[ipage].id + "/pcover.png";
                e = ItemSuggestid(name, "Description", i-1);
                e.innerHTML = rcontents[ipage].description;

                e = ItemSuggestid(name, "BInfo", i-1);
                e.style.display = 'block';
                e = ItemSuggestid(name, "Date", i-1);
                let formattedDate = rcontents[ipage].date.toLocaleString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    timeZone: "Asia/Hong_Kong"
                  });
                e.innerHTML = formattedDate;
                e = ItemSuggestid(name, "Author", i-1);
                e.innerHTML = rcontents[ipage].author;
                e = ItemSuggestid(name, "Source", i-1);
                e.innerHTML = rcontents[ipage].source;
            }
        }
        if (type == "RecentFoods") {

            rcontents = NewsContents.getContents(2);
            highestpage = Math.ceil((rcontents.length)/count);

            for (let i = 1; i < count+1; i++) {
                let ipage = i+((page-1)*(count))-1;
                if (ipage>=rcontents.length) {
                    e = ItemSuggestid(name, "Title", i-1);
                    e.style.display = 'none' 
                    e = ItemSuggestid(name, "Info", i-1);
                    e.style.display = 'none'
                    e = ItemSuggestid(name, "BInfo", i-1);
                    e.style.display = 'none'
                    continue;
                }
                e = ItemSuggestid(name, "Title", i-1);
                e.innerHTML = rcontents[ipage].title;
                e.style.display = '-webkit-box';
                e.setAttribute('onclick','NewsContents.loadContent(NewsContents.getContent('+ (rcontents[ipage].id).toString() + '));');
                e = ItemSuggestid(name, "Info", i-1);
                e.style.display = 'flex';
                //nothing lmao
                e = ItemSuggestid(name, "Cover", i-1);
                e.src = rdir + rcontents[ipage].id + "/pcover.png";
                e = ItemSuggestid(name, "Description", i-1);
                e.innerHTML = rcontents[ipage].description;

                e = ItemSuggestid(name, "BInfo", i-1);
                e.style.display = 'block';
                e = ItemSuggestid(name, "Date", i-1);
                let formattedDate = rcontents[ipage].date.toLocaleString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    timeZone: "Asia/Hong_Kong"
                  });
                e.innerHTML = formattedDate;
                e = ItemSuggestid(name, "Author", i-1);
                e.innerHTML = rcontents[ipage].author;
                e = ItemSuggestid(name, "Source", i-1);
                e.innerHTML = rcontents[ipage].source;
            }
        }
        if (type == "RecentPolitics") {

            rcontents = NewsContents.getContents(3);
            highestpage = Math.ceil((rcontents.length)/count);

            for (let i = 1; i < count+1; i++) {
                let ipage = i+((page-1)*(count))-1;
                if (ipage>=rcontents.length) {
                    e = ItemSuggestid(name, "Title", i-1);
                    e.style.display = 'none' 
                    e = ItemSuggestid(name, "Info", i-1);
                    e.style.display = 'none'
                    e = ItemSuggestid(name, "BInfo", i-1);
                    e.style.display = 'none'
                    continue;
                }
                e = ItemSuggestid(name, "Title", i-1);
                e.innerHTML = rcontents[ipage].title;
                e.style.display = '-webkit-box';
                e.setAttribute('onclick','NewsContents.loadContent(NewsContents.getContent('+ (rcontents[ipage].id).toString() + '));');
                e = ItemSuggestid(name, "Info", i-1);
                e.style.display = 'flex';
                //nothing lmao
                e = ItemSuggestid(name, "Cover", i-1);
                e.src = rdir + rcontents[ipage].id + "/pcover.png";
                e = ItemSuggestid(name, "Description", i-1);
                e.innerHTML = rcontents[ipage].description;

                e = ItemSuggestid(name, "BInfo", i-1);
                e.style.display = 'block';
                e = ItemSuggestid(name, "Date", i-1);
                let formattedDate = rcontents[ipage].date.toLocaleString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    timeZone: "Asia/Hong_Kong"
                  });
                e.innerHTML = formattedDate;
                e = ItemSuggestid(name, "Author", i-1);
                e.innerHTML = rcontents[ipage].author;
                e = ItemSuggestid(name, "Source", i-1);
                e.innerHTML = rcontents[ipage].source;
            }
        }

        if (type == "SearchGeneral") {
            
            let filter = document.getElementById("NewsList_SearchIndex").value;
            rcontents = NewsContents.getSearchContents(0, filter);
            highestpage = Math.ceil((rcontents.length)/count);

            for (let i = 1; i < count+1; i++) {
                let ipage = i+((page-1)*(count))-1;
                if (ipage>=rcontents.length) {
                    e = ItemSuggestid(name, "Title", i-1);
                    e.style.display = 'none';
                    e = ItemSuggestid(name, "Info", i-1);
                    e.style.display = 'none';
                    e = ItemSuggestid(name, "BInfo", i-1);
                    e.style.display = 'none';
                    continue;
                }
                e = ItemSuggestid(name, "Title", i-1);
                e.innerHTML = rcontents[ipage].title;
                e.style.display = '-webkit-box';
                e.setAttribute('onclick','NewsContents.loadContent(NewsContents.getContent('+ (rcontents[ipage].id).toString() + '));');
                e = ItemSuggestid(name, "Info", i-1);
                e.style.display = 'flex';
                //nothing lmao
                e = ItemSuggestid(name, "Cover", i-1);
                e.src = rdir + rcontents[ipage].id + "/pcover.png";
                e = ItemSuggestid(name, "Description", i-1);
                e.innerHTML = rcontents[ipage].description;

                e = ItemSuggestid(name, "BInfo", i-1);
                e.style.display = 'block';
                e = ItemSuggestid(name, "Date", i-1);
                let formattedDate = rcontents[ipage].date.toLocaleString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    timeZone: "Asia/Hong_Kong"
                  });
                e.innerHTML = formattedDate;
                e = ItemSuggestid(name, "Author", i-1);
                e.innerHTML = rcontents[ipage].author;
                e = ItemSuggestid(name, "Source", i-1);
                e.innerHTML = rcontents[ipage].source;
            }
        }
        if (type == "SearchSports") {
            
            let filter = document.getElementById("NewsList_SearchIndex").value;
            rcontents = NewsContents.getSearchContents(1, filter);
            highestpage = Math.ceil((rcontents.length)/count);

            for (let i = 1; i < count+1; i++) {
                let ipage = i+((page-1)*(count))-1;
                if (ipage>=rcontents.length) {
                    e = ItemSuggestid(name, "Title", i-1);
                    e.style.display = 'none' 
                    e = ItemSuggestid(name, "Info", i-1);
                    e.style.display = 'none'
                    e = ItemSuggestid(name, "BInfo", i-1);
                    e.style.display = 'none'
                    continue;
                }
                e = ItemSuggestid(name, "Title", i-1);
                e.innerHTML = rcontents[ipage].title;
                e.style.display = '-webkit-box';
                e.setAttribute('onclick','NewsContents.loadContent(NewsContents.getContent('+ (rcontents[ipage].id).toString() + '));');
                e = ItemSuggestid(name, "Info", i-1);
                e.style.display = 'flex';
                //nothing lmao
                e = ItemSuggestid(name, "Cover", i-1);
                e.src = rdir + rcontents[ipage].id + "/pcover.png";
                e = ItemSuggestid(name, "Description", i-1);
                e.innerHTML = rcontents[ipage].description;

                e = ItemSuggestid(name, "BInfo", i-1);
                e.style.display = 'block';
                e = ItemSuggestid(name, "Date", i-1);
                let formattedDate = rcontents[ipage].date.toLocaleString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    timeZone: "Asia/Hong_Kong"
                  });
                e.innerHTML = formattedDate;
                e = ItemSuggestid(name, "Author", i-1);
                e.innerHTML = rcontents[ipage].author;
                e = ItemSuggestid(name, "Source", i-1);
                e.innerHTML = rcontents[ipage].source;
            }
        }
        if (type == "SearchFoods") {
            
            let filter = document.getElementById("NewsList_SearchIndex").value;
            rcontents = NewsContents.getSearchContents(2, filter);
            highestpage = Math.ceil((rcontents.length)/count);

            for (let i = 1; i < count+1; i++) {
                let ipage = i+((page-1)*(count))-1;
                if (ipage>=rcontents.length) {
                    e = ItemSuggestid(name, "Title", i-1);
                    e.style.display = 'none' 
                    e = ItemSuggestid(name, "Info", i-1);
                    e.style.display = 'none'
                    e = ItemSuggestid(name, "BInfo", i-1);
                    e.style.display = 'none'
                    continue;
                }
                e = ItemSuggestid(name, "Title", i-1);
                e.innerHTML = rcontents[ipage].title;
                e.style.display = '-webkit-box';
                e.setAttribute('onclick','NewsContents.loadContent(NewsContents.getContent('+ (rcontents[ipage].id).toString() + '));');
                e = ItemSuggestid(name, "Info", i-1);
                e.style.display = 'flex';
                //nothing lmao
                e = ItemSuggestid(name, "Cover", i-1);
                e.src = rdir + rcontents[ipage].id + "/pcover.png";
                e = ItemSuggestid(name, "Description", i-1);
                e.innerHTML = rcontents[ipage].description;

                e = ItemSuggestid(name, "BInfo", i-1);
                e.style.display = 'block';
                e = ItemSuggestid(name, "Date", i-1);
                let formattedDate = rcontents[ipage].date.toLocaleString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    timeZone: "Asia/Hong_Kong"
                  });
                e.innerHTML = formattedDate;
                e = ItemSuggestid(name, "Author", i-1);
                e.innerHTML = rcontents[ipage].author;
                e = ItemSuggestid(name, "Source", i-1);
                e.innerHTML = rcontents[ipage].source;
            }
        }
        if (type == "SearchPolitics") {
            
            let filter = document.getElementById("NewsList_SearchIndex").value;
            rcontents = NewsContents.getSearchContents(3, filter);
            highestpage = Math.ceil((rcontents.length)/count);

            for (let i = 1; i < count+1; i++) {
                let ipage = i+((page-1)*(count))-1;
                if (ipage>=rcontents.length) {
                    e = ItemSuggestid(name, "Title", i-1);
                    e.style.display = 'none' 
                    e = ItemSuggestid(name, "Info", i-1);
                    e.style.display = 'none'
                    e = ItemSuggestid(name, "BInfo", i-1);
                    e.style.display = 'none'
                    continue;
                }
                e = ItemSuggestid(name, "Title", i-1);
                e.innerHTML = rcontents[ipage].title;
                e.style.display = '-webkit-box';
                e.setAttribute('onclick','NewsContents.loadContent(NewsContents.getContent('+ (rcontents[ipage].id).toString() + '));');
                e = ItemSuggestid(name, "Info", i-1);
                e.style.display = 'flex';
                //nothing lmao
                e = ItemSuggestid(name, "Cover", i-1);
                e.src = rdir + rcontents[ipage].id + "/pcover.png";
                e = ItemSuggestid(name, "Description", i-1);
                e.innerHTML = rcontents[ipage].description;

                e = ItemSuggestid(name, "BInfo", i-1);
                e.style.display = 'block';
                e = ItemSuggestid(name, "Date", i-1);
                let formattedDate = rcontents[ipage].date.toLocaleString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    timeZone: "Asia/Hong_Kong"
                  });
                e.innerHTML = formattedDate;
                e = ItemSuggestid(name, "Author", i-1);
                e.innerHTML = rcontents[ipage].author;
                e = ItemSuggestid(name, "Source", i-1);
                e.innerHTML = rcontents[ipage].source;
            }
        }
        
        if (type == "MainSearchGeneral") {
            
            let filter = document.getElementById("Main_SearchIndex").value;
            rcontents = NewsContents.getSearchContents(0, filter);
            highestpage = Math.ceil((rcontents.length)/count);

            for (let i = 1; i < count+1; i++) {
                let ipage = i+((page-1)*(count))-1;
                if (ipage>=rcontents.length) {
                    e = ItemSuggestid(name, "Title", i-1);
                    e.style.display = 'none';
                    e = ItemSuggestid(name, "Info", i-1);
                    e.style.display = 'none';
                    e = ItemSuggestid(name, "BInfo", i-1);
                    e.style.display = 'none';
                    continue;
                }
                e = ItemSuggestid(name, "Title", i-1);
                e.innerHTML = rcontents[ipage].title;
                e.style.display = '-webkit-box';
                e.setAttribute('onclick','NewsContents.loadContent(NewsContents.getContent('+ (rcontents[ipage].id).toString() + '));');
                e = ItemSuggestid(name, "Info", i-1);
                e.style.display = 'flex';
                //nothing lmao
                e = ItemSuggestid(name, "Cover", i-1);
                e.src = rdir + rcontents[ipage].id + "/pcover.png";
                e = ItemSuggestid(name, "Description", i-1);
                e.innerHTML = rcontents[ipage].description;

                e = ItemSuggestid(name, "BInfo", i-1);
                e.style.display = 'block';
                e = ItemSuggestid(name, "Date", i-1);
                let formattedDate = rcontents[ipage].date.toLocaleString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    timeZone: "Asia/Hong_Kong"
                  });
                e.innerHTML = formattedDate;
                e = ItemSuggestid(name, "Author", i-1);
                e.innerHTML = rcontents[ipage].author;
                e = ItemSuggestid(name, "Source", i-1);
                e.innerHTML = rcontents[ipage].source;
            }
        }
        PagesNews(page, highestpage);
    }
    else
    {
        if (type == "RecentGeneral") {

            rcontents = NewsContents.getContents(0);
            for (let i = 0; i < count; i++) {
                e = ItemSuggestid(name, "Title", i);
                e.innerHTML = rcontents[i].title;
                e.setAttribute('onclick','NewsContents.loadContent(NewsContents.getContent('+ (rcontents[i].id).toString() +'));');
                e = ItemSuggestid(name, "Info", i);
                //nothing lmao
                e = ItemSuggestid(name, "Cover", i);
                e.src = rdir + rcontents[i].id + "/pcover.png";
                e = ItemSuggestid(name, "Description", i);
                e.innerHTML = rcontents[i].description;
            }
        }
        if (type == "RecentSports") {

            rcontents = NewsContents.getContents(1);
            for (let i = 0; i < count; i++) {
                e = ItemSuggestid(name, "Title", i);
                e.innerHTML = rcontents[i].title;
                e.setAttribute('onclick','NewsContents.loadContent(NewsContents.getContent('+ (rcontents[i].id).toString() +'));');
                e = ItemSuggestid(name, "Info", i);
                //nothing lmao
                e = ItemSuggestid(name, "Cover", i);
                e.src = rdir + rcontents[i].id + "/pcover.png";
                e = ItemSuggestid(name, "Description", i);
                e.innerHTML = rcontents[i].description;
            }
        }
        if (type == "RecentFoods") {

            rcontents = NewsContents.getContents(2);
            for (let i = 0; i < count; i++) {
                e = ItemSuggestid(name, "Title", i);
                e.innerHTML = rcontents[i].title;
                e.setAttribute('onclick','NewsContents.loadContent(NewsContents.getContent('+ (rcontents[i].id).toString() +'));');
                e = ItemSuggestid(name, "Info", i);
                //nothing lmao
                e = ItemSuggestid(name, "Cover", i);
                e.src = rdir + rcontents[i].id + "/pcover.png";
                e = ItemSuggestid(name, "Description", i);
                e.innerHTML = rcontents[i].description;
            }
        }
        if (type == "RecentPolitics") {

            rcontents = NewsContents.getContents(3);
            for (let i = 0; i < count; i++) {
                e = ItemSuggestid(name, "Title", i);
                e.innerHTML = rcontents[i].title;
                e.setAttribute('onclick','NewsContents.loadContent(NewsContents.getContent('+ (rcontents[i].id).toString() +'));');
                e = ItemSuggestid(name, "Info", i);
                //nothing lmao
                e = ItemSuggestid(name, "Cover", i);
                e.src = rdir + rcontents[i].id + "/pcover.png";
                e = ItemSuggestid(name, "Description", i);
                e.innerHTML = rcontents[i].description;
            }
        }
        if (type == "RandomGeneral") {

            rcontents = NewsContents.getRandomContents(0, curcontent);
            for (let i = 0; i < count; i++) {
                e = ItemSuggestid(name, "Title", i);
                e.innerHTML = rcontents[i].title;
                e.setAttribute('onclick','NewsContents.loadContent(NewsContents.getContent('+ (rcontents[i].id).toString() +'));');
                e = ItemSuggestid(name, "Info", i);
                //nothing lmao
                e = ItemSuggestid(name, "Cover", i);
                e.src = rdir + rcontents[i].id + "/pcover.png";
                e = ItemSuggestid(name, "Description", i);
                e.innerHTML = rcontents[i].description;
            }
        }
        if (type == "RandomSports") {

            rcontents = NewsContents.getRandomContents(1, curcontent);
            for (let i = 0; i < count; i++) {
                e = ItemSuggestid(name, "Title", i);
                e.innerHTML = rcontents[i].title;
                e.setAttribute('onclick','NewsContents.loadContent(NewsContents.getContent('+ (rcontents[i].id).toString() +'));');
                e = ItemSuggestid(name, "Info", i);
                //nothing lmao
                e = ItemSuggestid(name, "Cover", i);
                e.src = rdir + rcontents[i].id + "/pcover.png";
                e = ItemSuggestid(name, "Description", i);
                e.innerHTML = rcontents[i].description;
            }
        }
        if (type == "RandomFoods") {

            rcontents = NewsContents.getRandomContents(2, curcontent);
            for (let i = 0; i < count; i++) {
                e = ItemSuggestid(name, "Title", i);
                e.innerHTML = rcontents[i].title;
                e.setAttribute('onclick','NewsContents.loadContent(NewsContents.getContent('+ (rcontents[i].id).toString() +'));');
                e = ItemSuggestid(name, "Info", i);
                //nothing lmao
                e = ItemSuggestid(name, "Cover", i);
                e.src = rdir + rcontents[i].id + "/pcover.png";
                e = ItemSuggestid(name, "Description", i);
                e.innerHTML = rcontents[i].description;
            }
        }
        if (type == "RandomPolitics") {

            rcontents = NewsContents.getRandomContents(3, curcontent);
            for (let i = 0; i < count; i++) {
                e = ItemSuggestid(name, "Title", i);
                e.innerHTML = rcontents[i].title;
                e.setAttribute('onclick','NewsContents.loadContent(NewsContents.getContent('+ (rcontents[i].id).toString() +'));');
                e = ItemSuggestid(name, "Info", i);
                //nothing lmao
                e = ItemSuggestid(name, "Cover", i);
                e.src = rdir + rcontents[i].id + "/pcover.png";
                e = ItemSuggestid(name, "Description", i);
                e.innerHTML = rcontents[i].description;
            }
        }
    }
}

class ItemSuggest {
    contructor(title, info, img, desc){
        this.title = title;
        this.info = info;
        this.cover = img;
        this.description = desc;
    }
}

function ItemSuggestid(item, attr, id) {
    //HomeSports - On Home
    //HomeFoods - On Home
    //HomePolitics - On Home
    //SeeMore - When SeeMore is clicked
    //ContentAside - On a News Content

    let idstr = "";
    let element;

    //attr
    if (attr == "Title") { idstr = "HST"; }
    if (attr == "Info") { idstr = "HSInfo"; }
    if (attr == "Cover") { idstr = "HSIMG"; }
    if (attr == "Description") { idstr = "HSD"; }

    if (attr == "BInfo") { idstr = "HSBInfo"; }
    if (attr == "Date") { idstr = "HSDate"; }
    if (attr == "Author") { idstr = "HSA"; }
    if (attr == "Source") { idstr = "HSS"; }

    //items
    if (item == "HomeSports") { idstr += "1_"; }
    if (item == "HomeFoods") { idstr += "2_"; }
    if (item == "HomePolitics") { idstr += "3_"; }
    if (item == "HomeGeneral") { idstr += "4_"; }
    if (item == "NewsList") { idstr += "NL"; }
    if (item == "ContentAside") { idstr += "CA"; }
    idstr += (id+1).toString();
    element = document.getElementById(idstr);
    return element;
}
