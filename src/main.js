import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";

Vue.config.productionTip = false;

// Set up default vue http modules for api calls
Vue.prototype.$http = axios;
// Load the token from the localStorage
const token = localStorage.getItem("token");
// Any token will default axios auth headers
if (token) {
  Vue.prototype.$http.defaults.headers.common["Authorization"] = token;
}
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
