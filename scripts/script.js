const COLUMN = document.getElementById("column");
const ICON = document.getElementById("icon");
function autoSizeColumn() {
    COLUMN.style.width = (window.innerWidth > window.innerHeight) ? "1080px" : "90%";
    ICON.hidden = window.innerWidth < 1200;
}
autoSizeColumn();
window.addEventListener("resize", autoSizeColumn);