import Vue from 'vue';
import Vuetify from 'vuetify/lib';
// import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({

    theme: {
        themes: {
          light: {
            primary: "#00003D",
            secondary: "#94DA44",
            accent: "#5D43AE"
          },
        },
      },
});
