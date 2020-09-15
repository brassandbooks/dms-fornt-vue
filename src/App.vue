<template>
  <v-app>
    <v-app-bar
      app
      color="white"
      flat

      v-if="isLogin"
      elevate-on-scroll
      
    >
     <v-app-bar-nav-icon></v-app-bar-nav-icon>
      
      <v-btn depressed text color="white"  to="/" class=" d-flex align-center">
          <v-img
          alt="Brass & Books"
          class="shrink mx-2"
          contain
          src="./assets/logo.png"
          transition="scale-transition"
          width="40"
        />
        <span  class="primary--text font-weight-medium text-h6">BB-DMS</span> 
      </v-btn>    
    <v-spacer></v-spacer>
      <span class="text-button">Whyte Peter</span>
     

    </v-app-bar>

    <v-main   class="blue-grey lighten-5"> 
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'App',

  data: () => ({
    //
  }),
  computed: {
    ...mapGetters({isLogin:"Get_Login"})
  },
  created(){
    this.$store.dispatch("Init_Investors")
  }
 
};
</script>
<style scoped>
.logo-text {
  cursor: pointer;
}
</style>