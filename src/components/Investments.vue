<template>
  <v-container>
    <v-row v-if="!showViewed" justify="center">
      <v-col cols="12">
        <v-data-table
          :search="search"
          :loading="loading.singleInvestment"
          loading-text="Loading... Please wait"
          :headers="headers"
          :items="investments"
          sort-by="calories"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>INVESTMENTS</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                prepend-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
              <!-- <v-spacer></v-spacer>
                        <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">New Investment</v-btn> -->
            </v-toolbar>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-btn
              color="secondary primary--text"
              small
              depressed
              @click="view(item)"
            >
              view
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <v-row v-else>
      <view-investment
        :investment="viewedInvestment"
        :toggleView="toggleView"
      />
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import ViewInvestment from "./ViewInvestment";
import { mapGetters } from "vuex";

export default {
  name: "Investments",

  components: {
    ViewInvestment,
  },
  data: () => ({
    showViewed: false,
    viewedInvestment: {},
    search: "",
    headers: [
      {
        text: "Principal Sum",
        align: "start",
        sortable: false,
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
  }),

  computed: {
    ...mapGetters({
      allInvestments: "Get_Investment",
      loading: "Get_Loading",
    }),
    investments() {
      this.allInvestments.forEach((el) => {
       
        const frequency = ["Monthly", "Quarterly", "Biannually", "Annually"];
        const value = [1, 3, 6, 12];
       

        el.principalSum = el.principalSum.toLocaleString("en-NG", {
          style: "currency",
          currency: "NGN",
        });

        el.distributionAmount = el.distributionAmount.toLocaleString("en-NG", {
          style: "currency",
          currency: "NGN",
        });

        // el.effectiveDate = new Date(`${el.effectiveDate}`).toLocaleDateString(
        //   "en-NG"
        // );
        el.expiringDate = new Date(el.expiringDate).toLocaleDateString("en-NG");

        el.payoutFrequency = frequency[value.indexOf(el.payoutFrequency)];
      });

      return this.allInvestments;
    },
  },
created(){
 console.log(this.allInvestments);
},
  methods: {
    view(item) {
      item.fromInvestor = true;
      this.viewedInvestment = item;
      this.toggleView(true);
    },

    toggleView(on) {
      this.showViewed = on;
    },
  },
};
</script>
