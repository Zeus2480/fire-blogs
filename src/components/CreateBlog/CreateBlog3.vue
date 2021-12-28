<template>
   <div class="blog-post-creator">
      <the-nav :userLoggedIn="userLoggedIn" :userName="userName"></the-nav>
      <div class="header w-full mt-2">
         <h1 class="text-black text-center text-3xl  font-bold mt-4">Create Blog</h1>
      </div>
      <div class="card w-3/4 m-auto mt-6 bg-gray-200">
         <div class="div  w-5/6 m-auto">
            <div class="post-inputs flex flex-col pt-5 pl-10">
               <div class="title-input flex flex-col mt-2">
                  <label
                     for="title"
                     class="text-left font-semibold mb-2 text-black"
                     >Title</label
                  >
                  <input
                     type="text"
                     id="title"
                     class="shadow appearance-none border rounded py-2 px-3 text-gray-700 w-full mb-3 leading-tight focus:outline-none focus:shadow-outline"
                     v-model="title"
                     placeholder="Title"
                  />
               </div>
               <div class="excerpt-input flex flex-col mb-2">
                  <label
                     for="excerpt"
                     class="mb-2 text-left font-semibold text-black"
                     >Summary</label
                  >
                  <textarea
                     name="excerpt"
                     id="excerpt"
                     cols="30"
                     rows="1"
                     class="shadow appearance-none border rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                     placeholder="Write a small summary for your blog..."
                     v-model="excerpt"
                  ></textarea>
               </div>
               <div class="image-input flex">
                  <label
                     for="imageInput"
                     class="mb-4 text-left font-semibold text-black mr-8 "
                     >Banner</label
                  >
                  <input
                     name="imageInput"
                     type="file"
                     @change="onFileSelected"
                     accept=".png, .jpg, .jpeg"
                     class="mb-4"
                  />
               </div>
            </div>
            <div class="editor ml-10 bg-white">
               <vue-editor  v-model="content" ref="myQuillEditor" />
            </div>
            <div class="button flex justify-end">
               <button
                  @click="submit"
                  class="border-solid border-2 px-4 py-1 rounded-lg my-4 bg-slate- buttoncolor "
               >
                  Submit
               </button>
            </div>
         </div>
      </div>
   </div>
</template>
<script>
import { VueEditor } from "vue2-editor";
import TheNav from "../nav/TheNav.vue";

import axios from "axios";
export default {
   components: {
      VueEditor,
      TheNav,
   },
   created(){
     this.getProfile()
   },
   data() {
      return {
         userName: "",
         userLoggedIn: null,
         content: "",
         title: "",
         selectedFile: "",
         excerpt: "",
         imageUrl: "",
         editorOption: {
            placeholder: "Type your post.....",
            readOnly: true,
            theme: "snow",
         },
         delta: undefined,
      };
   },
   // watch: {
   //    content() {
   //       this.delta = this.$refs.myQuillEditor.quill.getContents();
   //    },
   // },
   methods: {
      onFileSelected(event) {
         console.log(event);
         // console.log(event.target.files[0]);
         this.selectedFile = event.target.files[0];
         console.log(this.selectedFile);
      },
      submit() {
         const formData = new FormData();
         formData.append("image", this.selectedFile);
         formData.append("name", this.title);
         formData.append("body", this.content);
         formData.append("excerpt", this.excerpt);
         formData.append("tags", "#test");
         // const data={
         //     title:this.title,
         //     imageUrl:this.imageUrl,
         //     body:this.delta
         // }
         axios
            .post(`/post/create`, formData, {
               headers: {
                  Authorization: "Bearer " + localStorage.getItem("token"),
               },
            })
            .then((res) => {
               if (res.request.status === 200) {
                  this.$router.push("/post");
               }
            }).catch(err=>console.log(err));
      },


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
                  console.log(res);
                  this.userLoggedIn = true;
                  console.log(res.data.name);
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
   },
};
</script>
<style>
.card {
   box-shadow: 10px 10px 40px 1px rgba(0, 0, 0, 0.37);
   -webkit-box-shadow: 10px 10px 40px 1px rgba(0, 0, 0, 0.37);
   -moz-box-shadow: 10px 10px 40px 1px rgba(0, 0, 0, 0.37);
}
.ql-editor {
   height: 70vh;
}
.buttoncolor {
   background-color: #10131d;
   color: #fff700;
}
.yellow-text {
   color: #fff700;
}
input[type=file]::file-selector-button {
  padding: .2em .4em;
  border-radius: 10px;
  border: none;
  background-color: #10131d;
  color: #fff;
  transition: 1s;
}
</style>
