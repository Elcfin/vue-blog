<template>
  <div class='side-bar-overview'>
    <div class="profile">
      <div class="profile-img">
        <img src="@/assets/leaf.jpg"
             alt="profile">
      </div>
    </div>
    <div class="author">
      {{ author }}
    </div>
    <div class="discription">
      {{ discription }}
    </div>
    <div class="navbar">
      <div class="item"
           v-for="(item, index) in items"
           :key="index">{{ item }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SideBarOverview',
  data: function () {
    return {
      author: 'Elcfin',
      discription: '草木不朽',
      items: ['日志', '分类', '关于']
    }
  }
}
</script>

<style lang='less' scoped>
@import '@/assets/style/base.less';

.side-bar-overview {
  &:extend(.common-block);

  padding: 0 20px;
  margin-top: 10px;

  .profile {
    padding: 20px 0 10px 0;

    .profile-img {
      box-sizing: border-box;
      margin: auto;
      width: 120px;
      height: 120px;
      overflow: hidden;
      border: 6px double @grey;
      border-radius: 50%;

      img {
        width: 100%;
      }
    }
  }

  .author {
    height: 30px;
    font-weight: bold;
    text-align: center;
    line-height: 30px;
  }

  .discription {
    font-size: 12px;
    color: @font-color-grey;
    text-align: center;
    line-height: 30px;
  }

  .navbar {
    display: flex;
    justify-content: center;
    padding-bottom: 10px;
    color: @font-color-grey;
    font-size: 12px;

    .item {
      padding: 10px;
    }
  }
}
</style>