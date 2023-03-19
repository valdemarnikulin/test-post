<template>
  <div class="add-post">
    <el-form ref="postForm" :model="newPost" :rules="postRules">
      <el-form-item class="add-post__wrapper" prop="post">
        <p class="add-post__label">New post</p>
        <el-input
          class="add-post__input"
          type="textarea"
          v-model="newPost.post"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">Add Post</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newPost: {
        post: "",
      },
      postRules: {
        post: [
          { required: true, message: "Please enter a title", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm() {
      this.$refs.postForm.validate((valid) => {
        if (valid) {
          this.$emit("addNewPost", this.newPost.post);
          this.$refs.postForm.resetFields();
        } else {
          this.$message.error("Please fill in all required fields");
        }
      });
    },
  },
};
</script>

<style lang="scss">
.add-post {
  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  &__label {
    text-align: left;
  }
}

.el-form-item__content {
  margin-left: 0 !important;
  width: 40%;
}
</style>