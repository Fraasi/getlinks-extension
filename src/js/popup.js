import "../css/popup.css";
import getLinks from './popup/getlinks.js'


document.addEventListener('DOMContentLoaded', function(details) {

  chrome.tabs.executeScript(
    details.tabId, {
    code: `(${getLinks.toString()})()`,
    allFrames: true,
  })

  document.querySelector('#options').addEventListener('click', function () {
    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage();
    } else {
      window.open(chrome.runtime.getURL('options.html'));
    }
  })
})


chrome.runtime.onMessage.addListener(
  function (message, sender, sendResponse) {

    Object.keys(message)
      .forEach(key => {
        if (message[key].length) {
          const el = document.getElementById(key)

          message[key].forEach(link => {
            const button = document.createElement('button')
            button.setAttribute('type', 'button')
            button.setAttribute('class', 'copy-to-clipboard')
            button.setAttribute('data-link', link)
            el.append(button)
            const span = document.createElement('span')
            span.innerHTML = `${link}<br>`
            el.append(span)

            button.addEventListener('click', e => {
              navigator.clipboard.writeText(link)
              span.innerHTML = 'Copied to clipboard<br>'
              setTimeout(function () {
                span.innerHTML = `${link}<br>`;
              }, 750);
            })
          })
        }
      })
  })
