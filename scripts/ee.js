"use strict";
//load event
document.addEventListener("DOMContentLoaded", () => {
    const NEW_URL = "https://cashmayo.github.io/secret-projects.html";
    let element;
    //index
    element = document.getElementById("raccmayo");
    if (element !== null) {
        element.addEventListener("mousedown", (e) => {
            if (e.button !== 0) return;
            let x = Math.abs(e.offsetX - 102);
            let y = Math.abs(e.offsetY - 128) * 3;
            let dist = Math.sqrt((x * x) + (y * y));
            if (dist < 20)
                window.location.href = NEW_URL;
        });
    }
    //attributions
    element = document.getElementById("partyraccmayo");
    if (element !== null) {
        element.addEventListener("mousedown", (e) => {
            if (e.button !== 0) return;
            let x = Math.abs(e.offsetX - 159);
            let y = Math.abs(e.offsetY - 193) * 3;
            let dist = Math.sqrt((x * x) + (y * y));
            if (dist < 15)
                window.location.href = NEW_URL;
        });
    }
    //speedruns-index
    element = document.getElementById("chibimayo");
    if (element !== null) {
        element.addEventListener("mousedown", (e) => {
            if (e.button !== 0) return;
            let x = Math.abs(e.offsetX - 74);
            let y = Math.abs(e.offsetY - 80) * 1.25;
            let dist = Math.sqrt((x * x) + (y * y));
            if (dist < 52)
                element.src = "images/cmchibimad.png";
        });
        element.addEventListener("mouseup", () => {
            element.src = "images/cmchibi.png";
        });
    }
});