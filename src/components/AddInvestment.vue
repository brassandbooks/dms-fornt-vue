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

                                <v-col cols="12">
                                    <v-text-field type="text" v-model="principalSum" label="Principal Sum"></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-select :items="products" v-model="product" label="Producs"></v-select>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field type="text" v-model="interestRate" label="Interest Rate"></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-menu ref="menu" v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y min-width="290px">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field v-model="effectiveDate" label="Effective Date" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                                        </template>
                                        <v-date-picker color="primary" v-model="effectiveDate" no-title scrollable>
                                            <v-spacer></v-spacer>
                                            <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                                            <v-btn text color="primary" @click="$refs.menu.save(distributionDate)">OK</v-btn>
                                        </v-date-picker>
                                    </v-menu>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field type="text" v-model="investmentDuration" label="Investment Duration"></v-text-field>
                                </v-col>
                                 <v-col cols="12">
                                   <v-select :items="distributionDates" v-model="distributionDate" label="Distribution Date"></v-select>
                                </v-col>
                                <v-col cols="12">
                                    <v-select :items="payoutFrequencys" v-model="payoutFrequency" label="Payout Frequency"></v-select>
                                </v-col>

                                <v-col cols="12" class="d-flex justify-end">
                                    <v-spacer></v-spacer>
                                    <v-btn color="primary" text @click="close">Cancel</v-btn>
                                    <v-btn color="primary" :loading="loading.addInvestment" depressed @click="save">Add Investment</v-btn>
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
import {
    mapGetters, mapActions
} from 'vuex'
export default {
    props: {
        dialog: Object,
        toggle: Function,
        investor: Object
    },
    data: () => ({
        menu: false,
        principalSum: "",
        interestRate: "",
        effectiveDate: "",
        investmentDuration: "",
        distributionDate:new Date().toISOString().substr(0, 10),
        payoutFrequency: "",
        product: "",
       distributionDates: [
           1,5,10,19
        ],
        payoutFrequencys: [
            'Monthly', 'Biannually', 'Quarterly', 'Annually'
        ],

        products: [
            'Bond Fund', 'Growth Fund', 'Term Fund', "Premium Fund"
        ]

    }),
    computed: {
        ...mapGetters({
            loading: "Get_Loading"
        })
    },
    methods: {
        ...mapActions({saveInvestment :'addInvestment'}),
        close() {
            this.toggle(false, "investment")
        },
        save() {
            const frequency = ['Monthly', 'Biannually', 'Quarterly', 'Annually']
            const value = [1, 3, 6, 12]

            const investment = {
                principalSum: parseInt(this.principalSum),
                interestRate: parseInt(this.interestRate),
                effectiveDate: new Date(this.effectiveDate).getTime(),
                investmentDuration: this.investmentDuration,
                distributionDate: this.distributionDate,
                payoutFrequency: value[frequency.indexOf(this.payoutFrequency)],
                product: this.product,
                investor : this.investor.id
            }

            console.log(investment);
            this.saveInvestment(investment);
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
