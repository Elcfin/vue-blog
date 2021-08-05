<template>
  <div>
    <div class="bar">
      <div class="btn"
           v-for="index in pageNumber"
           :class="{current:index===currentPage}"
           :key="index"
           @click="changeManagerPage(index)">
        {{index}}
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'ManagerPaging',
  props: {
    pageNumber: Number
  },
  setup(props, context) {
    const currentPage = ref(1)
    const changeManagerPage = (index) => {
      currentPage.value = index
      context.emit('changeManagerPage', index)
    }
    return { currentPage, changeManagerPage }
  }
}
</script>

<style lang='less' scoped>
@import '@/assets/style/base.less';

.bar {
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  height: 30px;
  line-height: 30px;

  .btn {
    padding: 0 10px;
    background-color: @light;
    border-radius: 3px;
    cursor: pointer;
    transition: background-color 0.6s;

    &:hover {
      background-color: @dark-grey;
    }
  }

  .current {
    background-color: @dark-grey;
  }
}
</style>