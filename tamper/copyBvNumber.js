// ==UserScript==
// @name         click title to copy BVNumber
// @namespace    http://tampermonkey.net/
// @version      2024-07-07
// @description  try to take over the world!
// @author       You
// @match        https://www.bilibili.com/video/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bilibili.com
// @grant        none
// ==/UserScript==

;(() => {
    // Your code here...
    window.addEventListener('load', () => {
        setTimeout(() => {
            const title = document.querySelector(
                '#viewbox_report > div.video-info-title > div > h1',
            )
            title.addEventListener('click', () => {
                const bv = location.pathname.split('/')[2]

                navigator.clipboard
                    .writeText(bv)
                    .then(() => {
                        console.log('BV number copied to clipboard...')
                    })
                    .catch((err) => {
                        console.log('Something went wrong', err)
                    })
            })
        }, 1500)
    })
})()
