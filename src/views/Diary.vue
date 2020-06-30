<template>
  <div>
    <h2>Diary</h2>
    <div class="card-info">
      <div v-for="(item, index) in diary" :key="index">
        <form @submit.prevent="editDiary">
          <div class="form-group">
            <label for="title">Title:</label>
            <input
              class="card-title"
              type="text"
              :placeholder="item.title"
              name="title"
              id="title"
              v-model="title"
            />
          </div>
          <div class="form-group">
            <label for="date">Date:</label>
            <input
              type="date"
              class="form-control"
              :placeholder="item.date"
              name="date"
              id="date"
              v-model="date"
            />
          </div>
          <div class="form-group">
            <label for="content">Content:</label>
            <textarea
              rows="10"
              cols="100%"
              type="text"
              class="form-control"
              :placeholder="item.content"
              name="content"
              id="content"
              v-model="content"
            />
          </div>

          <button class="card-btn btn btn-primary">Update</button>
          <button class="card-btn btn btn-danger" @click="deleted()">Delete</button>
        </form>
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
      diaryId: "",
      title: "",
      content: "",
      date: ""
    };
  },
  computed: { ...mapGetters(["diary"]) },
  methods: {
    ...mapActions(["getDiary", "updateDiary", "deleteDiary"]),
    editDiary() {
      let diaryData = {
        diaryId: this.$route.params.diaryId,
        title: this.title,
        content: this.content,
        date: this.date
      };
      console.log(mapGetters(["diary"]));
      this.updateDiary(diaryData)
        .then(res => {
          if (res.data.success) {
            this.$router.push("/");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleted() {
      this.deleteDiary(this.$route.params.diaryId)
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
    this.getDiary(this.$route.params.diaryId);
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
.card-info textarea {
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
