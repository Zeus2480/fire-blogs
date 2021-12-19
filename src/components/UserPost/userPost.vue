<template>
  <div class="contain">
    <div class="header w-full bg-black">
      <h1 class="yellow-text text-center text-4xl py-5">My Blogs</h1>
    </div>
    <div class="user-no-post flex flex-col justify-center items-center" v-if="userBlogs.length===0">
      <h1 class="text-xl block">You don't have any Post...</h1>
      <div class="router-link my-6">
      <router-link to="/create" class="create-post-btn">Create Post</router-link>
      </div>
    </div>
    <div class="back-color bg-gray-200" v-if="userBlogs.length">
      <div
        class="user-blogs grid grid-cols-1 mx-6 pt-5 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:mx-20 py-8"
      >
        <base-cards
          class="mx-4"
          v-for="(blog, index) in blogsList"
          :key="index"
          :body="blog.body"
          :id="blog.id"
          :name="blog.name"
          :excerpt="blog.excerpt"
          :tags="blog.tags"
          :image="blog.image_path"
          mypost="true"
        ></base-cards>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import BaseCards from "../Cards/baseCards.vue";
export default {
  components: {
    BaseCards,
  },
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
        "http://127.0.0.1:8000/api/profile",
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
          .get("http://127.0.0.1:8000/api/post")
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
};
</script>
<style scoped>
.yellow-text {
  color: #fff700;
}
.user-no-post{
    height: 80vh;
}
.create-post-btn{
    background-color: #000;
    color: #fff700;
    padding: 0.5rem .5rem;
    border-radius: 10px;
}
</style>
