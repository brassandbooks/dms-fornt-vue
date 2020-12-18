<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-col cols="12" class="pt-0 my-0 d-flex justify-space-between">
          <!-- <v-btn depressed color="primary secondary--text">
            Close Investment
          </v-btn> -->
          <v-spacer></v-spacer>
          <v-btn
            @click.stop="toggle(true, 'updateInvestment')"
            depressed
            color="primary secondary--text"
          >
            Edit Investment
          </v-btn>
        </v-col>
        <v-card>
          <v-card-title class=" text-subtitle-1 ">
            <span class="text-uppercase" v-if="!investment.fromInvestor">
              INVESTOR :
              {{
                `${investment.investorDetails.firstName} ${investment.investorDetails.lastName}`
              }}
            </span>
            <span class="text-uppercase" v-else>investment</span>
            <v-divider class="mx-4" vertical></v-divider>
            <v-spacer></v-spacer>

            <v-btn @click="toggleView(false)" small outlined color="primary">
              <v-icon small class="mr-2 ml-n2">
                mdi-close
              </v-icon>
              close
            </v-btn>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-row>
              <v-col cols="12" class=" py-0 d-flex justify-space-between">
                <div
                  v-if="!investment.fromInvestor"
                  class="d-flex flex-column flex-sm-row "
                >
                  <p class="mr-2">
                    Bank:
                    <span class="font-weight-bold ">{{
                      investment.investorDetails.bank
                    }}</span>
                  </p>
                  <p>
                    Acc No.
                    <span class="font-weight-bold">{{
                      investment.investorDetails.accountNumber
                    }}</span>
                  </p>
                </div>
                <div style="width:100%" class="d-flex justify-space-between">
                  <div>
                    Effective Date
                    <span class="font-weight-bold ml-2">{{
                      effectiveDate
                    }}</span>
                  </div>

                  <div>
                    <span class="mr-2 font-weight-bold">Status</span>
                    <v-chip
                      small
                      depressed
                      :color="
                        investment.status ? 'error' : 'success'
                      "
                      dark
                      class="text-uppercase"
                    >
                      {{investment.status ? 'Closed' : 'Active'}}
                    </v-chip>
                  </div>
                </div>
              </v-col>
              <v-col cols="12">
                <v-simple-table>
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">Principal Sum</th>
                        <th class="text-left">Interest Rate</th>
                        <th class="text-left">Distribution Amount</th>
                        <th class="text-left">Payout Frequency</th>
                        <th class="text-left">Distribution Date</th>
                        <th class="text-left">Expiring Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{{ investment.principalSum }}</td>
                        <td>{{ investment.interestRate }}</td>
                        <td>{{ investment.distributionAmount }}</td>
                        <td>{{ investment.payoutFrequency }}</td>
                        <td>{{ investment.distributionDate }}</td>
                        <td>{{ investment.expiringDate }}</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-data-table
          loading-text="Loading... Please wait"
          :headers="headers"
          :items="investment.schedule"
          sort-by="calories"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>Payment Schedule</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
            </v-toolbar>
          </template>
          <template v-slot:item.status="{ item }">
            <v-chip small :color="item.status ? 'success' : 'grey'" dark>{{
              item.status ? "Paid" : "Not paid"
            }}</v-chip>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-btn
              color="primary secondary--text"
              small
              depressed
              :disabled="item.status"
              @click="pay(item)"
            >
              Pay
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <v-row>
      <edit-investment
        :investment="investment"
        :dialog="dialog"
        :toggle="toggle"
      />
    </v-row>
  </v-container>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import EditInvestment from "../components/EditInvestment";
export default {
  props: {
    investment: Object,
    toggleView: Function,
  },
  filters: {
    date(val) {
      if (val) {
        return val.toLocaleString();
      } else {
        //dadfad
      }
    },
  },
  components: {
    EditInvestment,
  },

  data: () => ({
    effectiveDate: "",
    headers: [
      {
        text: "Month",
        align: "start",
        sortable: false,
        value: "month",
      },
      {
        text: "Day",
        value: "day",
      },

      {
        text: "Year",
        value: "year",
      },
      {
        text: "Ref No.",
        value: "ref",
      },
      {
        text: "Status",
        value: "status",
      },

      {
        text: "Pay",
        value: "actions",
        sortable: false,
      },
    ],
  }),
  computed: {
    ...mapGetters({ alert: "Get_Alert", dialog: "Get_Dialog" }),
  },

  created() {
    // this.effectiveDate = new Date(
    //   this.investment.effectiveDate
    // ).toLocaleDateString("en-NG");
    this.effectiveDate = new Date(
      `${this.investment.effectiveDate}`
    ).toLocaleDateString("en-NG");
  },
  methods: {
    ...mapMutations({ setAlert: "Set_Alert", setDialog: "Set_Dialog" }),
    toggle(value, type) {
      this.setDialog({ type, value });
    },
  },
};
</script>

<style></style>
