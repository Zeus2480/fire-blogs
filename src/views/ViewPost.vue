<template>
   <div class="bg-color">
      <the-nav :userLoggedIn="userLoggedIn" :userName="userName"></the-nav>
      <div class="contain my-10 w-3/4 m-auto flex">
         <div class="w-full px-10 m-auto shadow-2xl">
            <div class="heading">
               <h1 class="font-bold text-4xl text-black my-8">{{ name }}</h1>
            </div>
            <div class="image rounded-lg w-3/4 m-auto">
               <img :src="imageUrl" class="rounded-lg px-8 my-10" alt="" />
            </div>
            <div class="body my-6">
               <p
                  class="px-10 text-left break-words overflow-hidden"
                  v-html="body"
               ></p>
            </div>
            <div class="bg-color bg-gray-200 py-4 mx-8 rounded-xl mb-8 m-auto">
               <div class="buton flex justify-between my-8">
                  <div class="like mx-10">
                     <button @click="like">
                        <img
                           src="../assets/logo/love.png"
                           alt=""
                           class="h-6"
                           v-show="!liked"
                        />
                     </button>
                     <button @click="like">
                        <img
                           src="../assets/logo/heart.png"
                           alt=""
                           class="h-6"
                           v-show="liked"
                        />
                     </button>
                     <p>{{ noOfLikes }}</p>
                  </div>
                  <div class="bookmark mx-10">
                     <button @click="bookmark">
                        <img
                           src="../assets/logo/bookmark.png"
                           alt=""
                           class="h-6"
                           v-show="!bookmarked"
                        />
                     </button>
                     <button @click="bookmark">
                        <img
                           src="../assets/logo/bookmark (1).png"
                           alt=""
                           class="h-6"
                           v-show="bookmarked"
                        />
                     </button>
                  </div>
               </div>
               <div class="comments">
                  <div class="add-comment flex justify-evenly items-center">
                     <textarea
                        name="comment"
                        id="comment"
                        cols="30"
                        rows="3"
                        placeholder="Type Your Comment"
                        class="border-solid border-2 w-full mx-8 border-black rounded-xl p-2"
                        v-model.trim="comment"
                     ></textarea>
                     <div class="but flex w-1/5">
                        <button class="comment-button" @click="postComment">
                           Comment
                        </button>
                     </div>
                  </div>
                  <div class="show-commentbox">
                     <h1 class="text-left font-semibold text-lg mx-8" v-show="showCommentsArray.length!==0">
                        Recent Comments
                     </h1>
                     <show-comment
                        v-for="(comment, index) in showCommentsArray"
                        :key="index"
                        :body="comment.body"
                     ></show-comment>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>
<script>
import axios from "axios";
import ShowComment from "../components/ViewPost/ShowComment.vue";
import GetProfile from "../mixins/GetProfile"

export default {
   mixins:[GetProfile],
   data() {
      return {
         liked: false,
         bookmarked: false,
         noOfLikes: null,
         body: "",
         excerpt: "",
         name: "",
         comment: "",
         commentIsValid: true,
         showCommentsArray: [],
         imagePath: "",
         userName: "",
         userLoggedIn: null,
      };
   },
   props: ["id"],
   components: {
      ShowComment,

   },
   created() {
      // console.log(this.id);
      // this.getProfile();
      this.getBlogData();
      //Get all comments
      this.getAllComments();
      //no of likes
      this.getNoOfLikes();
      //user liked or not
      this.userLikedOrNot();
      //bookmarked or not
      this.bookmarkedOrNOt();
   },
   computed: {
      imageUrl() {
         return `http://localhost/fireblogs-api/public/images/${this.imagePath}`;
      },
   },
   methods: {
      bookmarkedOrNOt() {
         axios
            .get(`/check/bookmark?post_id=${this.id}`, {
               headers: {
                  Authorization: "Bearer " + localStorage.getItem("token"),
               },
            })
            .then((res) => {
               if (res.data.is_bookmark === 1) {
                  this.bookmarked = true;
               } else {
                  this.bookmarked = false;
               }
            });
      },
      userLikedOrNot() {
         axios
            .get(`/liked/${this.id}`, {
               headers: {
                  Authorization: "Bearer " + localStorage.getItem("token"),
               },
            })
            .then((res) => {
               if (res.data.is_like === 1) {
                  this.liked = true;
               } else {
                  this.liked = false;
               }
            })
            .catch((err) => {
               console.log(err);
            });
      },
      getNoOfLikes() {
         axios
            .get(`/post/${this.id}/counts`)
            .then((res) => {
               this.noOfLikes = res.data.like;
            })
            .catch((err) => {
               console.log(err);
            });
      },
      getAllComments() {
         axios
            .get("/comments")
            .then((res) => {
               // console.log(res)
               this.showCommentsArray = res.data.filter(
                  (data) => data.post_id == this.id
               );
               console.log(this.showCommentsArray)
               //console.log(res.data);
               //   this.$route.push(`/post/${this.id}`)
            })
            .catch((err) => {
               console.log(err);
            });
      },
      getBlogData() {
         axios
            .get(`/post/${this.id}`)
            .then((res) => {
               this.imagePath = res.data.image_path;
               this.body = res.data.body;
               this.excerpt = res.data.excerpt;
               this.name = res.data.name;
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
      //             // console.log(res);
      //             this.userLoggedIn = true;
      //             // console.log(res.data.name);
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
      bookmark() {
         axios
            .post(
               `/post/${this.id}/bookmark?post_id=${this.id}`,
               {},
               {
                  headers: {
                     Authorization: "Bearer " + localStorage.getItem("token"),
                  },
               }
            )
            .then((res) => {
               if (res.data.is_bookmark === 0) {
                  this.bookmarked = false;
               } else if (res.data.is_bookmark === 1) {
                  this.bookmarked = true;
               }
            })
            .catch((err) => {
               if (err.response.status === 401) {
                  this.$router.push("/login");
               }
            });
         this.bookmarked = !this.bookmarked;
      },

      like() {
         axios
            .post(
               `/post/${this.id}/likes`,
               {},
               {
                  headers: {
                     Authorization: "Bearer " + localStorage.getItem("token"),
                  },
               }
            )
            .then((res) => {
               console.log(res.data.like);
               if (res.data.like === 0) {
                  this.liked = false;
                  this.noOfLikes--;
               } else if (res.data.like === 1) {
                  this.liked = true;
                  this.noOfLikes++;
               }
            })
            .catch((err) => {
               console.log(err.response);
               if (err.response.status === 401) {
                  this.$router.push("/login");
               }
            });

         //getting no of likes after like function executed
         // axios
         //   .get(`http://127.0.0.1:8000/api/post/${this.id}/counts`)
         //   .then((res) => {
         //     this.noOfLikes = res.data.like;
         //   })
         //   .catch((err) => {
         //     console.log(err);
         //   });
      },
      postComment() {
         this.commentIsValid = true;
         if (this.comment === "") {
            this.commentIsValid = false;
            return;
         }
         axios
            .post(
               `/post/${this.id}/comments`,
               {
                  body: this.comment,
               },
               {
                  headers: {
                     Authorization: "Bearer " + localStorage.getItem("token"),
                  },
               }
            )
            .then((res) => {
               this.showCommentsArray.push(res.data);
               this.comment = "";
            })
            .catch((err) => {
               console.log(err);
            });
      },
   },
};
</script>
<style scoped>
.add-comment {
   margin-bottom: 2rem;
}
.comment-button {
   background-color: #10131d;
   color: #fff;
   margin: 1rem 0;
   padding: 0.4rem 0.6rem;
   border-radius: 15px;
}
.show-comment-box {
   background-color: #fff;
}
</style>
