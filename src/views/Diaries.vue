<template>
  <div>
    <h2>Diary</h2>
    <router-link class="card-btn btn btn-primary" to="/createDiary">Create Diary</router-link>
    <div v-for="(items, index1) in diaries" :key="index1">
      <div v-for="(item, index2) in items" :key="index2">
        <div class="card-info">
          <div class="card-title">{{ item.title }}</div>
          <p>{{item.date}}</p>
          <p>{{item.content}}</p>
          <router-link class="card-btn btn btn-primary" :to="{path: '/diaries/'+item._id}">Edit</router-link>
        </div>
      </div>
    </div>

    <link
      href="https://fonts.googleapis.com/css2?family=Montserrat:wght@800&display=swap"
      rel="stylesheet"
    />
  </div>
</template>


<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      diary: []
    };
  },
  computed: { ...mapGetters(["diaries"]) },
  methods: {
    ...mapActions(["getDiaries"])
  },
  created() {
    this.getDiaries();
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
}
.card {
  margin: 50px auto;
  width: 356px;
  background-color: white;
  text-align: center;
  border-radius: 10px;
  box-shadow: 0px 3px 6px rgb(60, 76, 80);
}
.card-info {
  margin: 50px auto;
  background-color: white;
  text-align: center;
  border-radius: 10px;
  box-shadow: 0px 3px 6px rgb(60, 76, 80);
  padding: 33px 30px 30px 30px;
}

.card-info .card-title {
  font-family: "Montserrat", sans-serif;
  color: rgb(49, 150, 175);
  font-size: 24px;
  line-height: 34px;
  font-weight: bold;
}
.card-info p {
  color: rgb(182, 152, 116);
  font-size: 16px;
  line-height: 20px;
  font-weight: 400;
  margin: 18px 0px 24px;
}
.card-info .card-btn {
  color: azure;
  font-size: 16px;
  line-height: 22px;
  font-weight: bold;
  padding: 14px 42px;
  border-radius: 60px;
  display: inline-block;
}
</style>
