// ==UserScript==
// @name         【自用】各网页广告屏蔽、样式优化
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  一个乱七八遭的自用脚本
// @author       dksong
// @match        https://*
// @license      MIT
// @grant        none
// ==/UserScript==

;(function () {
    'use strict'

    const url = location.href
    const blockSite = [
        'qzone', // 空间
        // 'twitter', // 推特
        'weibo.com', // 微博
    ]

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

    // bing 页面样式优化
    const bing = () => {
        // 隐藏 bing 聊天机器人
        if (url.includes('bing'))
            injectCss(
                `
                  #ev_talkbox_wrapper{ display:none }
                  #est_switch{ opacity: 0} 
                  #est_switch:hover{ opacity: 1} 
                  .header,.footer{ display:none } 
                  .mc_caro{bottom:0 !important} 
									.hpl.hp_cont {
										display: flex;
										justify-content: center;
									}
                  .sbox{ top:25% }
                  #sb_form, #sw_as .sa_hv{ background:rgba(255,255,255,.2); font-size:22px}
                  .icon_text,.leftNav,.rightNav{ background:rgba(255,255,255,.2) !important }
                `,
            )
    }

    // 隐藏 mongoose 中文文档广告大图
    const hideMongoAdPic = () => {
        if (url.includes('mongoose'))
            injectCss('img[alt="vip课程"]{ display:none } pre{ font-size: 16px}')
    }

    /**
     * 调用方法
     */
    bing()
    hideMongoAdPic()
})()
