<template>
  <div>
    <h2>Create Diary</h2>
    <div class="card-info">
      <form @submit.prevent="newDiary">
        <div class="form-group">
          <label for="title">Title:</label>
          <input
            class="card-title"
            id="title"
            type="text"
            placeholder="Title"
            v-model="title"
            name="title"
          />
        </div>
        <div class="form-group">
          <label for="date">Date:</label>
          <input
            class="form-control"
            id="date"
            type="date"
            placeholder="Date"
            v-model="date"
            name="date"
          />
        </div>
        <div class="form-group">
          <label for="content">Content:</label>
          <textarea
            class="form-control"
            rows="10"
            cols="100%"
            id="content"
            type="text"
            placeholder="Content"
            v-model="content"
            name="content"
          />
        </div>
        <button class="card-btn btn btn-primary">Post</button>
      </form>
    </div>
    <link
      href="https://fonts.googleapis.com/css2?family=Montserrat:wght@800&display=swap"
      rel="stylesheet"
    />
  </div>
</template>


<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      title: "",
      content: "",
      date: ""
    };
  },
  methods: {
    ...mapActions(["insertDiary"]),
    newDiary() {
      let diaryData = {
        title: this.title,
        content: this.content,
        date: this.date
      };
      console.log(diaryData);

      this.insertDiary(diaryData)
        .then(res => {
          if (res.data.success) {
            this.$router.push("diaries");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
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
