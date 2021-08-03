<template>
  <div>
    <common-content class="common-content">
      <div class="page-title">
        <slot name="title"></slot>
      </div>
      <slot name="bar">
        <div class="bar">
          <div class="bar-title"
               v-for="item in barTitles"
               :class="{title:'title'===item.enTitle,
             date:'date'===item.enTitle}"
               :key="item.enTitle">{{item.znTitle}}</div>
          <img class="icon"
               src="@/assets/editor.png"
               alt="edit">
          <img class="icon"
               src="@/assets/editor.png"
               alt="edit">
          <img class="icon"
               src="@/assets/editor.png"
               alt="edit">
        </div>
      </slot>
      <div class="items">
        <slot name="items"></slot>
      </div>
      <slot name="btns"></slot>
      <slot name="tags"></slot>
    </common-content>
  </div>
</template>

<script>
import CommonContent from '@/components/CommonContent.vue'

export default {
  name: 'ManagerContent',
  components: {
    CommonContent
  },
  data: function () {
    return {
      barTitles: [
        { enTitle: 'title', znTitle: '标题' },
        { enTitle: 'date', znTitle: '日期' }
      ],
      icons: [
        { icon: require('../assets/editor.png'), name: 'editor' },
        { icon: require('../assets/delete.png'), name: 'delete' }
      ]
    }
  }
}
</script>

<style lang='less' scoped>
@import '@/assets/style/base.less';

.common-content {
  padding: 20px;

  .page-title {
    margin-bottom: 20px;
    color: @font-color-dark;
    font-weight: bold;
    font-size: 20px;
  }

  .bar {
    display: flex;
    gap: 10px;
    color: @font-color-dark;

    .title,
    .date {
      box-sizing: border-box;
      padding-left: 8px;
      height: 30px;
      line-height: 30px;
      border-left: 2px double @dark;
    }

    .title {
      flex: 2;
    }

    .date {
      flex: 1;
    }

    .icon {
      visibility: hidden;
      height: 20px;
    }
  }

  .items {
    margin-bottom: 20px;
  }
}
</style>