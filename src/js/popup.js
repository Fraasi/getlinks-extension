import "../css/popup.css";
import getLinks from './popup/getlinks.js'
import copyImg from '../img/clipboard.svg'
console.log('copyImg:', copyImg)


document.addEventListener('DOMContentLoaded', function () {
  /* Add your event listeners here */
  chrome.tabs.executeScript({
    code: `(${getLinks.toString()})()`
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
    // console.log('message:', message)
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
                const link_span = document.querySelector((`span[data-link="${link}"]`))
                link_span.innerHTML = 'Copied to clipboard<br>'
                setTimeout(function() {
                  link_span.innerHTML = `${link}<br>`;
                }, 750);
              }
            })
            message[key].forEach(link => {
              const button = document.createElement('button')
              button.setAttribute('type', 'button')
              button.setAttribute('class', 'copy-to-clipboard')
              button.setAttribute('data-link', link)
              el.append(button)
              const span = document.createElement('span')
              span.setAttribute('data-link', link)
              span.innerHTML = `${link}<br>`
              el.append(span)
            })
          }
        })
  })
