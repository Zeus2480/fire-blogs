<template>
  <div class="contain flex">
    <div class="center-container w-full max-w-xl m-auto shadow-2xl">
      <div class="heading">
        <h1 class="font-bold text-6xl my-8">{{ name }}</h1>
      </div>
      <div class="image">
        <img
          src="../../assets/images/pexels-jacub-gomez-1142941.jpg"
          class="rounded-lg px-8 my-10"
          alt=""
        />
      </div>
      <div class="body">
        <p class="px-10">{{ body }}</p>
      </div>
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
          <p>{{like}</p>
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
</template>
<script>
import axios from "axios";
import ShowComment from "../ViewPost/ShowComment.vue";
export default {
  data() {
    return {
      liked: false,
      bookmarked: false,
      body: "",
      excerpt: "",
      name: "",
      comment: "",
      commentIsValid: true,
      showCommentsArray: [],
    };
  },
  props: ["id"],
  components: {
    ShowComment,
  },
  created() {
    axios
      .get(`http://127.0.0.1:8000/api/post/${this.id}`)
      .then((res) => {
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
        this.showCommentsArray = res.data;
        console.log(res.data);
        //   this.$route.push(`/post/${this.id}`)
      })
      .catch((err) => {
        console.log(err);
      });
    //likes
   
  },
  methods: {
    bookmark() {
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
          console.log(res.data.like)
        if(res.data.like===0){
            this.liked=false
        }
        else if(res.data.like===1){
            this.liked=true
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
            this.comment=""
            
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style scoped></style>
