"use strict";

const SECRET_PAGE_URL = "https://cashmayo.github.io/secret.html";
function raccmayoMouseDownHandler(e) {
    console.log("racc: " + e.offsetX + ", " + e.offsetY)
    let x = Math.abs(e.offsetX - 102);
    let y = Math.abs(e.offsetY - 128) * 3;
    let dist = Math.sqrt((x * x) + (y * y));
    if (dist < 20)
        window.location = SECRET_PAGE_URL;
}

function partyraccMouseDownHandler(e) {
    let x = Math.abs(e.offsetX - 159);
    let y = Math.abs(e.offsetY - 193) * 3;
    let dist = Math.sqrt((x * x) + (y * y));
    if (dist < 15)
        console.log("NOSE BOOPED")
    window.location = SECRET_PAGE_URL;
}

function chibiMouseDownHandler(e) {
    let x = Math.abs(e.offsetX - 74);
    let y = Math.abs(e.offsetY - 80) * 1.25;
    let dist = Math.sqrt((x * x) + (y * y));
    if (dist < 52)
        element.src = "images/cmchibimad.png";
}
function chibiMouseUpHandler() {
    element.src = "images/cmchibi.png";
}

//load event
let element;
document.addEventListener("DOMContentLoaded", () => {
    element = document.getElementById("raccmayo");
    if (element !== null) {
        element.addEventListener("mousedown", raccmayoMouseDownHandler);
        return;
    }

    element = document.getElementById("partyraccmayo");
    if (element !== null) {
        element.addEventListener("mousedown", partyraccMouseDownHandler);
        return;
    }

    element = document.getElementById("chibimayo");
    if (element !== null) {
        element.addEventListener("mousedown", chibiMouseDownHandler);
        element.addEventListener("mouseup", chibiMouseUpHandler);
    }
});