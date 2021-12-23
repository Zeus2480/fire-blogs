import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userName:'',
    fourPostsArray:[]
  },
  mutations: {
    setUserName(state,payload){
      state.userName=payload.userName;
    },
    setFourPostsArray(state,payload){
      state.fourPostsArray=payload.fourPostsArray
    }
  },
  actions: {
    setUserName(context,payload){
      context.commit('setUserName',payload)
    },
    setFourPostsArray(context,payload){
      context.commit('setFourPostsArray',payload)
    }
  },
  modules: {
  },
  getters:{
    userName(state){
      return state.userName;
    },
    fourPostsArray(state){
      return state.fourPostsArray;
    }
  }
})
