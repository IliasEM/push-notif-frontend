import { httpClient } from '@/application/shared/services/api-service'

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
    barImage: 'https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-1.jpg',
    drawer: null,
    subscribers: [],
  },
  getters: {
    subscribers: state => state.subscribers,
  },
  mutations: {
    SET_BAR_IMAGE (state, payload) {
      state.barImage = payload
    },
    SET_DRAWER (state, payload) {
      state.drawer = payload
    },
    SET_SUBSCRIBERS (state, subscribers) {
      state.subscribers = subscribers
    },
  },
  actions: {
    setSubscribers: async ({ commit }) => {
      const subscribers = await httpClient.subscriber.getSubscribers()
      commit('SET_SUBSCRIBERS', subscribers)
    },
  },
})
