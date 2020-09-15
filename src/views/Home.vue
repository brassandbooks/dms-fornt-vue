<template>
<v-container>
    <v-row  justify="center">
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

    </v-row>

</v-container>
</template>

<script>
// @ is an alias to /src
import {mapGetters} from 'vuex'

export default {
    name: 'Home',
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
        desserts: [],
        editedIndex: -1,
        editedItem: {
            name: '',
            calories: 0,
            fat: 0,
            carbs: 0,
            protein: 0,
        },
        defaultItem: {
            name: '',
            calories: 0,
            fat: 0,
            carbs: 0,
            protein: 0,
        },
    }),

    computed: {
        ...mapGetters({ investors:'Get_Investors'}),
        formTitle() {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
        
    },

    watch: {
        dialog(val) {
            val || this.close()
        },
    },

    created() {
        console.log(this.investors);
    },

    methods: {
       

        editItem(item) {
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
            console.log(item);
        },

        deleteItem(item) {
            const index = this.desserts.indexOf(item)
            confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
        },

    },

}
</script>
