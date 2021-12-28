<template>
   <div class="blog-post-creator">
      <the-nav></the-nav>
      <div class="header w-full mt-2">
         <h1 class="text-black text-center text-3xl font-bold mt-4">
            Edit Blog
         </h1>
      </div>
      <div class="card w-3/4 m-auto mt-6 bg-gray-200">
      <preview-image :image="image" v-show="showModal" @close-modal="closeModal"></preview-image>
         <div class="div w-5/6 m-auto">
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
               <div class="image-input flex ">
                  <label
                     for="imageInput"
                     class="mb-4 text-left font-semibold text-black mr-8"
                     >Banner</label
                  >
                  <button @click="preview" class="preview-button" >Preview</button>
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
               <vue-editor v-model="content" ref="myQuillEditor" />
            </div>
            <div class="button flex justify-end">
               <button
                  @click="update"
                  class="border-solid border-2 px-4 py-1 rounded-lg my-4 bg-slate- buttoncolor"
               >
                  Update
               </button>
            </div>
         </div>
      </div>
   </div>
</template>
<script>
import { VueEditor } from "vue2-editor";
import axios from "axios";
import PreviewImage from "../components/UpdateBlog/PreviewImage.vue"
// import GetProfile from "../mixins/GetProfile"
export default {
   // mixins:[GetProfile],
   props: ["title", "content", "excerpt", "id",'image'],
   components: {
      VueEditor,
      PreviewImage,
    
   },
   data() {
      return {
         selectedFile: "",
        
        showModal:false,
         editorOption: {
            placeholder: "Type your post.....",
            readOnly: true,
            theme: "snow",
         },
      };
   },
  
   methods: {
      closeModal(value){
         // console.log(value)
         this.showModal=value;
      },

      preview(){
         this.showModal=true;
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
      onFileSelected(event) {
         // console.log(event);
         // console.log(event.target.files[0]);
         this.selectedFile = event.target.files[0];
         // console.log(this.selectedFile);
      },
      update() {
         // console.log(this.selectedFile);
         const formData = new FormData();
         if(this.selectedFile!==""){
            formData.append("image", this.selectedFile);
         }
         
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
            .post(
               `/post/${this.id}/update?name=updated&excerpt=updated&body=updated&image_path&tags`,
               formData,
               {
                  headers: {
                     Authorization: "Bearer " + localStorage.getItem("token"),
                  },
               }
            )
            .then((res) => {
               if (res.request.status === 200) {
                  this.$router.push("/userpost");
               }
            });
      },
   },
};
</script>
<style>
.ql-editor {
   height: 70vh;
}
.buttoncolor {
   background-color: #10131d;
   color: #fff;
}
.yellow-text {
   color: #fff700;
}
.preview-button{
   margin: 0rem .5rem;
   height: 2rem;
   padding: .2em .4em;
  border-radius: 10px;
  border: none;
  background-color: #10131d;
  color: #fff;
  transition: 1s;
}
</style>
