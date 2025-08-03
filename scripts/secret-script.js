"use strict";
const CLICK_EVENT = "click";
const MOUSEENTER_EVENT = "mouseenter";
const MOUSELEAVE_EVENT = "mouseleave";
const IMAGE_PRELOAD_LINKS = ["images/speakeron.png", "images/cmiconactive.png"];
const SPEAKER_IMG = document.getElementById("speaker");
const APPLAUSE_AUDIO = document.getElementById("applause");
const CM_ICON = document.getElementById("cm-icon");
const BANNER_CONTAINER = document.getElementById("banner-container");
const WINNER_ELEMENT = document.getElementById("winner");
const rjSpan = document.getElementById("rj");
const NEW_URL = "https://cashmayo.github.io/super-secret.html";

//speaker gimmick
SPEAKER_IMG.addEventListener(CLICK_EVENT, () => {
    if (APPLAUSE_AUDIO.paused)
        APPLAUSE_AUDIO.play();
    else {
        APPLAUSE_AUDIO.pause();
        APPLAUSE_AUDIO.currentTime = 0;
    }
});
APPLAUSE_AUDIO.addEventListener("play", () => SPEAKER_IMG.src = "images/speakeron.png");
APPLAUSE_AUDIO.addEventListener("pause", () => SPEAKER_IMG.src = "images/speakeroff.png");
APPLAUSE_AUDIO.volume = 0.5;
for (let link of IMAGE_PRELOAD_LINKS) {
    const image = new Image();
    image.src = link;
}

//banner gimmick
BANNER_CONTAINER.addEventListener(MOUSEENTER_EVENT, () => CM_ICON.src = "images/cmiconactive.png");
BANNER_CONTAINER.addEventListener(MOUSELEAVE_EVENT, () => CM_ICON.src = "images/cmiconinactive.png");

//rj
rjSpan.addEventListener(CLICK_EVENT, () => {
    if (rjSpan.textContent !== ",'{B')   ") return;
    rjSpan.textContent = ",'{B')";

    //initial anims
    moveGlasses(true);
    setTimeout(() => { rjSpan.textContent = ",'B{:'o "; }, 2800);
    setTimeout(() => { rjSpan.textContent += " !"; }, 3400);
    setTimeout(() => { rjSpan.textContent += " !"; }, 3600);
    setTimeout(() => { rjSpan.textContent += " !"; }, 3800);
    setTimeout(() => { rjSpan.textContent = ",'B{:'D"; }, 5200);
    setTimeout(() => { rjSpan.textContent = ",'B{:')"; }, 6800);
    setTimeout(() => { rjSpan.textContent = ",'B{;')"; }, 8000);
    setTimeout(() => { rjSpan.textContent = ",'B{:')"; }, 8200);
    setTimeout(() => { rjSpan.textContent = ",'B{;')"; }, 8400);
    setTimeout(() => { rjSpan.textContent = ",'B{:')"; }, 8600);
    setTimeout(() => { rjSpan.textContent = ",'B{;')"; }, 8800);
    setTimeout(() => { rjSpan.textContent = ",'B{:')"; }, 9400);
    setTimeout(() => { rjSpan.textContent += " ¿?"; }, 10600);
    //user prompt
    setTimeout(() => {
        if (confirm("It seems like RJ wants to show you something...\n\nTake his hand?")) //OK
            takeHand();
        else //Cancel
            moveGlasses(false, 200, 600, ",'{B')  ");
        rjSpan.addEventListener(CLICK_EVENT, rjBackupHandler);
    }, 11800);
}, { once: true });
function moveGlasses(up = true, delay = 400, frameInterval = 400, finalFace) {
    if (up) {
        setTimeout(() => { rjSpan.textContent = ",'{B')"; }, delay);
        setTimeout(() => { rjSpan.textContent = ",'{B:')"; }, frameInterval + delay);
        setTimeout(() => { rjSpan.textContent = (finalFace === undefined) ? ",'B{:')" : finalFace; }, frameInterval * 2 + delay);
    } else {
        setTimeout(() => { rjSpan.textContent = ",'B{:')"; }, delay);
        setTimeout(() => { rjSpan.textContent = ",'{B:')"; }, frameInterval + delay);
        setTimeout(() => { rjSpan.textContent = (finalFace === undefined) ? ",'{B') " : finalFace; }, frameInterval * 2 + delay);
    }
}
function takeHand(altAnim = false) {
    if (altAnim) {
        setTimeout(() => { rjSpan.textContent = ",'B{:'3"; }, 400);
        setTimeout(() => { rjSpan.textContent = ",'B{x'3"; }, 1200);
        setTimeout(() => { rjSpan.textContent = ",'B{x'P"; }, 2000);
        setTimeout(() => { rjSpan.textContent = ",'B{x')"; }, 3200);
        setTimeout(() => { rjSpan.textContent = ",'B{:')"; }, 3800);
        moveGlasses(false, 4200, 600);
        setTimeout(() => { window.location.href = NEW_URL; }, 6200);
    } else {
        setTimeout(() => { rjSpan.textContent = ",'B{:'D"; }, 600);
        setTimeout(() => { rjSpan.textContent += "D"; }, 1400);
        setTimeout(() => { rjSpan.textContent += "D"; }, 1600);
        setTimeout(() => { rjSpan.textContent += "D"; }, 1800);
        setTimeout(() => { rjSpan.textContent += "D"; }, 2000);
        setTimeout(() => { rjSpan.textContent += "D"; }, 2200);
        setTimeout(() => { rjSpan.textContent = ",'B{:')"; }, 3400);
        moveGlasses(false, 3600, 600);
        setTimeout(() => { window.location.href = NEW_URL; }, 5600);
    }
}
function rjBackupHandler() {
    let initialTextContent = rjSpan.textContent;
    rjSpan.textContent = ",'{B')";
    switch (initialTextContent) {
        case ",'{B') ": //after initial OK (and return to page) "Take his hand?"
            moveGlasses(true);
            setTimeout(() => {
                if (confirm("Take his hand?"))
                    takeHand(true);
                else
                    moveGlasses(false, 200, 400, ",'{B') ");
            }, 2000);
            break;
        case ",'{B')  ": //after initial cancel "Changed your mind?"
            moveGlasses(true);
            setTimeout(() => {
                if (confirm("Changed your mind?")) //OK
                    takeHand();
                else
                    moveGlasses(false, 200, 400, ",'{B')  ");
            }, 2000);
            break;
    }/* super hacky code explanation:
        upon page startup,                  when rj has THREE trailing spaces;  ",'{B')   "     mouseentering him will play the initial animation
        after canceling initil prompt       when rj has TWO trailing spaces;    ",'{B')  "      clicking on him will show the "Changed your mind?" alert
        after taking hand and returning,    when rj has ONE trailing space;     ",'{B') "       clicking on him will show the "Take his hand?" alert
        during animation,                   when rj has ZERO trailing spaces;   ",'{B')"        all events will return immediately */
}