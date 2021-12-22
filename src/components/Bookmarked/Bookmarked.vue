<template>
  <div>
    <div class="header w-full bg-black">
      <h1 class="yellow-text text-center text-4xl py-5">Favrouites</h1>
    </div>
    <div
      class="allblogs cards grid grid-cols-1 mx-6 my-4 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:mx-20 xl:my-20"
    >
      <base-cards
        v-for="(blog, index) in bookmarkedList"
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
</template>
<script>
import axios from "axios";
import BaseCards from "../Cards/baseCards.vue";
export default {
  data() {
    return {
      bookmarkedList: [],
      allPost: [],
    };
  },
  components: {
    BaseCards,
  },

  created() {
    axios.get("/post").then((res) => {
      this.allPost = res.data;
    //   console.log(this.allPost)
      axios
        .get("/bookmark", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
        //   console.log( res.data);
          for(var i=0;i<res.data.length;i++){
            //   console.log(res.data[i].postid)
              this.bookmarkedList.push(...this.allPost.filter(val=>val.id===res.data[i].post_id));
          }
        //   console.log(this.bookmarkedList)

        });
    });
  },
};
</script>
