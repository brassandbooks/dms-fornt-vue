<template>
<v-container>
    <v-row>
        <v-col cols="12">
            <v-dialog persistent v-model="dialog.edit" max-width="500px">
                <v-card>
                    <v-card-title class="primary--text pt-6 ">
                        <v-icon large color="primary" class="mr-4">
                            mdi-account-plus
                        </v-icon>
                        <span class="headline">Edit Account</span>

                        <v-spacer></v-spacer>
                        <span class="text-caption">Peter Emmanuel Whyte</span>
                    </v-card-title>

                    <v-card-text>
                        <v-container>
                            <v-row no-gutters>
                                <v-col cols="12" class="d-flex error--text align-center justify-end">Investor with email already exist</v-col>
                                <v-col cols="12">
                                    <v-text-field type="text" prepend-icon="mdi-account" v-model="firstName" label="First Name"></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field type="text" prepend-icon="mdi-account" v-model="lastName" label="Last Name"></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field type="text" prepend-icon="mdi-account" v-model="otherNames" label="Other Names"></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field type="email" prepend-icon="mdi-email" v-model="email" label="Email"></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field type="text" prepend-icon="mdi-phone" v-model="phoneNumber" label="Phone Number"></v-text-field>
                                </v-col>
                                <v-col cols="12" class="d-flex justify-end">
                                    <v-spacer></v-spacer>
                                    <v-btn color="primary" text @click="close">Cancel</v-btn>
                                    <v-btn  color="primary" :loading="loading.update" depressed @click="save">Save</v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>

                </v-card>
            </v-dialog>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
    name:"EditInvestor",
    props: {
        investor:Object,
        dialog: Object,
        toggle: Function
    },
    data: () => ({
        firstName: "",
        lastName: "",
        otherNames: "",
        email: "",
        phoneNumber: ""

    }),
    computed:{
        ...mapGetters({loading:"Get_Loading"})
    },
    methods: {
        ...mapActions({update: "updateInvestor"}),
        close() {
            this.toggle(false, "edit")
        },
        save() {
            const newInvestor = {
                firstName : this.firstName,
                lastName: this.lastName,
                otherNames: this.otherNames,
                email: this.email,
                phoneNumber : this.phoneNumber,
                id : this.investor.id
            }
            this.update(newInvestor)
        }

    }
}
</script>

<style>

</style>
