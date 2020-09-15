import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    login: true,
    loginError: "",
    loading: {
      add: false,
      update: false,
      login: false
    },

    alert: {
      is:false,
      type:"",
      text:""
    },

    dialog: {
      investment: false,
      investor: false
    },

    user: {
      email: 'admin@gmail.com',
      password: "123456"
    },

    investors: [
      {
        id: 1,
        name: 'Peter Emmanuel Whyte',
        email: 'peteremmanuelwhyte@gmail.com',
        phone: '08108139758',
        numberOfInvestments: 7

      },
      {
        id: 2,
        name: 'Vonsokume Amodu',
        email: 'vonso@gmail.com',
        phone: '08108139758',
        numberOfInvestments: 7

      },
      {
        id: 3,
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        phone: '08108139758',
        numberOfInvestments: 3

      },
      {
        id: 4,
        name: 'Daniel Epiri',
        email: 'epiridaniel@gmail.com',
        phone: '08108139758',
        numberOfInvestments: 1

      },
      {
        id: 5,
        name: 'Gracious Nicholas',
        email: 'nicholasgracious@gmail.com',
        phone: '08108139758',
        numberOfInvestments: 2

      },
      {
        id: 6,
        name: 'Oletu Cornelius',
        email: 'badboyzgah@gmail.com',
        phone: '08108139758',
        numberOfInvestments: 2

      },
    ],

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
    "Get_Alert"(state){
      return state.alert
    },
    "Get_Login"(state) {
      return state.login
    },
    "Loading"(state) {
      return state.loading
    },

    "Get_Investors"(state) {
      if (state.investors !== null) {
        return state.investors
      } else {
        return []
      }
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
      console.log('start');
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
            //set the curretn user
            commit("Set_User", user)
            commit("Set_Login", true)
            commit("Set_Loading", {type:"login", value:false})
            console.log(resp);
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