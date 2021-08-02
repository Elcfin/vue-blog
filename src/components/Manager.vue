<template>
  <div class="wrap">
    <manager-content class="manager-content">
      <template v-slot:title>
        标签
      </template>
      <template v-slot:bar>
        <div class="null"></div>
      </template>
    </manager-content>
    <manager-content class="manager-content">
      <template v-slot:title>
        草稿
      </template>
      <template v-slot:items>
        <div class="items">
          <div class="item"
               v-for="(item,index) in drafts"
               :key="index">
            <div class="title">{{item.title}}</div>
            <div class="date">{{item.createTime}}</div>
            <img class="icon"
                 src="@/assets/editor.png"
                 alt="editor"
                 @click="$emit('editor', item, 'draft')">
            <img class="icon"
                 src="@/assets/delete.png"
                 alt="delete"
                 @click="$emit('delete', item, 'draft')">
          </div>
        </div>
      </template>
    </manager-content>
    <manager-draft-paging @changeDraftPage="changeDraftPage"></manager-draft-paging>
    <manager-content class="manager-content">
      <template v-slot:title>
        发布
      </template>
      <template v-slot:items>
        <div class="items">
          <div class="item"
               v-for="(item,index) in test"
               :key="index">
            <div class="title">{{item.title}}</div>
            <div class="date">{{item.date}}</div>
            <img class="icon"
                 src="@/assets/editor.png"
                 alt="editor"
                 @click="$emit('editor', item, 'public')">
            <img class="icon"
                 src="@/assets/delete.png"
                 alt="delete"
                 @click="$emit('delete', item, 'public')">
          </div>
        </div>
      </template>
    </manager-content>
  </div>
</template>

<script>
import { inject } from 'vue'
import ManagerContent from '@/components/ManagerContent.vue'
import ManagerDraftPaging from '@/components/ManagerDraftPaging.vue'
import { draftPaging as apiDraftPaging } from '@/api/'

export default {
  name: 'Manager',
  components: {
    ManagerContent,
    ManagerDraftPaging
  },
  setup() {
    const state = inject('state')
    return { state }
  },
  data: function () {
    return {
      drafts: []
    }
  },
  methods: {
    changeDraftPage: async function (currentDraftPage) {
      const data = {
        size: this.state.pagingSize,
        page: currentDraftPage
      }

      const res = await apiDraftPaging(data)
      this.drafts = res.data.drafts
    }
  },
  async created() {
    const data = {
      size: this.state.pagingSize,
      page: 1
    }

    const res = await apiDraftPaging(data)
    this.drafts = res.data.drafts
  }
}
</script>

<style lang='less' scoped>
@import '@/assets/style/base.less';

.wrap {
  display: flex;
  flex-direction: column;
  gap: 15px;

  .null {
    display: none;
  }

  .items {
    margin-top: 10px;
    border-radius: 6px;
    overflow: hidden;

    .item {
      display: flex;
      align-items: center;
      gap: 10px;
      color: @font-color-dark;

      &:hover > .title,
      &:hover > .date {
        background-color: @dark-grey;
      }

      .title,
      .date {
        box-sizing: border-box;
        padding: 0 10px;
        height: 30px;
        line-height: 30px;
        background-color: @grey;
        transition: color 0.6s, background-color 0.6s;
      }

      .title {
        flex: 2;
      }

      .date {
        flex: 1;
      }

      .icon {
        height: 20px;
        cursor: pointer;
        background-color: @grey;
        border-radius: 6px;
        transition: background-color 0.6s;
      }

      .icon:hover {
        background-color: @dark;
      }
    }
  }
}
</style>