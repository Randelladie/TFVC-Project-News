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
        #Content_Categories {
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
        switch(content.type) {
            case 0:
                SetCategoryTheme("Default");
                LoadNews("ContentAside", "RecentGeneral", 3)
                break;
            case 1:
                SetCategoryTheme("Sports");
                LoadNews("ContentAside", "RecentSports", 3)
                break;
            case 2:
                SetCategoryTheme("Foods");
                LoadNews("ContentAside", "RecentFoods", 3)
                break;
            case 3:
                SetCategoryTheme("Politics");
                LoadNews("ContentAside", "RecentPolitics", 3)
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
        }
        if (type==1) {
            SetCategoryTheme("Sports");
            LoadPage("NewsList");
            LoadNews("NewsList", "RecentSports", 1);
        }
        if (type==2) {
            SetCategoryTheme("Foods");
            LoadPage("NewsList");
            LoadNews("NewsList", "RecentFoods", 1);
        }
        if (type==3) {
            SetCategoryTheme("Politics");
            LoadPage("NewsList");
            LoadNews("NewsList", "RecentPolitics", 1);
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

/*

//#endregion

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

    console.log("reset")

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
        }
        if (page != maxpage) {
            nextpage.style.display = 'inline';
        }
        for (let i = 0; i < maxpage; i++) {
            pageindex[i].style.display = 'inline';
            let setpage = i+1;
            pageindex[i].setAttribute('onclick','LoadNews("NewsList","' + curnewstype +  '",' + setpage + ')');
        }
        pageindex[page-1].style.fontWeight = 'bold';
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
        count = 10;

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
