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
              <v-list-item-content class="">
                <v-list-item-title>Verify Account</v-list-item-title>
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
                    v-model="otp"
                    :rules="otpRules"
                    type="text"
                    name="text"
                    label="Enter OTP"

                    prepend-icon="mdi-account"
                  ></v-text-field>
                </v-col>
               
                
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
                
                <v-col cols="12" class="mb-4">
                  <v-btn text small color="primary">
                    <v-icon small class="mr-2">mdi-lock</v-icon>
                    Login Instead
                  </v-btn>
                </v-col>
                <v-col cols="12" class="px-2">
                  <v-btn type="submit" :loading="loading.otp" block color="primary"
                    >Verify Account</v-btn>
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
  name: "Register",
  data: () => ({
    valid: true,
    otp: "",
    otpRules: [ (v) => !!v || "E-mail is required"],
   email: "",
    show: false,
    required: [(v) => !!v || "Name is required"],
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+/.test(v) || "E-mail must be valid",
    ], 

  }),
 
  computed: {
      ...mapGetters({loading:"Get_Loading", alert:"Get_Alert", authorize: "Get_Authorize",})
  },
 created(){

   if(this.authorize){
 this.$store.dispatch('authenticated',"/register")
   }
  },
  methods: {
      ...mapActions({verifyAccount:"Verify_Account"}),
    submit() {
      if (this.$refs.form.validate()) {
        const payload = {
          email: this.email,
          otp: this.otp,
        };
        this.verifyAccount(payload)    

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
