// ==UserScript==
// @name         Chrome 时间日期显示
// @namespace    http://tampermonkey.net/
// @version      3.0
// @description  在 Chrome 浏览器右下角显示当前时间和日期
// @author       Devv.AI
// @match        *://*/*
// @grant        none
// ==/UserScript==

;(function () {
    'use strict'

    // 检查当前页面是否在 iframe 中
    if (window.self !== window.top) {
        return // 如果在 iframe 中，则不执行脚本
    }

    // 获取当前时间和日期
    function getCurrentDateTime() {
        const currentDate = new Date()
        const hours = currentDate.getHours()
        const minutes = String(currentDate.getMinutes()).padStart(2, '0')
        const seconds = String(currentDate.getSeconds()).padStart(2, '0')
        const month = String(currentDate.getMonth() + 1)
        const day = String(currentDate.getDate())
        return {
            time: `${hours}:${minutes}:${seconds}`,
            date: `${month}/${day}`,
        }
    }

    // 获取当前主题
    function getCurrentTheme() {
        return (
            localStorage.getItem('theme') ||
            (window.matchMedia('(prefers-color-scheme: dark)').matches
                ? 'dark'
                : 'light')
        )
    }

    // 设置主题
    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme)
        localStorage.setItem('theme', theme)
    }

    // 获取时间颜色
    function getTimeColor(currentHour, currentTheme) {
        if (currentTheme === 'dark') {
            if (currentHour >= 0 && currentHour < 6) {
                return 'rgb(255, 0, 0, 0.7)'
            } else if (currentHour >= 22) {
                return 'rgb(255, 165, 0, 0.7)'
            } else {
                return 'white'
            }
        } else {
            if (currentHour >= 0 && currentHour < 6) {
                return 'rgb(255, 0, 0, 0.7)'
            } else if (currentHour >= 22) {
                return 'rgb(255, 165, 0, 0.7)'
            } else {
                return 'black'
            }
        }
    }

    // 创建时间日期显示元素
    const timeDisplayElement = document.createElement('div')
    timeDisplayElement.style.position = 'fixed'
    timeDisplayElement.style.bottom = '10px'
    timeDisplayElement.style.right = '20px'
    timeDisplayElement.style.padding = '5px 10px'
    timeDisplayElement.style.borderRadius = '5px'
    timeDisplayElement.style.fontSize = '12px'
    timeDisplayElement.style.zIndex = '9998'
    timeDisplayElement.style.whiteSpace = 'pre-line'
    timeDisplayElement.style.lineHeight = '1.2'
    timeDisplayElement.style.textAlign = 'right'
    timeDisplayElement.style.cursor = 'pointer'

    // 检查是否处于全屏模式
    function isFullscreen() {
        return (
            document.fullscreenElement ||
            document.webkitFullscreenElement ||
            document.mozFullScreenElement ||
            document.msFullscreenElement
        )
    }

    // 切换主题
    function toggleTheme() {
        const currentTheme = getCurrentTheme()
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
        setTheme(newTheme)
        updateTimeDisplay()
    }

    // 每秒更新时间日期显示
    function updateTimeDisplay() {
        if (isFullscreen()) {
            timeDisplayElement.style.display = 'none'
        } else {
            timeDisplayElement.style.display = 'block'
            const currentTheme = getCurrentTheme()
            const { time, date } = getCurrentDateTime()
            const currentHour = new Date().getHours()
            const timeColor = getTimeColor(currentHour, currentTheme)
            timeDisplayElement.style.backgroundColor =
                currentTheme === 'dark'
                    ? 'rgba(0, 0, 0, 0.5)'
                    : 'rgba(255, 255, 255, 0.5)'
            timeDisplayElement.style.color = timeColor
            timeDisplayElement.textContent = `${time}\n${date}`
        }
    }

    // 添加时间日期显示到页面
    document.body.appendChild(timeDisplayElement)
    setInterval(updateTimeDisplay, 1000)

    // 初始化主题
    const currentTheme = getCurrentTheme()
    setTheme(currentTheme)
    updateTimeDisplay()

    // 点击时间日期框切换主题
    timeDisplayElement.addEventListener('click', toggleTheme)
})()
