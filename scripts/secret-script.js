{ //page setup
    const IMAGE_PRELOAD_URLS = ["./images/speakeron.png", "./images/cmiconactive.png"];
    const SPEAKER_IMG = document.getElementById("speaker");
    const APPLAUSE_AUDIO = document.getElementById("applause");
    const CM_ICON = document.getElementById("cm-icon");
    const BANNER_CONTAINER = document.getElementById("banner-container");

    //speaker gimmick
    SPEAKER_IMG.addEventListener("click", () => {
        if (APPLAUSE_AUDIO.paused)
            APPLAUSE_AUDIO.play();
        else {
            APPLAUSE_AUDIO.pause();
            APPLAUSE_AUDIO.currentTime = 0;
        }
    });
    APPLAUSE_AUDIO.addEventListener("play", () => SPEAKER_IMG.src = "./images/speakeron.png");
    APPLAUSE_AUDIO.addEventListener("pause", () => SPEAKER_IMG.src = "./images/speakeroff.png");
    APPLAUSE_AUDIO.volume = 0.5;
    for (let url of IMAGE_PRELOAD_URLS) {
        const image = new Image();
        image.src = url;
    }

    //banner gimmick
    BANNER_CONTAINER.addEventListener("mouseenter", () => CM_ICON.src = "./images/cmiconactive.png");
    BANNER_CONTAINER.addEventListener("mouseleave", () => CM_ICON.src = "./images/cmiconinactive.png");
}

{ //rj
    const rjSpan = document.getElementById("rj");
    const moveGlassesUpAnim = [
        [",'{B')", 1],
        [",'{B:')", 1],
        [",'B{:')", 1]
    ];
    const moveGlassesDownAnim = [
        [",'B{:')", 1],
        [",'{B:')", 1],
        [",'{B')", 1]
    ];
    const initialClickAnim = [
        [",'B{:'o ", 4],
        [",'B{:'o  !", 1],
        [",'B{:'o  !  !", 1],
        [",'B{:'o  !  !  !", 8],
        [",'B{:'D", 10],
        [",'B{:')", 7],
        [",'B{;')", 1],
        [",'B{:')", 1],
        [",'B{;')", 1],
        [",'B{:')", 1],
        [",'B{;')", 4],
        [",'B{:')", 6],
        [",'B{:') ¿?", 7]
    ];
    const takeHandAnim = [
        [",'B{:'D", 4],
        [",'B{:'DD", 1],
        [",'B{:'DDD", 1],
        [",'B{:'DDDD", 1],
        [",'B{:'DDDDD", 1],
        [",'B{:'DDDDDD", 6],
        [",'B{:')", 2]
    ];
    const altTakeHandAnim = [
        [",'B{:'3", 4],
        [",'B{x'3", 4],
        [",'B{x'P", 6],
        [",'B{x')", 3],
        [",'B{:')", 1]
    ];
    async function rjInitialClickHandler() {
        rjSpan.style.pointerEvents = "none";
        rjSpan.textContent = ",'{B')"; //removes bold sunglasses immediately as feedback

        await playRjAnim(moveGlassesUpAnim, 400, 600);
        await playRjAnim(initialClickAnim, 1000);
        if (confirm("It seems like RJ wants to show you something...\n\nTake his hand?")) //OK
            await takeHand();
        else //Cancel
            await playRjAnim(moveGlassesDownAnim, 200, 600);
        rjSpan.addEventListener("click", rjBackupHandler);

        rjSpan.style.pointerEvents = "all";
    }
    async function rjBackupHandler() {
        rjSpan.style.pointerEvents = "none";

        await playRjAnim(moveGlassesUpAnim, 200, 400);
        if (rjSpan.hasAttribute("data-hand-taken")) { //after initial OK (and return to page)

            if (confirm("Take his hand?")) await takeHand(true);
            else await playRjAnim(moveGlassesDownAnim, 400, 400);

        } else { //after initial cancel

            if (confirm("Changed your mind?")) await takeHand();
            else await playRjAnim(moveGlassesDownAnim, 400, 400);

        }

        rjSpan.style.pointerEvents = "all";
    }
    async function takeHand(altAnim = false) {
        if (altAnim) await playRjAnim(altTakeHandAnim, 400);
        else await playRjAnim(takeHandAnim, 600);
        await playRjAnim(moveGlassesDownAnim, 200, 600);
        window.location.href = "https://cashmayo.github.io/super-secret.html";
        rjSpan.setAttribute("data-hand-taken", "");
    }
    async function playRjAnim(animFrames, startDelayMs = 0, tickIntervalMs = 200) {
        if (startDelayMs > 0) await sleep(startDelayMs);
        for (frame of animFrames) {
            rjSpan.textContent = frame[0];
            await sleep(frame[1] * tickIntervalMs);
        }
    }
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    rjSpan.addEventListener("click", rjInitialClickHandler, { once: true });
}