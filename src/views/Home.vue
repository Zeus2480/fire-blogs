<template>
   <div>
      <the-nav ></the-nav>
      <home-page></home-page>
      <recent-posts></recent-posts>
      <div class="contain my-10">
         <ul>
            <div
               class="cards grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:mx-10"
            >
               <base-cards
                  v-for="(blog, index) in recentBlogsList"
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

import HomePage from "../components/Home/HomePage.vue";
import RecentPosts from "../components/recentpost/RecentPost.vue";
// import BottomCards from "../components/Home/BottomCards.vue";
import TheFooter from "../components/Footer/TheFooter.vue";

import axios from "axios";
// import GetProfile from "../mixins/GetProfile"
//  console.log(localStorage.getItem('token'));
export default {
   // mixins:[GetProfile],
   computed: {
      recentBlogsList() {
         return this.$store.getters.fourPostsArray;
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
      this.fourPost();
      // this.getProfile();
      //getting post
   },
   watch: {
      recentBlogs(newValue) {
         this.recentBlogs = newValue;
      },
   },
   methods: {
      fourPost() {
         axios.get("/post").then((res) => {
            for (var i = 0; i < 4; i++) {
               this.recentBlogs[i] = res.data[i];
            }
            this.$store.dispatch("setFourPostsArray", {
               fourPostsArray: this.recentBlogs,
            });
         });
      },
      // getProfile() {
      //    if (this.$store.getters.userName === "") {
      //       axios
      //          .post(
      //             "/profile",
      //             {},
      //             {
      //                headers: {
      //                   Authorization:
      //                      "Bearer " + localStorage.getItem("token"),
      //                },
      //             }
      //          )
      //          .then((res) => {
      //             console.log(res);
      //             this.userLoggedIn = true;
      //             console.log(res.data.name);
      //             this.userName = res.data.name;
      //             this.$store.dispatch("setUserName", {
      //                userName: this.userName,
      //             });
      //          })
      //          .catch((err) => {
      //             console.log(err);
      //          });
      //    } else {
      //       this.userName = this.$store.getters.userName;
      //       this.userLoggedIn = true;
      //    }
      // },
   },
   name: "Home",
   components: {
      
      HomePage,
      RecentPosts,
      // BottomCards,
      TheFooter,
     
   },
};
</script>
