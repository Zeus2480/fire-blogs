<template>
   <div class="card">
      <div
         class="max-w-sm rounded overflow-hidden height shadow-lg mainn flex flex-col justify-evenly"
         @click="open"
      >
         <div class="img">
            <img
               class="w-full h-60 bg-cover bg-center"
               :src="imageUrl"
               alt="Sunset in the mountains"
            />
         </div>
         <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2">{{ name }}</div>
            <p
               class="text-gray-700 text-base paragraph-contain overflow-hidden"
            >
               {{ excerpt }}
            </p>
         </div>

         <div class="but my-4 flex justify-center">
            <router-link class="mx-2 btn" :to="viewPostButton"
               >View</router-link
            >
            <button v-show="mypost" @click="deletePost" class="mx-3 btn">
               Delete
            </button>
            <router-link
               :to="{
                  name: 'edit',
                  params: {
                     title: name,
                     content: body,
                     excerpt: excerpt,
                     id: id,
                  },
               }"
               v-show="mypost"
               class="mx-2 btn"
               >Edit</router-link
            >
         </div>
      </div>
   </div>
</template>
<script>
import axios from "axios";
export default {
   props: ["body", "id", "name", "excerpt", "tags", "image", "mypost"],
   data() {
      return {
       
      };
   },
   computed: {
      viewPostButton() {
         return `/post/${this.id}`;
      },
      imageUrl() {
         return `http://localhost/fireblogs-api/public/images/${this.image}`;
      },
   },
   methods: {
      open(){
         this.$router.push(this.viewPostButton)
      },
      deletePost() {
         axios
            .delete(`http://127.0.0.1:8000/api/post/${this.id}/delete`)
            .then((res) => {
               console.log(res);
               this.$emit("delete-post", this.id);
            })
            .catch((err) => {
               console.log(err);
            });
         console.log(this.id);
      },
   },
};
</script>
<style scoped>
.btn {
   background-color: #000;
   color: #fff700;
   padding: 0.2rem 0.5rem;
   border-radius: 10px;
}
.btn:hover {
   background-color: rgb(39, 39, 39);
}
.height {
   height: 28rem;
}
.paragraph-contain {
   max-height: 4.25rem;
}
</style>
