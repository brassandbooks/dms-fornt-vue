<template>
  <v-container v-if="user !== null">
    <v-snackbar top right dark :color="alert.type" v-model="alert.is">
      {{ alert.text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          :color="alert.type === 'primary' ? 'secondary' : 'white'"
          text
          v-bind="attrs"
          @click="closeAlert"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <v-row v-if="!showViewed" justify="center">
      <v-col class="d-flex justify-end">
        <v-btn
          :disabled="!investments.length"
          depressed
          color="primary secondary--text "
        >
          <download-excel
            header="DMS INVESTMENTS"
            :data="jsonData"
            :fields="json_fields"
            worksheet="My Worksheet"
            :stringifyLongNum="true"
            name="dms-Investment.xls"
          >
            Export Excel
          </download-excel>
        </v-btn>
      </v-col>
      <v-col cols="12" class="pt-0">
        <v-data-table
          :search="search"
          :loading="loading.investments"
          loading-text="Loading... Please wait"
          :headers="headers"
          :items="investments"
          sort-by="calories"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title class="text-uppercase">{{
                title
              }}</v-toolbar-title>
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
          <template v-slot:item.status="{ item }">
            <v-chip
              small
              depressed
              
              :color="item.status ? 'error' : 'success'"
              dark
              class="text-uppercase"
            >
              {{item.status ? 'Closed' : 'Active'}}
            </v-chip>
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
import ViewInvestment from "../components/ViewInvestment";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: "Investment",
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
    headers: [
      {
        text: "Investor",
        align: "start",
        sortable: false,
        value: "fullName",
      },
      {
        text: "Product",
        value: "product",
      },
      {
        text: "Payout Frequency",
        value: "payoutFrequency",
      },
      {
        text: "Principal Sum",
        value: "principalSum",
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
        text: "Status",
        value: "status",
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
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      days: [1, 5, 10, 19],
    },
    json_fields: {
      Investor: "fullName",
      Product: "product",
      "Payout Frequency": "payoutFrequency",
      "Principal Sum": "principalSum",
      "Distibution Amount": "distributionAmount",
      Bank: "bank",
      "Account Number": "accountNumber",

      "Distribution Date": "distributionDate",
      "Expiring Date": "expiringDate",
    },

    json_meta: [
      [
        {
          key: "charset",
          value: "utf-8",
        },
      ],
    ],
  }),

  computed: {
    ...mapGetters({
      alert: "Get_Alert",
      loading: "Get_Loading",
      user: "Get_User",
      allInvestments: "Get_Investments",
    }),

    investments() {
  console.log(this.allInvestments);
      this.allInvestments.forEach((el) => {
        const frequency = ["Monthly", "Quarterly", "Biannually", "Annually"];
        const value = [1, 3, 6, 12];
        let fullName = `${el.investor && el.investor.firstName} ${el.investor && el.investor.lastName}`;

        el.fullName = fullName;
        el.principalSum = el.principalSum.toLocaleString("en-NG", {
          style: "currency",
          currency: "NGN",
        });
        el.bank = el.investor && el.investor.bank;
        el.accountNumber = el.investor && el.investor.accountNumber;
        el.distributionAmount = el.distributionAmount.toLocaleString("en-NG", {
          style: "currency",
          currency: "NGN",
        });
        // el.effectiveDate = new Date(el.effectiveDate).toLocaleDateString(
        //   "en-NG"
        // );
        el.status = this.checkExpired(el.expiringDate)
        el.expiringDate = new Date(el.expiringDate).toLocaleDateString("en-NG");
        el.payoutFrequency = frequency[value.indexOf(el.payoutFrequency)];
      });

      return this.allInvestments;
    },

    jsonData() {
      let excelData = [];

      this.investments.forEach((el) => {
        let data = {
          fullName: el.fullName,
          product: el.product,
          payoutFrequency: el.payoutFrequency,
          principalSum: el.principalSum,
          distributionAmount: el.distributionAmount,
          bank: el.bank,
          accountNumber: `ACC-${el.accountNumber}`,
          distributionDate: el.distributionDate,
          expiringDate: el.expiringDate,
        };
        excelData.push(data);
      });

      return excelData;
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
      getInvestments: "initInvestments",
    }),

    getSchedule(schedule) {
      return schedule.find((el) => {
        return el.year === this.filter.year && el.month === this.filter.month;
      });
    },
checkExpired(expired){
      let isExpired
        let date = new Date(expired);
        let now = new Date();
       if(date <= now){
         isExpired = true
        }else {
          isExpired = false
        }
        return isExpired
    },
    view(item) {
      item.fromInvestor = true;
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
        this.init("all");
      } else {
        this.init("filter");
      }
    },
  },
};
</script>
