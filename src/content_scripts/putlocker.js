// test


document.querySelectorAll('.server_servername')
  .forEach(el => {
    if (el.innerText.includes('Mega')) {
      el.style.color = 'green'

    }
  })
console.log('putlockeres')

function captureNetworkRequest(e) {
  const capture_newtwork_requests = []
  const capture_resource = performance.getEntriesByType("resource");
  for (let i = 0; i < capture_resource.length; i++) {
      if (capture_resource[i].initiatorType == "xmlhttprequest" || capture_resource[i].initiatorType == "iframe") {

              capture_newtwork_requests.push(capture_resource[i])

      }
  }
  return capture_newtwork_requests
}

console.log(captureNetworkRequests())
