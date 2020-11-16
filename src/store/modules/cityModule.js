// // 从本地存储中取数据出来
const city = window.sessionStorage.getItem('city')
const state = {
  curCity: city ? JSON.parse(city) : null
}
const mutations = {
  // 设置当前城市
  SET_CURCITY (state, payload) {
    state.curCity = payload
    // 做一下本地的存储
    window.sessionStorage.setItem('city', JSON.stringify(state.curCity))
  }
}
// 在页面上显示当前城市名字
const getters = {
  curCityName (state) {
    return state.curCity ? state.curCity.name : ''
  }
}

export default {
  namespaced: true, // 注意在子模块中要去添加命名空间
  state,
  getters,
  mutations
}
