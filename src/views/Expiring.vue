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
      <v-col cols="12" class="py-0 d-flex justify-space-between">
        <v-form
          @submit.prevent="filterDue"
          ref="form"
          v-model="valid"
          :lazy-validation="lazy"
        >
          <v-row no-gutters>
            <v-col cols="2" sm="2">
              <v-text-field
                :rules="[(v) => !!v || 'Year is required']"
                class="ml-1"
                outlined
                dense
                type="text"
                v-model="filter.year"
                :value="filter.year"
              ></v-text-field>
            </v-col>
            <v-col cols="4" sm="3">
              <v-select
                :rules="[(v) => !!v || 'Month is required']"
                class="ml-1"
                outlined
                dense
                :items="filter.months"
                v-model="filter.month"
                :value="filter.month"
              ></v-select>
            </v-col>
            
            <v-col cols="2" sm="2" class="ml-md-2">
              <v-btn
                class="d-none d-sm-flex"
                type="submit"
                depressed
                color="primary secondary--text"
              >
                Filter
              </v-btn>
              <v-btn
                type="submit"
                class="d-flex d-sm-none ml-1"
                color="primary  secondary--text"
              >
                <v-icon>mdi-magnify</v-icon>
              </v-btn>
            </v-col>
            <v-col class="d-flex justify-end py-0 ">
              <v-btn
                :disabled="!investments.length"
                depressed
                color="primary secondary--text "
              >
                <download-excel
                  :header="jsonHeader"
                  :data="jsonData"
                  :fields="json_fields"
                  worksheet="My Worksheet"
                  :stringifyLongNum="true"
                  name="dms-Due-Investment.xls"
                >
                  Export Excel
                </download-excel>
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>

      <v-col cols="12" class="pt-0">
        <v-data-table
          :search="search"
          :loading="loading.expiring"
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
  name: "ExpiringInvestment",
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
        text: "Principal Sum",
        value: "principalSum",
      },
      {
        text: "Distribution Amount",
        value: "distributionAmount",
      },

      {
        text: "Month",
        value: "month",
      },
      {
        text: "Bank",
        value: "bank",
      },
      {
        text: "Account Number",
        value: "accountNumber",
      },
      {
        text: "Expiring Date",
        value: "expiringDate",
      },
      {
        text: "Status",
        value: "status",
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
    },
    json_fields: {
      Investor: "fullName",
      Product: "product",
      "Payout Frequency": "payoutFrequency",
      "Distibution Amount": "distributionAmount",
      Bank: "bank",
      "Account Number": "accountNumber",
      Month: "month",
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
      allInvestments: "Get_Expiring",
      
    }),
    investments() {
      this.allInvestments.forEach((el) => {
        let fullName = `${el.investor.firstName} ${el.investor.lastName}`;
        el.principalSum = el.principalSum.toLocaleString("en-NG", {
          style: "currency",
          currency: "NGN",
        });
        el.fullName = fullName;
         el.principalSum = el.principalSum.toLocaleString("en-NG", {
          style: "currency",
          currency: "NGN",
        });
        el.distributionAmount = el.distributionAmount.toLocaleString("en-NG", {
          style: "currency",
          currency: "NGN",
        });
        el.bank = el.investor.bank;
        el.accountNumber = el.investor.accountNumber;
        el.effectiveDate = new Date(el.effectiveDate).toLocaleDateString(
          "en-NG"
        );
        el.active = this.checkExpired(el.expiringDate)
        el.expiringDate = new Date(el.expiringDate).toLocaleDateString("en-NG");
      });

      return this.allInvestments;
    },
    jsonHeader() {
      return `DUE INVESTMENTS FOR THE MONTH OF ${this.filter.month} : ${this.filter.day}`;
    },
    jsonData() {
      let excelData = [];
      this.investments.forEach((el) => {
        let data = {
          fullName: el.fullName,
          product: el.product,
          payoutFrequency: el.payoutFrequency,
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
    //Initialize Investments
     this.$store.dispatch("initInvestments");
    this.filter.month = this.filter.months[new Date().getMonth()];
setTimeout(()=> {
      let date = {
      year: this.filter.year,
      month: this.filter.month,
    }
    this.expiringInvestments(date)
},2000)
  },
  methods: {
    ...mapMutations({
      setAlert: "Set_Alert",
      setDialog: "Set_Dialog",
    }),
    ...mapActions({
      expiringInvestments : 'getExpiring'
    }),

    getSchedule(schedule) {
      return schedule.find((el) => {
        return el.year === this.filter.year && el.month === this.filter.month;
      });
    },
    filterDue() {
      if (this.$refs.form.validate()) {
        this.all = false;
        const date = {
          year: this.filter.year,
          month: this.filter.month,
        };
        this.expiringInvestments(date)
        this.title = "Expiring Investments";
      }
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
    pay(item) {
      console.log(item.schedule);
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
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
};
</script>
