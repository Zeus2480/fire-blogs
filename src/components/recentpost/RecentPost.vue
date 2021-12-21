<template>
<div class="recent-posts" ref="someName">
    <h1 class="font-bold text-5xl mt-40 mb-10 ">Content</h1>
    <div class="post flex flex-col shadow-xl">
        <recent-post-list></recent-post-list>
        <recent-post-list></recent-post-list>
    </div>
</div>
</template>
<script>
import RecentPostList from '../recentpost/RecentPostList.vue'
export default {
    components:{
        RecentPostList
    }
}
</script>
<style scoped>
.recent-posts{
    min-height:100vh ;
}
</style>