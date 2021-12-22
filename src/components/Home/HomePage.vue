<template>
   <div class="header grid grid-cols-1 sm:grid-cols-2">
      <div class="welcome-message my-auto">
         <h1 class="typed font-semibold mt-24 mb-16 text-6xl sm:text-8xl">
            Welcome
         </h1>
         <p class="break-words text-white px-10 text-base sm:text-lg">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus
            eum quaerat quasi ad officia molestias rerum! Necessitatibus nemo
            adipisci et.
         </p>
         <button class="btn m-12" href=".recent-posts">
            Explore <span class="arrow">&darr;</span>
         </button>
      </div>
      <div class="image">
         <img src="../../assets/images/pexels-lisa-851213.jpg" alt="" />
      </div>
   </div>
</template>
<script>

export default {
  
};
</script>
<style scoped>
.header {
   height: 93vh;
   background-color: #010411;
}
.typed {
   color: #fff700;
}
.image img {
   object-fit: cover;
   height: 100%;
   width: 100%;
}
.btn {
   padding: 0.5rem;
   color: #fff700;
   font-size: 1.4rem;
   font-weight: 520;
   border: 3px #fff700 solid;
   /* margin: 3rem; */
   border-radius: 10px;
}
.btn:hover {
   color: #010411;
   background-color: #fff700;
   font-weight: 550;
   box-shadow: 0 0 50px #fff700;
}
</style>
