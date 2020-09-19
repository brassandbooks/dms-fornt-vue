<template>
<v-container >
    
        <v-snackbar
        top
        centered
        dark
        :color="alert.type"
      v-model="alert.is"
    >
      {{ alert.text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="primary"
          text
          v-bind="attrs"
          @click="closeAlert"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <div v-if="investor !== null">
    <v-row no-gutters>
        <v-col cols="12" class="py-2 d-flex justify-space-between">
            <v-btn to="/" text depressed color="primary" class="mb-2">
                <v-icon>mdi-arrow-left</v-icon>
                Go Back
            </v-btn>

     <v-btn  color="primary secondary--text " dark class="mb-2"   @click.stop="toggle(true, 'investment')" >New Investment</v-btn>
        </v-col>
        <v-col cols="12">
            <v-card class="px-3">
                <v-card-title class=" text-subtitle-1">
                    {{`${investor.firstName} ${investor.lastName} ${investor.otherNames}`}}
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <div>
                        Total Investments <span class="secondary py-1 px-2 rounded font-weight-medium">{{allInvestments.length}}</span>
                    </div>
                </v-card-title>
                <v-divider class="mx-4" inset></v-divider>
                <v-card-text>
                    <v-row>
                        <v-col cols="12" class="pt-0">
                            <v-row no-gutters justify="space-between" align="start">
                                <v-col cols="10">
                                    <div class="headline mb-1">Personal</div>

                                    <div class="d-flex flex-column flex-md-row">
                                        <div class="mr-4">
                                            <span class="font-weight-medium">Email:</span>
                                            {{investor.email}}
                                        </div>
                                        <div>
                                            <span class="font-weight-medium">Phone Number:</span>
                                            {{investor.phoneNumber}}
                                        </div>
                                    </div>
                                    <div class="d-flex flex-column flex-md-row mt-2">
                                        <div class="mr-4">
                                            <span class="font-weight-medium">Bank:</span>
                                            {{investor.bank}}
                                        </div>
                                        <div>
                                            <span class="font-weight-medium">Account Number:</span>
                                            {{investor.accountNumber}}
                                        </div>
                                    </div>
                                </v-col>
                                <v-col cols="2" class="d-flex align-center justify-end" >
                                    
                                    <v-btn  @click.stop="toggle(true, 'update')" outlined depressed color="primary">
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
    
    <v-row >
        <investments />
    </v-row>
    <v-row >
    <add-investment :investor="investor" :dialog="dialog" :toggle="toggle"/>
    </v-row>
    <v-row >
    <edit-investor :investor="investor" :dialog="dialog" :toggle="toggle"/>
    </v-row>

    </div>
    <v-row justify="center" align="center" style="height:100vh" v-if="investor === null">
         <v-progress-circular
         :size="50"
      indeterminate
      color="primary"
    ></v-progress-circular>
    </v-row>
</v-container>
</template>

<script>
import {
    mapGetters, mapActions, mapMutations
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
       
    }),
    computed: {
        ...mapGetters({
            alert:"Get_Alert", dialog:"Get_Dialog",
            investor:"Get_Investor",
            allInvestments: 'Get_Investment'
        }),

    },
    created(){
        this.getInvestor(this.$route.params.id)
        this.getInvestment(this.$route.params.id)
    },
    methods: {
        ...mapMutations({setAlert :"Set_Alert", setDialog:"Set_Dialog"}),
        ...mapActions(['getInvestor', 'getInvestment']),

        toggle(value, type){
            this.setDialog({type, value})
            console.log(this.dialog);
        },
        closeAlert(){
            this.setAlert({is:false, type:"", text:""})
        }
            

    }
}
</script>

<style>

</style>
