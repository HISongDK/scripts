// ==UserScript==
// @name         【自用】各网页广告屏蔽、样式优化
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://twitter.com/home
// @grant        none
// ==/UserScript==

;(function () {
    'use strict'

    const url = location.href
    const blockSite = ['weibo.com', 'twitter', 'qzone']

    // 对应站点重定向回 bing 首页
    blockSite.forEach((item) => {
        if (url.indexOf(item) > -1) {
            alert('回去看书')
            location.href = 'http://www.bing.com'
        }
    })

    // 添加样式文件
    const injectCss = (css) => {
        const style = document.createElement('style')
        style.innerText = css
        document.head.appendChild(style)
    }

    // 隐藏 bing 聊天机器人
    const hideBingRobot = () => {
        if (!url.includes('bing')) return
        injectCss('#ev_talkbox_wrapper{ display:none }')
    }

    // 隐藏 mongoose 中文文档广告大图
    const hideMongoAdPic = () => {
        if (!url.includes('mongoose')) return
        injectCss('img[alt="vip课程"]{ display:none }')
    }

    /**
     * 调用方法
     */
    hideBingRobot()
    hideMongoAdPic()

    window.addEventListener('load', () => {
        // 百度知道自动展开全文
        let readWholeBtn = document.querySelector('.read-whole')
        if (readWholeBtn) readWholeBtn.click()
    })
})()
