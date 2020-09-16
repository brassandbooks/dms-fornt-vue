import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    login: false,
    loginError: "",
    loading: {
      add: false,
      update: false,
      login: false,
      investors: false,
    },

    alert: {
      is:false,
      type:"",
      text:""
    },

    toast: {
      is:false,
      type:"",
      text:""
    },

    dialog: {
      investment: false,
      investor: false
    },

    user: null,

    investors: [],

    investments:[
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
    "Get_TotalInvestments"(state){
      if(state.investments){
        return state.investments.length
      }else {
        return 0
      }
    },
    "Get_User"(state){
      return state.user
    },
    "Get_Alert"(state){
      return state.alert
    },
    "Get_Toast"(state){
      return state.toast
    },
    "Get_Login"(state) {
      return state.login
    },
    "Get_Loading"(state) {
      return state.loading
    },

    "Get_Investors"(state) {
        return state.investors
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
    "Set_Alert"(state, alert){
      state.alert = alert
    },
    "Set_Toast"(state, toast){
      state.toast = toast
    },

    "Set_Login"(state, login) {
      state.login = login
    },
  
    "Set_Loading"(state, params){
      state.loading[params.type] = params.value
    },
    "Set_User"(state, user) {
      state.user = user
    },
    "Set_Investors"(state, investors) {
      state.investors = investors
    },
    "Set_Investments"(state, investments) {
      state.investments = investments
    }
  },
  actions: {

    async "Init_Investors"(){
      await fetch("https://bbdms.herokuapp.com/api/auth/investor", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
        
      }).then(res => res.json())
      .then(resp => {
        console.log(resp);
      })
      .catch(err => {
        console.log(err);
      })

    },

    "Init_Alert"({commit}, alert){
      alert.is = true
      commit("Set_Alert", alert)
      
      setTimeout(()=> {
        commit("Set_Alert", {is: false, type:"", text:""})
      },5000)

    },
    "Init_Toast"({commit}, toast){
      toast.is = true
      commit("Set_toast", toast)
      
      setTimeout(()=> {
        commit("Set_Toast", {is: false, type:"", text:""})
      },5000)

    },
  
    async "Login_User"({ commit, dispatch }, user) {

      commit("Set_Loading", {type:"login", value:true})

      await fetch("https://bbdms.herokuapp.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      })
        .then(res => res.json())
        .then(resp => {
          if(resp.status == 1){

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
            commit("Set_Loading", {type:"login", value:false})
            router.push('/')

          }else {
            console.log(resp);
            commit("Set_Loading", {type:"login", value:false})
            dispatch("Init_Alert", {type:"error", text:resp.message})
          }
        })
        .catch(err => {
          commit("Set_Loading", {type:"login", value:false})
          console.log(err)
        })

    },

    logoutUser({commit}){
      localStorage.removeItem('userToken');
      commit("Set_User", null)
      commit("Set_Login", false)
      router.push('/login')
    },

    async initInvestors({commit}){
      commit("Set_Loading", {type:"investors", value:true})
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
        if(resp.status == 1){
          console.log(resp)
        commit("Set_Investors", resp.data)
        commit("Set_Loading", {type:"investors", value:false})
      }else {
        console.log(resp)
        commit("Set_Loading", {type:"investors", value:false})
        }

      }).catch(err => {
        console.log(err);
        commit("Set_Loading", {type:"investors", value:false})
      })
    },

    authenticated({commit, dispatch}, path){
      const token = localStorage.getItem('userToken')
      if(token){
        const decoded = Vue.$jwt.decode(token)
          if (decoded.exp < Date.now() / 1000) {
             
            router.push("/login")
            dispatch("Init_Alert", {type:'error', text:"Token  has expired, please login"})

          }else {
              commit("Set_Login", true)
              const user = {
                email: decoded.email,
                fullName: `${decoded.firstName} ${decoded.lastName}`,
                id: decoded.id
              }
              commit("Set_User", user)
              
              if(path !== '/'){
                router.push("/")
              } 
           }
      }else {
        if(path !== '/login'){
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