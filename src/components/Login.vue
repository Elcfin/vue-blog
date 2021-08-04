<template>
  <!-- 正常情况下不会在宽度较小的页面出现 -->
  <div>
    <common-content class="common-content">
      <div class="title">Login</div>
      <login-input @login="login"
                   @logout="logout">
      </login-input>
    </common-content>
  </div>
</template>

<script>
import CommonContent from '@/components/CommonContent.vue'
import LoginInput from '@/components/LoginInput.vue'

import { login as apiLogin } from '@/api/'
import { awaitWraper, processApiError } from '@/utils'

export default {
  name: 'Login',
  components: {
    CommonContent,
    LoginInput
  },
  setup() {
    const login = async (password) => {
      const data = { password }
      const result = await awaitWraper(apiLogin(data))
      if (result[0]) {
        processApiError(result[0])
      } else {
        /* 将 token 存入 session */
        window.sessionStorage.setItem('token', result[1].data.token)
      }
    }

    const logout = () => {
      /* 将 token 从 session 中删除 */
      window.sessionStorage.removeItem('token')
    }

    return { login, logout }
  }
}
</script>

<style lang='less' scoped>
@import '@/assets/style/base.less';

.common-content {
  padding: 60px;

  .title {
    font-weight: bold;
    font-size: 24px;
  }
}
</style>