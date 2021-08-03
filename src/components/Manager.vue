<template>
  <div class="wrap">
    <manager-content class="manager-content">
      <template v-slot:title>
        <div class="top-bar">
          <div>标签</div>
        </div>
      </template>
      <template v-slot:bar>
        <div class="null"></div>
      </template>
      <template v-slot:tags>
        <manager-tag-content :tags="tags"></manager-tag-content>
      </template>
    </manager-content>
    <manager-content class="manager-content">
      <template v-slot:title>
        <div class="top-bar">
          <div>草稿</div>
          <div class="items">
            <div class="item"><img class="icon"
                   src="@/assets/addition.png"
                   alt="add"
                   @click="$emit('writeArticle')">
            </div>
          </div>
        </div>
      </template>
      <template v-slot:items>
        <div class="items">
          <div class="item"
               v-for="(item,index) in drafts"
               :key="index">
            <div class="title"
                 @click="$emit('readArticle',item)">{{item.title}}</div>
            <div class="date">{{item.createTime}}</div>
            <img class="icon"
                 src="@/assets/toPublic.png"
                 alt="toPublic"
                 @click="toPublic(item)">
            <img class="icon"
                 src="@/assets/editor.png"
                 alt="edit"
                 @click="$emit('editArticle',item)">
            <img class="icon"
                 src="@/assets/delete.png"
                 alt="delete"
                 @click="deleteArticle(item)">
          </div>
        </div>
      </template>
      <template v-slot:btns>
        <manager-draft-paging @changeDraftPage="changeDraftPage"
                              :pageNumber="draftPageNumber"></manager-draft-paging>
      </template>

    </manager-content>

    <manager-content class="manager-content">
      <template v-slot:title>
        发布
      </template>
      <template v-slot:items>
        <div class="items">
          <div class="item"
               v-for="(item,index) in publics"
               :key="index">
            <div class="title"
                 @click="$emit('readArticle',item)">{{item.title}}</div>
            <div class="date">{{item.createTime}}</div>
            <img class="icon"
                 src="@/assets/toDraft.png"
                 alt="toDraft"
                 @click="toDraft(item)">
            <img class="icon"
                 src="@/assets/editor.png"
                 alt="edit"
                 @click="$emit('editArticle',item)">
            <img class="icon"
                 src="@/assets/delete.png"
                 alt="delete"
                 @click="deleteArticle(item)">
          </div>
        </div>
      </template>
      <template v-slot:btns>
        <manager-public-paging @changePublicPage="changePublicPage"
                               :pageNumber="publicPageNumber"></manager-public-paging>
      </template>
    </manager-content>
  </div>
</template>

<script>
import { inject } from 'vue'
import ManagerContent from '@/components/ManagerContent.vue'
import ManagerDraftPaging from '@/components/ManagerDraftPaging.vue'
import ManagerPublicPaging from '@/components/ManagerPublicPaging'
import ManagerTagContent from '@/components/ManagerTagContent.vue'
import {
  draftPaging as apiDraftPaging,
  publicPaging as apiPublicPaging,
  getDraftPageNumber as apiGetDraftPageNumber,
  getPublicPageNumber as apiGetPublicPageNumber,
  deleteArticle as apiDeleteArticle,
  toDraftArticle as apiToDraftArticle,
  toPublicArticle as apiToPublicArticle,
  filterTags as apiFilterTags,
  getTags as apiGetTags
} from '@/api/'

export default {
  name: 'Manager',
  components: {
    ManagerContent,
    ManagerDraftPaging,
    ManagerPublicPaging,
    ManagerTagContent
  },
  setup() {
    const state = inject('state')
    return { state }
  },
  data: function () {
    return {
      drafts: [],
      publics: [],
      tags: [],
      draftPageNumber: 1,
      publicPageNumber: 1
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
    },
    changePublicPage: async function (currentPublicPage) {
      const data = {
        size: this.state.pagingSize,
        page: currentPublicPage
      }

      const res = await apiPublicPaging(data)
      this.publics = res.data.publics
    },
    deleteArticle: async function (article) {
      const data = {
        size: this.state.pagingSize,
        page: 1
      }

      await apiDeleteArticle(article)
      if (article.isPublished) {
        const publics = await apiPublicPaging(data)
        this.publics = publics.data.publics
        const draftNumberResult = await apiGetDraftPageNumber(data)
        this.draftPageNumber = draftNumberResult.data.draftPageNumber
      } else {
        const drafts = await apiDraftPaging(data)
        this.drafts = drafts.data.drafts
        const publicNumberResult = await apiGetPublicPageNumber(data)
        this.publicPageNumber = publicNumberResult.data.publicPageNumber
      }

      await apiFilterTags()
      const tags = await apiGetTags()
      this.tags = tags.data
    },
    toDraft: async function (article) {
      await apiToDraftArticle(article)
      const data = {
        size: this.state.pagingSize,
        page: 1
      }
      const publics = await apiPublicPaging(data)
      this.publics = publics.data.publics
      const draftNumberResult = await apiGetDraftPageNumber(data)
      this.draftPageNumber = draftNumberResult.data.draftPageNumber
      const drafts = await apiDraftPaging(data)
      this.drafts = drafts.data.drafts
      const publicNumberResult = await apiGetPublicPageNumber(data)
      this.publicPageNumber = publicNumberResult.data.publicPageNumber
    },
    toPublic: async function (article) {
      await apiToPublicArticle(article)
      const data = {
        size: this.state.pagingSize,
        page: 1
      }
      const publics = await apiPublicPaging(data)
      this.publics = publics.data.publics
      const draftNumberResult = await apiGetDraftPageNumber(data)
      this.draftPageNumber = draftNumberResult.data.draftPageNumber
      const drafts = await apiDraftPaging(data)
      this.drafts = drafts.data.drafts
      const publicNumberResult = await apiGetPublicPageNumber(data)
      this.publicPageNumber = publicNumberResult.data.publicPageNumber
    }
  },
  async created() {
    await apiFilterTags()
    const tags = await apiGetTags()
    this.tags = tags.data

    const data = {
      size: this.state.pagingSize,
      page: 1
    }

    const drafts = await apiDraftPaging(data)
    this.drafts = drafts.data.drafts
    const publics = await apiPublicPaging(data)
    this.publics = publics.data.publics

    const draftNumberResult = await apiGetDraftPageNumber(data)
    this.draftPageNumber = draftNumberResult.data.draftPageNumber

    const publicNumberResult = await apiGetPublicPageNumber(data)
    this.publicPageNumber = publicNumberResult.data.publicPageNumber
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

  .top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
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