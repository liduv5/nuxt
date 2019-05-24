const cookieparser = process.server ? require('cookieparser') : undefined
export const state = () => ({
  islogin: {},
  userInfo: {}
})

export const mutations = {
  setIsLogin(state, islogin) {
    state.islogin = islogin
  },
  saveUserInfo(state, data) {
    state.userInfo = data
  }
}

export const actions = {
  async nuxtServerInit({ dispatch, commit }, { req }) {
    let userInfo = null
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        userInfo = JSON.parse(parsed.userInfo)
      } catch (err) {
        // 找不到有效的Cookie
      }
    }
    commit('saveUserInfo', userInfo)
    await dispatch('islogin')
  },
  async islogin({ dispatch, commit }) {
    let data = await this.$axios.$get('/api/islogin', { credentials: true })
    commit('setIsLogin', data)
  }
}