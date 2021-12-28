import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Blogs from '../views/Blogs.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import CreateBlog from '../views/CreateBlog3.vue'
import ViewPost from '../views/ViewPost.vue'
import UserPost from '../views/userPost.vue'
import UpdateBlog from '../views/UpdateBlog.vue'
import SearchPage from '../views/SearchPage.vue'
import Bookmarked from '../views/Bookmarked.vue'
Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    name:'search',
    path:'/search',
    component:SearchPage,
    props:true
  },
  {
    path:'/post',
    component:Blogs
  },
  {
    path:'/userpost',
    component:UserPost,
  },
  {
    path:'/bookmarked',
    component:Bookmarked
  },
  {
    path: '/post/:id',
    component: ViewPost,
    props:true
  },
  {
    path:'/login',
    component:Login
  },
  {
    path:'/create',
    component:CreateBlog
  },
  {
    name:'edit',
    path:'/edit',
    component:UpdateBlog,
    props:true
  },
  {
    path:'/register',
    component:Register
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
