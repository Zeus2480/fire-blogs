<template>
    <div class="flex justify-end mr-20 mt-10">
    <div class="flex border-2 rounded">
        <input type="text" class="px-4 py-2 w-80" placeholder="Search..." v-model="searchQuery">
        <button class="flex items-center justify-center px-4 border-l" @click="search">
            <svg class="w-6 h-6 text-gray-600" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24">
                <path
                    d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
            </svg>
        </button>
    </div>
</div>
</template>
<script>
import axios from 'axios'
export default {
    data(){
        return{
            searchQuery:''
        }
    },
    methods:{
        search(){
            axios.get('http://127.0.0.1:8000/api/search',{
                query:this.searchQuery
            }).then(res=>{
                console.log(res);
            }).catch(err=>{
                console.log(err);
            })
        }
    }
}
</script>