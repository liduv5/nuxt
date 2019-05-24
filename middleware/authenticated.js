export default function ({ store, redirect }) {
    // 如果用户未经过身份验证
    if (!store.state.userInfo) {
      return redirect('/login')
    }
  }