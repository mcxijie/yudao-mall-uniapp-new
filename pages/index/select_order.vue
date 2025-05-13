<template>
  <s-layout navbar=" " class="page">
    <!--    搜索-->
    <view class="fixed-top">
      <van-search
        v-model="queryObj.nickname"
        class="search-bar"
        placeholder="搜索店员"
        shape="round"
        show-action
        @search="onSearch"
        :clearable="false"
      >
        <template #left-icon>
          <view style="display: flex; align-items: center">
            <img src="/static/images/search-icon.png" style="height: 4vw; width: 4vw" />
          </view>
        </template>

        <template #action>
          <view class="btn-search" @click="onSearch">搜索</view>
        </template>
      </van-search>
    </view>
    <!--      打赏-->
    <view class="reward-msg-wrap">
      <img src="/static/images/ice-cream-icon.png" style="width: 5.8vw; margin-right: 1.7vw" />
      <view class="reward-msg">
        <swiper autoplay circular interval="2000" vertical>
          <swiper-item v-for="(item, index) in rewardList" :key="index">
            <view class="msg">
              <span>【{{ item.clerkUserNickname }}】</span>
              <span>收到了客人打赏</span>
              <span
                >{{ item.rewardAmount !== null ? item.rewardAmount : item.rewardGiftName }}
              </span>
              <span>{{ item.rewardAmount !== null ? '颗' : 'x1' }} </span>
            </view>
          </swiper-item>
        </swiper>
      </view>
    </view>
    <!--      男女神榜-->
    <view class="ranking">
      <view style="display: flex; justify-content: center">
        <view class="ranking-type">
          <view :class="{ select: sexClerkListType === 'female' }" class="title-box">
            <span style="margin: 0 0.7vw" @click="changeSex('female')">女神榜</span>
            <img
              v-show="sexClerkListType === 'female'"
              class="lineIcon"
              src="/static/images/line.png"
            />
          </view>
          <view :class="{ select: sexClerkListType === 'male' }" class="title-box">
            <span style="margin: 0 0.7vw" @click="changeSex('male')">男神榜</span>
            <img
              v-show="sexClerkListType === 'male'"
              class="lineIcon"
              src="/static/images/line.png"
            />
          </view>
        </view>
      </view>
      <view class="ranking-clerk">
        <view
          v-for="(item, index) in sexClerkListType === 'female' ? sex2ClerkList : sex1ClerkList"
          :key="index"
          class="rankingItem"
          @click="goDetail(item.userId)"
        >
          <a class="flexBox">
            <view
              :class="
                index === 0 ? 'rankingIcon23' : index === 1 ? 'rankingIcon1' : 'rankingIcon23'
              "
            >
              <img
                :class="index === 0 ? 'head-img2' : index === 1 ? 'head-img' : 'head-img3'"
                :src="item.avatar"
              />
              <img
                :src="
                  index === 0
                    ? '/static/images/ranking2.png'
                    : index === 1
                    ? '/static/images/ranking1.png'
                    : '/static/images/ranking3.png'
                "
                class="rankingImg"
              />
            </view>
          </a>
          <view
            :style="{
              color:
                index === 0
                  ? 'rgb(122, 197, 246)'
                  : index === 1
                  ? 'rgb(254, 193, 4)'
                  : 'rgb(250, 126, 58)',
            }"
            class="nickname"
          >
            {{ item.nickname }}
          </view>
          <view
            :class="{ online: item.isOnline === 1, noline: item.isOnline === 0 }"
            class="rankingLine"
          >
            {{ item.isOnline === 1 ? '在线' : '离线' }}
          </view>
        </view>
      </view>
    </view>
    <!--      新人推荐-->
    <view class="recommend">
      <view class="recommend-title">
        <span>新人推荐</span>
      </view>
      <view class="recommend-body">
        <view
          v-for="(item, index) in newClerkList"
          :key="index.id"
          class="recommend-clerk"
          @click="goDetail(item.userId)"
        >
          <a ref="#">
            <view class="head-border">
              <img :src="item.avatar" />
              <view class="name text-ellipsis">{{ item.nickname }}</view>
              <view v-if="item.isOnline === 1" class="online"></view>
            </view>
          </a>
        </view>
      </view>
    </view>
    <!--      人气店员-->
    <view class="recommend">
      <view class="recommend-title">
        <span>人气店员</span>
      </view>
      <view class="recommend-body">
        <view
          v-for="(item, index) in popularityClerkList"
          :key="index.id"
          class="recommend-clerk"
          @click="goDetail(item.userId)"
        >
          <a ref="#">
            <view class="head-border">
              <img :src="item.avatar" />
              <view class="name text-ellipsis">{{ item.nickname }}</view>
              <view v-if="item.isOnline === 1" class="online"></view>
            </view>
          </a>
        </view>
      </view>
    </view>
    <!--      全部店员title-->
    <view class="titleSort">
      <view style="font-weight: bold">全部店员</view>
      <view
        style="display: flex; align-items: center; color: rgb(102, 102, 102)"
        @click="showScreen = true"
      >
        筛选
        <img src="/static/images/sortIcon.png" style="width: 3.4vw; height: 3.4vw" />
      </view>
    </view>
    <!--      全部店员卡片-->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoadList">
      <van-cell-group class="clerk-list">
        <van-cell
          :border="false"
          :center="true"
          :clickable="true"
          class="listItem"
          role="button"
          size="large"
          v-for="(item, index) in clerkList"
          :key="item.id"
          tabindex="0"
        >
          <view class="clerk-item">
            <view class="clerk-item__head" @click="goDetail(item.userId)">
              <img :src="item.avatar" class="avatar" />
            </view>
            <view class="clerk-item__body" @click="goDetail(item.userId)">
              <view class="select_order_line1">
                <view class="flex align-center" style="padding-right: 15vw">
                  <view class="name text-ellipsis">{{ item.nickname }}</view>
                  <view
                    :class="['sex-age', item.sex === 1 ? 'male' : 'female']"
                    style="margin-left: 1vw"
                  >
                    <img
                      :src="item.sex === 1 ? '/static/images/sex1.png' : '/static/images/sex2.png'"
                      class="secImg"
                    />
                    <view>{{ item.age }}</view>
                  </view>
                  <view
                    style="
                      display: flex;
                      align-items: center;
                      font-size: 2.9vw;
                      white-space: nowrap;
                    "
                  >
                    <img
                      src="/static/images/position.png"
                      style="width: 2.8vw; height: 3.4vw; margin: 0 0.7vw 0 2.8vw"
                    />
                    {{ item.address }}
                  </view>
                </view>
                <img :src="getLevelImage(item.levelId)" class="gradeImg" />
              </view>
              <view class="select_order_line3">
                <view class="switch-box">
                  <view :class="item.isOnline === 1 ? 'online' : 'offline'"></view>
                  <view class="text">{{ item.isOnline === 1 ? '在线' : '离线+客服预约' }}</view>
                  <template
                    v-for="(service, index) in servicesArray(item.offeringService)"
                    v-if="item.isOnline === 1"
                  >
                    <span v-if="index !== 0" :key="index + '-divide'" class="divide"></span>
<!--                    <span :key="index + '-text'" class="text">{{ service }}</span>-->
                  </template>
                </view>
              </view>
              <view class="select_order_line4 text-ellipsis">
                <img class="tabIcon" src="/static/images/tabIcon.png" style="height: 2.6vw" />
                <view v-for="tag in splitTags(item.personalityTag)" :key="tag" class="tags">{{
                  tag
                }}</view>
              </view>
              <view style="position: relative">
                <view class="audio" @click.stop="playAudio(item)">
                  <img class="audioImg" src="/static/images/audio.png" />
                  <view class="audioBox" style="height: 2.41vw; margin: 0 0.96vw 0 1.44vw">
                    <view class="audio1 wave1" style=""></view>
                  </view>
                  <span style="font-size: 2.41vw; color: rgb(255, 255, 255)">15s</span>
                </view>
              </view>
            </view>
            <img class="loveImg" src="/static/images/love.png" />
          </view>
        </van-cell>
      </van-cell-group>
    </van-list>
    <!--      筛选-->
    <view class="screenUI">
      <van-popup v-model="showScreen" :round="true" position="bottom">
        <van-icon
          class="closeIcon"
          color="#cfdeda"
          name="/static/images/dialog-close.png"
          size="25px"
          @click="showScreen = false"
        ></van-icon>
        <view class="title">选择性别</view>
        <view class="optionList sex-ageBox">
          <view
            :class="{ active: selectedSex === 1 }"
            class="optionItem flex align-center justify-center"
            @click="selectedSex = 1"
          >
            <img
              :src="
                selectedSex === 1 ? '/static/images/male-active.png' : '/static/images/male.png'
              "
              class="sexIcon"
            />
            男生
          </view>
          <view
            :class="{ active: selectedSex === 2 }"
            class="optionItem flex align-center justify-center"
            @click="selectedSex = 2"
          >
            <img
              :src="
                selectedSex === 2 ? '/static/images/female-active.png' : '/static/images/female.png'
              "
              class="sexIcon"
            />
            女生
          </view>
        </view>
        <view class="title">选择等级</view>
        <view class="optionList">
          <view
            :class="{ active: selectedLevel === 1 }"
            class="optionItem"
            @click="selectedLevel = 1"
            >普通</view
          >
          <view
            :class="{ active: selectedLevel === 2 }"
            class="optionItem"
            @click="selectedLevel = 2"
            >金牌</view
          >
          <view
            :class="{ active: selectedLevel === 3 }"
            class="optionItem"
            @click="selectedLevel = 3"
            >镇店</view
          >
          <view
            :class="{ active: selectedLevel === 4 }"
            class="optionItem"
            @click="selectedLevel = 4"
            >男神</view
          >
          <view
            :class="{ active: selectedLevel === 5 }"
            class="optionItem"
            @click="selectedLevel = 5"
            >女神</view
          >
          <view
            :class="{ active: selectedLevel === 6 }"
            class="optionItem"
            @click="selectedLevel = 6"
            >首席</view
          >
        </view>
        <view style="display: flex; align-items: center">
          <view class="title" style="margin-right: 20px">选择地区</view>
          <view style="display: flex; align-items: center" @click="showAddress = true">
            {{ this.queryObj.address === '' ? '选择' : this.queryObj.address }}
            <img src="/static/images/arrow.png" style="width: 2vw; height: 2vw; margin-left: 3px" />
          </view>
        </view>
        <view class="footer">
          <view class="resetBtn" @click="clearSelected()">重置</view>
          <view class="confirmBtn" @click="selectedClerkList()">确定</view>
        </view>
      </van-popup>
      <van-popup v-model="showAddress" :round="true" position="bottom">
        <van-picker
          :columns="columns"
          show-toolbar
          @cancel="showAddress = false"
          @confirm="onConfirm"
        >
        </van-picker>
      </van-popup>
    </view>

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
  .page {
    display: flex;
    flex-direction: column;
    background: linear-gradient(180deg, rgba(215, 174, 252, 0.6) 50%, #fff 100%);
    min-height: 100vh; /* 确保背景覆盖整个页面 */
    position: relative;
  }

  .fixed-top {
    z-index: 1000;
  }

  .reward-msg-wrap {
    height: 8.6vw;
    -webkit-box-align: center;
    align-items: center;
    display: -webkit-box;
    display: -ms-flexbox;
    padding-left: 2.8vw;
    overflow: hidden;

    .reward-msg {
      -webkit-box-flex: 1;
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .search-bar {
    background: #fff;
    border-radius: 222px;
    padding: 0.9vw 1.1vw;

    .van-search__content {
      background: none;
      padding-left: 1.6vw;

      .van-cell {
        padding: 0;
      }
    }

    /deep/ .van-field__left-icon {
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      margin-right: 10px;
    }

    .van-search__action {
      padding: 0;
    }

    .btn-search {
      color: #fff;
      font-size: 2.9vw;
      background: #d7aefc;
      border-radius: 999px;
      width: 14vw;
      height: 6.7vw;
      line-height: 6.7vw;
      text-align: center;
    }
  }

  .van-search .van-cell {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
  }

  .ranking {
    margin: 0 0 2.8vw;
    background: hsla(0, 0%, 100%, 0.8);
    border-radius: 2.1vw;
    padding: 2.89vw 0 5.31vw;

    .ranking-clerk {
      margin-top: 4.3vw;
      display: flex;
      justify-content: space-evenly;
      -webkit-box-align: end;
      align-items: flex-end;

      .rankingItem {
        width: 21.5%;
        min-width: 0;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        flex-direction: column;

        .flexBox {
          -webkit-box-flex: 1;
          flex: 1;
          display: flex;
          -webkit-box-align: center;
          align-items: center;
          -webkit-box-pack: center;
          justify-content: center;

          .rankingIcon23 {
            font-size: 0;
            position: relative;
            width: 14.7vw;
            height: 14.7vw;

            .head-img2 {
              border: 2px solid #cfd8f4;
              width: 100%;
              height: 100%; /* 确保图片高度填满容器 */
              object-fit: cover;
              border-radius: 3.2vw;
              box-sizing: border-box;
            }

            .rankingImg {
              width: 4.63vw;
              position: absolute;
              bottom: -4.2vw;
              left: 50%;
              transform: translateX(-50%);
            }

            .head-img3 {
              border: 2px solid #f4d7bd;
              width: 100%;
              height: 100%; /* 确保图片高度填满容器 */
              object-fit: cover;
              border-radius: 3.2vw;
              box-sizing: border-box;
            }
          }

          .rankingIcon1 {
            font-size: 0;
            position: relative;
            width: 18.5vw;
            height: 18.5vw;

            .head-img {
              border: 2px solid #ffde86;
              width: 100%;
              height: 100%; /* 确保图片高度填满容器 */
              object-fit: cover;
              border-radius: 3.2vw;
              box-sizing: border-box;
            }

            .rankingImg {
              width: 4.63vw;
              position: absolute;
              bottom: -4.2vw;
              left: 50%;
              transform: translateX(-50%);
            }
          }
        }

        .nickname {
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          text-align: center;
          font-size: 3.14vw;
          margin-top: 5vw;
        }

        .rankingLine {
          width: 7.8vw;
          height: 3.4vw;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          justify-content: center;
          border-radius: 222px;
          font-size: 2.3vw;
          margin: 2.4vw auto 0;
        }
      }

      .rankingLine.online {
        background: #d7aefc;
        color: #fff;
      }

      .rankingLine.noline {
        background: #eee;
        color: #999;
      }
    }

    .ranking-type {
      display: inline-flex;
      margin: 0 auto;
      border-radius: 501px;
      position: relative;
      color: #d7aefc;

      .select {
        font-weight: 700;
      }

      .title-box {
        border-radius: 500px;
        width: 34.29vw;
        height: 7.48vw;
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: center;
        justify-content: center;
        font-size: 3.7vw;
        position: relative;

        .lineIcon {
          width: 6.5vw;
          height: 1.5vw;
          position: absolute;
          bottom: -0.5vw;
          left: 50%;
          transform: translateX(-50%);
        }
      }
    }
  }

  .recommend {
    background: hsla(0, 0%, 100%, 0.8);
    padding: 3.8vw 0 3.7vw 3.4vw;
    border-radius: 2.17vw;
    margin-bottom: 2.8vw;

    .recommend-title {
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      margin-bottom: 4.1vw;
      font-size: 3.5vw;
      font-weight: 700;
    }

    .recommend-body {
      overflow-x: auto;
      overflow-y: hidden;
      white-space: nowrap;
      width: 100%;
      box-sizing: border-box;

      .recommend-clerk {
        position: relative;
        display: inline-block;

        .head-border {
          position: relative;
          width: 15.4vw;
          height: 15.4vw;
          margin-right: 3.8vw;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            border-radius: 2.2vw;
          }

          .name {
            max-width: 100%;
            color: #333;
            font-size: 3.2vw;
            margin-top: 3vw;
            text-align: center;
          }

          .online {
            background: #4eec9f;
            width: 1.8vw;
            height: 1.8vw;
            border-radius: 50%;
            position: absolute;
            bottom: 1vw;
            right: 1vw;
            border: 1.6px solid #fff;
          }
        }
      }
    }
  }

  .text-ellipsis {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .titleSort {
    font-size: 3.5vw;
    line-height: 1;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    justify-content: space-between;
    margin: 4.8vw 1.7vw 4.8vw 3.6vw;
  }

  .clerk-list {
    background: none;

    .listItem {
      line-height: 1;
      background: none;
      padding: 0;
    }

    .clerk-item {
      display: flex;
      margin: 0 1.8vw 4.8vw;
      padding: 0 0 5.4vw;
      position: relative;
      border-bottom: 1px solid #f5f5f5;

      .clerk-item__head {
        width: 20.4vw;
        height: 20.4vw;
        position: relative;

        .avatar {
          width: 100%;
          height: 100%;
          border-radius: 2.2vw;
          object-fit: cover;
        }
      }

      .clerk-item__body {
        padding-left: 2.65vw;
        -webkit-box-flex: 1;
        flex: 1;
        min-width: 0;
        position: relative;

        .select_order_line1 {
          display: flex;
          -webkit-box-align: center;
          align-items: center;
          -webkit-box-pack: justify;
          justify-content: space-between;
          position: relative;
          margin-bottom: 1.5vw;

          .gradeImg {
            height: 5.1vw;
            position: absolute;
            right: 0;
            top: 0;
          }

          .name {
            font-size: 3.7vw;
            color: #333;
          }

          .sex-age {
            color: #fff;
            display: flex;
            -webkit-box-align: center;
            align-items: center;
            border-radius: 222px;
            font-size: 3.5vw;
            height: 4.1vw;
            padding: 0 1.2vw;

            .secImg {
              width: 2.6vw;
              height: 2.6vw;
            }
          }

          .sex-age.female {
            background: #fc9be4;
          }

          .sex-age.male {
            background: #9bc2fc;
          }
        }

        .select_order_line3 {
          width: 100%;
          line-height: 1;
          margin-bottom: 1.5vw;
          display: flex;
          color: #d1a2fc;

          .switch-box {
            position: relative;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            background: rgba(209, 162, 252, 0.2);
            border-radius: 222px;
            padding: 0.6vw 2.4vw 0.6vw 1.4vw;
            max-width: 100%;
          }

          .online {
            background-color: #cd97fc;
            height: 1.2vw;
            width: 1.2vw;
            display: inline-flex;
            transform: translateY(-50%);
            margin-right: 0.8vw;
            border-radius: 50%;
          }

          .offline {
            background-color: #c4c4c4;
            height: 1.2vw;
            width: 1.2vw;
            display: inline-flex;
            transform: translateY(-50%);
            margin-right: 0.8vw;
            border-radius: 50%;
          }

          .text {
            display: inline-block;
            font-size: 3.14vw;
          }

          .divide {
            display: inline-flex;
            width: 1px;
            height: 2.65vw;
            background: #d1a2fc;
            margin: 0 1.44vw;
          }
        }

        .select_order_line4 {
          font-size: 2.65vw;
          color: #b9b7e8;
          margin-bottom: 1.5vw;
          position: relative;
          padding-left: 2vw;

          .tabIcon {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: 0;
          }

          .tags {
            display: inline-block;
            color: #aaa;
            font-size: 2.9vw;
            position: relative;
            padding-right: 1.6vw;
            margin-left: 1.6vw;
          }

          .tags::after {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            border-right: 1px solid #aaa;
          }
        }

        .audio {
          padding: 0 0.96vw;
          box-sizing: border-box;
          display: inline-flex;
          -webkit-box-align: center;
          align-items: center;
          height: 4.83vw;
          border-radius: 999px;
          background: #d7aefc;

          .audioImg {
            width: 3.38vw;
            height: 3.38vw;
          }
        }
      }

      .loveImg {
        position: absolute;
        right: -1vw;
        bottom: 4.5vw;
        width: 5.9vw;
        height: 5.9vw;
      }
    }
  }

  .align-center {
    -webkit-box-align: center;
    align-items: center;
  }

  .flex {
    display: flex;
    overflow: hidden;
  }

  .audioBox {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
  }

  .screenUI {
    .van-popup {
      padding: 0 20px 80px;
      width: 100%;
      box-sizing: border-box;
    }

    .closeIcon {
      position: absolute;
      right: 20px;
      top: 20px;
    }

    .title {
      padding: 20px 0;
      font-weight: 700;
    }

    .optionList {
      display: flex;
      flex-wrap: wrap;

      .optionItem {
        width: 28%;
        margin-right: 5%;
        box-sizing: border-box;
        padding: 5px 5px;
        border-radius: 222px;
        text-align: center;
        margin-bottom: 10px;
        color: #666;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        background: #eee;
      }

      .optionItem.active {
        background: var(--primary-color);
        color: #fff;
      }
    }

    .sex-ageBox {
      justify-content: space-evenly;

      .sexIcon {
        width: 20px;
        height: 20px;
        margin-right: 5px;
      }
    }

    .footer {
      display: flex;
      justify-content: space-evenly;
      margin-top: 20px;

      .resetBtn {
        width: 30%;
        margin-right: 5%;
        padding: 8px 5px;
        border-radius: 8px;
        text-align: center;
        box-sizing: border-box;
        background: var(--primary-color);
        color: #fff;
        position: relative;
        overflow: hidden;
        z-index: 1;
      }

      .resetBtn::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(0deg, rgba(0, 0, 0, 0.1), hsla(0, 0%, 100%, 0.1));
        z-index: -1;
      }

      .confirmBtn {
        width: 30%;
        margin-right: 5%;
        padding: 8px 5px;
        border-radius: 8px;
        text-align: center;
        box-sizing: border-box;
        background: var(--primary-color);
        color: #fff;
        position: relative;
        overflow: hidden;
        z-index: 1;
      }

      .confirmBtn::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(0deg, rgba(0, 0, 0, 0.1), hsla(0, 0%, 100%, 0.1));
        z-index: -1;
      }
    }
  }

  .justify-center {
    -webkit-box-pack: center;
    justify-content: center;
  }

  .align-center {
    -webkit-box-align: center;
    align-items: center;
  }

  .flex {
    display: flex;
  }

  .msg {
    font-size: 3.14vw;
    font-weight: 400;
    color: #f7f7f7;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    height: 100%;
  }
</style>
