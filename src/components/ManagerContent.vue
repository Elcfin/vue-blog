<template>
  <div>
    <common-content class="common-content">
      <div class="top-bar">
        <slot name="title"></slot>
        <slot name="top-icon"></slot>
      </div>
      <slot name="nav-bar">
        <div class="nav-bar">
          <div class="nav-title"
               v-for="title in titles"
               :key="title">{{title}}</div>
          <!-- 使标题栏和下面对齐 -->
          <img src="@/assets/edit.png"
               alt="placeholder"
               class="icon"
               v-for="index in 3"
               :key="index">
        </div>
      </slot>
      <slot name="items"></slot>
      <slot name="paging"></slot>
    </common-content>
  </div>
</template>

<script>
import { reactive } from 'vue'
import CommonContent from '@/components/CommonContent.vue'

export default {
  name: 'ManagerContent',
  components: {
    CommonContent
  },
  setup() {
    const titles = reactive(['标题', '日期'])
    return { titles }
  }
}
</script>

<style lang='less' scoped>
@import '@/assets/style/base.less';

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 20px;
}

.nav-bar {
  display: flex;
  gap: 10px;

  .nav-title {
    padding-left: 8px;
    height: 30px;
    line-height: 30px;
    border-left: 2px double @dark;

    &:nth-child(1) {
      flex: 2;
    }

    &:nth-child(2) {
      flex: 1;
    }
  }

  .icon {
    visibility: hidden;
    height: 20px;
  }
}
</style>