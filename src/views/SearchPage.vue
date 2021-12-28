<template>
  <div>
    <the-nav :userLoggedIn="userLoggedIn" :userName="userName"></the-nav>
    <div class="header w-full ">
      <h1 class="text-black font-bold text-center text-4xl py-5">Search Results</h1>
    </div>
    <div v-show="noPost" class="div flex flex-col content-center justify-center">
      <h2 class="my-50 font-semibold text-2xl">No Results Found....</h2>
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
import GetProfile from "../mixins/GetProfile"
export default {
  mixins:[GetProfile],
    data(){
        return{
            searchResults:[],
            noPost:false,
            userName:'',
            userLoggedIn:null
        }
    },
  
  props: ["searchQuery"],
  created() {
    this.getSearchResults();
  },
  methods:{
    // getProfile() {
    //      if (this.$store.getters.userName === "") {
    //         axios
    //            .post(
    //               "/profile",
    //               {},
    //               {
    //                  headers: {
    //                     Authorization:
    //                        "Bearer " + localStorage.getItem("token"),
    //                  },
    //               }
    //            )
    //            .then((res) => {
    //               // console.log(res);
    //               this.userLoggedIn = true;
    //               // console.log(res.data.name);
    //               this.userName = res.data.name;
    //               this.$store.dispatch("setUserName", {
    //                  userName: this.userName,
    //               });
    //            })
    //            .catch((err) => {
    //               console.log(err);
    //            });
    //      } else {
    //         this.userName = this.$store.getters.userName;
    //         this.userLoggedIn = true;
    //      }
    //   },
    getSearchResults(){
      axios
      .post("/search", {
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
    }
  }
};
</script>
<style scoped>
.div{
  height: 70vh;
}
</style>
