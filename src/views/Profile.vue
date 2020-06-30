<template>
  <div>
    <h2>Profile</h2>
    <div class="card" v-if="user">
      <ul class="list-group">
        <li class="list-group-item">Email: {{ user.email }}</li>
        <li class="list-group-item">Username: {{ user.username }}</li>
        <li class="list-group-item">Name: {{ user.name }}</li>
      </ul>
    </div>
    <h2>Edit Profile</h2>
    <form @submit.prevent="editUser">
      <div class="form-group">
        <label for="email">Email:</label>
        <input
          type="text"
          class="form-control"
          :placeholder="user.email"
          name="email"
          id="email"
          v-model="email"
        />
      </div>
      <div class="form-group">
        <label for="username">Username:</label>
        <input
          type="text"
          class="form-control"
          :placeholder="user.username"
          name="username"
          id="username"
          v-model="username"
        />
      </div>
      <div class="form-group">
        <label for="name">Name:</label>
        <input
          type="text"
          class="form-control"
          :placeholder="user.name"
          name="name"
          id="name"
          v-model="name"
        />
      </div>
      <button class="card-btn btn btn-primary">Update</button>
    </form>
  </div>
</template>


<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      userId: "",
      username: "",
      email: "",
      name: ""
    };
  },
  computed: mapGetters(["user"]),
  methods: {
    ...mapActions(["getProfile", "updateUser"]),
    editUser() {
      let userData = {
        userId: this.user._id,
        username: this.username,
        email: this.email,
        name: this.name
      };
      console.log(userData);
      this.updateUser(userData)
        .then(res => {
          if (res.data.success) {
            this.$router.push("/");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.getProfile();
  }
};
</script>

<style>
</style>
