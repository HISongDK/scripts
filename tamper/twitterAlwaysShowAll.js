// ==UserScript==
// @name         Twitter Auto Expand Debug (Enhanced)
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  精准定位 Twitter 展开按钮
// @author       YourName
// @match        https://twitter.com/*
// @match        https://x.com/*
// @icon         https://abs.twimg.com/favicons/twitter.ico
// @grant        none
// ==/UserScript==

;(function () {
    'use strict'

    const DEBUG_MODE = true
    const SCROLL_THROTTLE = 1000 // 滚动事件节流间隔 (ms)

    // 精准选择器组合
    const SELECTORS = [
        'button[role="button"] span:only-child', // 英文按钮特征
    ]

    function log(message) {
        if (DEBUG_MODE) console.log(`[Twitter AutoExpand] ${message}`)
    }

    // 改进的文本检测（支持模糊匹配）
    function hasTargetText(element) {
        const text = element.innerText.trim()
        return text === '显示更多' || text === 'Show more'
    }

    function autoClickExpandButtons() {
        log('开始扫描...')
        let totalClicked = 0

        SELECTORS.forEach((selector) => {
            let elements = document.querySelectorAll(selector)
            elements = [...elements]?.filter(hasTargetText)

            if (!elements.length) return

            log(`选择器 "${selector}" 找到 ${elements.length} 个元素`)

            elements.forEach((element) => {
                if (hasTargetText(element)) {
                    if (checkVisibility(element)) {
                        try {
                            element.click()
                            log('已展开：' + element.innerText)
                            totalClicked++
                        } catch (e) {
                            log(`点击失败：${e.message}`)
                        }
                    }
                }
            })
        })

        if (totalClicked) {
            log(`本轮展开 ${totalClicked} 条推文`)
        } else {
            log(`未找到显示更多按钮`)
        }
    }

    // 可见性检查优化
    function checkVisibility(element) {
        return element.getBoundingClientRect().width > 0
    }

    // 节流函数 (固定间隔执行)
    function throttle(func, limit) {
        let lastRun = 0
        return function () {
            if (Date.now() - lastRun >= limit) {
                func()
                lastRun = Date.now()
            }
        }
    }

    // 智能滚动处理
    let lastScrollPos = 0
    const handleScroll = throttle(() => {
        const currentScroll = window.scrollY

        // 仅当向下滚动超过 200px 时触发 (避免微小滚动)
        if (
            currentScroll > lastScrollPos &&
            currentScroll - lastScrollPos > 200
        ) {
            autoClickExpandButtons()
            lastScrollPos = currentScroll
        }
    }, SCROLL_THROTTLE)

    // 初始化
    window.addEventListener('scroll', handleScroll)
    autoClickExpandButtons()
})()
