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

//For Miscellanous
var curtype = "Default"; //Layout Refresh
var rdir = "mainRes/Reports/"; // Reports Directory

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
        #NewsList_Border {
            background-color:white;
            border-color:blue;
        }
        #NewsList_Main_Content {
            border-color:blue;
            border-style:solid;
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
        #NewsList_Border {
            background-color:white;
            border-color:#792845;
        }
        #NewsList_Main_Content {
            border-color:#792845;
            border-style:solid;
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
        #NewsList_Border {
            background-color:white;
            border-color:red;
        }
        #NewsList_Main_Content {
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
        #NewsList_Border {
            background-color:white;
            border-color:green;
        }
        #NewsList_Main_Content {
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
                LoadNews("ContentAside", "RecentAside", 3)
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
    getRandomContent(type) {
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


// REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS
// PORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS R
// RTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REP
//#endregion

//#region News

//SetCategoryTheme("Default");

//#endregion

//#endregion

function LoadNews(name, type, count) {
    let rcontents;
    let e;

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
        console.log("News List")
        //count is converted into page
        let page = count;
        count = 10;

        if (type == "RecentGeneral") {

            rcontents = NewsContents.getRandomContent(0);
            for (let i = (page-1)*10; i < ((page)*10)-1; i++) {
                if (i>=rcontents.length) {
                    break;
                }
                e = ItemSuggestid(name, "Title", i);
                e.innerHTML = rcontents[i].title;
                style.innerHTML += `#` + e.id + ` { display: -webkit-box; } `;
                e.setAttribute('onclick','NewsContents.loadContent(NewsContents.getContent('+ (rcontents[i].id).toString() +'));');
                e = ItemSuggestid(name, "Info", i);
                style.innerHTML += `#` + e.id + ` { display: flex; } `;
                //nothing lmao
                e = ItemSuggestid(name, "Cover", i);
                e.src = rdir + rcontents[i].id + "/pcover.png";
                e = ItemSuggestid(name, "Description", i);
                e.innerHTML = rcontents[i].description;

                e = ItemSuggestid(name, "BInfo", i);
                style.innerHTML += `#` + e.id + ` { display: block; } `;
                e = ItemSuggestid(name, "Date", i);
                let formattedDate = rcontents[i].date.toLocaleString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    timeZone: "Asia/Hong_Kong"
                  });
                e.innerHTML = formattedDate;
                e = ItemSuggestid(name, "Author", i);
                e.innerHTML = rcontents[i].author;
                e = ItemSuggestid(name, "Source", i);
                e.innerHTML = rcontents[i].source;
            }
        }
        if (type == "RecentSports") {

            rcontents = NewsContents.getRandomContent(1);
            for (let i = (page-1)*10; i < ((page)*10)-1; i++) {
                if (i>=rcontents.length) {
                    break;
                }
                e = ItemSuggestid(name, "Title", i);
                e.innerHTML = rcontents[i].title;
                style.innerHTML += `#` + e.id + ` { display: -webkit-box; } `;
                e.setAttribute('onclick','NewsContents.loadContent(NewsContents.getContent('+ (rcontents[i].id).toString() +'));');
                e = ItemSuggestid(name, "Info", i);
                style.innerHTML += `#` + e.id + ` { display: flex; } `;
                //nothing lmao
                e = ItemSuggestid(name, "Cover", i);
                e.src = rdir + rcontents[i].id + "/pcover.png";
                e = ItemSuggestid(name, "Description", i);
                e.innerHTML = rcontents[i].description;
            }
        }
        if (type == "RecentFoods") {

            rcontents = NewsContents.getRandomContent(2);
            for (let i = (page-1)*10; i < ((page)*10)-1; i++) {
                if (i>=rcontents.length) {
                    break;
                }
                e = ItemSuggestid(name, "Title", i);
                e.innerHTML = rcontents[i].title;
                style.innerHTML += `#` + e.id + ` { display: -webkit-box; } `;
                e.setAttribute('onclick','NewsContents.loadContent(NewsContents.getContent('+ (rcontents[i].id).toString() +'));');
                e = ItemSuggestid(name, "Info", i);
                style.innerHTML += `#` + e.id + ` { display: flex; } `;
                //nothing lmao
                e = ItemSuggestid(name, "Cover", i);
                e.src = rdir + rcontents[i].id + "/pcover.png";
                e = ItemSuggestid(name, "Description", i);
                e.innerHTML = rcontents[i].description;
            }
        }
        if (type == "RecentPolitics") {

            rcontents = NewsContents.getRandomContent(3);
            for (let i = (page-1)*10; i < ((page)*10)-1; i++) {
                if (i>=rcontents.length) {
                    break;
                }
                e = ItemSuggestid(name, "Title", i);
                e.innerHTML = rcontents[i].title;
                style.innerHTML += `#` + e.id + ` { display: -webkit-box; } `;
                e.setAttribute('onclick','NewsContents.loadContent(NewsContents.getContent('+ (rcontents[i].id).toString() +'));');
                e = ItemSuggestid(name, "Info", i);
                style.innerHTML += `#` + e.id + ` { display: flex; } `;
                //nothing lmao
                e = ItemSuggestid(name, "Cover", i);
                e.src = rdir + rcontents[i].id + "/pcover.png";
                e = ItemSuggestid(name, "Description", i);
                e.innerHTML = rcontents[i].description;
            }
        }
    }
    else
    {
        if (type == "RecentGeneral") {

            rcontents = NewsContents.getRandomContent(0);
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

            rcontents = NewsContents.getRandomContent(1);
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

            rcontents = NewsContents.getRandomContent(2);
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

            rcontents = NewsContents.getRandomContent(3);
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
