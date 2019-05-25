export default function ({ $axios, store, redirect }) {
    // 如果用户通过身份验证，则重定向到主页
    if (store.state.userInfo && store.state.islogin) {
      console.log(store.state.userInfo)
      return redirect('/')
    }
  }