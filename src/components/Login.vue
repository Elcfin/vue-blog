<template>
  <div>
    <common-content class="common-content">
      <div class="title">Login</div>
      <login-input @login="login"
                   @logout="logout"></login-input>
    </common-content>
  </div>
</template>

<script>
import CommonContent from '@/components/CommonContent.vue'
import LoginInput from '@/components/LoginInput.vue'
import { inject } from 'vue'
import { login as apiLogin } from '@/api/'

export default {
  name: 'Login',
  components: { CommonContent, LoginInput },
  setup() {
    const state = inject('state')
    return { state }
  },
  methods: {
    async login(password) {
      const data = {
        password
      }

      try {
        const result = await apiLogin(data)
        window.sessionStorage.setItem('token', result.data.token)
      } catch (e) {
        console.log(e.message)
      }
    },
    logout() {
      window.sessionStorage.removeItem('token')
    }
  }
}
</script>

<style lang='less' scoped>
@import '@/assets/style/base.less';

.common-content {
  padding: 60px;
  max-width: 400px;
  height: 600px;

  .title {
    color: @font-color-dark;
    font-weight: bold;
    font-size: 24px;
  }
}
</style>