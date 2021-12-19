<template>
  <div class="contain min-w-fit">
    <div class="form">
      <div class="heading">
        <label for="heading">Heading</label>
        <input type="text" id="heading" />
      </div>
      <div class="articletext">
        <label for="body">Body</label>
        <textarea name="body" id="" cols="30" rows="10"></textarea>
      </div>
      <div class="imageupload">
        <input type="file" accept=".png, .jpg, .jpeg" @change="onFileSelected"/>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    data(){
        return{
            selectedFile:null
        }
    },
    methods:{
        onFileSelected(event){
            console.log(document.querySelector('#file'))
            this.selectedFile=event.target.files[0]
            console.log(this.selectedFile)
        }
    }
}
</script>
