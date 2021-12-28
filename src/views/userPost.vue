<template>
   <div class="contain">
      <the-nav ></the-nav>
      <div class="header w-full bg-gray-200 font-bold">
         <h1 class="text-black  text-center text-4xl py-5">My Blogs</h1>
      </div>
      <div
         class="user-no-post flex flex-col justify-center items-center"
         v-if="userBlogs.length === 0"
      >
         <h1 class="text-xl block">You don't have any Post...</h1>
         <div class="router-link my-6">
            <router-link to="/create" class="create-post-btn"
               >Create Post</router-link
            >
         </div>
      </div>
      <div class="back-color bg-gray-200" v-if="userBlogs.length">
         <div
            class="user-blogs grid grid-cols-1 mx-6 pt-5 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:mx-20 py-8"
         >
            <base-cards
               class="mx-4"
               v-for="(blog, index) in userBlogs"
               :key="index"
               :body="blog.body"
               :id="blog.id"
               :name="blog.name"
               :excerpt="blog.excerpt"
               :tags="blog.tags"
               :image="blog.image_path"
               mypost="true"
               @delete-post="deletePost"
            ></base-cards>
         </div>
      </div>
   </div>
</template>
<script>
import axios from "axios";
// import GetProfile from "../mixins/GetProfile"

export default {
   // mixins:[GetProfile],
  data() {
    return {
      id: "",
      blogsList: [],
      userBlogs: [],
    };
  },
  created() {
    //Getting user id
    axios
      .post(
        "/profile",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        this.id = res.data.id;
        axios
          .get("/post")
          .then((res) => {
            this.blogsList = res.data;
            this.userBlogs = this.blogsList.filter(
              (blog) => blog.user_id === this.id
            );
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
    //getting all post
  },
  methods:{
    deletePost(id){
      // console.log(id)
      // console.log(this.userBlogs[0].id)
      this.userBlogs=this.userBlogs.filter(value=>value.id!==id)
      // console.log(this.userBlogs);
    },
   //  getProfile() {
   //       if (this.$store.getters.userName === "") {
   //          axios
   //             .post(
   //                "/profile",
   //                {},
   //                {
   //                   headers: {
   //                      Authorization:
   //                         "Bearer " + localStorage.getItem("token"),
   //                   },
   //                }
   //             )
   //             .then((res) => {
   //                console.log(res);
   //                this.userLoggedIn = true;
   //                console.log(res.data.name);
   //                this.userName = res.data.name;
   //                this.$store.dispatch("setUserName", {
   //                   userName: this.userName,
   //                });
                  
   //             })
   //             .catch((err) => {
   //                console.log(err);
   //             });
   //       } else {
   //          this.userName = this.$store.getters.userName;
   //          this.userLoggedIn = true;
   //       }
   //    },
  },
  // watch:{
  //   userBlogs(newValue){
  //     this.userBlogs=newValue;
  //   }
  // }
};
</script>
<style scoped>
.yellow-text {
   color: #fff700;
}
.user-no-post {
   height: 80vh;
}
.create-post-btn {
   background-color: #000;
   color: #fff700;
   padding: 0.5rem 0.5rem;
   border-radius: 10px;
}
</style>
