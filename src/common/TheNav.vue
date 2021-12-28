<template>
  <nav class="navbar sticky h-14 sm:block z-50 ">
    <div class="nav-image invisible sm:visible">
      <!-- <h1 class="bg-red-500">Hello</h1> -->
      <router-link to="/home" class="m-0 no-border" ><img class="h-full w-full" src="../assets/logo/meteor.png" /></router-link>
    </div>
    <div class="nav-links">
      <ul class="flex flex-col sm:flex-row">
        <li><router-link to="/home" class="nav-link">Home</router-link></li>
        <li><router-link to="/post" class="nav-link">Blogs</router-link></li>
        <li v-show="!userLoggedIn">
          <router-link to="/login" class="nav-link">Login/Register</router-link>
        </li>
        <li v-show="userLoggedIn">
          <div class="drop-down">
            <drop-down :userName="userName"></drop-down>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
import dropDown from "../components/nav/DropDownMenu.vue";
export default {
  props: ["userName", "userLoggedIn"],
  components: {
    dropDown,
  },
};
</script>
<style scoped>
.sticky {
  position: fixed;
  top: 0;
  width: 100%;
}
.navbar {
  /* z-index: 10; */
  display: flex;
  justify-content: space-around;
  background-color: #10131d;
  position: sticky;
  /* width: 100%; */
}
.nav-image img {
  height: 3rem;
  padding: 0.1rem;
  margin-top:0.2rem ;
}
.nav-link{
  color: #fff;
}
.nav-links {
  margin: 0.1rem 0;
}
/* .nav-links ul {
  display: flex;
} */

.nav-links ul li,
.nav-links ul li a {
  margin: 0.5rem 0.2rem;
  /* color: aliceblue;   Use tailwind for padding and use less padding for mobile devices */
  font-weight: 600;
  letter-spacing: 1.1px;
  padding: 5px;
}
.nav-links ul li:hover,
.nav-links ul li a:hover {
  color: #fff724;
}
.router-link-active {
  color: #fff700;
  /* background-color: #181818; */
  /* border: #fff724 3px solid;
  border-radius: 10px; */
  transition: 0.2s;
}

/* .menu-icon {
  cursor: pointer;
  position: absolute;
  top: 32px;
  right: 25px;
  height: 25px;
  width: auto;
  z-index: 50;
}
.mobile-nav {
  padding: 20px;
  width: 70%;
  max-width: 250px;
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100vh;
  background-color: #10131d;
  position: relative;
  top: 0;
  left: 0;
  color: aliceblue;
  font-weight: 600;
}
.mobile-nav li {
  padding: 20px 0;
} */
/* }
.mobile-nav-enter-active,
.mobile-nav-leave-active{
    transition: all 1s ease;
}
.mobile-nav-enter{
    transform: translateX(-250px);
}
.mobile-nav-enter-to{
    transform: translateX(0);
}
.mobile-nav-leave-to{
    transform: translateX(-250px);
} */
/* .mobile-nav-enter-active, .mobile-nav-leave-active {
  transition: width 1s;
}
.mobile-nav-enter, .mobile-nav-leave-to{
  width:-250px;
} */
</style>
