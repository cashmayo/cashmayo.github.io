const NEW_URL = "https://cashmayo.github.io/secret-projects.html";
//index
let element = document.getElementById("raccmayo");
if (element) {
    element.addEventListener("mousedown", (e) => {
        if (e.button) return;
        let x = Math.abs(e.offsetX - 102);
        let y = Math.abs(e.offsetY - 128) * 3;
        let dist = (x * x) + (y * y);
        if (dist < 400) window.location.href = NEW_URL;
    });
}
//attributions
element = document.getElementById("partyraccmayo");
if (element) {
    element.addEventListener("mousedown", (e) => {
        if (e.button) return;
        let x = Math.abs(e.offsetX - 159);
        let y = Math.abs(e.offsetY - 193) * 3;
        let dist = (x * x) + (y * y);
        if (dist < 225) window.location.href = NEW_URL;
    });
}
//speedruns-index
element = document.getElementById("chibimayo");
if (element) {
    element.addEventListener("mousedown", (e) => {
        if (e.button) return;
        let x = Math.abs(e.offsetX - 74);
        let y = Math.abs(e.offsetY - 80) * 1.25;
        let dist = (x * x) + (y * y);
        if (dist < 2704) element.src = "./images/cmchibimad.png";
    });
    element.addEventListener("mouseup", () => {
        element.src = "./images/cmchibi.png";
    });
}