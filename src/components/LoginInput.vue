<template>
  <div class="wrap">
    <div class="btn"
         @click="login"></div>
    <div class="input-wrap">
      <input type="password"
             placeholder="password"
             v-model="password" />
      <!-- <span class="notes">password</span> -->
    </div>
    <div class="btn"
         @click="logout"></div>
  </div>
</template>

<script>
export default {
  name: 'LoginInput',
  data: function () {
    return {
      password: ''
    }
  },
  methods: {
    login: function () {
      this.$emit('login', this.password)
      this.password = ''
    },
    logout: function () {
      this.$emit('logout')
    }
  }
}
</script>

<style lang='less' scoped>
@import '@/assets/style/base.less';

.wrap {
  display: flex;
  align-items: center;
  gap: 10px;

  .input-wrap {
    box-sizing: border-box;
    flex: 1;
    margin: 20px 0;
    height: 48px;
    font-family: Tahoma;
    border: 2px double @dark;
    border-radius: 20px;

    & > input[type='password'] {
      box-sizing: border-box;
      /*     flex: 1; */
      padding: 0 20px;
      width: 100%;
      height: 44px;
      font-family: Tahoma;
      font-size: 16px;
      border: none;
      background: transparent;
      outline: none;
    }
  }

  .btn {
    box-sizing: border-box;
    margin: 20px 0;
    width: 24px;
    height: 48px;
    color: @font-color-light;
    background-color: @dark;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.6s;
  }

  .btn:hover {
    background-color: @grey;
  }
}
</style>