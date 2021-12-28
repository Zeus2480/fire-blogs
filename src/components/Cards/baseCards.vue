<template>
   <div class="card rounded-3xl ">
      <the-modal @user-button-result="checkDeleteStatus" v-show="showDeleteModal"></the-modal>
      <div
         class="max-w-sm rounded-3xl overflow-hidden height  mainn flex flex-col justify-evenly hover:cursor-pointer"
         
      >
         <div class="img my-2 rounded-xl h-40 relative overflow " @click="open">
            <img
               class="absolute block inset-0 w-full h-full m-auto object-cover ls-is-cached lazyloaded -z-50"
               :src="imageUrl"
               alt="Sunset in the mountains"
            />
         </div>
         <div class="px-6 py-4" @click="open">
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
            <button v-show="mypost" @click="showModal" class="mx-3 btn">
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
                     image:image
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
import TheModal from "../Modal/TheModal.vue"
export default {
   props: ["body", "id", "name", "excerpt", "tags", "image", "mypost"],
   components:{
      TheModal
   },
   data() {
      return {
       showDeleteModal:false
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
      showModal(){
         this.showDeleteModal=true;
      },
      checkDeleteStatus(status){
         this.showDeleteModal=false;
         if(status){
            this.deletePost();
         }
      },
      deletePost() {

         axios
            .delete(`/post/${this.id}/delete`)
            .then(() => {
               this.$emit("delete-post", this.id);
            })
            .catch((err) => {
               console.log(err);
            });
         // console.log(this.id);
      },
   },
};
</script>
<style scoped>
.mainn:hover{
   cursor: pointer;
}
.btn {
   background-color: #000;
   color: #fff;
   font-weight: 500;
   padding: 0.2rem 0.5rem;
   border-radius: 10px;
}
.btn:hover {
   background-color: rgb(56, 56, 56);
   transition: 0.3s;
   /* font-size: 1.1rem; */
   
}
.height {
   height: 28rem;
}
.paragraph-contain {
   max-height: 4.25rem;
}
</style>
