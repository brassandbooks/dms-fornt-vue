<template>
<v-container>
    <v-row>
        <v-col cols="12">
            <v-dialog persistent v-model="dialog.investment" max-width="500px">
                <v-card>
                    <v-card-title class="primary--text pt-6 ">
                        <v-icon large color="primary" class="mr-4">
                            mdi-cash-check
                        </v-icon>
                        <span class="headline">Add New Investment</span>
                    </v-card-title>

                    <v-card-text>
                        <v-container>
                            <v-row no-gutters>
                                <v-col cols="12" class="d-flex error--text align-center justify-end">Investor with email already exist</v-col>
                                <v-col cols="12" sm="6">
                                    <v-text-field type="text" prepend-icon="mdi-account" v-model="principalSum" label="Principal Sum"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-text-field type="text" prepend-icon="mdi-account" v-model="interestRate" label="Interest Rate"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-text-field type="text" prepend-icon="mdi-account" v-model="investmentDuration" label="Investment Duration"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-text-field type="email" prepend-icon="mdi-email" v-model="distributionDate" label="Distribution Date"></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-select :items="payoutFrequency" label="Payout Frequency"></v-select>
                                </v-col>
                                
                                <v-col cols="12" class="d-flex justify-end">
                                    <v-spacer></v-spacer>
                                    <v-btn color="primary" text @click="close">Cancel</v-btn>
                                    <v-btn color="primary" depressed @click="save">Save</v-btn>
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
    props: {
        dialog: Object,
        toggle: Function
    },
    data: () => ({
        principalSum: "",
        interestRate: "",
        ffectiveDate: "",
        investmentDuration: "",
        distributionDate: "",
        payoutFrequency: [
            'Monthly', 'Biannually', 'Quarterly', 'Annually'
        ]

    }),
    methods: {
        close() {
            this.toggle(false, "investment")
        },
        save() {
            console.log('save');
        }

    }
}
</script>

<style>

</style>

principalSum, 
interestRate, 
effectiveDate, 
investmentDuration, 
distributionDate, 
payoutFrequency (
    monthly -1, 
    quarterly - 3, 
    biannually - 6, 
    annually - 12
    ), 
investor ID
