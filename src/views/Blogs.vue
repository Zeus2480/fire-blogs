<template>
   <div class="contain">
      <the-nav></the-nav>
      <the-search></the-search>
      <ul>
         <div class="contain">
            <div
               class="allblogs cards grid grid-cols-1 mx-6 my-4 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:mx-20 xl:my-20"
            >
               <base-cards
                  v-for="(blog, index) in blogsList"
                  :key="index"
                  :body="blog.body"
                  :id="blog.id"
                  :name="blog.name"
                  :excerpt="blog.excerpt"
                  :tags="blog.tags"
                  :image="blog.image_path"
                  mypost:false
               ></base-cards>
            </div>
         </div>
      </ul>
   </div>
</template>
<script>


import TheSearch from "../components/Search/TheSearch.vue";
import axios from "axios";
// import GetProfile from "../mixins/GetProfile"
export default {
   // mixins:[GetProfile],
   data() {
      return {
         blogsList: [],
         userLoggedIn: false,
         userName: "",
         id: null,
         body: "",
         excerpt: "",
         tags: "",
      };
   },
   components: {
     
      TheSearch,
   },
   created() {
      // console.log(this.$store.getters.userName);
      this.getAllPost()
      // this.getProfile();
   },
   methods: {
      getAllPost() {
         axios
            .get("/post")
            .then((res) => {
               // console.log(res);
               this.blogsList = res.data;
               // console.log(this.blogsList);
            })
            .catch((err) => {
               console.log(err);
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
};
</script>
