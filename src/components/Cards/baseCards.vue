<template>
    <div class="card">
        <div class="max-w-sm rounded overflow-hidden shadow-lg mainn">
          <div class="img">
            <img
            class="w-full h-60"
            :src="imageUrl"
            alt="Sunset in the mountains"
          />
            </div>
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2">{{name}}</div>
            <p class="text-gray-700 text-base">
              {{excerpt}}
            </p>
          </div>
          <div class="px-6 pt-4 pb-2">
            <span
              class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
              >#photography</span
            >
            <span
              class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
              >#travel</span
            >
            <span
              class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
              >#winter</span
            >
          </div>
          <div class="but my-4 flex justify-center">
            <router-link class="mx-2 btn" :to="viewPostButton">View</router-link>
             <button v-show="mypost" @click="deletePost" class="mx-3 btn">Delete</button>
             <router-link :to="{ name:'edit',params:{
               title:name,
               content:body,
               excerpt:excerpt
             }}" title="tdsitle" content="codasdntent" excerpt="exdssadcerptt" v-show="mypost" class="mx-2 btn">Edit</router-link>
          </div>
         
        </div>
      </div>
</template>
<script>
import axios from 'axios'
export default {
  props:['body','id','name','excerpt','tags','image','mypost'],
  data(){
    return{
      title:this.name,
      content:this.body,
      excerptt:this.excerpt
    }
  },
  computed:{
    viewPostButton(){
      return `/post/${this.id}`
    },
    imageUrl(){
      return `http://localhost/fireblogs-api/public/images/${this.image}`
    }
  },
  methods:{
    deletePost(){
      axios.delete(`http://127.0.0.1:8000/api/post/${this.id}/delete`).then(res=>{
        console.log(res)
      }).catch(err=>{
        console.log(err)
      })
      console.log(this.id);
    }
  }
}
</script>
<style scoped>
.btn{
  background-color: #000;
  color: #fff700;
  padding: .2rem .5rem;
  border-radius: 10px;
}
.btn:hover{
  background-color: rgb(39, 39, 39);
}
</style>

