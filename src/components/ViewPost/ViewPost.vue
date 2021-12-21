<template>
   <div class="bg-color">
      <div class="contain my-8 flex">
         <div class="center-container w-full max-w-xl m-auto shadow-2xl">
            <div class="heading">
               <h1 class="font-bold text-4xl my-8">{{ name }}</h1>
            </div>
            <div class="image rounded-lg">
               <img :src="imageUrl" class="rounded-lg px-8 my-10" alt="" />
            </div>
            <div class="body my-6">
               <p
                  class="px-10 text-left break-words overflow-hidden"
                  v-html="body"
               ></p>
            </div>
            <div class="bg-color bg-gray-200 py-4">
               <div class="buton flex justify-between my-8">
                  <div class="like mx-8">
                     <button @click="like">
                        <img
                           src="../../assets/logo/love.png"
                           alt=""
                           class="h-6"
                           v-show="!liked"
                        />
                     </button>
                     <button @click="like">
                        <img
                           src="../../assets/logo/heart.png"
                           alt=""
                           class="h-6"
                           v-show="liked"
                        />
                     </button>
                     <p>{{ noOfLikes }}</p>
                  </div>
                  <div class="bookmark mx-8">
                     <button @click="bookmark">
                        <img
                           src="../../assets/logo/bookmark.png"
                           alt=""
                           class="h-6"
                           v-show="!bookmarked"
                        />
                     </button>
                     <button @click="bookmark">
                        <img
                           src="../../assets/logo/bookmark (1).png"
                           alt=""
                           class="h-6"
                           v-show="bookmarked"
                        />
                     </button>
                  </div>
               </div>
               <div class="comments">
                  <div class="add-comment flex justify-around">
                     <textarea
                        name="comment"
                        id="comment"
                        cols="30"
                        rows="3"
                        placeholder="Type Your Comment"
                        class="border-solid border-2 border-zinc-900"
                        v-model.trim="comment"
                     ></textarea>
                     <div class="but flrx justify-center align-middle">
                        <button @click="postComment">Comment</button>
                     </div>
                  </div>
                  <div class="show-comment">
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
import ShowComment from "../ViewPost/ShowComment.vue";
export default {
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
      };
   },
   props: ["id"],
   components: {
      ShowComment,
   },
   created() {
      // console.log(this.id);
      axios
         .get(`http://127.0.0.1:8000/api/post/${this.id}`)
         .then((res) => {
            this.imagePath = res.data.image_path;
            this.body = res.data.body;
            this.excerpt = res.data.excerpt;
            this.name = res.data.name;
         })
         .catch((err) => {
            console.log(err);
         });
      //Get all comments
      axios
         .get("http://127.0.0.1:8000/api/comments")
         .then((res) => {
            // console.log(res)
            this.showCommentsArray = res.data.filter(
               (data) => data.post_id == this.id
            );
            //console.log(res.data);
            //   this.$route.push(`/post/${this.id}`)
         })
         .catch((err) => {
            console.log(err);
         });
      //no of likes
      axios
         .get(`http://127.0.0.1:8000/api/post/${this.id}/counts`)
         .then((res) => {
            this.noOfLikes = res.data.like;
         })
         .catch((err) => {
            console.log(err);
         });
      //user liked or not
      axios
         .get(`http://127.0.0.1:8000/api/liked/${this.id}`, {
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
      //bookmarked or not
      axios
         .get(`http://127.0.0.1:8000/api/check/bookmark?post_id=${this.id}`, {
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
   computed: {
      imageUrl() {
         return `http://localhost/fireblogs-api/public/images/${this.imagePath}`;
      },
   },
   methods: {
      bookmark() {
         axios
            .post(
               `http://127.0.0.1:8000/api/post/${this.id}/bookmark?post_id=${this.id}`,
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
               `http://127.0.0.1:8000/api/post/${this.id}/likes`,
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
               `http://127.0.0.1:8000/api/post/${this.id}/comments`,
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
</style>
