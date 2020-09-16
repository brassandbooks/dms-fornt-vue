<template>
  <v-container>
    <v-row align-content="center" justify="center" style="height:100vh">
      <v-col v-if="alert.is" cols="12" sm="8" md="6" class="py-0">
        <v-alert prominent :type="alert.type">
          {{ alert.text }}
        </v-alert>
      </v-col>
      <v-col cols="12">
        <v-card class="mx-auto pb-4" max-width="400">
          <v-card-title class="justify-center">
            <v-list class="primary--text">
              <v-list-item-avatar size="62">
                <v-img src="../assets/logo.png"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>Sign in</v-list-item-title>
              </v-list-item-content>
            </v-list>
          </v-card-title>

          <v-divider></v-divider>
          <v-card-text>
            <v-form
              @submit.prevent="submit"
              ref="form"
              v-model="valid"
              lazy-validation
            >
              <v-row no-gutters>
                <v-col cols="12" class="px-2">
                  <v-text-field
                    color="primary"
                    v-model="email"
                    :rules="emailRules"
                    type="email"
                    name="email"
                    label="Email"
                    @click:append="show = !show"
                    prepend-icon="mdi-email"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" class="px-2">
                  <v-text-field
                    color="primary"
                    v-model="password"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="required"
                    :type="show ? 'text' : 'password'"
                    name="password"
                    label="Password"
                    @click:append="show = !show"
                    prepend-icon="mdi-lock"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" class="mb-4">
                  <v-btn text small color="primary">
                    <v-icon small class="mr-2">mdi-lock</v-icon>
                    Forgot password
                  </v-btn>
                </v-col>
                <v-col cols="12" class="px-2">
                  <v-btn type="submit" :loading="loading.login" block color="primary"
                    >Login</v-btn
                  >
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import {mapGetters, mapActions} from 'vuex'
export default {
  name: "Login",
  data: () => ({
    valid: true,
    email: "",
    password: "",
    terms: null,
    show: false,
    required: [(v) => !!v || "Name is required"],
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+/.test(v) || "E-mail must be valid",
    ], 

  }),
 
  computed: {
      ...mapGetters({loading:"Loading", alert:"Get_Alert"})
  },
 created(){
    this.$store.dispatch('authenticated',"/login")
  },
  methods: {
      ...mapActions({login:"Login_User", logout:"logoutUser"}),
    submit() {
      if (this.$refs.form.validate()) {
        const user = {
          email: this.email,
          password: this.password,
        };
        console.log(this.loading.login)
        this.login(user)    
        console.log(this.loading.login)
      }
    },

    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },

    
  },
};
</script>
