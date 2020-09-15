<template>
<v-container>
    <v-row no-gutters>
        <v-col cols="12" class="py-2 d-flex justify-space-between">
            <v-btn to="/" text depressed color="primary" class="mb-2">
                <v-icon>mdi-arrow</v-icon>
                Go Back
            </v-btn>

     <v-btn  color="primary secondary--text" dark class="mb-2"   @click.stop="toggle(true, 'invest')" >New Investment</v-btn>
        </v-col>
        <v-col cols="12">
            <v-card class="px-3">
                <v-card-title class=" text-subtitle-1">
                    Peter Emmanuel Whyte
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <div>
                        Total Investments <span class="secondary py-1 px-2 rounded font-weight-medium">{{totalInvestments}}</span>
                    </div>
                </v-card-title>
                <v-divider class="mx-4" inset></v-divider>
                <v-card-text>
                    <v-row>
                        <v-col cols="12" class="pt-0">
                            <v-row no-gutters justify="space-between" >
                                <v-col cols="10">
                                    <div class="headline mb-1">Personal</div>

                                    <div class="d-flex flex-column flex-md-row">
                                        <div class="mr-4">
                                            <span class="font-weight-medium">Email:</span>
                                            peteremmanuelwhyte@gmail.com
                                        </div>
                                        <div>
                                            <span class="font-weight-medium">Phone Number:</span>
                                            08108139758
                                        </div>
                                    </div>
                                </v-col>
                                <v-col cols="2" class="d-flex align-center justify-end" >
                                    
                                    <v-btn  @click.stop="toggle(true, 'edit')" outlined depressed color="primary">
                                        Edit
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-col>

                    </v-row>

                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
    <v-row>
        <investments />
    </v-row>
    <v-row>
    <add-investment :dialog="dialog" :toggle="toggle"/>
    </v-row>
    <v-row>
    <edit-investor :investor="investor" :dialog="dialog" :toggle="toggle"/>
    </v-row>
</v-container>
</template>

<script>
import {
    mapGetters
} from 'vuex'
import Investments from '../components/Investments'
import AddInvestment from '../components/AddInvestment'
import EditInvestor from '../components/EditInvestor'

export default {
    name: "Investor",
    components: {
        Investments,
        AddInvestment,
        EditInvestor
    },

    data: () => ({
        investor: {
        id: 1,
        name: 'Peter Emmanuel Whyte',
        email: 'peteremmanuelwhyte@gmail.com',
        phone: '08108139758',
        numberOfInvestments: 7
        },
        dialog: {
            invest: false,
            edit:false
        }
    }),
    computed: {
        ...mapGetters({
            totalInvestments: 'Get_TotalInvestments'
        }),

    },
    methods: {
        toggle(par, which){
            this.dialog[which] = par
        }
    }
}
</script>

<style>

</style>
