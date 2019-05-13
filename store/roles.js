/* eslint-disable no-return-await */
export const state = () => ({
  roleList: [],
  roleInfo: {}
})

export const getters = {
  getroleList() {
    return state.roleList
  }
}

export const mutations = {
  saveRoleList(state, data) {
    state.roleList = data
  },
  saveRoleInfo(state, data) {
    state.roleInfo = data
  },
  addRole(state, data) {
    state.addRole = data
  }
}

export const actions = {
  // users/index.vue获取角色列表
  async findRoleList({ state, commit }) {
    let data = await this.$axios.$get('/api/roles')
    commit('saveRoleList', data)
  },
  // 用户编辑页面 根据_id获取单个用户信息
  async findRoleInfo({ state, commit }, payload) {
    let data = await this.$axios.$post('/api/roles/findOne', payload)
    commit('saveRoleInfo', data)
  },
  // 添加用户
  async addRole({ state, commit }, payload) {
    return await this.$axios.$post('/api/roles', payload)
  },
  // 修改用户
  async updateRole({ state, commit }, payload) {
    return await this.$axios.$put('/api/roles', payload)
  },
  // 删除用户
  async delRole({ state, commit }, payload) {
    return await this.$axios.$delete(`/api/roles/${payload}`)
  }
}
