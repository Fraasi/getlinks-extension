// ==UserScript==
// @name         primewire yt-dl filter
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @include      /^https?://www\.primewire\.(li|ag|vc)//
// @grant        none
// ==/UserScript==

(function() {
  'use strict'
  const filterList = [
      'abcvideo',
      'cloudvideo',
      'dood',
      'fmoviesfree',
      'gamovideo',
      'jetload',
      'mycloud',
      'mystream',
      'powvideo',
      'streamcherry',
      'streamplay',
      'streamtape',
      'supervideo',
      'thevideo',
      'upstream',
      'vev',
      'videobin',
      'vidbull',
      'vidcloud',
      'vidia',
      'vidlox',
      'vidoza',
      'vidup',
      'vidzi',
      'vshare',
      'disqus'
  ]

  document.querySelectorAll('.version-host')
      .forEach(el => {
      if (filterList.find(filter => el.innerText.includes(filter))) {
          el.style.textDecoration = 'line-through'
      }
  })
})();
