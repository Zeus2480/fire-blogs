<template>
  <div>
    <div class="header w-full bg-black">
      <h1 class="yellow-text text-center text-4xl py-5">Search Results</h1>
    </div>
    <div v-show="noPost" class="div flex flex-col content-center justify-center">
      <h2 class="my-50 font-bold text-3xl">No Results Found....</h2>
    </div>
    <div v-show="!noPost"
      class="user-blogs grid grid-cols-1 mx-6 pt-5 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:mx-20 py-8"
    >
      <base-cards
        class="mx-4"
        v-for="(blog, index) in searchResults"
        :key="index"
        :body="blog.body"
        :id="blog.id"
        :name="blog.name"
        :excerpt="blog.excerpt"
        :tags="blog.tags"
        :image="blog.image_path"
        :mypost=false
      ></base-cards>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import BaseCards from "../Cards/baseCards.vue";
export default {
    data(){
        return{
            searchResults:[],
            noPost:false
        }
    },
  components: {
    BaseCards,
    
  },
  props: ["searchQuery"],
  created() {
    axios
      .post("http://127.0.0.1:8000/api/search", {
        query: this.searchQuery,
      })
      .then((res) => {
        this.searchResults=res.data;
        if(this.searchResults.length===0){
          this.noPost=true
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
<style scoped>
.div{
  height: 90vh;
}
</style>
