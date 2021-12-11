<template>
  <div class="contain">
    <the-nav :userLoggedIn="userLoggedIn" :userName="userName"></the-nav>
    <the-search></the-search>
    <ul>
      <div class="contain">
        <div class="allblogs cards grid grid-cols-1 mx-6 my-4 gap-10   sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:mx-20 xl:my-20">
            <base-cards v-for="(blog,index) in blogsList" :key="index"
            :body="blog.body"
            :id="blog.id"
            :name="blog.name"
            :excerpt="blog.excerpt"
            :tags="blog.tags"></base-cards>
        </div>
    </div>
    </ul>
  </div>
</template>
<script>
import TheNav from "../../components/nav/TheNav.vue";
import BaseCards from '../Cards/baseCards.vue'
import TheSearch from "../Search/TheSearch.vue";
import axios from "axios";
export default {
  data() {
    return {
      blogsList: [],
      userLoggedIn:false,
      userName:'',
      id:null,
      body:'',
      excerpt:'',
      tags:''

    };
  },
  components: {
    TheNav,
    BaseCards,
    TheSearch,
  },
  created() {
    axios
      .get("http://127.0.0.1:8000/api/post")
      .then((res) => {
        this.blogsList = res.data;
        console.log(this.blogsList);
      })
      .catch((err) => {
        console.log(err);
      });

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
        console.log(res);
        this.userLoggedIn = true;
        console.log(res.data.name);
        this.userName = res.data.name;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
