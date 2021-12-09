<template>
    <div class="contain">
        <the-nav></the-nav>
        <the-search></the-search>
        <ul>

        <blog-card></blog-card>
        </ul>
    </div>
</template>
<script>
import TheNav from '../../components/nav/TheNav.vue'
import BlogCard from './BlogsCard.vue'
import TheSearch from '../Search/TheSearch.vue'
export default {
    components:{
        TheNav,
        BlogCard,
        TheSearch
    }

}
</script>