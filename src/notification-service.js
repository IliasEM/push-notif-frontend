import Axios from 'axios'

let isSubscribed = false
let swRegistration = null
const applicationKey = 'BBvtNyJz4kG3-iDnhXGTfvvkvYlAMkBDCKhTra-Cl8ENaPl2rIjEOEsu3t1WpSZ-GZ3DvixzGonqgElxHRisG-Q'

if ('serviceWorker' in navigator) {
  if (!('Notification' in window)) {
    alert('This browser does not support desktop notification')
  } else if (Notification.permission === 'granted') {
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(function (permission) {
      if (permission === 'granted') {
        run()
      }
    })
  }
}

function urlB64ToUint8Array (base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4)
  const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

async function run () {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    navigator.serviceWorker.register('/worker.js')
        .then(function (swReg) {
            swRegistration = swReg

            swRegistration.pushManager.getSubscription()
                .then(function (subscription) {
                    isSubscribed = subscription !== null

                    if (isSubscribed) {
                    } else {
                        swRegistration.pushManager.subscribe({
                                userVisibleOnly: true,
                                applicationServerKey: urlB64ToUint8Array(applicationKey),
                            })
                            .then(function (subscription) {
                                saveSubscription(subscription)

                                isSubscribed = true
                            })
                    }
                })
        })
  }
}

function saveSubscription (subscription) {
  Axios.post('http://localhost:3000/subscribe', subscription)
}
