<template>
<v-container v-if="user !== null">
    <v-snackbar top right dark :color="alert.type" v-model="alert.is">
        {{ alert.text }}

        <template v-slot:action="{ attrs }">
            <v-btn :color="alert.type === 'primary' ? 'secondary' : 'white'" text v-bind="attrs" @click="closeAlert">
                Close
            </v-btn>
        </template>
    </v-snackbar>
    <v-row v-if="!showViewed" justify="center">
        <v-col cols="12" class="py-0 d-flex justify-space-between">

            <v-form @submit.prevent="init('filter')" ref="form" v-model="valid" :lazy-validation="lazy">
                <v-row no-gutters>
                    <v-col cols="12" sm="2" class="mb-2">
                        <v-btn color="primary secondary--text" depressed @click="init('all')">All</v-btn>
                    </v-col>
                    <v-col cols="2" sm="2">
                        <v-text-field :rules="[v => !!v || 'Year is required']" class="ml-1" outlined dense type="text" v-model="filter.year" :value="filter.year"></v-text-field>
                    </v-col>
                    <v-col cols="4" sm="3">
                        <v-select :rules="[v => !!v || 'Month is required']" class="ml-1" outlined dense :items="filter.months" v-model="filter.month" :value="filter.month"></v-select>
                    </v-col>
                    <v-col cols="3" sm="2">
                        <v-select :rules="[v => !!v || 'Day is required']" class="ml-1" outlined dense :items="filter.days" v-model="filter.day" label="Day"></v-select>
                    </v-col>
                    <v-col cols="2" sm="2" class="ml-md-2">
                        <v-btn class="d-none d-sm-flex" type="submit" depressed color="primary secondary--text">
                            Filter      
                        </v-btn>
                        <v-btn type="submit"  class="d-flex d-sm-none ml-1"  color="primary  secondary--text">
                            <v-icon>mdi-magnify</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-form>
            <!-- <v-spacer></v-spacer>
            <v-btn @click="refresh" text color="primary">
                <v-icon>mdi-autorenew</v-icon>
                Refresh
            </v-btn> -->
        </v-col>

        <v-col cols="12" class="pt-0">
            <v-data-table :search="search" :loading="loading.investments" loading-text="Loading... Please wait" :headers="headers" :items="investments" sort-by="calories" class="elevation-1">
                <template v-slot:top>
                    <v-toolbar flat color="white">
                        <v-toolbar-title class="text-uppercase">{{title}}</v-toolbar-title>
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
    <v-row v-else>
        <view-investment :investment="viewedInvestment" :toggleView="toggleView" />
    </v-row>
</v-container>
</template>

<script>
// @ is an alias to /src
import ViewInvestment from "../components/ViewInvestment";
import {
    mapActions,
    mapGetters,
    mapMutations
} from "vuex";

export default {
    name: "Home",
    components: {
        ViewInvestment,
    },
    data: () => ({
        valid: true,
        lazy: false,
        title: "Investments",
        all: true,
        showViewed: false,
        viewedInvestment: {},
        search: "",
        headers: [{
                text: "Investor",
                align: "start",
                sortable: false,
                value: "investor",
            },
            {
                text: "Product",
                value: "product",
            },
            {
                text: "Principal Sum",
                value: "principalSum",
            },
            {
                text: "Interest Rate",
                value: "interestRate",
            },
            {
                text: "Distribution Date",
                value: "distributionDate",
            },
            {
                text: "Expiring Date",
                value: "expiringDate",
            },

            {
                text: "Actions",
                value: "actions",
                sortable: false,
            },
        ],

        filter: {
            year: `${new Date().getFullYear()}`,
            month: "",
            day: "",
            months: ['January', 'February', "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            days: [1, 5, 10, 19]
        }
    }),

    computed: {
        ...mapGetters({
            alert: "Get_Alert",
            loading: "Get_Loading",
            user: "Get_User",
            allInvestments: "Get_Investments",
        }),
        investments() {
            this.allInvestments.forEach((el) => {
                let name = `${el.investorDetails.firstName} ${el.investorDetails.lastName}`;
                el.investor = name;

                el.principalSum = el.principalSum.toLocaleString("en-NG", {
                    style: "currency",
                    currency: "NGN",
                });

                el.distributionAmount = el.distributionAmount.toLocaleString("en-NG", {
                    style: "currency",
                    currency: "NGN",
                });

                el.effectiveDate = new Date(el.effectiveDate).toLocaleDateString(
                    "en-NG"
                );
                el.expiringDate = new Date(el.expiringDate).toLocaleDateString("en-NG");
            });

            return this.allInvestments;
        },
    },
    created() {
        this.$store.dispatch("initInvestments");
        this.filter.month = this.filter.months[new Date().getMonth()];
    },
    methods: {
        ...mapMutations({
            setAlert: "Set_Alert",
            setDialog: "Set_Dialog",
        }),
        ...mapActions({
            getInvestments: "initInvestments"
        }),

        init(arg) {
            if (arg === "all") {
                this.all = true;
                this.title = 'Investments'
                this.getInvestments()

            } else if (arg === "filter") {
                if (this.$refs.form.validate()) {
                    this.all = false;
                    this.getInvestments(this.filter)
                    this.title = "Due Investments"
                }
            }
        },
        view(item) {
            item.fromInvestor = false
            this.viewedInvestment = item;
            this.toggleView(true);
        },

        toggleView(on) {
            this.showViewed = on;
        },
        closeAlert() {
            this.setAlert({
                is: false,
                type: "",
                text: "",
            });
        },
        refresh() {
            if (this.all) {
                this.init('all')
            } else {
                this.init('filter')
            }
        },
        reset() {
            this.$refs.form.reset()
        },
        resetValidation() {
            this.$refs.form.resetValidation()
        },
    },
};
</script>
