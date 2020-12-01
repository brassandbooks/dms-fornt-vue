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
    <v-row justify="center">
      <v-col cols="12" class="py-0 d-flex justify-space-between">
        <v-btn @click="refresh" text color="primary">
          <v-icon>mdi-autorenew</v-icon>
          Refresh
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          depressed
          color="primary secondary--text"
          dark
          class="mb-2"
          @click.stop="toggle(true, 'investor')"
          >New Investors</v-btn
        >
      </v-col>
      <v-col cols="12">
        <v-data-table
          :search="search"
          :loading="loading.investors"
          loading-text="Loading... Please wait"
          :headers="headers"
          :items="investors"
          sort-by="calories"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>INVESTORS</v-toolbar-title>
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
              @click="viewInvestor(item)"
            >
              view
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
      <v-col cols="12">
        <add-investor :dialog="dialog" :toggle="toggle" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import AddInvestor from "../components/AddInvestor";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "Home",
  components: {
    AddInvestor,
  },
  data: () => ({
    search: "",
    headers: [
      {
        text: "Name",
        align: "start",
        sortable: false,
        value: "firstName",
      },
      {
        text: "Last Name",
        value: "lastName",
      },
      {
        text: "Email",
        value: "email",
      },
      {
        text: "Phone Number",
        value: "phoneNumber",
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
      alert: "Get_Alert",
      investors: "Get_Investors",
      user: "Get_User",
      loading: "Get_Loading",
      dialog: "Get_Dialog",
    }),
  },
  created() {
    this.$store.dispatch("initInvestors");
  },
  methods: {
    ...mapMutations({
      setAlert: "Set_Alert",
      setDialog: "Set_Dialog",
    }),

    toggle(value, type) {
      this.setDialog({
        type,
        value,
      });
    },

    viewInvestor(investor) {
      this.$router.push(`/investor/${investor._id}`);
    },

    closeAlert() {
      this.setAlert({
        is: false,
        type: "",
        text: "",
      });
    },
    refresh() {
      this.$store.dispatch("initInvestors");
    },
  },
};
</script>
