import Vue from 'vue';
import Vuetify from 'vuetify/lib';
// import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({

    theme: {
        themes: {
          light: {
            primary: "#283444",
            secondary: "#CFE471",
            accent: "#00B0FF"
          },
        },
      },
});
