<template>
  <div class="blog-post-creator">
    <div class="header w-full bg-black">
      <h1 class="yellow-text text-center text-4xl py-5">Edit Blog</h1>
    </div>
    <div class="post-inputs flex flex-col bg-gray-200">
      <div class="title-input flex justify-center my-4">
        <label for="title" class="mx-4">Title</label>
        <input
          type="text"
          id="title"
          class="shadow appearance-none border rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          v-model="title"
          placeholder="Title"
        />
      </div>
      <div class="excerpt-input flex justify-center mb-4">
        <label for="excerpt" class="mx-6">Summary</label>
        <textarea
          name="excerpt"
          id="excerpt"
          cols="30"
          rows="4"
          class="shadow appearance-none border rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Write a small summary for your blog..."
          v-model="excerpt"
        ></textarea>
      </div>
      <div class="image-input">
        <input
          type="file"
          @change="onFileSelected"
          accept=".png, .jpg, .jpeg"
          class="mb-4"
        />
      </div>
    </div>
    <vue-editor v-model="content" ref="myQuillEditor" />
    <button
      @click="submit"
      class="border-solid border-2 px-4 py-1 rounded-lg my-4 bg-slate- buttoncolor"
    >
      Submit
    </button>
  </div>
</template>
<script>
import { VueEditor } from "vue2-editor";

import axios from "axios";
export default {
  props: ["title", "content", "excerpt"],
  components: {
    VueEditor,
  },
  data() {
    return {
      selectedFile: "",

      editorOption: {
        placeholder: "Type your post.....",
        readOnly: true,
        theme: "snow",
      },
    };
  },

  methods: {
    console() {
      console.log(this.title);
      console.log(this.content);
      console.log(this.excerpt);
    },
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
        .post(`http://127.0.0.1:8000/api/post/create`, formData, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          if (res.request.status === 200) {
            this.$router.push("/post");
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
  color: #fff700;
}
.yellow-text {
  color: #fff700;
}
</style>
