import axios from "axios"
export default{
    data() {
        return {
           userLoggedIn: false,
           userName: "",
        };
     },
    created(){
        this.getProfile();
    },
    methods:{
        getProfile(){
            // console.log("hello")
            if (this.$store.getters.userName === "") {
               axios
                  .post(
                     "/profile",
                     {},
                     {
                        headers: {
                           Authorization:
                              "Bearer " + localStorage.getItem("token"),
                        },
                     }
                  )
                  .then((res) => {
                    //  console.log(res);
                     this.userLoggedIn = true;
                    //  console.log(res.data.name);
                     this.userName = res.data.name;
                     this.$store.dispatch("setUserName", {
                        userName: this.userName,
                     });
                  })
                  .catch((err) => {
                     console.log(err);
                  });
            } else {
               this.userName = this.$store.getters.userName;
               this.userLoggedIn = true;
            }
         }
    }
}