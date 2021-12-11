<template>
    <div class="card">
        <div class="max-w-sm rounded overflow-hidden shadow-lg">
          <img
            class="w-full h-60"
            src="../../assets/images/pexels-rakicevic-nenad-801885.jpg"
            alt="Sunset in the mountains"
          />
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
          <div class="but">
            <router-link :to="viewPostButton">View this post</router-link>
          </div>
        </div>
      </div>
</template>
<script>
export default {
  props:['body','id','name','excerpt','tags'],
  computed:{
    viewPostButton(){
      return `/post/${this.id}`
    }
  }
}
</script>