<template>
  <v-app>
    <div>
      <v-app-bar app color="white" flat v-if="isLogin" elevate-on-scroll>
        <v-app-bar-nav-icon
          @click="drawer = !drawer"
          class="d-flex d-sm-none"
        ></v-app-bar-nav-icon>

        <v-btn
          depressed
          text
          color="white"
          to="/"
          class=" d-flex align-center jusify"
        >
          <v-img
            alt="Brass & Books"
            class="shrink mx-2 ml-sm-0"
            contain
            src="./assets/logo.png"
            transition="scale-transition"
            width="40"
          />
          <span class="primary--text font-weight-medium text-h6">BB-DMS</span>
        </v-btn>

        <v-btn
          class="d-none d-sm-flex"
          text
          color="primary"
          to="/"
          exact-active-class="secondary"
        >
          Investors
        </v-btn>
        <v-btn
          class="d-none d-sm-flex"
          text
          color="primary"
          to="/investments"
          exact-active-class="secondary"
        >
          Investments
        </v-btn>
        <v-btn
          class="d-none d-sm-flex"
          text
          color="primary"
          to="/dueinvestments"
          exact-active-class="secondary"
        >
          Due Investments
        </v-btn>
        <v-spacer> </v-spacer>
        <v-menu
          v-if="user !== null"
          transition="slide-y-transition"
          bottom
          offset-y
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="d-none d-sm-flex"
              color="primary"
              dark
              text
              v-bind="attrs"
              v-on="on"
            >
              {{ user.fullName }}
            </v-btn>
          </template>
          <v-list class="py-0">
            <v-list-item @click="logout">
              <v-list-item-icon>
                <v-icon color="primary" class="pa-0">
                  mdi-logout
                </v-icon>
              </v-list-item-icon>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>
      <v-navigation-drawer
        v-model="drawer"
        dark
        mobile-breakpoint="0"
        app
        color="primary"
      >
        <v-list dense shaped color="primary">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="mb-2 text-subtitle-1">{{
                user !== null ? user.fullName : ""
              }}</v-list-item-title>
              <v-list-item-subtitle class="font-weight-normal"
                >Logged In</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider />
        <v-list dark color="primary">
          <v-list-item
            v-for="link in sideLinks"
            :key="link.name"
            :to="link.route"
            active-class="secondary--text"
            exact
            link
            nav
            @click="switchPage(link.name)"
          >
            <v-list-item-icon>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ link.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider />
        <v-list shaped color="primary">
          <v-list-item link exact @click="logout">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </div>

    <v-main class="blue-grey lighten-5">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "App",

  data: () => ({
    drawer: false,
    permanent: true,
    activePage: "Dashboard",

    sideLinks: [
      {
        name: "Investors",
        route: "/",
        icon: "mdi-account",
      },
      {
        name: "Investments",
        route: "/investments",
        icon: "mdi-cash-plus",
      },
      {
        name: "Due Investments",
        route: "/dueinvestments",
        icon: "mdi-cash-plus",
      },
    ],
  }),
  computed: {
    ...mapGetters({
      user: "Get_User",
      isLogin: "Get_Login",
    }),
  },
  created() {
    this.$store.dispatch("authenticated", "/");
  },
  methods: {
    ...mapActions({
      signout: "logoutUser",
    }),
    logout() {
      this.signout();
    },
  },
};
</script>

<style scoped>
.logo-text {
  cursor: pointer;
}
</style>
