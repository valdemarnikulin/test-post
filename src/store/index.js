// store.js
import Vue from "vue";
import Vuex from "vuex";
import { posts } from "@/posts.json";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    posts: [],
    search: ""
  },
  mutations: {
    SET_POSTS(state, posts) {
        if (Array.isArray(posts)) {
          state.posts = posts;
        } else {
          state.posts = [posts];
        }
      },
      ADD_POST(state, post) {
      state.posts.unshift(post);
    },
    DELETE_POST(state, postId) {
      const index = state.posts.findIndex((p) => p.id === postId);
      if (index !== -1) {
        state.posts.splice(index, 1);
      }
    },
  },
  actions: {
    loadPosts({ commit }) {
        if (Array.isArray(posts)) {
          commit("SET_POSTS", posts);
        } else {
          commit("SET_POSTS", [posts]);
        }
      },
    addPost({ commit }, post) {
      commit("ADD_POST", post);
    },
    deletePost({ commit }, postId) {
      commit("DELETE_POST", postId);
    },
  },
  getters: {
    filteredPosts: (state) => {
        if (state.search) {
          return state.posts.filter((post) => {
            return post.name.toLowerCase().includes(state.search.toLowerCase());
          });
        } else {
          return state.posts;
        }
      },
  },
  modules: {},
});

export default store;
