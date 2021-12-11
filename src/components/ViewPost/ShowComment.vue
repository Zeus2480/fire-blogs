<template>
    <div class="contain flex my-8 w-full max-w-xl">
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
.comment{
    border: 2px solid ;
}

</style>