//beepbox player
const PLAYER_CONTAINER = document.getElementById("player-container");
const PLAYER_TITLE = document.getElementById("player-title");
const PLAYER_IFRAME = document.querySelector("#player-container > iframe");
const PLAYER_FIND = document.getElementById("player-find");
const PLAYER_EXIT = document.getElementById("player-exit");
let playerTimeout, currentlyPlaying = null;
let isDragging = false, offsetX = 0, offsetY = 0, rect;
function changePlayerSrc(e) {
    if (e.button) return;
    let anchor = e.target.closest(".player-url");
    if (!anchor) return;

    e.preventDefault();
    if (currentlyPlaying === anchor) return;
    if (currentlyPlaying !== null) currentlyPlaying.classList.remove("currently-playing");
    currentlyPlaying = anchor;
    currentlyPlaying.classList.add("currently-playing");
    fixTitle();

    PLAYER_TITLE.textContent = "";
    PLAYER_IFRAME.src = ""; //if you change URL while a song is playing, it can do weird stuff
    PLAYER_CONTAINER.style.visibility = "visible";
    PLAYER_IFRAME.focus();

    clearTimeout(playerTimeout);
    playerTimeout = setTimeout(() => {
        PLAYER_TITLE.textContent = anchor.textContent;
        PLAYER_IFRAME.src = anchor.href;
    }, 100);
}
function removePlayerSrc() {
    if (currentlyPlaying === null) return;
    PLAYER_IFRAME.src = "";
    PLAYER_CONTAINER.style.visibility = "hidden";
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
        DOG_CASH_WRAPPER.style.cursor = "";
    }
}

PLAYER_CONTAINER.addEventListener("mousedown", (e) => {
    isDragging = true;
    rect = PLAYER_CONTAINER.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
});
document.addEventListener("mousemove", (e) => { if (isDragging) PLAYER_CONTAINER.style.transform = `translate(${e.clientX - offsetX}px, ${e.clientY - offsetY}px)`; });
document.addEventListener("mouseup", () => { isDragging = false; });
PLAYER_FIND.addEventListener("click", () => { highlightElement(currentlyPlaying); });
PLAYER_EXIT.addEventListener("click", removePlayerSrc);
document.addEventListener("click", changePlayerSrc);

//audio player adjustments
const AUDIO_ELEMENTS = document.querySelectorAll("audio");
for (let audio of AUDIO_ELEMENTS) {
    audio.volume = 0.3;
}

//highlights
function highlightElement(element, start = false) {
    if (element === null) return;
    let parentContainer = element.closest("details");
    if (parentContainer !== null) parentContainer.open = true;
    element.scrollIntoView({ block: (start) ? "start" : "center" });
    element.classList.add("highlight");
    element.addEventListener("animationend", () => {
        element.classList.remove("highlight");
    }, { once: true });
}
const HIGHLIGHT_ID_PAIRS = [ //destination, anchor, start
    ["im-really-sorry", "somewhere-it-fit-in", false],
    ["saying-something-stupid", "risk-saying-something-stupid", false],
    ["obsessions", "one-you'll-hear-later-on", true],
    ["all-u-need-is-synth", "entry-in-the-one-offs-section", false]
];
HIGHLIGHT_ID_PAIRS.forEach(value => {
    let hightlightedElement = document.getElementById(value[0]);
    document.getElementById(value[1]).addEventListener("click", (e) => {
        e.preventDefault();
        highlightElement(hightlightedElement, value[2]);
    });
});
const P = document.getElementById("dont-look");
let t;
document.querySelector("#im-forgetting details").addEventListener("toggle", (e) => {
    if (e.target.open) {
        clearTimeout(t);
        if (P.id !== "dont-look") return;
        t = setTimeout(() => {
            e.target.open = false;
            P.removeAttribute("id");
            P.textContent = "I... was going to say something, but... I don't remember what it was.";
            setTimeout(() => { e.target.open = true; }, 220);
        }, 180);
    } else {
        clearTimeout(t);
        if (P.id === "dont-look") return;
        t = setTimeout(() => {
            P.innerHTML = "I remembered...<br><br>I was going to say something.<br><br>";
            P.style.cssText = "margin: 12px 0px; text-indent: 0px; text-align: center;";
            e.target.querySelectorAll("li").forEach(li => {
                li.style.display = (li.style.display === "none") ? "inline" : "none";
            });
        }, 10000);
    }
});

//section nav/key shortcuts
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
            SUBSTANTIAL_HEADER.scrollIntoView({ block: "start" });
            break;
        case "2":
            ONE_OFFS_HEADER.scrollIntoView({ block: "start" });
            break;
        case "3":
            NOT_BY_ME_HEADER.scrollIntoView({ block: "start" });
            break;
        case "4":
            SCRAPS_HEADER.scrollIntoView({ block: "start" });
            break;
        case "5":
            CLOSING_WORD_HEADER.scrollIntoView({ block: "start" });
            break;

        case ",":
            window.scrollTo({ top: 0 });
            break;
        case ".":
            window.scrollTo({ top: document.body.scrollHeight });
            break;
        default:
            return;
    }
});

//key pressing gimmick
const keyMap = {
    " ": document.getElementById("space-key"),
    "f": document.getElementById("f-key"),
    "[": document.getElementById("l-brack-key"),
    "]": document.getElementById("r-brack-key"),
    "F1": document.getElementById("f1-key"),
    "F2": document.getElementById("f2-key"),
    "1": document.getElementById("1-key"),
    "2": document.getElementById("2-key"),
    "3": document.getElementById("3-key"),
    ",": document.getElementById("comma-key"),
    ".": document.getElementById("period-key")
};
document.addEventListener("keydown", handleKey);
document.addEventListener("keyup", handleKey);
function handleKey(e) {
    let keyEl = keyMap[e.key];
    if (!keyEl) return;
    keyEl.className = (e.type === "keydown") ? "key-pressed" : "";
}

//layout/setup
const SEARCH_PARAMS = new URLSearchParams(window.location.search);
const MAIN_ELEMENT = document.querySelector("main");
const DOG_CASH_WRAPPER = document.getElementById("dog-cash-wrapper");
const OBSESSIONS_ANCHOR = document.querySelector("#obsessions .definitive .player-url");
const WHEN_YOURE_GONE = document.getElementById("when-youre-gone");
const WHEN_YOURE_GONE_ANCHOR = document.querySelector("#when-youre-gone .definitive .player-url");
const PARAM_SHOW = SEARCH_PARAMS.get("show") === "true";
const PARAM_HIDE = SEARCH_PARAMS.get("hide") === "true";
if (PARAM_SHOW) {
    WHEN_YOURE_GONE.style.display = "block";
    highlightElement(WHEN_YOURE_GONE);
} else if (PARAM_HIDE) {
    DOG_CASH_WRAPPER.style.display = "none";
    WHEN_YOURE_GONE.remove();
} else {
    DOG_CASH_WRAPPER.addEventListener("click", () => { if (currentlyPlaying === OBSESSIONS_ANCHOR) window.location.href = "?show=true"; });
    WHEN_YOURE_GONE.remove();
    adjustLayout();
    window.addEventListener("resize", windowResizeHandler);
}
let windowResizeTimout = null;
function windowResizeHandler() {
    clearTimeout(windowResizeTimout);
    windowResizeTimout = setTimeout(adjustLayout, 500);
}
function adjustLayout() {
    DOG_CASH_WRAPPER.style.cssText = (MAIN_ELEMENT.offsetWidth < 1156) ? "float: none; margin: 36px auto;" : "";
}