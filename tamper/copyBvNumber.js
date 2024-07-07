// ==UserScript==
// @name         click title to copy BVNumber
// @namespace    http://tampermonkey.net/
// @version      2024-07-07
// @description  try to take over the world!
// @author       You
// @match        https://www.bilibili.com/video/BV1TS421R7Ss/?spm_id_from=333.1007.tianma.1-1-1.click&vd_source=5566a14752976921899272d588362b83
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bilibili.com
// @grant        none
// ==/UserScript==

;(() => {
    // Your code here...
    window.addEventListener('load', () => {
        setTimeout(() => {
            const title = document.querySelector(
                '#viewbox_report > div.video-info-title > div.video-info-title-inner.video-info-title-inner-overflow > h1',
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
