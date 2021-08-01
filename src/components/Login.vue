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
        const _this = this
        window.sessionStorage.setItem('token', result.data.token)
        _this.state.token_status = true
        setTimeout(() => (_this.state.token_status = false), 3600000)
      } catch (e) {
        console.log(e.message)
      }
    },
    logout() {
      window.sessionStorage.removeItem('token')
      this.state.token_status = false
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