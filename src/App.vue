<template>
  <div id="app">
    <Navbar></Navbar>
    <div class="container">
      <Errors v-if="error" :msg="error"></Errors>
      <router-view />
    </div>
    <!-- <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </div>-->
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Navbar from "./components/Navbar";
import Errors from "./components/Errors";
export default {
  components: {
    Navbar,
    Errors
  },
  computed: {
    ...mapGetters(["error"])
  }
};
</script>
<style>
</style>
