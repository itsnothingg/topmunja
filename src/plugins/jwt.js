"use strict";

import Vue from 'vue';
import _jwt from "jwt-decode";

const JwtPlugin = {
  install(Vue) {
    Vue.jwt = _jwt
    window.jwt = _jwt
    Object.defineProperties(Vue.prototype, {
      jwt: {
        get() {
          return _jwt
        }
      },
      $jwt: {
        get() {
          return _jwt
        }
      },
    });
  }
};

Vue.use(JwtPlugin)

export default JwtPlugin;
