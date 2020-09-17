import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    login: false,
    error: {
      update: ""
    },

    loading: {
      add: false,
      update: false,
      login: false,
      investors: false,
    },

    dialog: {
      update: false,
      investor: false,
      investment: false
    },

    alert: {
      is: false,
      type: "",
      text: ""
    },

    toast: {
      is: false,
      type: "",
      text: ""
    },

    user: null,

    investors: [],
    investor: null,

    investments: [
      {
        capital: 200000,
        payoutDate: "10-Nov-2020",
        expiringDate: "12-June-2021",
        interestRate: 2.5,
      },
      {
        capital: 200000,
        payoutDate: "10-Nov-2020",
        expiringDate: "12-June-2021",
        interestRate: 2.5,
      },
      {
        capital: 200000,
        payoutDate: "10-Nov-2020",
        expiringDate: "12-June-2021",
        interestRate: 2.5,
      },
      {
        capital: 200000,
        payoutDate: "10-Nov-2020",
        expiringDate: "12-June-2021",
        interestRate: 2.5,
      },
    ]

  },
  getters: {
    "Get_TotalInvestments"(state) {
      if (state.investments) {
        return state.investments.length
      } else {
        return 0
      }
    },
    "Get_User"(state) {
      return state.user
    },
    "Get_Alert"(state) {
      return state.alert
    },
    "Get_Toast"(state) {
      return state.toast
    },
    "Get_Login"(state) {
      return state.login
    },
    "Get_Loading"(state) {
      return state.loading
    },
    "Get_Dialog"(state) {
      return state.dialog
    },

    "Get_Investors"(state) {
      return state.investors
    },
    "Get_Investor"(state) {
      return state.investor
    },
    "Get_Investments"(state) {
      if (state.investments !== null) {
        return state.investments
      } else {
        return []
      }
    }
  },
  mutations: {
    "Set_Alert"(state, alert) {
      state.alert = alert
    },
    "Set_Toast"(state, toast) {
      state.toast = toast
    },

    "Set_Login"(state, login) {
      state.login = login
    },

    "Set_Dialog"(state, params) {
      state.dialog[params.type] = params.value
    },
    "Set_Loading"(state, params) {
      state.loading[params.type] = params.value
    },
    "Set_User"(state, user) {
      state.user = user
    },
    "Set_Investors"(state, investors) {
      state.investors = investors
    },
    "Set_Investor"(state, investor) {
      state.investor = investor
    },
    "Set_Investments"(state, investments) {
      state.investments = investments
    }
  },
  actions: {

    "Init_Alert"({ commit }, alert) {
      let time
      alert.time ? time = alert.time : time = 5
      alert.is = true
      commit("Set_Alert", alert)

      setTimeout(() => {
        commit("Set_Alert", { is: false, type: "", text: "" })
      }, (time * 1000))

    },
    "Init_Toast"({ commit }, toast) {
      toast.is = true
      commit("Set_toast", toast)

      setTimeout(() => {
        commit("Set_Toast", { is: false, type: "", text: "" })
      }, 5000)

    },

    async "Login_User"({ commit, dispatch }, user) {

      commit("Set_Loading", { type: "login", value: true })

      await fetch("https://bbdms.herokuapp.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      })
        .then(res => res.json())
        .then(resp => {
          if (resp.status == 1) {

            //set userToken to local storage
            localStorage.setItem('userToken', (resp.data.token));

            //decode token and set user
            const decoded = Vue.$jwt.decode(resp.data.token)
            const user = {
              email: decoded.email,
              fullName: `${decoded.firstName} ${decoded.lastName}`,
              id: decoded.id
            }
            //set the curretn user
            commit("Set_User", user)
            commit("Set_Login", true)
            commit("Set_Loading", { type: "login", value: false })
            router.push('/')

          } else {
            console.log(resp);
            commit("Set_Loading", { type: "login", value: false })
            dispatch("Init_Alert", { type: "error", text: resp.message })
          }
        })
        .catch(err => {
          commit("Set_Loading", { type: "login", value: false })
          console.log(err)
        })

    },

    logoutUser({ commit }) {
      localStorage.removeItem('userToken');
      commit("Set_User", null)
      commit("Set_Login", false)
      router.push('/login')
    },

    async initInvestors({ commit, dispatch }) {
      commit("Set_Loading", { type: "investors", value: true })
      const token = localStorage.getItem('userToken')

      await await fetch("https://bbdms.herokuapp.com/api/investor", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token} `,
        },
      })
        .then(res => res.json())
        .then(resp => {
          if (resp.status == 1) {
            commit("Set_Investors", resp.data)
            commit("Set_Loading", { type: "investors", value: false })
          } else {
            console.log(resp)
            commit("Set_Loading", { type: "investors", value: false })
          }

        }).catch(err => {
          console.log(err);
          commit("Set_Loading", { type: "investors", value: false })
          dispatch("Init_Alert", { time:6, type: "primary", text: `${err.message}, make sure your have internet connection` })
        })
    },

    async addInvestor({commit, dispatch}, investor){
      
      commit("Set_Loading", { type: "add", value: true })
      const token = localStorage.getItem('userToken')

      await await fetch('https://bbdms.herokuapp.com/api/investor/', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token} `,
        },
        body: JSON.stringify(investor)
      })
        .then(res => res.json())
        .then(resp => {
          if(resp.status == 1){
            
            dispatch("Init_Alert", { type: "success", text: resp.message })
            commit("Set_Dialog", { type: "investor", value: false })
            commit("Set_Loading", { type: "add", value: false })
          }else {
            dispatch("Init_Alert", { type: "error", text: resp.message })
            commit("Set_Loading", { type: "add", value: false })
          }
        })
        .catch((err) => {
          commit("Set_Loading", { type: "add", value: false })
          dispatch("Init_Alert", { type: "error", text: err.message })
        })
    },
    
    async getInvestor({ commit, dispatch }, id) {

      commit("Set_Loading", { type: "investor", value: true })
      const token = localStorage.getItem('userToken')

      await await fetch(`https://bbdms.herokuapp.com/api/investor/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token} `,
        }
      })
        .then(res => res.json())
        .then(resp => {
          if (resp.status == 1) {
            commit("Set_Investor", resp.data)
            commit("Set_Loading", { type: "investor", value: false })
          } else {
            console.log(resp)
            commit("Set_Loading", { type: "investor", value: false })
            dispatch("Init_Alert", { type: "primary", text: `${resp.message} redirecting back to dashboard...` })
            setTimeout(()=> {
              router.push('/')
            },4000)
          }
        })
    },

    async updateInvestor({ commit, dispatch }, investor) {

      commit("Set_Loading", { type: "update", value: true })

      const token = localStorage.getItem('userToken')

      await await fetch(`https://bbdms.herokuapp.com/api/investor/${investor.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token} `,
        },
        body: JSON.stringify(investor)

      })
        .then(res => res.json())
        .then(resp => {
          if (resp.status === 1) {
            commit("Set_Loading", { type: "update", value: false })
            commit("Set_Dialog", { type: "update", value: false })
            dispatch("Init_Alert", { type: "success", text: resp.message })
          } else {
            commit("Set_Loading", { type: "update", value: false })
            dispatch("Init_Alert", { type: "error", text: resp.message })
          }
        })
        .catch(err => {
          commit("Set_Loading", { type: "update", value: false })
          dispatch("Init_Alert", { type: "error", text: err.message })
          console.log(err);
        })

    },
    authenticated({ commit, dispatch }, path) {
      const token = localStorage.getItem('userToken')
      if (token) {
        const decoded = Vue.$jwt.decode(token)
        if (decoded.exp < Date.now() / 1000) {

          router.push("/login")
          dispatch("Init_Alert", { type: 'error', text: "Token  has expired, please login" })

        } else {
          commit("Set_Login", true)
          const user = {
            email: decoded.email,
            fullName: `${decoded.firstName} ${decoded.lastName}`,
            id: decoded.id
          }
          commit("Set_User", user)

          if (path !== '/') {
            router.push("/")
          }
        }
      } else {
        if (path !== '/login') {
          router.push("/login")
        }
      }
    }

  },
  modules: {
  }
})

// https://bbdms.herokuapp.com/api/auth/login

// POST: email, password

// /investor
// POST firstName, lastName, otherNames, email, phoneNumber
// GET

// /investor/id
// GET
// PUT