import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    login: true,

    loading: {
      add: false,
      update: false,
      login:false
    },

    user: {
      email:'admin@gmail.com',
      password:"123456"
    },

    investors: [
      {
        id:1,
        name: 'Peter Emmanuel Whyte',
        email: 'peteremmanuelwhyte@gmail.com',
        phone: '08108139758',
        numberOfInvestments: 7

    },
    {
        id:2,
        name: 'Vonsokume Amodu',
        email: 'vonso@gmail.com',
        phone: '08108139758',
        numberOfInvestments: 7

    },
    {
        id:3,
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        phone: '08108139758',
        numberOfInvestments: 3

    },
    {
        id:4,
        name: 'Daniel Epiri',
        email: 'epiridaniel@gmail.com',
        phone: '08108139758',
        numberOfInvestments: 1

    },
    {
        id:5,
        name: 'Gracious Nicholas',
        email: 'nicholasgracious@gmail.com',
        phone: '08108139758',
        numberOfInvestments: 2

    },
    {
        id:6,
        name: 'Oletu Cornelius',
        email: 'badboyzgah@gmail.com',
        phone: '08108139758',
        numberOfInvestments: 2

    },
    ],

  },
  getters: {
   "Get_Investors"(state){
      if(state.investors !== null){
        return state.investors
      }else {
        return []
      }
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
