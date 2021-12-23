<template>
    <div class="contain flex justify-start my-8 w-3/5 ml-8">
        <div class="name px-8 my-4">
            <img src="../../assets/logo/man.png" class="h-8 " alt="avatar">
        </div>
        <div class="comment max-w-md " >
            <p class="p-4 break-all">{{body}}</p>
        </div>
    </div>
</template>
<script>
export default {
    props:['body']
}
</script>
<style scoped>
.contain{
     background-color:#fff;
     border-radius: 10px;
}

</style>