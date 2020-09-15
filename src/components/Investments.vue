<template>
<v-container>
    <v-row justify="center">
        <v-col cols="12">
            <v-data-table :search="search"  loading-text="Loading... Please wait" :headers="headers" :items="investments" sort-by="calories" class="elevation-1">
                <template v-slot:top>
                    <v-toolbar flat color="white">
                        <v-toolbar-title>INVESTMENTS</v-toolbar-title>
                        <v-divider class="mx-4" inset vertical></v-divider>
                        <v-spacer></v-spacer>
                        <v-text-field v-model="search" prepend-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
                        <!-- <v-spacer></v-spacer>
                        <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">New Investment</v-btn> -->
                    </v-toolbar>
                </template>
                <template v-slot:item.actions="{ item }">
                    <v-btn color="secondary primary--text" small depressed @click="view(item)">
                        view
                    </v-btn>
                </template>
            </v-data-table>
        </v-col>

    </v-row>

</v-container>
</template>

<script>
// @ is an alias to /src
import {
    mapGetters
} from 'vuex'

export default {
    name: 'Investments',
    // filters: {
    //     currency(val) {
    //         if (val) {
    //             return val.toLocaleString()
    //         } else {

    //         }
    //     }
    // },
    data: () => ({
        dialog: false,
        loading: false,

        search: '',
        headers: [{
                text: 'Capital',
                align: 'start',
                sortable: false,
                value: 'capital',
            },
            {
                text: 'Interest Rate',
                value: 'interestRate'
            },
            {
                text: 'Payout Date',
                value: 'payoutDate'
            },
            {
                text: 'Expiring Date',
                value: 'expiringDate'
            },

            {
                text: 'Actions',
                value: 'actions',
                sortable: false
            },
        ],

    }),

    computed: {
        ...mapGetters({
            allInvestments: 'Get_Investments'
        }),
        investments() {
            this.allInvestments.forEach(el => {
               let formatedCapital = el.capital.toLocaleString()
               el.interestRate = `${el.interestRate}%`
                el.capital = formatedCapital
            })
            return this.allInvestments
        }
    },

    methods: {

    },

}
</script>
