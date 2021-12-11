<template>

    <div class="create-post">
        <div class="container">
            <div :class="{invisible: !error}" class="err-message">
                <p><span>Error:</span>{{this.errorMsg}}</p>
            </div>
            <div class="blog-info">
                <input type="text" placeholder="Enter Blog Title" v-model="blogTitle">
                <div class="upload-file">
                    <label for="blog-photo">Upload Cover Photo</label>
                    <input type="file" ref="blogPhoto" @change="onFileSelected" id='blog-photo' accept=".png, .jpg, .jpeg">
                    <button class="preview" :class="{'button-inactive':!this.blogPhotoFileURL}">Preview Photo</button>
                    <span>File Chosen: {{this.blogPhotoName}}</span>
                </div>
                
            </div>
            <div class="editor">
                <vue-editor :editorOptions="editorSettings" v-model="this.blogHTML" useCustomImageHandler ></vue-editor>
            </div>
            <div class="blog-actions">
                <button>Create</button>
                <router-link class="router-button" to="#">Post Preview</router-link>
            </div>
        </div>
    </div>
</template>
<script>
 import Quill from 'quill';
 window.Quill=Quill;
 const ImageResize=require("quill-image-resize-module").default;
 Quill.register("module/imageResize",ImageResize);
export default {
    data(){
        return{
            blogHTML:'',
            blogTitle:'',
            blogPhotoName:'',
            blogPhotoFileURL:null,
            blogPhotoPreview:null,
            error:null,
            errorMsg:null,
            selectedFile:null,
            editorSettings:{
                modules:{
                    imageResize:{},
                }
            }

        }

    },
    methods:{
        onFileSelected(event){
            this.selectedFile=event.target.files[0];
            console.log(this.selectedFile);
        }
    }
    
}
</script>
<!--
<style scoped>
// .create-post{
//     position: relative;
//     height: 100%;
//     button{
//         margin-top: 0;
//     }
//     .router-button{
//         transition: 500ms ease-in-out all;
//         align-self: center;
//         font-size: 15px;
//         cursor: pointer;
//         border-radius: 20px;
//         padding: 12px 24px;
//         color: #fff;
//         background-color: #303030;
//         text-decoration: none;

//         &:hover{
//             background-color: rgba(48,48,48,0.7);
//         }
//     }
//     .container{
//         position: relative;
//         height: 100%;
//         padding: 10px 25px 60px;
//     }

//     //error styling
//     .invisible{
//         opacity: 0 !important;
//     }
//     .err-message{
//         width: 100%;
//         padding: 12px;
//         border-radius: 8px;
//         color: #fff;
//         margin-bottom:10px;
//         opacity: 1;
//         background-color:#303030;
//         transition:0.5s ease all ;
//         p{
//             font-size: 14px;
//         }
//         span{
//             font-weight: 600;
//         }
//     }
//     .blog-info{
//         display: flex;
//         margin-bottom: 32px;
//         input:nth-child(1){
//             min-width: 300px;
//         }
//         input{
//             transition: .5s ease-in-out all;
//             padding: 10px 4px;
//             border: none;
//             border-bottom: 1px solid #303030;
//     }
// }}
</style> -->