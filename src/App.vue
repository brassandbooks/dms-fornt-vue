<template>
  <v-app>
    <v-app-bar
      app
      color="white"
      flat
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
                  <v-btn color="primary" dark class="mb-2"   @click.stop="dialog = true" >New Investors</v-btn>

    </v-app-bar>

    <v-main class="blue-grey lighten-5"> 
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>


export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
<style scoped>
.logo-text {
  cursor: pointer;
}
</style>