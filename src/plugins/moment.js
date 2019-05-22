"use strict";

import Vue from 'vue';
import moment from "moment";

const MomentPlugin = {
  install(Vue) {
    Vue.moment = moment
    window.moment = moment
    Object.defineProperties(Vue.prototype, {
      moment: {
        get() {
          return moment
        }
      },
      $moment: {
        get() {
          return moment
        }
      },
    });
  }
};

Vue.use(MomentPlugin)

export default MomentPlugin;
