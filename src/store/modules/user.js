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
        // frome response get token
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  llogin({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      doLogin(userInfo).then(response => {
        commit('SET_TOKEN', response.token)
        setToken(response.token)
        resolve()
      }).catch(error => {
        console.log(error)
        reject()
      })
    })
  },

  // from response get ctoken and set it into store
  getCToken({ commit }) {
    return new Promise((resolve, reject) => {
      getCSRFtoken().then(response => {
        console.log(response)
        console.log('here is getctoken')
        commit('SET_XCSRFToken', response.Xtoken)
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
        console.log(response)
        // const { data } = response

        if (!response.info) {
          return reject('Verification failed, please Login again.')
        }

        const { name, avatar } = response.info

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(response.info)
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

