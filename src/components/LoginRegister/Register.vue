<template>
  <div class="contain flex">
    <div class="w-full max-w-xs m-auto shadow-2-yellowshadow">
      <form class="bg-white rounded px-8 pt-4 pb-6 my-4">
        <h1 class="font-bold mb-6 mt-0 text-2xl">Register</h1>

        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-semibold  mb-2 text-left"
            for="username"
          >
            Name
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Name"
            v-model.trim="name"
          />
          <p class="text-red-600 mt-1" v-if="!nameIsValid">
            Name should not be blank
          </p>
        </div>
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm text-left font-semibold mb-2"
            for="useremail"
          >
            Email
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="useremail"
            type="email"
            placeholder="Email"
            v-model.trim="email"
          />
          <p class="text-red-600 mt-1" v-if="!emailIsValid">
            Email should not be blank
          </p>
          <p class="text-red-600 mt-1" v-if="emailAlreadyTaken">
            Email already taken.
          </p>
        </div>
        <div class="mb-3">
          <label
            class="block text-gray-700 text-left text-sm font-semibold mb-2"
            for="password"
          >
            Password
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            v-model.trim="password"
          />
          <p class="text-red-600 mt-1" v-if="!passwordIsValid">
            Password should not be blank
          </p>
          <p class="text-red-600 mt-1" v-if="!passwordSame">
            Password and Confirm Password should be same
          </p>
          <p class="text-red-600 mt-1" v-if="!passwordLengthIsValid">
            Password should alteast be 6 characters long.
          </p>
          
          <!-- <p class="text-red-500 text-xs italic">Please choose a password.</p> -->
        </div>
        <div class="mb-6">
          <label
            class="block text-gray-700  text-left text-sm font-semibold mb-2"
            for="confirmpassword"
          >
            Confirm Password
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="confirmpassword"
            type="password"
            placeholder="Confirm Password"
            v-model.trim="confirmPassword"
          />
          <p class="text-red-600 mt-1" v-if="!confirmPasswordIsValid">
            Confirm Password should not be blank
          </p>
          <!-- <p class="text-red-500 text-xs italic">Please choose a password.</p> -->
        </div>
        <div class="flex items-center justify-center">
          <button
            @click="register"
            class="yellow text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Register
          </button>
        </div>
        <p class="mt-4">
          Already have an account? <br /><router-link to="/login">
            <span class="text-blue-500">Login</span></router-link
          >
        </p>
      </form>
      <p class="text-center text-gray-500 text-xs yellow-text">
        &copy;2021 Fireblogs. All rights reserved.
      </p>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      name: "",
      nameIsValid: true,
      email: "",
      emailIsValid: true,
      password: "",
      passwordIsValid: true,
      confirmPassword: "",
      confirmPasswordIsValid: true,
      passwordLengthIsValid:true,
      passwordSame: true,
      formIsvalid: true,
      emailAlreadyTaken:false,
      errorArray:[]
    };
  },
  methods: {
    validation() {
      this.formIsvalid = true;
      this.nameIsValid=true;
      this.emailIsValid=true;
      this.passwordIsValid=true;
      this.confirmPasswordIsValid=true; 
      if (this.name === "") {
        this.nameIsValid = false;
        this.formIsvalid = false;
      }
      if (this.email === "") {
        this.emailIsValid = false;
        this.formIsvalid = false;
      }
      if(this.password.length<6){
        this.passwordLengthIsValid=false
        this.formIsvalid=false
      }
      if (this.password === "") {
        this.passwordIsValid = false;
        this.formIsvalid = false;
      }
      if (this.confirmPassword === "") {
        this.confirmPasswordIsValid = false;
        this.formIsvalid = false;
      }
      if (this.password !== this.confirmPassword) {
        this.passwordSame = false;
        this.formIsvalid = false;
      }
    },
    register() {
      this.validation();
      if (this.formIsvalid) {
        const data={
          name:this.name,
          email:this.email,
          password:this.password,
          password_confirmation:this.confirmPassword
        }
        
        console.log(data);
        axios.post('/register',data).then(res=>{
          localStorage.setItem('token',res.data.access_token);
          this.$router.push('/home')
        }).catch(err=>{
          if(err.response.data.errors.email){
            this.emailAlreadyTaken=true;
            this.email="";
            this.password="";
            this.confirmPassword="";
            this.name="";
          }
        })
        // this.$router.push("/login");
      }
    },
  },
};
</script>
<style scoped>
.contain {
  background-color: #010411;
  height: 100vh;
}
.yellow {
  background-color: #fff500;
  color: #010411;
  border-radius: 10px;
}
.yellow:hover {
  color: #fff500;
  background-color: #010411;
  /* border: 4px #fff500 solid; */
}
.yellow-text {
  color: #fff500;
}
</style>
