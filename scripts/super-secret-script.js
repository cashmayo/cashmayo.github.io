"use strict";
const PLAYER_CONTAINER = document.getElementById("player-container");
let isDragging = false, offsetX = 0, offsetY = 0, rect;
PLAYER_CONTAINER.addEventListener("mousedown", (e) => {
    isDragging = true;
    rect = PLAYER_CONTAINER.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
});
document.addEventListener("mousemove", (e) => { if (isDragging) PLAYER_CONTAINER.style.transform = "translate(" + (e.clientX - offsetX) + "px, " + (e.clientY - offsetY) + "px)"; });
document.addEventListener("mouseup", () => { isDragging = false; });
const PLAYER_FIND = document.getElementById("player-find");
PLAYER_FIND.addEventListener("click", () => { highlightElement(currentlyPlaying); });
const PLAYER_EXIT = document.getElementById("player-exit");
PLAYER_EXIT.addEventListener("click", removePlayerSrc);
const IM_REALLY_SORRY = document.getElementById("im-really-sorry");
document.getElementById("somewhere-it-fit-in").addEventListener("click", (e)=>{
    e.preventDefault();
    highlightElement(IM_REALLY_SORRY);
});
const SATING_SOMETHING_STUPID = document.getElementById("saying-something-stupid");
document.getElementById("risk-saying-something-stupid").addEventListener("click", (e)=>{
    e.preventDefault();
    highlightElement(SATING_SOMETHING_STUPID);
});
const OBSESSIONS = document.getElementById("obsessions");
document.getElementById("one-you'll-hear-later-on").addEventListener("click", (e)=>{
    e.preventDefault();
    highlightElement(OBSESSIONS, true);
});
const ALL_U_NEED_IS_SYNTH = document.getElementById("all-u-need-is-synth");
document.getElementById("entry-in-the-one-offs-section").addEventListener("click", (e)=>{
    e.preventDefault();
    highlightElement(ALL_U_NEED_IS_SYNTH);
});
const P = document.getElementById("dont-look");
let t;
document.querySelector("#im-forgetting details").addEventListener("toggle", e => {
    if (e.target.open) {
        clearTimeout(t);
        if (P.id !== "dont-look") return;
        t = setTimeout(() => {
            e.target.open = false;
            P.removeAttribute("id");
            P.textContent = "I... was going to say something, but... I don't remember what it was.";
            setTimeout(() => { e.target.open = true; }, 220);
        }, 180)
    } else {
        clearTimeout(t);
        if (P.id === "dont-look") return;
        t = setTimeout(() => {
            P.innerHTML = "I remembered...<br><br>I was going to say something.<br><br>";
            P.style = "margin: 12px 0px; text-indent: 0px; text-align: center;";
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
const DETAIL_ELEMENTS = document.querySelectorAll("details");
const SUBSTANTIAL_HEADER = document.getElementById("substantial-header");
const ONE_OFFS_HEADER = document.getElementById("oneoffs-header");
const NOT_BY_ME_HEADER = document.getElementById("notbyme-header");
const SCRAPS_HEADER = document.getElementById("scraps-header");
const CLOSING_WORD_HEADER = document.getElementById("closing-word-header");
window.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "F1":
            PLAYER_CONTAINER.style.transform = "translate(0px, 0px)";
            break;
        case "F2":
            let toggleDetialsTo = true;
            for (let i = 0; i < DETAIL_ELEMENTS.length; i++)
                if (DETAIL_ELEMENTS[i].open === true) {
                    toggleDetialsTo = false;
                    break;
                }
            DETAIL_ELEMENTS.forEach(d => { d.open = toggleDetialsTo; });
            break;

        case "1":
            SUBSTANTIAL_HEADER.scrollIntoView({ behavior: "smooth", block: "start" });
            break;
        case "2":
            ONE_OFFS_HEADER.scrollIntoView({ behavior: "smooth", block: "start" });
            break;
        case "3":
            NOT_BY_ME_HEADER.scrollIntoView({ behavior: "smooth", block: "start" });
            break;
        case "4":
            SCRAPS_HEADER.scrollIntoView({ behavior: "smooth", block: "start" });
            break;
        case "5":
            CLOSING_WORD_HEADER.scrollIntoView({ behavior: "smooth", block: "start" });
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
const PLAYER_IFRAME = document.querySelector("#player-container > iframe");
const PLAYER_TITLE = document.getElementById("player-title");
const PLAYER_URLS = document.querySelectorAll("a.player-url");
for (let a of PLAYER_URLS) {
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

    PLAYER_TITLE.textContent = "";
    PLAYER_IFRAME.src = ""; //if you change URL while a song is playing, it can do weird stuff
    if (PLAYER_CONTAINER.style.display === "none")
        PLAYER_CONTAINER.style.display = "block";
    PLAYER_IFRAME.focus();

    clearTimeout(playerTimeout);
    playerTimeout = setTimeout(()=>{
        PLAYER_TITLE.textContent = anchor.textContent;
        PLAYER_IFRAME.src = anchor.href;
    }, 100);
}
function removePlayerSrc() {
    if (currentlyPlaying === null) return;
    PLAYER_IFRAME.src = "";
    PLAYER_CONTAINER.style.display = "none";
    currentlyPlaying.classList.remove("currently-playing");
    currentlyPlaying = null;
    fixTitle();
}
function fixTitle() {
    if (currentlyPlaying === WHEN_YOURE_GONE_ANCHOR || (!PARAM_SHOW && currentlyPlaying === OBSESSIONS_ANCHOR)) {
        DOG_CASH_WRAPPER.title = "Do you miss me when you're gone?";
        DOG_CASH_WRAPPER.style.cursor = "help";
    } else {
        DOG_CASH_WRAPPER.title = "dog cash relaxing to some tunes, artwork by a friend";
        DOG_CASH_WRAPPER.style.cursor = "pointer";
    }
}
const AUDIO_ELEMENTS = document.querySelectorAll("audio");
for (let audio of AUDIO_ELEMENTS) {
    audio.volume = 0.3;
}
const GET_PARAMS = new URLSearchParams(window.location.search);
const MAIN_ELEMENT = document.querySelector("main");
const DOG_CASH_WRAPPER = document.getElementById("dog-cash-wrapper");
const OBSESSIONS_ANCHOR = document.querySelector("#obsessions div.definitive a.player-url");
const WHEN_YOURE_GONE = document.querySelector("#when-youre-gone");
const WHEN_YOURE_GONE_ANCHOR = document.querySelector("#when-youre-gone div.definitive a.player-url");
const PARAM_HIDE = GET_PARAMS.get("hide") === "true";
const PARAM_SHOW = GET_PARAMS.get("show") === "true";
if (PARAM_HIDE) {
    DOG_CASH_WRAPPER.style.display = "none";
    WHEN_YOURE_GONE.remove();
} else {
    window.addEventListener("resize", autoSizeColumn);
    autoSizeColumn();
}
if (PARAM_SHOW) {
    WHEN_YOURE_GONE.style.display = "block";
    highlightElement(WHEN_YOURE_GONE);
}
if (!PARAM_SHOW && !PARAM_HIDE) {
    DOG_CASH_WRAPPER.addEventListener("click", () => { if (currentlyPlaying !== OBSESSIONS_ANCHOR) return; window.location.href = "?show=true"; });
}
function autoSizeColumn() {
    DOG_CASH_WRAPPER.style = (MAIN_ELEMENT.offsetWidth < 1156) ? "float: none; margin: 36px auto;" : "";
}
const SPACE_KEY = document.getElementById("space-key");
const F_KEY = document.getElementById("f-key");
const L_BRACK_KEY = document.getElementById("l-brack-key");
const R_BRACK_KEY = document.getElementById("r-brack-key");
const F1_KEY = document.getElementById("f1-key");
const F2_KEY = document.getElementById("f2-key");
const ONE_KEY = document.getElementById("1-key");
const TWO_KEY = document.getElementById("2-key");
const THREE_KEY = document.getElementById("3-key");
const COMMA_KEY = document.getElementById("comma-key");
const PERIOD_KEY = document.getElementById("period-key");
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
            keyElement = SPACE_KEY;
            break;
        case "f":
            keyElement = F_KEY;
            break;
        case "[":
            keyElement = L_BRACK_KEY;
            break;
        case "]":
            keyElement = R_BRACK_KEY;
            break;
        case "F1":
            keyElement = F1_KEY;
            break;
        case "F2":
            keyElement = F2_KEY;
            break;
        case "1":
            keyElement = ONE_KEY;
            break;
        case "2":
            keyElement = TWO_KEY;
            break;
        case "3":
            keyElement = THREE_KEY;
            break;
        case ",":
            keyElement = COMMA_KEY;
            break;
        case ".":
            keyElement = PERIOD_KEY;
            break;
        default:
            return;
    }
    keyElement.className = (down) ? "key-pressed": "";
}