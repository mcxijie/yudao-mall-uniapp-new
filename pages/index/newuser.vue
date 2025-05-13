<template>
  <s-layout navbar=" " class="page">
    <!--        头部区域-->
    <view class="page-header">
      <view class="user-info">
        <view class="avatar-wrap" style="padding: 10px; box-sizing: border-box">
          <image v-if="userInfo.avatar" :src="userInfo.avatar" class="avatar"></image>
          <image v-else class="avatar" src="/static/default_avatar.png"></image>
        </view>
        <view class="flex-sub">
          <view class="name-sex">
            <view class="nickname">{{ userInfo.nickname }}</view>
          </view>
        </view>
        <view
          class="profile-link"
          style="display: flex; align-items: center; color: rgb(255, 255, 255)"
          @click="goMenuPage('/pages/user/personal_data/personal_data')"
        >
          个人资料
          <van-icon class="arrow-icon" name="arrow" />
        </view>
      </view>
    </view>
    <!--        订单区域-->
    <view class="order">
      <view class="orderBox">
        <view class="orderlist" @click="goOrderDetailPage(0)">
          <view class="iconfont icon-dingdan ordericon"></view>
          <view>全部订单</view>
        </view>
        <view class="orderlist" @click="goOrderDetailPage(2)">
          <view class="iconfont icon-daifuwu ordericon"></view>
          <view>待服务</view>
        </view>
        <view class="orderlist" @click="goOrderDetailPage(3)">
          <view class="iconfont icon-fuwuzhong ordericon"></view>
          <view>服务中</view>
        </view>
        <view class="orderlist" @click="goOrderDetailPage(4)">
          <view class="iconfont icon-yiwangcheng ordericon"></view>
          <view>已完成</view>
        </view>
      </view>
    </view>
    <!--        金额区域-->
    <view class="amountBox">
      <view class="amountItem">
        <view class="qianbao iconfont icon-hongbao" style="font-size: 22px"></view>
        <view style="color: rgb(102, 102, 102); text-align: center">优惠券</view>
        <view
          style="color: rgb(102, 102, 102); text-align: center; height: 25px; line-height: 25px"
        ></view>
      </view>
      <view class="amountItem">
        <view class="qianbao iconfont icon-qianbao" style="font-size: 22px"></view>
        <view style="color: rgb(102, 102, 102); text-align: center">我的钱包</view>
        <view class="wallet">
          <view>
            <span v-if="yincang" style="white-space: nowrap">{{ userInfo.balance }}</span>
            <span v-else style="white-space: nowrap">*****</span>
            <span style="white-space: nowrap">颗</span>
          </view>
          <view
            v-if="yincang"
            class="hidden-icon iconfont icon-yincang1"
            @click="showMony()"
          ></view>
          <view v-else class="hidden-icon iconfont icon-yincang2" @click="showMony()"></view>
        </view>
      </view>
    </view>
    <!--        功能区域-->
    <view class="page-body2">
      <view class="toolItem" @click="goMenuPage('/pages/reward/reward')">
        <view class="tool-icon iconfont icon-dashang"></view>
        <view>打赏店员</view>
      </view>
      <view
        v-if="!clerk"
        class="toolItem"
        @click="goMenuPage('/pages/users/employee_apply/employee_apply')"
      >
        <view class="tool-icon iconfont icon-shenqing"></view>
        <view>成为店员</view>
      </view>
      <view v-else class="toolItem" @click="goMenuPage('/pages/work_tower/work_tower')">
        <view class="tool-icon iconfont icon-gongzuotai"></view>
        <view>工作台</view>
      </view>
      <view class="toolItem">
        <view class="tool-icon iconfont icon-shoucang"></view>
        <view>收藏店员</view>
      </view>
      <view class="toolItem">
        <view class="tool-icon iconfont icon-liuyan"></view>
        <view>留言板</view>
      </view>
      <view class="toolItem">
        <view class="tool-icon iconfont icon-Book"></view>
        <view>礼物图鉴</view>
      </view>
    </view>
    <view
      style="text-align: center; margin-bottom: 100px; width: 100%; padding-bottom: 50px"
    ></view>
    <s-tabbar></s-tabbar>
  </s-layout>
</template>

<script>
  import { defineComponent } from 'vue';
  import SLayout from '@/sheep/components/s-layout/s-layout.vue';
  import STabbar from '@/sheep/components/s-tabbar/s-tabbar.vue';

  export default defineComponent({
    components: { STabbar, SLayout },
  });
</script>

<style lang="css" scoped>
  @import url('/static/fonts/iconfont.css');

  .page {
    display: flex;
    flex-direction: column;
    background: linear-gradient(180deg, rgba(215, 174, 252, 0.6) 50%, #fff 100%);
    min-height: 100vh; /* 确保背景覆盖整个页面 */
    position: relative;

    .page-header {
      position: relative;
      z-index: 1;
      margin-bottom: 10px;

      .user-info {
        padding: 40px 15px 20px;
        display: flex;
        -webkit-box-align: center;
        align-items: center;

        .avatar-wrap {
          position: relative;
          margin-right: 10px;

          .avatar {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            border: 2px solid #fff;
            box-sizing: border-box;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.16);
          }
        }

        .profile-link {
          display: flex;
          align-items: center;
          color: #ffffff;

          .arrow-icon {
            margin-left: 5px;
          }
        }

        .flex-sub {
          -webkit-box-flex: 1;
          flex: 1;
        }

        .name-sex {
          display: flex;
          -webkit-box-align: center;
          align-items: center;
        }

        .nickname {
          font-size: 20px;
          margin-right: 10px;
          color: #fff;
        }

        ::v-deep(.van-icon, .van-icon:before) {
          display: inline-block;
        }
      }
    }

    .order {
      margin: 0 15px 15px;
      border: 1px solid #ebedf0;
      padding-top: 10px;
      padding-bottom: 5px;
      position: relative;
      background: #fff;
      border-radius: 15px;
      z-index: 1;

      .orderBox {
        display: flex;
        color: #000;

        .ordericon {
          display: flex;
          -webkit-box-align: center;
          align-items: center;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          justify-content: center;
          font-size: 22px;
          width: 25px;
          height: 25px;
          margin-bottom: 5px;
        }

        .orderlist {
          width: 25%;
          text-align: center;
          padding: 10px 0;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
          flex-direction: column;
          color: #666;
          display: flex;
          -webkit-box-align: center;
          align-items: center;

          .ordericon {
            display: flex;
            -webkit-box-align: center;
            align-items: center;
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            justify-content: center;
            font-size: 22px;
            width: 25px;
            height: 25px;
            margin-bottom: 5px;
          }
        }
      }
    }

    .amountBox {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      background: #fff;
      margin: 15px 15px;
      border-radius: 10px;
      padding: 15px 0;
      justify-content: space-evenly;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;

      .amountItem {
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        flex-direction: column;
        width: 25%;

        .wallet {
          -webkit-box-flex: 1;
          flex: 1;
          position: relative;
          -webkit-box-align: center;
          align-items: center;
          color: #666;
          margin-left: 5px;
          display: flex;
          -webkit-box-pack: center;
          justify-content: center;

          .hidden-icon {
            display: flex;
            -webkit-box-pack: center;
            justify-content: center;
            -webkit-box-align: center;
            align-items: center;
            height: 25px;
            width: 25px;
            font-size: 20px;
          }
        }
      }

      .qianbao {
        display: flex;
        -webkit-box-pack: center;
        justify-content: center;
        margin-bottom: 5px;
      }
    }

    .page-body2 {
      padding: 10px 0;
      margin: 0 15px 70px;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -ms-flex-wrap: wrap;
      flex-wrap: wrap;
      background: #fff;
      border-radius: 12px;

      .toolItem {
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        width: 25%;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        flex-direction: column;
        margin: 10px 0;
        color: #666;

        .tool-icon {
          font-size: 23px;
          width: 26px;
          height: 26px;
          -webkit-box-pack: center;
          justify-content: center;
          margin-bottom: 5px;
          display: flex;
          -webkit-box-align: center;
          align-items: center;
        }
      }
    }
  }

  .page:before,
  .page:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 180px;
    /* 删除背景相关设置 */
  }
</style>
