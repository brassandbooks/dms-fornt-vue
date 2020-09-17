<template>
<v-container>
    <v-row>
        <v-col cols="12">
            <v-dialog persistent v-model="dialog.investor" max-width="500px">
                <v-card>
                    <v-card-title class="primary--text pt-6 ">
                        <v-icon large color="primary" class="mr-4">
                            mdi-account-plus
                        </v-icon>
                        <span class="headline">New Investor</span>

                        <v-spacer></v-spacer>
                        <span class="text-caption">Peter Emmanuel Whyte</span>
                    </v-card-title>

                    <v-card-text>
                        <v-form ref="form" v-model="valid" :lazy-validation="lazy">
                            <v-row no-gutters>
                                <v-col cols="12" class="d-flex error--text align-center justify-end">{{errorMessage}}</v-col>
                                <v-col cols="12" >
                                    <v-text-field type="text" prepend-icon="mdi-account" v-model="firstName" :rules="nameRules" label="First Name"></v-text-field>
                                </v-col>
                                <v-col cols="12" >
                                    <v-text-field type="text" prepend-icon="mdi-account" v-model="lastName" :rules="nameRules" label="Last Name"></v-text-field>
                                </v-col>
                                <v-col cols="12" >
                                    <v-text-field type="text" prepend-icon="mdi-account" v-model="otherNames" label="Other Names"></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field type="email" prepend-icon="mdi-email" v-model="email" :rules="emailRules" label="Email"></v-text-field>
                                </v-col>
                                <v-col cols="12" >
                                    <v-text-field type="text" prepend-icon="mdi-phone" v-model="phoneNumber" :rules="phoneRules" label="Phone Number"></v-text-field>
                                </v-col>
                                
                                <v-col cols="12" class="d-flex justify-end">
                                    <v-spacer></v-spacer>
                                    <v-btn color="primary" text @click="close">Cancel</v-btn>
                                    <v-btn color="primary" :loading="loading.add" depressed @click="save">Add Investor</v-btn>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>

                </v-card>
            </v-dialog>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
import {
    mapActions,
    mapGetters
} from 'vuex'
export default {
    name: "EditInvestor",

    props: {
        dialog:Object,
        toggle: Function
    },

    data: () => ({
        valid: true,
        lazy: false,
        errorMessage: "",
        firstName: "",
        lastName: "",
        otherNames: "",
        email: "",
        phoneNumber: "",

        nameRules: [
            v => !!v || 'Name is required',
        ],

        phoneRules: [
            v => !!v || 'Phone Number is required',
            v => /[0]\d{10}$/.test(v) || 'Phone Number must be valid',
        ],
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],

    }),
    computed: {
        ...mapGetters({
            loading: "Get_Loading"
        })
    },
    methods: {
        ...mapActions({
            add: "addInvestor"
        }),

        close() {
            this.toggle(false, "investor")
            this.reset()
            this.resetValidation()
        },

        save() {
            if (this.$refs.form.validate()) {
                const newInvestor = {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    otherNames: this.otherNames,
                    email: this.email,
                    phoneNumber: this.phoneNumber,
                }

                this.add(newInvestor)
            }

        },

        reset() {
            this.$refs.form.reset()
        },
        resetValidation() {
            this.$refs.form.resetValidation()
        },

    }
}
</script>

<style>

</style>
