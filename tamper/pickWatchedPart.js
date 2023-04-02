// ==UserScript==
// @name         B站合集链接自动跳转最高播放集数
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  B站合集链接收藏路径，自动跳转到曾播放的最高集数
// @author       You
// @match        https://www.bilibili.com/video/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bilibili.com
// @grant        none
// @license      MIT
// ==/UserScript==

(function() {
  'use strict';

  // 点击列表更新存储集数
  const addPChangedListener = (sourceCode)=>{
      const list = document.querySelectorAll('.list-box li')

      list.forEach((item,index)=>{
          item.addEventListener('click',()=>{
              console.log(index)
              localStorage.setItem(sourceCode,index+1)
          })
      })
  }

  // 刷新或关闭页面前 获取链接当前集 对比保存集数，链接集数新则更新
  const addUrlBeforeunload = (sourceCode)=>{
      window.addEventListener('beforeunload',()=>{
          const p = new URLSearchParams(location.search).get('p')
          const storeCodeP = localStorage.getItem(sourceCode)
          if(Number(p) > Number(storeCodeP)){
              localStorage.setItem(sourceCode,p)
          }

      })
  }

  window.onload = function(){
      console.log('location.href',location.href)

      const sourceCode = location.pathname.split('/')[2]

      addUrlBeforeunload(sourceCode)
      addPChangedListener(sourceCode)

      const urlParams = new URLSearchParams(location.search)

      const part = urlParams.get('p')
      const storeCodeP = localStorage.getItem(sourceCode)


      // 链接集数存在，且未保存，直接保存
      if(part && (!storeCodeP || storeCodeP === 'null')) {return localStorage.setItem(sourceCode, part)}

      // 保存和当前相同，不处理
      if(storeCodeP === part) return

      // 保存集数小于链接集数，更新
      if(Number(storeCodeP) < Number(part)) {
          return localStorage.setItem(sourceCode, part)
      }

      // 确认跳转
      const res = confirm(`当前视频最新观看集数为 ${storeCodeP} ，是否立即跳转到该集数？`)
      if(res){
          location.href = location.origin + location.pathname + `?p=${storeCodeP}`
      } 
  }
})();