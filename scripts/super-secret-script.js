"use strict";
const playerContainer = document.getElementById("player-container");
let isDragging = false, offsetX = 0, offsetY = 0, rect;
playerContainer.addEventListener("mousedown", (e) => {
    isDragging = true;
    rect = playerContainer.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
});
document.addEventListener("mousemove", (e) => { if (isDragging) playerContainer.style.transform = "translate(" + (e.clientX - offsetX) + "px, " + (e.clientY - offsetY) + "px)"; });
document.addEventListener("mouseup", () => { isDragging = false; });
const playerFind = document.getElementById("player-find");
playerFind.addEventListener("click", () => { highlightElement(currentlyPlaying); });
const playerExit = document.getElementById("player-exit");
playerExit.addEventListener("click", removePlayerSrc);
let imReallySorry = document.getElementById("im-really-sorry");
document.getElementById("somewhere-it-fit-in").addEventListener("click", (e)=>{
    e.preventDefault();
    highlightElement(imReallySorry);
});
let sayingSomethingStupid = document.getElementById("saying-something-stupid");
document.getElementById("risk-saying-something-stupid").addEventListener("click", (e)=>{
    e.preventDefault();
    highlightElement(sayingSomethingStupid);
});
let obsessions = document.getElementById("obsessions");
document.getElementById("one-you'll-hear-later-on").addEventListener("click", (e)=>{
    e.preventDefault();
    highlightElement(obsessions, true);
});
let allUNeedIsSynth = document.getElementById("all-u-need-is-synth");
document.getElementById("entry-in-the-one-offs-section").addEventListener("click", (e)=>{
    e.preventDefault();
    highlightElement(allUNeedIsSynth);
});
let t, p = document.getElementById("dont-look");
document.querySelector("#im-forgetting details").addEventListener("toggle", e => {
    if (e.target.open) {
        clearTimeout(t);
        if (p.id !== "dont-look") return;
        t = setTimeout(() => {
            e.target.open = false;
            p.removeAttribute("id");
            p.textContent = "I... was going to say something, but... I don't remember what it was.";
            setTimeout(() => { e.target.open = true; }, 220);
        }, 180)
    } else {
        clearTimeout(t);
        if (p.id === "dont-look") return;
        t = setTimeout(() => {
            p.innerHTML = "I remembered...<br><br>I was going to say something.<br><br>";
            p.style = "margin: 12px 0px; text-indent: 0px; text-align: center;";
            e.target.querySelectorAll("li").forEach(li => {
                li.style.display = (li.style.display === "none") ? "inline" : "none";
            });
        }, 10000);
    }
})
function highlightElement(element, start = false) {
    if (element === null) return;
    let parentContainer = element.closest("details");
    if (parentContainer !== null) parentContainer.open = true;
    element.scrollIntoView({
        behavior: "smooth",
        block: (start) ?  "start" : "center"
    });
    element.classList.add("highlight");
    element.addEventListener("animationend", function() {
        element.classList.remove("highlight");
    }, { once: true });
}
const detailElements = document.querySelectorAll("details");
const substantialHeader = document.getElementById("substantial-header");
const oneoffsHeader = document.getElementById("oneoffs-header");
const notbymeHeader = document.getElementById("notbyme-header");
const scrapsHeader = document.getElementById("scraps-header");
const closingWordHeader = document.getElementById("closing-word-header");
window.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "F1":
            playerContainer.style.transform = "translate(0px, 0px)";
            break;
        case "F2":
            let toggleDetialsTo = true;
            for (let i = 0; i < detailElements.length; i++)
                if (detailElements[i].open === true) {
                    toggleDetialsTo = false;
                    break;
                }
            detailElements.forEach(d => { d.open = toggleDetialsTo; });
            break;

        case "1":
            substantialHeader.scrollIntoView({ behavior: "smooth", block: "start" });
            break;
        case "2":
            oneoffsHeader.scrollIntoView({ behavior: "smooth", block: "start" });
            break;
        case "3":
            notbymeHeader.scrollIntoView({ behavior: "smooth", block: "start" });
            break;
        case "4":
            scrapsHeader.scrollIntoView({ behavior: "smooth", block: "start" });
            break;
        case "5":
            closingWordHeader.scrollIntoView({ behavior: "smooth", block: "start" });
            break;

        case ",":
            window.scrollTo({ top: 0, behavior: "smooth" });
            break;
        case ".":
            window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
            break;
        default:
            return;
    }
});
const playerIframe = document.querySelector("#player-container > iframe");
const playerTitle = document.getElementById("player-title");
const playerUrls = document.querySelectorAll("a.player-url");
for (let a of playerUrls) {
    a.addEventListener("click", changePlayerSrc);
}
let playerTimeout, currentlyPlaying = null;
function changePlayerSrc(e) {
    e.preventDefault();
    let anchor = e.currentTarget; //e.currentTarget doesnt work async
    if (currentlyPlaying === anchor) return;
    if (currentlyPlaying != null) currentlyPlaying.classList.remove("currently-playing");
    currentlyPlaying = anchor;
    currentlyPlaying.classList.add("currently-playing");
    fixTitle();

    playerTitle.textContent = "";
    playerIframe.src = ""; //if you change URL while a song is playing, it can do weird stuff
    if (playerContainer.style.display === "none")
        playerContainer.style.display = "block";
    playerIframe.focus();

    clearTimeout(playerTimeout);
    playerTimeout = setTimeout(()=>{
        playerTitle.textContent = anchor.textContent;
        playerIframe.src = anchor.href;
    }, 100);
}
function removePlayerSrc() {
    if (currentlyPlaying === null) return;
    playerIframe.src = "";
    playerContainer.style.display = "none";
    currentlyPlaying.classList.remove("currently-playing");
    currentlyPlaying = null;
    fixTitle();
}
function fixTitle() {
    if (currentlyPlaying === whenYoureGoneAnchor || (!show && currentlyPlaying === obsessionsAnchor)) {
        dogCashWrapper.title = "Do you miss me when you're gone?";
        dogCashWrapper.style.cursor = "help";
    } else {
        dogCashWrapper.title = "dog cash relaxing to some tunes, artwork by a friend";
        dogCashWrapper.style.cursor = "pointer";
    }
}
const AUDIO_ELEMENTS = document.querySelectorAll("audio");
for (let audio of AUDIO_ELEMENTS) {
    audio.volume = 0.3;
}
const getParams = new URLSearchParams(window.location.search);
const dogCashWrapper = document.getElementById("dog-cash-wrapper");
const obsessionsAnchor = document.querySelector("#obsessions div.definitive a.player-url");
const whenYoureGone = document.querySelector("#when-youre-gone");
const whenYoureGoneAnchor = document.querySelector("#when-youre-gone div.definitive a.player-url");
const show = getParams.get("show") === "true";
if (show) {
    whenYoureGone.style.display = "block"; highlightElement(whenYoureGone);
} else {
    whenYoureGone.remove();
    if (getParams.get("hide") === "true") dogCashWrapper.style.display = "none";
    else dogCashWrapper.addEventListener("click", () => { if (currentlyPlaying !== obsessionsAnchor) return; window.location.href = "?show=true"; });
}
let spaceKey = document.getElementById("space-key");
let fKey = document.getElementById("f-key");
let lBrackKey = document.getElementById("l-brack-key");
let rBrackKey = document.getElementById("r-brack-key");
let f1Key = document.getElementById("f1-key");
let f2Key = document.getElementById("f2-key");
let oneKey = document.getElementById("1-key");
let twoKey = document.getElementById("2-key");
let threeKey = document.getElementById("3-key");
let commaKey = document.getElementById("comma-key");
let periodKey = document.getElementById("period-key");
window.addEventListener("keydown", (e) => {
    handleKey(e.key, true);
});
window.addEventListener("keyup", (e) => {
    handleKey(e.key, false);
});
function handleKey(keyName, down) {
    let keyElement;
    switch (keyName) {
        case " ":
            keyElement = spaceKey;
            break;
        case "f":
            keyElement = fKey;
            break;
        case "[":
            keyElement = lBrackKey;
            break;
        case "]":
            keyElement = rBrackKey;
            break;
        case "F1":
            keyElement = f1Key;
            break;
        case "F2":
            keyElement = f2Key;
            break;
        case "1":
            keyElement = oneKey;
            break;
        case "2":
            keyElement = twoKey;
            break;
        case "3":
            keyElement = threeKey;
            break;
        case ",":
            keyElement = commaKey;
            break;
        case ".":
            keyElement = periodKey;
            break;
        default:
            return;
    }
    keyElement.className = (down) ? "key-pressed": "";
}