function getLinks() {

  const iFrames = []
  const iFramesInner = []
  const videoTags = []
  const m3u8s = []


  const filterOut = [
    'disqus',
    'twitter',
    'google',
    'facebook'
  ]

  function remove(str) {
    if (str.length === 0) return true
    return filterOut.some(el => {
      const regex = new RegExp(el)
      return regex.test(str)
    })
  }


  Array.from(document.getElementsByTagName('iframe'))
    .forEach((iframe) => {
      if (!remove(iframe.src)) iFrames.push(iframe.src)
      if (iframe.contentDocument && iframe.contentDocument.querySelector('iframe')) {
        const innerSrc = iframe.contentDocument.querySelector('iframe').src
        if (!remove(innerSrc)) iFramesInner.push(innerSrc)
      }
    })

  //rewrite when you stumble upon a video tag again
  Array.from(document.getElementsByTagName('video'))
    .forEach((el) => {
      let source = 'No el.src || &lt;source&gt;'
      if (!el.src && el.firstElementChild) {
        source = el.firstElementChild.src
      } else if (el.src) {
        source = el.src
      }
      if (source !== null) videoTags.push(source)
    })


  // captureNetworkRequests, ie. m3u8's
  const captured_resources = performance.getEntriesByType("resource");
  for (let i = 0; i < captured_resources.length; i++) {
    if (captured_resources[i].initiatorType == "xmlhttprequest"
      && (captured_resources[i].name.includes('m3u8')
        || captured_resources[i].name.includes('mpd'))
    ) {
      m3u8s.push(captured_resources[i].name)
    }
  }


  chrome.runtime.sendMessage({
    iFrames,
    iFramesInner,
    videoTags,
    m3u8s,
  }, function (response) {
    console.log(response)
  })

}

export default getLinks
