<template>
  <div>
    <the-nav></the-nav>
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
export default {
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