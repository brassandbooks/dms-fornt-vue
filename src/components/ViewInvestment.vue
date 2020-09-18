<template>
  <v-container>
      <v-row>
      <v-col cols="12">
          <v-card>
              <v-card-title class=" text-subtitle-1">
                    Investment ID: {{investment.investorID}}
                  <v-divider  class="mx-4"  vertical></v-divider>
                  <v-spacer></v-spacer>
                  <v-btn @click="toggleView(false)"  small outlined color="primary">
                      <v-icon small class="mr-2 ml-n2">
                          mdi-close
                      </v-icon>
                      close
                  </v-btn>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                 <v-row>
                     <v-col cols="12" sm="6" class="text-subtitle-1">
                         Principal Sum: <span class="font-weight-medium">N{{investment.principalSum}}</span>
                     </v-col>
                 </v-row>
              </v-card-text>
          </v-card>
      </v-col>
  </v-row>
  </v-container>
</template>

<script>
export default {
    props: {
        investment: Object,
        toggleView:Function
    },

    data :()=>({

    })
}
</script>

<style>

</style>