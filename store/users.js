/* eslint-disable no-return-await */
export const state = () => ({
  userList: [],
  userInfo: {}
})

export const getters = {
  getUserList() {
    return state.userList
  }
}

export const mutations = {
  saveUserList(state, data) {
    state.userList = data
  },
  saveUserInfo(state, data) {
    state.userInfo = data
  },
  addUser(state, data) {
    state.addUser = data
  }
}

export const actions = {
  // users/index.vue获取用户列表
  async findUserList({ state, commit }) {
    let data = await this.$axios.$get('/api/userList')
    commit('saveUserList', data)
  },
  // 用户编辑页面 根据_id获取单个用户信息
  async findUserInfo({ state, commit }, payload) {
    let data = await this.$axios.$post('/api/users/findOne', payload)
    commit('saveUserInfo', data)
  },
  // 添加用户
  async addUser({ state, commit }, payload) {
    return await this.$axios.$post('/api/users/add', payload)
  },
  // 修改用户
  async updateUser({ state, commit }, payload) {
    return await this.$axios.$put('/api/users/updateUser', payload)
  },
  // 删除用户
  async delUser({ state, commit }, payload) {
    return await this.$axios.$delete(`/api/users/deleteUser/${payload}`)
  }
}
