import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userName:'',
    fourPostsArray:[],
    allBlogsArray:[]
  },
  mutations: {
    setUserName(state,payload){
      state.userName=payload.userName;
    },
    setFourPostsArray(state,payload){
      state.fourPostsArray=payload.fourPostsArray
    },
    setAllBlogsArray(state,payload){
      state.setAllBlogsArray=payload.allBlogsArray;
    }
  },
  actions: {
    setUserName(context,payload){
      context.commit('setUserName',payload)
    },
    setFourPostsArray(context,payload){
      context.commit('setFourPostsArray',payload)
    },
    setAllBlogsArray(context,payload){
      context.commit('setAllBlogsArray',payload)
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
    },
    allBlogsArray(state){
      return state.allBlogsArray;
    }
  }
})
