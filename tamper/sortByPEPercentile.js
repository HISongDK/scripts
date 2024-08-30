// ==UserScript==
// @name         指数估值自动按照PE历史百分比排序
// @namespace    http://tampermonkey.net/
// @version      2024-08-30
// @description  指数估值自动按照PE历史百分比排序
// @author       You
// @match        https://danjuanfunds.com/djmodule/value-center
// @icon         https://www.google.com/s2/favicons?sz=64&domain=danjuanfunds.com
// @grant        none
// ==/UserScript==

;(function () {
    'use strict'
    window.addEventListener('load', () => {
        // 指数估值初始按照百分位排序
        setTimeout(() => {
            const target = document.querySelector(
                '#value-center > div.container > div.ver-wrap1.out-dj > div > div > div.pe-per.header-item',
            )
            if (target) {
                target.click()
            }
        }, 500)

        // 顶部图片占位太大移除
        setTimeout(() => {
            const img = document.querySelector(
                '#value-center > div.brand-box > img',
            )
            if (img) {
                img.style.display = 'none'
            }
        }, 90)
    })
})()
