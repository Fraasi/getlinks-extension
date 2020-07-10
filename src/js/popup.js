import "../css/popup.css";
import getLinks from './popup/getlinks.js'

// console.log('getLinks:', getLinks.toString())
// console.log(process.cwd())
// const uu = chrome.runtime.getURL('popup/getlinks.js')

document.querySelector('img').addEventListener('click', () => {
  // getLinks();
  document.querySelector('h1').innerText = 'goodbye'
  chrome.tabs.executeScript({
    code: `(${getLinks.toString()})()`
    //   file: '/js/getlinks.js'
  })

})

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    console.log(sender.tab ?
      "from a content script:" + sender.tab.url :
      "from the extension")
    if (request.iFrames) {
      console.log('request:', request)
      sendResponse({ farewell: "goodbye" })

      // put stuff in popup
      Object.keys(request)
        .forEach(key => {
          document.querySelector('.'+key)
            .innerHTML = request[key].join('<br>')
        })
    }
  })
