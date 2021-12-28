<template>
   <div>
      <div
         class="min-w-screen h-screen animated fadeIn faster fixed left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover"
         id="modal-id"
      >
         <div class="absolute bg-black opacity-80 inset-0 z-0"></div>
         <div
            class="w-full max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg bg-white"
         >
            <!--content-->
            <div class="">
               <!--body-->
               <div class="text-center p-5 flex-auto justify-center">
                  <img :src="imageUrl" alt="" />
                  <div
                     class="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50"
                  >
                     <svg
                        class="fill-current text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                     >
                        <path
                           d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
                        ></path>
                     </svg>
                     <button class="text-sm text-black" @click="closeModal">(Esc)</button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>
<script>
export default {
   props: ["image"],
   computed: {
      imageUrl() {
         return `http://localhost/fireblogs-api/public/images/${this.image}`;
      },
   },
   methods:{
       closeModal(){
           this.$emit('close-modal',false);
        //    console.log("emit")
       }
   }
};
</script>
