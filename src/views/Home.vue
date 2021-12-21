<template>
   <div>
      <the-nav :userLoggedIn="userLoggedIn" :userName="userName"></the-nav>
      <home-page></home-page>
      <recent-posts></recent-posts>
      <div class="contain my-10">
         <ul>
            <div
               class="cards grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:mx-10"
            >
               <base-cards
                  v-for="(blog, index) in recentBlogs"
                  :key="index"
                  :body="blog.body"
                  :id="blog.id"
                  :name="blog.name"
                  :excerpt="blog.excerpt"
                  :tags="blog.tags"
                  :image="blog.image_path"
                  :mypost="false"
               ></base-cards>
            </div>
         </ul>
      </div>
      <the-footer></the-footer>
   </div>
</template>

<script>
import TheNav from "../components/nav/TheNav.vue";
import HomePage from "../components/Home/HomePage.vue";
import RecentPosts from "../components/recentpost/RecentPost.vue";
// import BottomCards from "../components/Home/BottomCards.vue";
import TheFooter from "../components/Footer/TheFooter.vue";
import BaseCards from "../components/Cards/baseCards.vue";
import axios from "axios";
//  console.log(localStorage.getItem('token'));
export default {
   computed: {
      recentBlogsList() {
         return this.recentBlogs;
      },
   },

   data() {
      return {
         userLoggedIn: false,
         userName: "",
         recentBlogs: [],
      };
   },
   created() {
      console.log(localStorage.getItem("token"));
      //getting profile
      this.getProfile();
      //getting post
      this.fourPost();
   },
   watch: {
      recentBlogs(newValue) {
         this.recentBlogs = newValue;
      },
   },
   methods: {
      fourPost() {
         axios.get("http://127.0.0.1:8000/api/post").then((res) => {
            // console.log(res)
            for (var i = 0; i < 4; i++) {
               this.recentBlogs[i] = res.data[i];
            }
            console.log(this.recentBlogs);
         });
      },
      getProfile() {
         if (localStorage.getItem("token") !== null) {
            axios
               .post(
                  "http://127.0.0.1:8000/api/profile",
                  {},
                  { 
                     headers: {
                        Authorization:
                           "Bearer " + localStorage.getItem("token"),
                     },
                  }
               )
               .then((res) => {
                  // console.log(res);
                  this.userLoggedIn = true;
                  // console.log(res.data.name);
                  this.userName = res.data.name;
               })
               .catch((err) => {
                  console.log(err);
               });
         }
      },
   },
   name: "Home",
   components: {
      TheNav,
      HomePage,
      RecentPosts,
      // BottomCards,
      TheFooter,
      BaseCards,
   },
};
</script>
