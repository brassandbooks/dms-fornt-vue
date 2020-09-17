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
    <v-spacer> </v-spacer>
     
     
 <v-menu v-if="user !== null"
      transition="slide-y-transition"
      bottom
      offset-y
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          text
          v-bind="attrs"
          v-on="on"
        >
         {{user.fullName}}
         
        </v-btn>
      </template>
      <v-list class="py-0">
        <v-list-item

         @click="logout"
        > <v-list-item-icon>    
         <v-icon color="primary" class="pa-0">
           mdi-logout
         </v-icon>
        </v-list-item-icon>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    </v-app-bar>

    <v-main   class="blue-grey lighten-5"> 
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'App',

  data: () => ({
  
  }),
  computed: {
    ...mapGetters({user:"Get_User", isLogin:"Get_Login"})
  },
  created(){
    this.$store.dispatch('authenticated', "/")
  },
  methods: {
     ...mapActions({log:"logoutUser"}),
    logout(){
     this.log()
    }
  }
 
};
</script>
<style scoped>
.logo-text {
  cursor: pointer;
}
</style>