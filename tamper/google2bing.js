// ==UserScript==
// @name         GOOGLE 指定 BING 壁纸
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.google.com/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @grant        none
// ==/UserScript==

; (function () {
	'use strict'

	document.body.style.background = 'url(https://api.dujin.org/bing/1920.php) center/cover'
	document.querySelector('.c93Gbe').style.background = 'unset'
})()
