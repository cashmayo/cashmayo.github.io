"use strict";

let fetchButton;
let albumIdSpan;
let idSpan;
let titleSpan;
let urlSpan;
let thumbnailUrlSpan;
let imgElement;
let thumbnailElement;
async function fetchRandomPhoto() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/photos/" + (Math.random() * 5000 | 0));
        if (!response.ok)
            throw new Error("jsonplaceholder fetch response did not return ok");
        const data = await response.json();

        albumIdSpan.textContent = data.albumId;
        idSpan.textContent = data.id;
        titleSpan.textContent = data.title;

        urlSpan.textContent = data.url;
        imgElement.src = data.url;

        thumbnailUrlSpan.textContent = data.thumbnailUrl;
        thumbnailElement.src = data.thumbnailUrl;

        if (data.id === 1337) {
            fetchButton.textContent = "good boy fetch!!!"; //intrusive thoughts won
            setTimeout(() => fetchButton.textContent = "Fetch Very Real (Not Fake) Data", 1337);
        }
    } catch (err) {
        return console.error(err.messsage);
    }
}

//load event
document.addEventListener("DOMContentLoaded", () => {
    //consts / vars
    const IMAGE_PRELOAD_LINKS = ["images/speakeron.png", "images/cmiconactive.png"];

    const SPEAKER_IMG = document.getElementById("speaker");
    const APPLAUSE_AUDIO = document.getElementById("applause");
    const CM_ICON = document.getElementById("cm-icon");
    const BANNER_CONTAINER = document.getElementById("banner-container");

    fetchButton = document.getElementById("fetch-button");
    albumIdSpan = document.getElementById("albumId");
    idSpan = document.getElementById("id");
    titleSpan = document.getElementById("title");
    urlSpan = document.getElementById("url");
    thumbnailUrlSpan = document.getElementById("thumbnailUrl");
    imgElement = document.getElementById("fetched-img");
    thumbnailElement = document.getElementById("fetched-thumbnail");

    //events
    SPEAKER_IMG.addEventListener("click", () => {
        if (APPLAUSE_AUDIO.paused)
            APPLAUSE_AUDIO.play();
        else {
            APPLAUSE_AUDIO.pause();
            APPLAUSE_AUDIO.currentTime = 0;
        }
    });
    APPLAUSE_AUDIO.addEventListener("play", () => SPEAKER_IMG.src = "images/speakeron.png");
    APPLAUSE_AUDIO.addEventListener("pause", () => SPEAKER_IMG.src = "images/speakeroff.png");

    BANNER_CONTAINER.addEventListener("mouseenter", () => CM_ICON.src = "images/cmiconactive.png");
    BANNER_CONTAINER.addEventListener("mouseleave", () => CM_ICON.src = "images/cmiconinactive.png");

    fetchButton.addEventListener("click", fetchRandomPhoto);

    //page setup / image preload
    APPLAUSE_AUDIO.volume = 0.5;
    for (let link of IMAGE_PRELOAD_LINKS) {
        const image = new Image();
        image.src = link;
    }
});