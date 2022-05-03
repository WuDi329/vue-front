import { login, logout, getInfo } from '@/api/user'
import { getToken, getXCSRFToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import { doLogin, getCSRFtoken } from '@/api/login'
// import { reject, resolve } from 'core-js/fn/promise'

const getDefaultState = () => {
  return {
    token: getToken(),
    XCSRFToken: '',
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_XCSRFToken: (state, XCSRFToken) => {
    state.XCSRFToken = XCSRFToken
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        //frome response get token
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },


  // user login wudi version
  llogin(userInfo) {
    //debugger
    console.log(userInfo)
    //const { username, password } = userInfo
    console.log(userInfo.username + '      username')
    console.log(userInfo.password + '      password')
    return new Promise((resolve, reject) => {
      doLogin({ 'username': 'admin', 'password': '123456' }).then(response => {
        console.log(response+'here is index/dologin response')
          resolve()
      }).catch(error => {
        console.log(error+'here is index/dologin response')
          reject()
      })
    })
  },

  getCToken({ commit }) {
    return new Promise((resolve, reject) => {
      //debugger
      getCSRFtoken().then(response => {
        console.log(response)
        console.log('here is getctoken')
        commit('SET_XCSRFToken',response.token)
        //debugger
        resolve()
      }).catch(error => {
        console.log('getctoken error')
        reject(error)
      })
    })
  },



  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const { name, avatar } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

