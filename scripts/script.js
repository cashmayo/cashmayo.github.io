"use strict";

//adjusts page content/layout on resize 
function autoSizeColumn() { // (kinda dislike how the event triggers this function a bazillion times per second but oh well)
    if (window.innerWidth > window.innerHeight) // if window is taller than it is wide, change column width
        columnElement.style.width = "1080px";
    else
        columnElement.style.width = "90%";
    iconElement.hidden = window.innerWidth < 1200; // if the window gets too narrow, hide icon
} 

//load event
let columnElement;
let iconElement;
document.addEventListener("DOMContentLoaded", () => {
    columnElement = document.getElementById("column");
    iconElement = document.getElementById("icon");

    autoSizeColumn();
    window.addEventListener("resize", autoSizeColumn);
});