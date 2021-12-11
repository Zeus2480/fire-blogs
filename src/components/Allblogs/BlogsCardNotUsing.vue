<template>
    <div class="contain">
        <div class="allblogs cards grid grid-cols-1 mx-6 my-4 gap-10   sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:mx-20 xl:my-20">
            <base-cards></base-cards>
            <base-cards></base-cards>
            <base-cards></base-cards>
            <base-cards></base-cards>
            <base-cards></base-cards>
            <base-cards></base-cards>
            <base-cards></base-cards>
        </div>
    </div>
</template>
<script>
import BaseCards from '../Cards/baseCards.vue' 
export default {
    components:{
        BaseCards
    }
}
</script>
