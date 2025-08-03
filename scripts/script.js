"use strict";
function autoSizeColumn() {
    columnElement.style.width = (window.innerWidth > window.innerHeight) ? "1080px" : "90%";
    iconElement.hidden = window.innerWidth < 1200;
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