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
            display: inline;
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
            background-color:rgb(213, 244, 255);
        }
        .Main_CategoryListButton {
            background-color:lightblue;
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
            border-style:solid;
        }
        #Content_Suggestions {
            border-color:blue;
            border-style:solid;
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
                break;
            case 1:
                SetCategoryTheme("Sports");
                LoadNews("ContentAside", "RecentSports")
                break;
            case 2:
                SetCategoryTheme("Foods");
                LoadNews("ContentAside", "RecentSports")
                break;
            case 3:
                SetCategoryTheme("Politics");
                LoadNews("ContentAside", "RecentSports")
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
    }
    getRandomContent(type, count) {
        //Type
        //0 = all
        //1 = Sports
        //2 = Foods
        //3 = Politics
        let scontents;

        //Count: The amount of contents given
        if (type==0) {
            scontents = this.contents;
            let scontents_sortdate = scontents.sort((a, b) => Date.parse(b.date)/1000 - Date.parse(a.date)/1000);
            return scontents_sortdate;
        }
        return [];
    }
}
NewsContents = new SetNewsContents();
// Types
// Default = 0
// Sports = 1
// Foods = 2
// Politics = 3

let ctitle = "";
let cdesc = "";
let cdate = new Date();
let csource = "";
let cauthor = "";
let chtml = "";

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

// REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS
// PORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS R
// RTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REPORTS REP

//#region News

//SetCategoryTheme("Default");

//#endregion

//#endregion

function LoadNews(name, type) {
    let rcontents = NewsContents.getRandomContent(0,0);
    let e;

    let count = 3;

    // Names:
    // HomeSports
    // HomeFoods
    // HomePolitics
    // SeeMore - When SeeMore is clicked
    // ContentAside - On a News Content

    // type:
    // RecentSports
    // RecentFoods
    // RecentPolitics
    // RandomNews

    if (type == "RecentSports") {
        for (let i = 0; i < count; i++) {
            e = ItemSuggestid(name, "Title", i);
            e.innerHTML = rcontents[i].title;
            e.setAttribute('onclick','NewsContents.loadContent(NewsContents.getContent('+ (rcontents[i].id).toString() +'));');
            e = ItemSuggestid(name, "Info", i);
            //nothing lmao
            e = ItemSuggestid(name, "Cover", i);
            e.src = rdir + rcontents[i].id + "/pcover.png";
            e = ItemSuggestid(name, "Description", i);
            e.innerHTML = rcontents[i].title;
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

    if (attr == "Title") { idstr = "HST"; }
    if (attr == "Info") { idstr = "HSInfo"; }
    if (attr == "Cover") { idstr = "HSIMG"; }
    if (attr == "Description") { idstr = "HSD"; }

    if (item == "HomeSports") { idstr += "1_"; }
    if (item == "HomeFoods") { idstr += "2_"; }
    if (item == "HomePolitics") { idstr += "3_"; }
    if (item == "ContentAside") { idstr += "CA"; }
    idstr += (id+1).toString();
    element = document.getElementById(idstr);
    return element;
}
