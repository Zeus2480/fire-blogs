<template>
  <div class="contain">
      <ul>

    <div class="cards grid grid-cols-1  gap-10  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:mx-6" >
      <base-cards v-for="(blog,index) in recentBlogs" :key="index"
            :body="blog.body"
            :id="blog.id"
            :name="blog.name"
            :excerpt="blog.excerpt"
            :tags="blog.tags"
            :image='blog.image_path'
            mypost:false></base-cards>
    </div>
      </ul>
  </div>
</template>
<script>
import BaseCards from '../../components/Cards/baseCards.vue'

export default {
  props:['recentBlogs'],
    components:{
        'base-cards':BaseCards
    },
    methods:{
      show(){
        console.log(this.recentBlogs)
      }
    }
}
</script>
<style scoped>
/* .container {
  height: 100vh;
} */
</style>
