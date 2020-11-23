
const video = document.querySelector('#screenshot')
const _promise = navigator.mediaDevices.getDisplayMedia()
const canvas = document.createElement('canvas')
canvas.width = 1200
canvas.height = 700

const ctx = canvas.getContext('2d')
let timerId = -1
_promise.then(stream => {
  video.srcObject = stream
  clearTimeout(timerId)
})

document.body.appendChild(canvas)
function flash () {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(video, 0, 0, video.clientWidth, video.clientHeight)
  const data = canvas.toDataURL('image/jpeg', {quality: 0.80})
  const anchor = document.createElement('a')
  anchor.download = 'screenshot.jpeg'
  anchor.href= data
  anchor.click()
  
  clearTimeout(timerId)
  document.querySelector('#flash').style.display = 'initial'
}

document.querySelector('#flash').addEventListener('click', e => {
  e.target.style.display = 'none'
  timerId = setTimeout(flash, 60)
})