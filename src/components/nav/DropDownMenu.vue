<template>
  <div class="contain w-10">
    <div class="profile w-10">
      <button @click="show">
        <img src="../../assets/logo/man.png" class="image" alt="" />
      </button>
    </div>
    <div class="menu bg-white border-2 w-36 rounded-3xl" v-show="showDropDown">
      <ul class="p-2">
        <li class="font-normal tracking-normal">Hey {{ userName }}</li>
        <li><router-link to="/create" class="font-normal tracking-normal">Create Post</router-link></li>
        <li><router-link to="/userpost" class="font-normal tracking-normal">My Post's</router-link></li>
        <li><router-link to="/bookmarked" class="font-normal tracking-normal">Favourites</router-link></li>
        <li><button @click="logOut">Log Out</button></li>

      </ul>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  props: ["userName"],
  data() {
    return {
      showDropDown: false,
    };
  },
  methods: {
    show() {
      this.showDropDown = !this.showDropDown;
    },
    logOut() {
        console.log('log')
      axios.post(
        "http://127.0.0.1:8000/api/logout",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      ).then(res=>{
          console.log(res)
          this.$router.push('/login')
      }).catch(err=>{
          console.log(err)
      });
    },
  },
};
</script>
<style scoped>
.menu ul li {
  color: black;
  padding: 4px;
  margin: 6px 0;
  border-radius: 1.5rem;
}
.menu ul li:hover {
  background-color: rgb(197, 197, 197);
}
.image {
  height: 2.2rem;
  width: 2.2rem;
}
.menu {
  position: relative;
  top: 0;
}
.contain {
  position: absolute;
}
</style>
