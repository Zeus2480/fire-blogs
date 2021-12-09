<template>
  <div class="postlist grid grid-cols-1 gap-6  pb-8 sm:grid-cols-2 ">
      <div class="image flex-1 width-1/2 px-8 rounded-lg">

    <img
      src="../../assets/images/pexels-pixabay-261763.jpg"
      alt=""
      class="rounded-lg"
    />
      </div>
    <div class="content flex-1 width-1/2 p-8 rounded-lg">
      <h1 class="text-4xl font-semibold my-6">Heading</h1>
      <p class="text-white text-base break-words m-8 py-6 px-5">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur, nisi
        dicta quia odit ullam esse maxime, est a assumenda, accusantium
        laudantium omnis laboriosam facere impedit labore et ratione dolores
        ipsam nostrum officiis magni modi eligendi iure obcaecati. Nisi, quaerat
        nobis?
      </p>
      <a href="#" class="view-post-button">View This Post</a>
    </div>
  </div>
</template>
<style scoped>
.content{
    background-color:#010411 ;
    /* height: 100%; */
}
/* .image img,
.content{
    border-radius: 1.3rem;
} */
.content h1{
    color: #FFF700;
}
.view-post-button{
    background-color: #FFF700;
    color: #010411;
    padding: .8rem;
    border-radius: 10px;
}
.view-post-button:hover{
    background-color: #010411;
    border: 3px #FFF700 solid;
    color: #FFF700;
}
</style>
