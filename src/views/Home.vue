<template>
  <div>
    <the-nav :userLoggedIn="userLoggedIn" :userName="userName"></the-nav>
    <home-page></home-page>
    <recent-posts></recent-posts>
    <bottom-cards></bottom-cards>
    <the-footer></the-footer>
  </div>
</template>

<script>
import TheNav from '../components/nav/TheNav.vue'
import HomePage from '../components/Home/HomePage.vue'
import RecentPosts from '../components/recentpost/RecentPost.vue'
import BottomCards from '../components/Home/BottomCards.vue'
import TheFooter from '../components/Footer/TheFooter.vue'
import axios from 'axios'
console.log(localStorage.getItem('token'));
export default {
  data(){
    return{
      userLoggedIn:false,
      userName:''
    }
  },
  created(){
    axios.post('http://127.0.0.1:8000/api/profile',{},{
      headers:{
        Authorization:'Bearer '+localStorage.getItem('token')
      }
    }).then((res)=>{
      console.log(res);
      this.userLoggedIn=true;
      console.log(res.data.name);
      this.userName=res.data.name;
    }).catch((err)=>{
      console.log(err)
    });
  },
  name: 'Home',
  components:{
    TheNav,
    HomePage,
    RecentPosts,
    BottomCards,
    TheFooter
  }
}
</script>