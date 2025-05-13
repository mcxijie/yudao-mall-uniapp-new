<template>
  <s-layout navbar=" " class="page">
    <a class="btn-reward" href="/pages/reward/reward">
      <view>
        <van-icon name="like"></van-icon>
        <view>打赏</view>
      </view>
    </a>
    <van-list
      v-model="loading"
      :finished="finished"
      class="order-list"
      finished-text="没有更多了"
      @load="onLoadList"
    >
      <a
        v-for="(item, index) in rewardList"
        :key="item.id"
        :style="{ background: getRandomColor() }"
        class="order-item"
      >
        <view class="flex">
          <view class="avatar-wrap">
            <img :src="getRandomFacelessImg()" class="avatar" />
            <van-icon name="like" style="font-size: 25px"></van-icon>
            <img :src="item.avatar" class="avatar" @click="goDetail(item.clerkUser)" />
          </view>
          <view class="margin-left">
            <view class="amount"
              >爱心值：{{
                item.rewardGiftPrice !== null ? item.rewardGiftPrice : item.rewardAmount
              }}
            </view>
            <view class="created">{{ formatTimestamp(item.orderTime) }}</view>
          </view>
          <view class="avatar-wrap flex" style="flex-grow: 1; justify-content: flex-end">
            <img
              v-show="item.rewardGift !== null"
              :src="item.rewardGift"
              height="50px"
              width="50px"
            />
            <view style="margin-left: 2px">x1</view>
          </view>
        </view>
        <view class="memo"
          >对{{ item.nickname }}留言：{{ item.message === '' ? '无' : item.message }}</view
        >
      </a>
    </van-list>
  </s-layout>
  <s-tabbar></s-tabbar>
</template>

<script setup>
  import SLayout from '@/sheep/components/s-layout/s-layout.vue';
  import STabbar from '@/sheep/components/s-tabbar/s-tabbar.vue';
  import { computed, reactive } from 'vue';
  import sheep from '@/sheep';

  const template = computed(() => sheep.$store('app').template?.home);

  const state = reactive({
    editMode: false,
    list: computed(() => cart.list),
    selectedList: [],
    selectedIds: computed(() => cart.selectedIds),
    isAllSelected: computed(() => cart.isAllSelected),
    totalPriceSelected: computed(() => cart.totalPriceSelected),
  });
</script>

<style lang="css" scoped>
  .page {
    display: flex; /* 新增 */
    flex-direction: column; /* 新增 */
    background: linear-gradient(180deg, rgba(215, 174, 252, 0.6) 50%, #fff 100%);

    .btn-reward {
      position: fixed;
      right: 0;
      bottom: 30%;
      text-align: center;
      border-radius: 50%;
      background: var(--primary-color);
      width: 50px;
      height: 50px;
      margin: auto;
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      -webkit-box-pack: center;
      justify-content: center;
      color: #fff;
    }

    .order-list {
      padding: 10px;

      .order-item {
        display: block;
        color: #fff;
        padding: 15px;
        margin-top: 15px;
        font-size: 14px;
        border-radius: 5px;

        .memo {
          font-size: 14px;
          margin-top: 5px;
        }

        .avatar-wrap {
          display: flex;
          -webkit-box-align: center;
          align-items: center;

          .avatar {
            width: 50px;
            height: 50px;
            border-radius: 50%;
          }

          .van-icon-like {
            margin: 0 8px;
          }
        }

        .amount {
          font-size: 16px;
          font-weight: 700;
          margin-top: 5px;
        }

        .created {
          margin-top: 2px;
        }
      }
    }
  }

  .flex {
    display: flex;
    overflow: hidden;
  }

  .margin-left {
    margin-left: 15px;
  }
</style>
