import { listDirectories } from 'GetContents.js';

function myFunction() {
  // Declare variables
  var input, filter, ul, li, a, i;
  input = document.getElementById("mySearch");
  filter = input.value.toUpperCase();
  ul = document.getElementById("myMenu");
  contents = listDirectories('Contents')
  li = ul.getElementsByTagName("li");

  li[0] = contents[0]

  /*
  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    a = String(contents[i]);
    if (a.toUpperCase().indexOf(filter) > -1) {
      li[i] = "";
    } else {
      li[i] = "none";
    }
  }
  */
}