function getLinks() {

  const iFrames = []
  const iFramesInner = []
  const videoTags = []
  const noYTDL = []
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
    'disqus',
    'twitter'
  ]

  Array.from(document.getElementsByTagName('iframe'))
    .forEach((iframe) => {
      let src = iframe.src || ''
      let filtered = filterOut.find(filter => src.includes(filter))
      filtered ? noYTDL.push(src) : iFrames.push(src)
      if (iframe.contentDocument && iframe.contentDocument.querySelector('iframe')) {
        let innerSrc = iframe.contentDocument.querySelector('iframe').src
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
      let source = 'No el.src || <source>'
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


  function captureNetworkRequest(ee) {
    var capture_newtwork_request = [];
    var capture_resource = performance.getEntriesByType("resource");
    for (var i = 0; i < capture_resource.length; i++) {
      if (capture_resource[i].initiatorType == "xmlhttprequest" || capture_resource[i].initiatorType == "iframe") {

        capture_newtwork_request.push(capture_resource[i])

      }
    }
    return capture_newtwork_request
  }

  //console.log(captureNetworkRequest())

  chrome.runtime.sendMessage({
    iFrames,
    iFramesInner,
    videoTags,
    noYTDL
  }, function (response) {
    console.log(response)
  })
}

export default getLinks
