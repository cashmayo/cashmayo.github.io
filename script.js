// adjust page content/layout on resize
var column = document.querySelector("#column");
var icon = document.querySelector("#icon");
function autoSizeColumn() {
    if (window.innerWidth > window.innerHeight) { // if the window is taller than it is wide, change the column width
        column.style.width = '1080px';
    } else {
        column.style.width = '90%';
    }
    if (window.innerWidth < 1150) { // if the window gets too narrow, remove icon
        icon.hidden = true;
    } else {
        icon.hidden = false;
    }
}
autoSizeColumn(); // adjusts size when page loads
window.addEventListener("resize", autoSizeColumn); // adds handler for anytime window is resized

// easteregg on the speedruns-index page
var chibi = document.getElementById("chibimayo")
function mouseMove(e) {
    if (e.offsetX > 24 && e.offsetX < 124 && e.offsetY > 42 && e.offsetY < 115) {
        chibi.src = "images/cmchibimad.png";
    } else {
        chibi.src = "images/cmchibi.png";
    }
}
function mouseLeft() {
    chibi.src = "images/cmchibi.png";
}