<template>
<v-container v-if="user !== null">
    <v-row justify="center">
        <v-col cols="12" class="py-0 d-flex justify-space-between">
            <span class="text-button primary--text">
                Dashboard
            </span>

            <v-btn depressed color="primary secondary--text" dark class="mb-2" @click.stop="dialog = true">New Investors</v-btn>
        </v-col>
        <v-col cols="12">
            <v-data-table :search="search" :loading="loading" loading-text="Loading... Please wait" :headers="headers" :items="investors" sort-by="calories" class="elevation-1">
                <template v-slot:top>
                    <v-toolbar flat color="white">
                        <v-toolbar-title>INVESTORS</v-toolbar-title>
                        <v-divider class="mx-4" inset vertical></v-divider>

                        <v-spacer></v-spacer>
                        <v-text-field v-model="search" prepend-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
                        <!-- <v-spacer></v-spacer>
                        <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">New Investment</v-btn> -->
                    </v-toolbar>
                </template>
                <template v-slot:item.actions="{ item }">
                    <v-btn to="/investor" color="secondary primary--text" small depressed @click="view(item)">
                        view
                    </v-btn>
                </template>
                <template v-slot:no-data>
                    <v-btn color="primary" @click="initialize">Reset</v-btn>
                </template>
            </v-data-table>
        </v-col>
        <v-col cols="12">
            <add-investor :dialog="dialog" :toggle="toggle " />
        </v-col>
    </v-row>

</v-container>
</template>

<script>
// @ is an alias to /src
import AddInvestor from '../components/AddInvestor'
import {
    mapGetters
} from 'vuex'

export default {
    name: 'Home',
    components: {
        AddInvestor
    },
    data: () => ({
        dialog: false,
        loading: false,

        search: '',
        headers: [{
                text: 'Name',
                align: 'start',
                sortable: false,
                value: 'name',
            },
            {
                text: 'Email',
                value: 'email'
            },
            {
                text: 'Phone Number',
                value: 'phone'
            },
            {
                text: 'No. of Investment',
                value: 'numberOfInvestments'
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
            investors: 'Get_Investors',
            user: 'Get_User'
        }),

    },

    methods: {
        toggle(par) {
            this.dialog = par
        }

    },

}
</script>
