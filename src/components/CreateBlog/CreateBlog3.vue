<template>
    <div class="blog-post-creator">
        <div class="post-inputs">
            <div class="title-input">
                <error>Title is necessary</error>
                <label for="title">Title</label>
                <input type="text" id="title" v-model="title"  placeholder="Title">
                <button >Image Upload</button>
            </div>
            <div class="image-input">
                <error>Post must have an image</error>
                <input type="file" @change="onFileSelected" accept=".png, .jpg, .jpeg" >
            </div>
        </div>
        <quill-editor
        v-model="content"
        ref="myQuillEditor"
        :options="editorOption"
        />
        <button @click="submit">Submit</button>
    </div>
</template>
<script>
import 'quill/dist/quill.snow.css'
import { quillEditor} from 'vue-quill-editor'

import error from './Errors.vue'
export default {
    components:{
        quillEditor,
        error
    },
    data(){
        return{
            content:'',
            title:'',
            imageUrl:'',
            editorOption:{
                
                placeholder:'Type your post.....',
                readOnly:true,
                theme:'snow'
            },
            delta:undefined
        }
    },
    watch:{
        content(){
            this.delta=this.$refs.myQuillEditor.quill.getContents()
        }
    },
    methods:{
        onFileSelected(event){
            console.log(event)
            // console.log(event.target.files[0]);
        },
        submit(){
            const data={
                title:this.title,
                imageUrl:this.imageUrl,
                body:this.delta
            }
            console.log(data)
        }
    }
}
</script>
<style>
.ql-editor{
    height: 70vh;
}
</style>