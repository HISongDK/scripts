// ==UserScript==
// @name         IPSA ICan自检自动选择
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  ICan自检自动选择
// @author       dksong
// @match        https://ipsapro.isoftstone.com/iCan/ITS/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=isoftstone.com
// @license      MIT
// @grant        none
// ==/UserScript==

;(function () {
    'use strict'

    const chose = (timer) => {
        const yesRadios = document.querySelectorAll(
            '.ant-radio-wrapper:first-child .ant-radio-input',
        )
        if (yesRadios.length) {
            yesRadios.forEach((radio) => {
                radio.click()
            })
            clearInterval(timer)
        }
    }

    const timer = setInterval(() => {
        const btns = Array.from(document.querySelectorAll('.ant-pagination li'))

        if (btns.length) {
            clearInterval(timer)

            btns.pop()
            btns.shift()

            btns.forEach((pageBtn) => {
                pageBtn.click()
                chose()
            })
        } else {
            return chose(timer)
        }
    }, 500)

    setTimeout(() => timer && clearInterval(timer), 1000 * 10)
})()
