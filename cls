[33mcommit bafa54a43219ba7288f8f829f979f7edf162701b[m[33m ([m[1;36mHEAD -> [m[1;32m#174787082-login[m[33m)[m
Author: Whyte Peter <peteremmanuelwhyte@gmail.com>
Date:   Tue Sep 15 10:54:14 2020 +0100

    login ui done

[1mdiff --git a/src/App.vue b/src/App.vue[m
[1mindex e1e471a..098fd59 100644[m
[1m--- a/src/App.vue[m
[1m+++ b/src/App.vue[m
[36m@@ -2,59 +2,48 @@[m
   <v-app>[m
     <v-app-bar[m
       app[m
[31m-      color="primary"[m
[31m-      dark[m
[32m+[m[32m      color="white"[m
[32m+[m[32m      flat[m
     >[m
[31m-      <div class="d-flex align-center">[m
[31m-        <v-img[m
[31m-          alt="Vuetify Logo"[m
[31m-          class="shrink mr-2"[m
[32m+[m[32m     <v-app-bar-nav-icon></v-app-bar-nav-icon>[m
[32m+[m[41m      [m
[32m+[m[32m      <v-btn depressed text color="white"  to="/" class=" d-flex align-center">[m
[32m+[m[32m          <v-img[m
[32m+[m[32m          alt="Brass & Books"[m
[32m+[m[32m          class="shrink mx-2"[m
           contain[m
[31m-          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"[m
[32m+[m[32m          src="./assets/logo.png"[m
           transition="scale-transition"[m
           width="40"[m
         />[m
[31m-[m
[31m-        <v-img[m
[31m-          alt="Vuetify Name"[m
[31m-          class="shrink mt-1 hidden-sm-and-down"[m
[31m-          contain[m
[31m-          min-width="100"[m
[31m-          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"[m
[31m-          width="100"[m
[31m-        />[m
[31m-      </div>[m
[32m+[m[32m        <span  class="primary--text font-weight-medium text-h6">BB-DMS</span>[m[41m [m
[32m+[m[32m      </v-btn>[m[41m    [m
[32m+[m[41m    [m
 [m
       <v-spacer></v-spacer>[m
[32m+[m[32m                  <v-btn color="primary" dark class="mb-2"   @click.stop="dialog = true" >New Investors</v-btn>[m
 [m
[31m-      <v-btn[m
[31m-        href="https://github.com/vuetifyjs/vuetify/releases/latest"[m
[31m-        target="_blank"[m
[31m-        text[m
[31m-      >[m
[31m-        <span class="mr-2">Latest Release</span>[m
[31m-        <v-icon>mdi-open-in-new</v-icon>[m
[31m-      </v-btn>[m
     </v-app-bar>[m
 [m
[31m-    <v-main>[m
[31m-      <HelloWorld/>[m
[32m+[m[32m    <v-main class="blue-grey lighten-5">[m[41m [m
[32m+[m[32m      <router-view/>[m
     </v-main>[m
   </v-app>[m
 </template>[m
 [m
 <script>[m
[31m-import HelloWorld from './components/HelloWorld';[m
[32m+[m
 [m
 export default {[m
   name: 'App',[m
 [m
[31m-  components: {[m
[31m-    HelloWorld,[m
[31m-  },[m
[31m-[m
   data: () => ({[m
     //[m
   }),[m
 };[m
 </script>[m
[32m+[m[32m<style scoped>[m
[32m+[m[32m.logo-text {[m
[32m+[m[32m  cursor: pointer;[m
[32m+[m[32m}[m
[32m+[m[32m</style>[m
\ No newline at end of file[m
[1mdiff --git a/src/assets/favicon.png b/src/assets/favicon.png[m
[1mnew file mode 100644[m
[1mindex 0000000..084e089[m
Binary files /dev/null and b/src/assets/favicon.png differ
[1mdiff --git a/src/assets/logo.png b/src/assets/logo.png[m
[1mindex f3d2503..4d68142 100644[m
Binary files a/src/assets/logo.png and b/src/assets/logo.png differ
[1mdiff --git a/src/assets/logo.svg b/src/assets/logo.svg[m
[1mdeleted file mode 100644[m
[1mindex 145b6d1..0000000[m
[1m--- a/src/assets/logo.svg[m
[1m+++ /dev/null[m
[36m@@ -1 +0,0 @@[m
[31m-<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 87.5 100"><defs><style>.cls-1{fill:#1697f6;}.cls-2{fill:#7bc6ff;}.cls-3{fill:#1867c0;}.cls-4{fill:#aeddff;}</style></defs><title>Artboard 46</title><polyline class="cls-1" points="43.75 0 23.31 0 43.75 48.32"/><polygon class="cls-2" points="43.75 62.5 43.75 100 0 14.58 22.92 14.58 43.75 62.5"/><polyline class="cls-3" points="43.75 0 64.19 0 43.75 48.32"/><polygon class="cls-4" points="64.58 14.58 87.5 14.58 43.75 100 43.75 62.5 64.58 14.58"/></svg>[m
[1mdiff --git a/src/components/AddInvestment.vue b/src