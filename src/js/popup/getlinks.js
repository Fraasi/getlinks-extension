function getLinks() {

  const iFrames = []
  const iFramesInner = []
  const videoTags = []
  const noYTDL = []
  const m3u8s = []

  const filterOut = [ // does not work with YT-DL
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
  ]

  const toRemove = [
    'disqus',
    'twitter',
    'google'
  ]

  function remove(str) {
    return toRemove.some(el => {
      const regex = new RegExp(el)
      return regex.test(str)
    })

  }

  Array.from(document.getElementsByTagName('iframe'))
    .forEach((iframe) => {
      let src = remove(iframe.src) ? '' : iframe.src
      let filtered = filterOut.find(filter => src.includes(filter))
      filtered ? noYTDL.push(src) : iFrames.push(src)
      if (iframe.contentDocument && iframe.contentDocument.querySelector('iframe')) {
        let innerSrc = iframe.contentDocument.querySelector('iframe').src
        innerSrc = remove(innerSrc) ? '' : innerSrc
        let filtered = filterOut.find(filter => innerSrc.includes(filter))
        filtered ? noYTDL.push(innerSrc) : iFramesInner.push(innerSrc)
      }
    })

  // console.log('Iframe source(s):')
  // iFrames.forEach(src => { console.log(src) })
  // console.log('Iframe inner source(s):')
  // iFramesInner.forEach(src => { console.log(src) })

  //rewrite when you stumble upon a video tag again
  // console.log('Video source(s)')
  Array.from(document.getElementsByTagName('video'))
    .forEach((el) => {
      let source = 'No el.src || &lt;source&gt;'
      if (!el.src && el.firstElementChild) {
        source = el.firstElementChild.src
        // console.log('el.first...')
      } else if (el.src) {
        source = el.src
        // console.log('el.src')
      }

      let filtered = filterOut.find(filter => source.includes(filter))
      filtered ? noYTDL.push(source) : videoTags.push(source)

      // console.log(source)
    })


  //   attempt to fetch inner iFrames..
  // if (!iFramesInner.length && iFrames[0]) {
  //   fetch(iFrames[0], {
  //     'mode': 'no-cors',
  //     'headers': new Headers({
  //       'Content-Type': 'text/plain'
  //     })
  //   })
  //     .then(rawhtml => rawhtml.text())
  //     .then(html => { console.log('done', html) })
  //     .catch(err => { throw err })
  // }


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
    noYTDL
  }, function (response) {
    console.log(response)
  })

}

export default getLinks
