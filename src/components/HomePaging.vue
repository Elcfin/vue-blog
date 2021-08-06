<template>
  <div class="bar">
    <div class="btn"
         v-for="index in btnNumber"
         :class="{current:index===currentPage}"
         :key="index"
         @click="changeHomePage(index)">
      {{index}}
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  name: 'HomePaging',
  props: {
    pageNumber: Number
  },
  setup(props, context) {
    const currentPage = ref(1)
    const btnNumber = computed(() => props.pageNumber)
    const changeHomePage = (index) => {
      currentPage.value = index
      context.emit('changeHomePage', index)
    }
    return { currentPage, btnNumber, changeHomePage }
  }
}
</script>

<style lang='less' scoped>
@import '@/assets/style/base.less';

.bar {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 15px;
  height: 30px;
  line-height: 30px;

  .btn {
    &:extend(.common-block);

    padding: 0 10px;
    background-color: @light;
    border-radius: 3px;
    cursor: pointer;
    transition: color 0.6s, background-color 0.6s;

    &:hover {
      color: @font-color-light;
      background-color: @dark;
    }
  }

  .current {
    color: @font-color-light;
    background-color: @dark;
  }
}
</style>