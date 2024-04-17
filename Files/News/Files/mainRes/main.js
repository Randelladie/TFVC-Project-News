function ToggleCategory() {
    var content = document.getElementById("Main_AsideCategory");
    //this.classList.toggle("active");
    if (content.style.display === "block") {
    content.style.display = "none";
    } else {
    content.style.display = "block";
    }
}

function SetCategoryTheme(type) {
    //Default
    //Sports
    //Politics
    //Foods
    let style = document.getElementById("Style");
    if (type=="Default") {
        style.innerHTML = `
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
    }
    if (type=="Sports") {
        style.innerHTML = `
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
    }
    if (type=="Politics") {
        style.innerHTML = `
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
    }
    if (type=="Foods") {
        style.innerHTML = `
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
    }
}