<template>
  <div class="wrap">
    <div class="btn"
         @click="login">
    </div>
    <div class="input-wrap">
      <input type="password"
             placeholder="password"
             class="input"
             v-model="password" />
    </div>
    <div class="btn"
         @click="logout">
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'LoginInput',
  setup(props, context) {
    const password = ref('')

    /* 登录 */
    const login = () => {
      context.emit('login', password.value)
      password.value = ''
    }

    /* 登出 */
    const logout = () => {
      context.emit('logout')
    }

    return { password, login, logout }
  }
}
</script>

<style lang='less' scoped>
@import '@/assets/style/base.less';

.wrap {
  display: flex;
  gap: 10px;
  margin: 20px 0;

  .input-wrap {
    box-sizing: border-box;
    flex: 1;
    height: 48px;
    font-family: Tahoma;
    border: 2px double @dark;
    border-radius: 20px;
    overflow: hidden;
    transition: border 0.6s;

    .input {
      box-sizing: border-box;
      padding: 0 20px;
      width: 100%;
      height: 44px;
      font-family: Tahoma;
      font-size: 16px;
      border: none;
      outline: none;
    }
  }

  .input-wrap:hover {
    border: 2px double @dark-grey;
  }

  .btn {
    box-sizing: border-box;
    width: 24px;
    background-color: @dark;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.6s;
  }

  .btn:hover {
    background-color: @dark-grey;
  }
}
</style>