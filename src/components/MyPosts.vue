<template>
  <el-card class="posts">
    <div>
      <div class="posts__search-wrapper">
        <p>Search</p>
        <el-input
          class="posts__search-input"
          placeholder="Search by name"
          v-model="search"
          clearable
          @clear="handleSearchClear"
        ></el-input>
      </div>
      <add-post @addNewPost="addNewPost" />
      <el-table
        :data="displayedTableData"
        style="width: 100%"
        :empty-text="'No data'"
      >
        <template v-slot:empty>
          <div class="text-center">
            <span>No data</span>
          </div>
        </template>
        <el-table-column prop="name" label="Name">
          <template slot-scope="scope">
            <div
              @click="highlighted = scope.row.id"
              @mouseover="highlighted = scope.row.id"
              @mouseout="highlighted = null"
              :class="{
                table__column: true,
                'highlighted-row': highlighted === scope.row.id,
              }"
              class="posts__row"
            >
              <el-input
                v-if="editing === scope.row.id"
                v-model="scope.row.name"
                size="small"
                class="table__input"
              ></el-input>
              <span v-else>{{ scope.row.name }}</span>
              <el-button-group>
                <el-button
                  v-if="editButton !== scope.row.id"
                  type="primary"
                  icon="el-icon-edit"
                  :disabled="checkEditingDisabled(scope.row)"
                  @click="validateName(scope.row)"
                ></el-button>
                <el-button
                  v-else
                  type="success"
                  icon="el-icon-check"
                  :disabled="checkEditingDisabled(scope.row)"
                  @click="acceptEditPost(scope.row)"
                ></el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="deletePost(scope.row.id)"
                ></el-button>
              </el-button-group>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="currentPage"
        :page-size="pageSize"
        :total="totalPosts"
        background
        layout="prev, pager, next"
        @current-change="handlePageChange"
      ></el-pagination>
    </div>
  </el-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AddPost from "./AddPost.vue";
import posts from "@/posts.json";
import { v4 as uuidv4 } from "uuid";

export default {
  name: "MyPosts",
  components: {
    AddPost,
  },
  computed: {
    ...mapGetters(["filteredPosts"]),
    displayedTableData() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      const filteredData = this.filterData(this.filteredPosts, this.search);
      return filteredData.slice(start, end);
    },
    totalPosts() {
      return this.filteredPosts.length;
    },
  },
  data() {
    return {
      search: "",
      editing: null,
      highlighted: null,
      currentPage: 1,
      pageSize: 10,
      editButton: null,
    };
  },
  created() {
    this.loadPosts(posts.posts);
  },
  methods: {
    ...mapActions(["loadPosts", "addPost", "deletePost"]),
    checkEditingDisabled(row) {
      return this.editing === row.id && row.name.length < 3;
    },
    acceptEditPost() {
      this.editing = null;
      this.editButton = null;
    },
    filterData(data, searchQuery) {
      if (searchQuery.length === 0) {
        return data;
      }
      const lcSearchQuery = searchQuery.toLowerCase();
      return data.filter((row) =>
        Object.values(row).some((value) =>
          value.toString().match(new RegExp(lcSearchQuery, "i"))
        )
      );
    },

    validateName(row) {
      this.editing = row.id;
      this.editButton = row.id;
    },
    addNewPost(post) {
      const newPost = {
        id: uuidv4(),
        name: post,
      };
      this.addPost(newPost);
    },
    handlePageChange(currentPage) {
      this.currentPage = currentPage;
    },
    handleSearchClear() {
      this.search = "";
    },
  },
};
</script>

<style lang="scss">
.posts {
  margin: 20px;
  &__search {
    &-wrapper {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
    &-input {
      max-width: 30%;
    }
  }
  &__row {
    display: flex;
    align-items: center;
  }
}
.table {
  &__column {
    display: flex;
    justify-content: space-between;
  }
  &__input {
    max-width: 80%;
  }
}
.highlighted-row {
  background-color: #e6f7ff;
}
</style>
