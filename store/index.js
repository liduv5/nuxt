const cookieparser = process.server ? require('cookieparser') : undefined
export const state = () => ({
  auth: null,
  userInfo: {}
})

export const mutations = {
  setAuth(state, auth) {
    state.auth = auth
  },
  saveUserInfo(state, data) {
    state.userInfo = data
  }
}

export const actions = {
  nuxtServerInit({ dispatch, commit }, { req }) {
    let auth = null
    let userInfo = {}
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        auth = JSON.parse(parsed.auth)
        userInfo = JSON.parse(parsed.userInfo)
      } catch (err) {
        // 找不到有效的Cookie
      }
    }
    commit('setAuth', auth)
    commit('saveUserInfo', userInfo)
  }
}