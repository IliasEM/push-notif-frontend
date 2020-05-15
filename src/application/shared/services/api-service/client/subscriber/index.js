import axiosInstance from '../config'

const getSubscribers = () => axiosInstance.get('/subscribe').then(res => res.data)

const subscribe = subscription => axiosInstance.post(`/subscribe/new?endpoint=${subscription.endpoint}&p256dh=${subscription.keys.p256dh}&auth=${subscription.keys.auth}`).then(res => res.data)

export default {
    getSubscribers,
    subscribe,
}
