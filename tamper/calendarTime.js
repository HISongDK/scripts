// ==UserScript==
// @name         Google Calendar Time Remaining
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  在谷歌日历上显示任务的剩余时间、持续时间和距离结束的时间
// @author       Your Name
// @match        https://calendar.google.com/*
// @grant        none
// ==/UserScript==

;(function () {
    'use strict'

    // 辅助函数：格式化时间
    function formatTime(milliseconds) {
        const hours = Math.floor(milliseconds / (1000 * 60 * 60))
        const minutes = Math.floor(
            (milliseconds % (1000 * 60 * 60)) / (1000 * 60)
        )
        const seconds = Math.floor(milliseconds % (1000 * 60)) / 1000
        return `${hours}h ${minutes}m ${seconds}s`
    }

    // 主函数：更新任务时间显示
    function updateTaskTimes() {
        // 获取所有任务元素
        const tasks = document.querySelectorAll('[data-eventchip]')
        console.log('---  tasks  ---\n', tasks)

        // console.log('---  tasks  ---\n', JSON.stringify(tasks, null, 2))
        tasks.forEach((task) => {
            // 获取任务的开始时间和结束时间
            console.log('---  task  ---\n', task)
            const dateText = task.querySelector('div').getHTML()?.split('，')[0]
            console.log('---  dateText  ---\n', dateText)
            let [startTime, endTime] = dateText.split('至')
            console.log('---  startTime, endTime  ---\n', startTime, endTime)
            if (startTime.startsWith('上午')) {
                startTime.replace('上午', '')
                const [hour] = startTime.split(':')
                startTime.replace(hour, (match) =>
                    match === '12' ? '00' : Number(match) + 12
                )
                console.log('---  startTime  ---\n', startTime)
                startTime = new Date(startTime)
                console.log('---  startTime  ---\n', startTime)
            }
            if (startTime.startsWith('下午')) {
                startTime = startTime.replace('下午', '')
                const [hour] = startTime.split(':')
                console.log('---  hour  ---\n', hour)
                startTime = startTime.replace(hour, (match) =>
                    match === '12' ? '00' : Number(match) + 12
                )
                console.log('---  startTime  ---\n', startTime)
                startTime = new Date(startTime)
                console.log('---  startTime  ---\n', startTime)
            }
            if (endTime.startsWith('上午')) {
                endTime.replace('上午', '')
            }
            if (endTime.startsWith('下午')) {
                endTime.replace('下午', '')
            }

            const now = new Date()

            // 计算剩余时间、持续时间和距离结束的时间
            const timeRemaining = startTime - now
            const duration = endTime - startTime
            const timeUntilEnd = endTime - now

            // 创建显示时间的元素
            const timeDisplay = document.createElement('div')
            timeDisplay.style.marginTop = '5px'
            timeDisplay.style.fontSize = '12px'
            timeDisplay.style.color = '#666'
            timeDisplay.innerHTML = `
                <div>距离开始：${formatTime(timeRemaining)}</div>
                <div>持续时间：${formatTime(duration)}</div>
                <div>距离结束：${formatTime(timeUntilEnd)}</div>
            `

            // 将时间显示添加到任务元素中
            task.appendChild(timeDisplay)
        })
    }

    // 每隔 1 秒更新一次时间显示
    // setInterval(updateTaskTimes, 100000)
    setTimeout(updateTaskTimes, 2000)
})()
