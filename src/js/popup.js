import "../css/popup.css";
import getLinks from './popup/getlinks.js'

// console.log('getLinks:', getLinks.toString())
// console.log(process.cwd())
// const uu = chrome.runtime.getURL('popup/getlinks.js')

document.addEventListener('DOMContentLoaded', function () {
  /* Add your event listeners here */
  chrome.tabs.executeScript({
    code: `(${getLinks.toString()})()`
  })
});


chrome.runtime.onMessage.addListener(
  function (message, sender, sendResponse) {
    console.log('message:', message)
    console.log(sender.tab ?
      "from a content script:" + sender.tab.url :
      "from the extension")

      Object.keys(message)
        .forEach(key => {
          if (message[key].length) {
            const el = document.getElementById(key)
            el.addEventListener('click', e => {
              if (e.target.tagName === 'BUTTON') {
                const link = e.target.getAttribute('data-link')
                navigator.clipboard.writeText(link)
              }
            })
            message[key].forEach(link => {
              const button = document.createElement('button')
              button.setAttribute('type', 'button')
              button.setAttribute('class', 'copy-to-clipboard')
              button.setAttribute('data-link', link)
              button.textContent = 'copy'
              el.append(button)
              // el.textContent += link
              el.innerHTML += `&nbsp;${link}<br>`
            })
          }
        })
  })

document.querySelector('#options').addEventListener('click', function () {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL('options.html'));
  }
});
