<template>
<v-container>
    <v-row>
        <v-col cols="12">
            <v-btn color="primary" dark class="mb-2"   @click.stop="dialog = true" >New Investors</v-btn>
        </v-col>
        <v-col cols="12">
            <v-dialog v-model="dialog" max-width="500px">
                <v-card>
                    <v-card-title class="primary--text pt-6 ">
                        <v-icon large color="primary" class="mr-4">
                            mdi-account-plus
                        </v-icon>
                        <span class="headline">Add New Investors</span>
                    </v-card-title>

                    <v-card-text>
                        <v-container>
                            <v-row no-gutters>
                                <v-col cols="12" class="d-flex error--text align-center justify-end">Investor with email already exist</v-col>
                                <v-col cols="12" >
                                    <v-text-field type="text" prepend-icon="mdi-account" v-model="firstName" label="First Name"></v-text-field>
                                </v-col>
                                <v-col cols="12" >
                                    <v-text-field type="text" prepend-icon="mdi-account" v-model="lastName" label="Last Name"></v-text-field>
                                </v-col>
                                <v-col cols="12" >
                                    <v-text-field type="text" prepend-icon="mdi-account" v-model="otherName" label="Other Name"></v-text-field>
                                </v-col>
                                <v-col cols="12" >
                                    <v-text-field type="email" prepend-icon="mdi-email" v-model="email" label="Email"></v-text-field>
                                </v-col>
                                <v-col cols="12" >
                                    <v-text-field type="text" prepend-icon="mdi-phone" v-model="phoneNumber" label="Phone Number"></v-text-field>
                                </v-col>
                                <v-col cols="12" class="d-flex justify-end">
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                                    <v-btn color="blue darken-1" text @click="save">Save</v-btn>
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
export default {
    data: () => ({
        dialog: false,
        firstName: "",
        lastName:"",
        otherName:"",
        email: "",
        phoneNumber:""

        
    }),
    methods: {
      close() {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        save() {
            if (this.editedIndex > -1) {
                Object.assign(this.desserts[this.editedIndex], this.editedItem)
            } else {
                this.desserts.push(this.editedItem)
            }
            this.close()
        },
    }
}
</script>

<style>

</style>
