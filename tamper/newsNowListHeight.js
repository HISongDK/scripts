// ==UserScript==
// @name         newsNowListHeight
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Set height of specified elements to 700px
// @match        https://newsnow.busiyi.world/*
// @grant        none
// ==/UserScript==

;(function () {
    'use strict'

    window.addEventListener('load', function () {
        setTimeout(() => {
            const elements = document.querySelectorAll(
                '#app > div > div > div > main > ol > li > div',
            )
            elements.forEach((element) => {
                element.style.height = '700px'
            })
        }, 500)
    })
})()
