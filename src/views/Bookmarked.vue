<template>
  <div>
    <the-nav :userLoggedIn="userLoggedIn" :userName="userName"></the-nav>
    <div class="header w-full ">
      <h1 class="text-black font-bold mt-4  text-center text-4xl py-2">Favrouites</h1>
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

export default {
  data() {
    return {
      bookmarkedList: [],
      allPost: [],
      userName:'',
      userLoggedIn:null
    };
  },
 

  created() {
    this.getBookmarks();
    this.getProfile();
  },
  methods:{
    getProfile() {
         if (this.$store.getters.userName === "") {
            axios
               .post(
                  "/profile",
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
                  this.$store.dispatch("setUserName", {
                     userName: this.userName,
                  });
               })
               .catch((err) => {
                  console.log(err);
               });
         } else {
            this.userName = this.$store.getters.userName;
            this.userLoggedIn = true;
         }
      },
    getBookmarks(){
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
    }
  }
};
</script>
