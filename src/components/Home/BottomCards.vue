<template>
  <div class="contain">
      <ul>

    <div class="cards grid grid-cols-1  gap-10  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:mx-6" >
      <base-card class=" duration-300 transform hover:rotate-2"></base-card>
      <base-card class=" duration-300 transform hover:rotate-2"></base-card>
      <base-card class=" duration-300 transform hover:rotate-2"></base-card>
      <base-card class=" duration-300 transform hover:rotate-2"></base-card>
    </div>
      </ul>
  </div>
</template>
<script>
import BaseCard from '../../components/Cards/baseCards.vue'
export default {
    components:{
        BaseCard
    }
}
</script>
<style scoped>
/* .container {
  height: 100vh;
} */
</style>
