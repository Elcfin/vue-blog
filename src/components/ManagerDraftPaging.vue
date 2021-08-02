<template>
  <div>
    <common-content class="bar">
      <div class="btn"
           v-for="item in btns"
           :class="{current:item===currentDraftPage}"
           :key="item"
           @click="currentDraftPage=item;
           changeDraftPage()">{{item}}</div>
    </common-content>
  </div>
</template>

<script>
import CommonContent from '@/components/CommonContent.vue'
import { inject } from 'vue'
import { getDraftPageNumber as apiGetDraftPageNumber } from '@/api/'

export default {
  name: 'ManagerDraftPaging',
  components: { CommonContent },
  setup() {
    const state = inject('state')
    return { state }
  },
  data: function () {
    return {
      currentDraftPage: 1,
      btns: []
    }
  },
  created: async function () {
    const data = {
      size: this.state.pagingSize
    }
    const res = await apiGetDraftPageNumber(data)
    const draftPageNumber = res.data.draftPageNumber

    for (let i = 1; i <= draftPageNumber; i++) {
      this.btns.push(i)
    }
  },
  methods: {
    changeDraftPage: function () {
      this.$emit('changeDraftPage', this.currentDraftPage)
    }
  }
}
</script>

<style lang='less' scoped>
@import '@/assets/style/base.less';

.bar {
  display: flex;
  justify-content: center;
  gap: 10px;
  padding: 0;
  height: 30px;
  color: @font-color-dark;
  line-height: 30px;

  .btn {
    padding: 0 10px;
    color: @font-color-dark;
    background-color: @light;
    border-radius: 3px;
    cursor: pointer;
    transition: background-color 0.6s;
  }

  .btn:hover {
    background-color: @dark-grey;
  }

  .current {
    background-color: @dark-grey;
  }
}
</style>