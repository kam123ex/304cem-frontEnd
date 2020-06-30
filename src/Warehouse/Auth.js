import axios from "axios";
import router from "../router";

const state = {
  token: localStorage.getItem("token") || "",
  user: {},
  diaries: {},
  diary: {},
  status: "",
  error: null,
};
// Check true or false?
const getters = {
  // isLoggedIn: function(state) {
  //   if (state.token != "") {
  //     console.log(state.token);
  //     return true;
  //   } else {
  //     return false;
  //   }
  // },
  isLoggedIn: (state) => !!state.token,
  authState: (state) => state.status,
  user: (state) => state.user,
  diaries: (state) => state.diaries,
  diary: (state) => state.diary,
  error: (state) => state.error,
};

const actions = {
  // Login Action
  async login({ commit }, user) {
    commit("auth_request");
    try {
      let res = await axios.post("http://localhost:3000/api/users/login", user);
      if (res.data.success) {
        const token = res.data.token;
        const user = res.data.user;
        // Store the token into the localstorage
        localStorage.setItem("token", token);
        // Set the axios defaults
        axios.defaults.headers.common["Authorization"] = token;
        commit("auth_success", token, user);
      }
      return res;
    } catch (err) {
      commit("auth_error", err);
    }
  },
  // Register User
  async register({ commit }, userData) {
    try {
      commit("register_request");
      let res = await axios.post(
        "http://localhost:3000/api/users/register",
        userData
      );
      if (res.data.success !== undefined) {
        commit("register_success");
      }
      return res;
    } catch (err) {
      commit("register_error", err);
    }
  },
  // Get the user Profile
  async getProfile({ commit }) {
    commit("profile_request");
    let res = await axios.get("http://localhost:3000/api/users/profile");
    commit("user_profile", res.data.user);
    return res;
  },
  // Get the user Profile
  async updateUser({ commit }, userData) {
    console.log(userData);
    try {
      commit("updateUser_request");
      let res = await axios.put(
        "http://localhost:3000/api/users/update/" + userData.userId,
        userData
      );
      if (res.data.success !== undefined) {
        commit("updateUser_success");
      }
      console.log(res.data);
      return res;
    } catch (err) {
      commit("updateUser_error", err);
    }
  },

  // Logout the user
  async logout({ commit }) {
    await localStorage.removeItem("token");
    commit("logout");
    delete axios.defaults.headers.common["Authorization"];
    router.push("/login");
    return;
  },
  // Diary Action
  async getDiary({ commit }, diaryId) {
    try {
      commit("diary_request");
      let res = await axios.get("http://localhost:3000/api/diaries/" + diaryId);
      commit("diary_data", res.data);
      return res;
    } catch (err) {
      commit("diary_error", err);
    }
  },

  async insertDiary({ commit }, diaryData) {
    try {
      commit("insert_request");
      let res = await axios.post(
        "http://localhost:3000/api/diaries/insert",
        diaryData
      );
      if (res.data.success !== undefined) {
        commit("insert_success");
      }
      console.log(res.data);
      return res;
    } catch (err) {
      commit("insert_error", err);
    }
  },

  async updateDiary({ commit }, diaryData) {
    console.log(diaryData);

    try {
      commit("updateDiary_request");
      let res = await axios.put(
        "http://localhost:3000/api/diaries/update/" + diaryData.diaryId,
        diaryData
      );
      if (res.data.success !== undefined) {
        commit("updateDiary_success");
      }
      console.log(res.data);
      return res;
    } catch (err) {
      commit("updateDiary_error", err);
    }
  },

  async deleteDiary({ commit }, diaryId) {
    try {
      commit("diary_request");
      let res = await axios.delete(
        "http://localhost:3000/api/diaries/delete/" + diaryId
      );
      if (res.data.success !== undefined) {
        commit("deleteDiary_success");
      }
      console.log(res.data);
      return res;
    } catch (err) {
      commit("diary_error", err);
    }
  },
  // Diary Action
  async getDiaries({ commit }) {
    try {
      commit("diaries_request");
      let res = await axios.get("http://localhost:3000/api/diaries");
      commit("diaries_data", res.data);
      console.log(res.data);
      return res;
    } catch (err) {
      commit("diaries_error", err);
    }
  },
};

const mutations = {
  auth_request(state) {
    state.error = null;
    state.status = "loading";
  },
  auth_success(state, token, user) {
    state.token = token;
    state.user = user;
    state.status = "success";
    state.error = null;
  },
  auth_error(state, err) {
    state.error = err.response.data.msg;
  },
  register_request(state) {
    state.error = null;
    state.status = "loading";
  },
  register_success(state) {
    state.error = null;
    state.status = "success";
  },
  register_error(state, err) {
    state.error = err.response.data.msg;
  },
  logout(state) {
    state.error = null;
    state.status = "";
    state.token = "";
    state.user = "";
  },
  profile_request(state) {
    state.status = "loading";
  },
  user_profile(state, user) {
    state.user = user;
  },
  diaries_request(state) {
    state.error = null;
    state.status = "loading";
  },
  insert_request(state) {
    state.error = null;
    state.status = "loading";
  },
  insert_success(state) {
    state.error = null;
    state.status = "success";
  },
  insert_error(state, err) {
    state.error = err.response.data.msg;
  },
  diaries_data(state, diaries) {
    state.diaries = diaries;
  },
  diaries_error(state, err) {
    state.error = err.response.data.msg;
  },
  diary_request(state) {
    state.error = null;
    state.status = "loading";
  },
  diary_data(state, diary) {
    state.diary = diary;
  },
  diary_error(state, err) {
    state.error = err.response.data.msg;
  },
  updateDiary_request(state) {
    state.error = null;
    state.status = "loading";
  },
  updateDiary_success(state) {
    state.error = null;
    state.status = "success";
  },
  updateDiary_error(state, err) {
    state.error = err.response.data.msg;
  },
  updateUser_request(state) {
    state.error = null;
    state.status = "loading";
  },
  updateUser_success(state) {
    state.error = null;
    state.status = "success";
  },
  updateUser_error(state, err) {
    state.error = err.response.data.msg;
  },
  deleteDiary_success(state) {
    state.error = null;
    state.status = "success";
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
