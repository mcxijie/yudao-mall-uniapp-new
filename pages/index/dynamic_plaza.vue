<template>
  <s-layout navbar=" " class="page">
    <van-tabs v-model="active" class="tab-label" style="">
      <van-tab aria-selected="true" title="全部"></van-tab>
      <van-tab title="关注"></van-tab>
    </van-tabs>

    <van-list
      v-model="loading"
      :finished="finished"
      class="list-style"
      finished-text="没有更多了"
      @load="onLoadList"
    >
      <view v-for="(item, index) in dynamicsList" :key="item.id" class="dynamic">
        <view class="head">
          <view class="clerk-info">
            <view class="clerk-avatar">
              <img :src="item.avatar" />
            </view>
            <view class="clerk-date">
              <view class="clerk-follow">
                <view class="clerk-attribute">
                  <view class="name">{{ item.nickname }}</view>
                  <view class="sex">
                    <i v-if="item.sex === 2" class="iconfont icon-woman" style="color: red"></i>
                    <i v-else class="iconfont icon-nan" style="color: blue"></i>
                  </view>
                </view>
                <view class="collection iconfont icon-shoucang1"></view>
              </view>
              <view class="release-date">
                {{ formatTimestamp(item.createTime) }}
              </view>
            </view>
          </view>
        </view>
        <view class="body">
          <view v-show="item.content" class="script">
            {{ item.content }}
          </view>
          <view v-show="item.picture" class="show-img">
            <img fit="cover" height="171px" :src="item.picture" width="171px" />
          </view>
          <view v-show="item.video" class="show-video">
            <video :src="item.video" controls="controls" height="auto" width="50%"> </video>
          </view>
        </view>
        <view class="dynamic-foot">
          <view class="flex justify-end align-center">
            <view class="like-icon iconfont icon-weidianzan"></view>
            <view class="like-num">
              <span>0</span>
            </view>
          </view>
        </view>
      </view>
    </van-list>

    <s-tabbar></s-tabbar>
  </s-layout>
</template>

<script>
  import SLayout from '@/sheep/components/s-layout/s-layout.vue';
  import STabbar from '@/sheep/components/s-tabbar/s-tabbar.vue';

  export default {
    components: { STabbar, SLayout },
    data() {
      return {};
    },
    methods: {},
  };
</script>

<style lang="css" scoped>
  @import url('/static/fonts/iconfont.css');

  .page {
    display: flex;
    flex-direction: column;
    background: linear-gradient(180deg, rgba(215, 174, 252, 0.6) 50%, #fff 100%);
    min-height: 100vh; /* 确保背景覆盖整个页面 */
    position: relative;
  }

  /deep/ .van-tabs__nav {
    background: none;
  }

  .tab-label {
    margin: 5px 25%;

    /deep/ .van-tab {
      font-size: 15px;
      font-weight: 500;
      color: #999;
    }

    /deep/ .van-tab--active {
      font-weight: 700;
      color: var(--primary-color);
    }

    /deep/ .van-tabs__line {
      background-color: var(--primary-color);
      width: 17.5px;
      bottom: 20px;
    }
  }

  .list-style {
    margin-bottom: 50px;
    padding: 0 16px;

    .dynamic {
      padding-bottom: 20px;
      border-bottom: 1px solid #f5f5f5;

      .head {
        padding-top: 20px;

        .clerk-info {
          display: flex;
          -webkit-box-align: center;
          align-items: center;

          .clerk-avatar {
            margin-right: 10px;
            width: 36px;
            height: 36px;

            img {
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }

          .clerk-date {
            width: 90%;

            .clerk-follow {
              display: flex;
              -webkit-box-align: center;
              align-items: center;
              -webkit-box-pack: justify;
              justify-content: space-between;

              .clerk-attribute {
                display: flex;
                -webkit-box-align: center;
                align-items: center;

                .name {
                  font-size: 15px;
                  font-weight: 700;
                  color: #191919;
                }

                .sex {
                  margin-left: 5px;
                  height: 25px;
                  line-height: 25px;
                  float: left;
                }
              }

              .collection {
                font-size: 30px;
                color: #e6e6e6;
              }
            }

            .release-date {
              font-size: 11px;
              font-weight: 500;
              color: #acacac;
            }
          }
        }
      }

      .body {
        padding-top: 10px;

        .script {
          font-size: 15px;
          font-weight: 500;
          color: #191919;
        }

        .show-img {
          padding: 10px 0;

          img {
            border-radius: 8px;
          }
        }

        .show-video {
          padding: 10px 0;

          video {
            border-radius: 10px;
          }
        }
      }
    }
  }

  .dynamic-foot {
    margin: 15px 30px 0;
    text-align: right;

    .like-icon {
      font-size: 18px;
    }

    .like-num {
      font-size: 11px;
      font-weight: 500;
      color: #1a1a1a;
      margin-left: 5px;
    }
  }

  .flex {
    display: flex;
    overflow: hidden;
  }

  .align-center {
    -webkit-box-align: center;
    align-items: center;
  }

  .justify-end {
    -webkit-box-pack: end;
    justify-content: flex-end;
  }
</style>
