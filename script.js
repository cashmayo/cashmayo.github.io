"use strict";
let columnElement;
let iconElement;
let chibiElement;

//adjusts page content/layout on resize (kinda dislike how the event triggers this function a bazillion times per second but oh well)
function autoSizeColumn() { //
    if (window.innerWidth > window.innerHeight) // if window is taller than it is wide, change column width
        columnElement.style.width = "1080px";
    else
        columnElement.style.width = "90%";
    // if the window gets too narrow, hide icon
    iconElement.hidden = window.innerWidth < 1200;
} 

//speedruns-index easteregg
function chibiMouseDownHandler(e) {
    let x = Math.abs(e.offsetX - 74);
    let y = Math.abs(e.offsetY - 80) * 1.25;
    let dist = Math.sqrt((x * x) + (y * y));
    if (dist < 52)
        chibiElement.src = "images/cmchibimad.png";
}
function chibiMouseUpHandler() {
    chibiElement.src = "images/cmchibi.png";
}

//load event
document.addEventListener("DOMContentLoaded", () => {
    columnElement = document.getElementById("column");
    iconElement = document.getElementById("icon");

    autoSizeColumn();
    window.addEventListener("resize", autoSizeColumn);

    chibiElement = document.getElementById("chibimayo"); 
    if (chibiElement !== null) {
        chibiElement.addEventListener("mousedown", chibiMouseDownHandler); //speedruns-index easteregg 
        chibiElement.addEventListener("mouseup", chibiMouseUpHandler);
    }
});