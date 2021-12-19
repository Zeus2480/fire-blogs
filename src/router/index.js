import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Blogs from '../components/Allblogs/Blogs.vue'
import Login from '../components/LoginRegister/Login.vue'
import Register from '../components/LoginRegister/Register.vue'
import CreateBlog from '../components/CreateBlog/CreateBlog3.vue'
import ViewPost from '../components/ViewPost/ViewPost.vue'
import UserPost from '../components/UserPost/userPost.vue'
import UpdateBlog from '../components/UpdateBlog/UpdateBlog.vue'
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
    path:'/post',
    component:Blogs
  },
  {
    path:'/userpost',
    component:UserPost,
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
    path:'/edit',
    component:UpdateBlog,
    name:'edit',
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
