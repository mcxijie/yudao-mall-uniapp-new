<template>
  <s-layout navbar=" " class="page">
      <!--      选择店员性别-->
      <view class="panel van-hairline--bottom" style="padding: 10px 0">
        <view class="title">选择店员性别</view>
        <view class="check-sex flex">
          <view
            :class="{ checked: req.clerkSex === '1' }"
            class="check-sex-item man"
            @click="req.clerkSex = '1'"
          >
            <i class="iconfont icon-man"></i>
            <span>男</span>
          </view>
          <view
            :class="{ checked: req.clerkSex === '2' }"
            class="check-sex-item woman"
            @click="req.clerkSex = '2'"
          >
            <i class="iconfont icon-woman"></i>
            <span>女</span>
          </view>
        </view>
      </view>
      <!--      选择店员等级-->
      <view class="panel van-hairline--bottom">
        <view class="title">选择店员等级</view>
        <view class="check-grade">
          <view
            :class="{ checked: req.clerkLevel === '普通' }"
            class="check-grade-item"
            @click="selectGrade('普通')"
          >
            普通
          </view>
          <view
            :class="{ checked: req.clerkLevel === '银牌' }"
            class="check-grade-item"
            @click="selectGrade('银牌')"
          >
            银牌
          </view>
          <view
            :class="{ checked: req.clerkLevel === '金牌' }"
            class="check-grade-item"
            @click="selectGrade('金牌')"
          >
            金牌
          </view>
          <view
            :class="{ checked: req.clerkLevel === '男神' }"
            class="check-grade-item"
            @click="selectGrade('男神')"
          >
            男神
          </view>
          <view
            :class="{ checked: req.clerkLevel === '女神' }"
            class="check-grade-item"
            @click="selectGrade('女神')"
          >
            女神
          </view>
          <view
            :class="{ checked: req.clerkLevel === '镇店' }"
            class="check-grade-item"
            @click="selectGrade('镇店')"
          >
            镇店
          </view>
        </view>
      </view>
      <!-- 服务类型 时长 (van-sku 组件放置在这里) -->
      <view class="bg-white">
        <view>
          <view class="van-sku-group-container van-hairline--bottom" style="position: relative">
            <view style="margin: 0 10px">
              <view class="van-sku-row__title">服务类型</view>
              <span
                v-for="service in services"
                :key="service.id"
                :class="{ 'van-sku-row__item--active': selectedServiceType === service.name }"
                class="van-sku-row__item"
                @click="updateServiceType(service.name)"
              >
                <view class="van-sku-row__item-name">{{ service.name }}</view>
              </span>
            </view>
            <view v-if="selectedServiceType" style="margin: 0 10px">
              <view class="van-sku-row__title">
                {{ selectedServiceType === '听听歌曲吧' ? '曲数' : '时长' }}
              </view>
              <span
                v-for="duration in filteredDurations"
                :key="duration"
                :class="{ 'van-sku-row__item--active': selectedDuration === duration }"
                class="van-sku-row__item"
                @click="updateDuration(duration)"
              >
                <view class="van-sku-row__item-name">{{ duration }}</view>
              </span>
            </view>
          </view>
        </view>

        <view class="van-sku-stepper-stock">
          <view class="van-sku__stepper-title">购买数量</view>
          <view class="van-stepper van-sku__stepper" style="display: flex">
            <button class="van-stepper__minus" @click="decreaseQuantity">-</button>
            <input
              v-model.number="req.orderNumber"
              class="van-stepper__input"
              pattern="\d*"
              type="number"
              @input="validateQuantity"
            />
            <button class="van-stepper__plus" @click="increaseQuantity">+</button>
          </view>
        </view>
      </view>
      <!--      填写的内容-->
      <view>
        <view style="background: rgb(255, 255, 255)">
          <van-field
            :border="false"
            label="微信号"
            placeholder="不支持wxid开头的微信号，并关闭隐私保护设置"
            v-model="req.wechat"
            style="padding: 10px 16px"
          >
          </van-field>
        </view>
        <van-field
          v-model="req.otherRequirements"
          :border="false"
          label="其他要求"
          placeholder="如有其他要求，请在此填写"
          style="padding: 10px 16px"
        >
        </van-field>
        <van-cell-group :border="false">
          <van-cell style="padding: 10px 16px">
            <template #default>
              <view class="flex justify-between">
                <view class="label">排除下单过的店员</view>
                <view class="checkbox">
                  <van-checkbox
                    v-model="checked"
                    aria-checked="false"
                    checked-color="rgba(215,174,252,1)"
                    role="checkbox"
                    tabindex="0"
                  />
                </view>
              </view>
            </template>
          </van-cell>
        </van-cell-group>
      </view>
      <!--      优惠券-->
      <view>
        <van-cell-group :border="false" class="couponCellGroup" style="z-index: 2061">
          <van-cell :border="false" :clickable="true" role="button" tabindex="0" title="优惠券">
            <template #default>
              <span class="text-grey noCoupon">不使用</span>
            </template>
            <template #right-icon>
              <van-icon class="van-cell__right-icon" name="arrow" />
            </template>
          </van-cell>
        </van-cell-group>
      </view>
      <!--      支付-->
      <van-radio-group v-model="req.payType">
        <van-cell-group :border="false">
          <van-cell :border="false" :clickable="true" @click="req.payType = '1'">
            <template #icon>
              <view class="flex align-center margin-right-xs text-xl text-green">
                <i class="iconfont icon-weixinfill"></i>
              </view>
            </template>
            <template #title>
              <span>微信支付</span>
            </template>
            <template #right-icon>
              <van-radio checked-color="rgba(215,174,252,1)" name="1"></van-radio>
            </template>
          </van-cell>
          <van-cell :border="false" :clickable="true" title="余额支付" @click="req.payType = '2'">
            <template #icon>
              <view class="flex align-center margin-right-xs text-xl text-orange">
                <van-icon name="balance-o"></van-icon>
              </view>
            </template>
            <template #default>
              <view class="padding-lr-xs" style="color: rgb(153, 153, 153); font-size: 13px"
                >剩余
                <span style="padding: 0px 2px">{{ userBalance }}</span>
                颗
              </view>
            </template>
            <template #right-icon>
              <van-radio checked-color="rgba(215,174,252,1)" name="2"></van-radio>
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
      <!--      下单-->
      <view class="bottom-bar" style="z-index: 1">
        <view
          class="flex justify-between align-center"
          style="width: 100%; padding: 15px; box-sizing: border-box; margin-bottom: 50px"
        >
          <view style="display: flex">
            <view
              style="
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
                align-items: flex-end;
              "
            >
              总价：
            </view>
            <view style="display: flex; flex-direction: column; justify-content: flex-end">
              <view class="amount text-price">{{ totalPrice }}</view>
            </view>
          </view>
          <view class="BtnBox">
            <van-button
              block
              round
              style="width: 130px; height: 40px; color: white; background: #d7aefc"
              @click="createRandomOrder()"
            >
              立即下单
            </van-button>
          </view>
        </view>
      </view>

    <s-tabbar></s-tabbar>
  </s-layout>
</template>

<script>
  import SLayout from '@/sheep/components/s-layout/s-layout.vue';
  import STabbar from '@/sheep/components/s-tabbar/s-tabbar.vue';

  export default {
    components: { STabbar, SLayout },
    data() {
      return {
        checked: 0,
        selectedServiceType: '', // 默认选择
        selectedDuration: '', // 用户选择的服务时长
        services: [], // 存储接口返回的服务类型和时长
        selectedService: null, // 当前选中的服务
        prices: {
          level1Price: null,
          level2Price: null,
          level3Price: null,
          level4Price: null,
        },
        req: {
          clerkSex: null,
          clerkLevel: null,
          serviceType: null,
          serverTime: null,
          orderNumber: 1,
          wechat: '',
          otherRequirements: null,
          isExcludeClerk: 0,
          coupon: null,
          payType: '1',
          price: 0,
        },
        userBalance: 0,
      };
    },
    onLoad() {
      this.getServicePrice();
      this.getUserBalance();
    },
    watch: {
      checked(newValue) {
        this.req.isExcludeClerk = newValue ? 1 : 0;
      },
    },
    methods: {
      //下单
      async createRandomOrder() {
        if (!this.req.clerkSex) {
          return this.$toast('请选择店员性别');
        } else if (!this.req.clerkLevel) {
          return this.$toast('请选择店员等级');
        } else if (!this.req.serviceType) {
          return this.$toast('请选择服务类型'); // 使用Toast显示提示
        } else if (!this.req.serverTime) {
          return this.$toast('请选择服务时长'); // 使用Toast显示提示
        } else if (!this.req.wechat) {
          return this.$toast('请输入微信号'); // 使用Toast显示提示
        } else if (this.req.wechat.indexOf('wxid') !== -1) {
          return this.$toast('微信号格式不正确'); // 使用Toast显示提示
        } else if (/[\u4e00-\u9fa5\s]+/.test(this.req.wechat)) {
          return this.$toast('微信号格式不正确'); // 使用Toast显示提示，这个正则表达式会排除中文字符和空格
        } else if (this.req.orderNumber < 1) {
          return this.$toast('下单数量不能小于1'); // 使用Toast显示提示
        } else if (this.req.payType === '2' && this.req.price > this.userBalance) {
          return this.$toast('余额不足，请选择微信支付'); // 使用Toast显示提示
        }

        await RandomOrder.createRandomOrder(this.req)
          .then((res) => {
            this.$util.Tips({
              title: '下单成功',
              icon: 'success',
            });
            this.userBalance -= this.req.price;
          })
          .catch((err) => {
            this.$toast(err);
          });
      },

      //获取用户余额
      async getUserBalance() {
        const { data: res } = await SelectDetail.getUserBalance();
        this.userBalance = res;
      },

      updateServiceType(serviceName) {
        this.selectedServiceType = serviceName;
        const service = this.services.find((s) => s.name === serviceName);
        if (service) {
          this.req.serviceType = service.id;
        }
        // 当服务类型改变时，重置服务时长的选择
        this.selectedDuration = '';
        this.req.serverTime = null;
      },
      updateDuration(durationName) {
        this.selectedDuration = durationName;
        const service = this.services.find((s) => s.name === this.selectedServiceType);
        const duration = service && service.children.find((d) => d.name === durationName);
        if (duration) {
          this.req.serverTime = duration.id;
        }
      },

      //获取全部服务以及服务时长以及价格
      async getServicePrice() {
        const res = await RandomOrder.getPriceAllList();
        if (res.code === 0) {
          this.services = res.data; // 将接口返回的数据赋值给services
        }
      },

      //等级选择
      selectGrade(grade) {
        this.req.clerkLevel = grade;
      },

      //购买数量
      increaseQuantity() {
        this.req.orderNumber += 1;
      },
      decreaseQuantity() {
        if (this.req.orderNumber > 1) {
          this.req.orderNumber -= 1;
        }
      },
      validateQuantity(event) {
        // 只允许输入整数
        let value = parseInt(event.target.value, 10);
        if (isNaN(value) || value < 1) {
          this.req.orderNumber = 1;
        } else {
          this.req.orderNumber = value;
        }
      },

      //价格
      updateServiceAndDuration(service) {
        this.selectedService = service;
        this.prices.level1Price = service.level1Price;
        this.prices.level2Price = service.level2Price;
        this.prices.level3Price = service.level3Price;
        this.prices.level4Price = service.level4Price;
      },
    },

    computed: {
      filteredDurations() {
        const service = this.services.find((s) => s.name === this.selectedServiceType);
        return service && service.children ? service.children.map((child) => child.name) : [];
      },

      //价格
      totalPrice() {
        if (this.selectedServiceType && this.selectedDuration && this.req.clerkLevel) {
          const selectedService = this.services.find(
            (service) => service.name === this.selectedServiceType,
          );
          const selectedDuration = selectedService
            ? selectedService.children.find((duration) => duration.name === this.selectedDuration)
            : null;
          if (!selectedDuration) return 0; // 如果没有找到对应的时长，则返回0

          let price = 0;
          // 根据选择的等级返回相应的价格
          switch (this.req.clerkLevel) {
            case '普通':
              price = selectedDuration.level1Price;
              break;
            case '银牌':
              price = selectedDuration.level2Price;
              break;
            case '金牌':
              price = selectedDuration.level3Price;
              break;
            case '男神':
            case '女神':
            case '镇店':
              price = selectedDuration.level4Price;
              break;
            default:
              price = 0; // 如果没有选中等级或不匹配任何已知等级
          }

          // 返回价格乘以购买数量
          let countPrice = price * this.req.orderNumber;
          this.req.price = countPrice;
          return countPrice;
        }
        return 0; // 如果没有选择完整，则返回0
      },
    },
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

    .panel {
      padding: 8px 0;
      background: #fff;
    }

    .title {
      margin: 5px 0 15px 15px;
    }
  }

  .van-hairline--bottom {
    position: relative;
  }

  .check-sex {
    padding-left: 15px;

    .check-sex-item {
      border-radius: 10000px;
      padding: 3px 25px;
      margin-right: 20px;
      position: relative;
      font-size: 14px;
      display: flex;
      -webkit-box-align: center;
      align-items: center;

      .iconfont {
        font-size: 20px;
      }
    }

    .check-sex-item.man {
      color: #1296db;
      border: 1px solid #1296db;
    }

    .check-sex-item.man.checked {
      color: #fff;
      background: #1296db;
    }

    .check-sex-item.woman {
      color: #d4237a;
      border: 1px solid #d4237a;
    }

    .check-sex-item.checked {
      color: #fff;
      background: #d4237a;
    }
  }

  .flex {
    display: flex;
    overflow: hidden;
  }

  .check-grade {
    display: flex;
    flex-wrap: wrap;
    padding: 0 0;
    margin: 0 10px;

    .check-grade-item {
      position: relative;
      text-align: center;
      white-space: nowrap;
      padding: 6px 8px;
      background: #f7f8fa;
      border-radius: 16px;
      color: #333;
      width: max-content;
      -webkit-box-flex: 0;
      flex-grow: 0;
      margin: 0 5px 10px;
      box-sizing: border-box;
      min-width: 20%;
      z-index: 1;
    }

    .check-grade-item.checked {
      color: #fff;
      background: var(--primary-color);
    }
  }

  .bg-white {
    background-color: var(--white);
  }

  /deep/ .van-field__label {
    margin-right: 0;
  }

  .justify-between {
    -webkit-box-pack: justify;
    justify-content: space-between;
  }

  .flex {
    display: -webkit-box;
    display: flex;
    overflow: hidden;
  }

  .van-checkbox__icon--round .van-icon {
    border-radius: 100%;
  }

  .text-grey {
    color: var(--grey);
  }

  .van-cell__right-icon {
    height: 24px;
    font-size: 16px;
    line-height: 24px;
  }

  .margin-right-xs {
    margin-right: 5px;
  }

  .text-xl {
    font-size: 18px;
  }

  .text-green {
    color: var(--green);
  }

  .align-center {
    -webkit-box-align: center;
    align-items: center;
  }

  .van-cell__title {
    font-size: 13px;
  }

  .text-orange {
    color: var(--orange);
  }

  .padding-lr-xs {
    padding-left: 5px;
    padding-right: 5px;
  }

  .bottom-bar {
    background: #fff;
    box-shadow: 0 0 6px 0 #ccc;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding-bottom: env(safe-area-inset-bottom);
  }

  .amount {
    color: var(--primary-color);
    font-size: 16px;
  }

  .text-price:before {
    content: '\A5';
    font-size: 80%;
    margin-right: 2px;
  }

  .van-sku-group-container {
    padding-top: 12px;
  }

  .van-sku__stepper-title {
    float: left;
  }

  .van-sku-row__title {
    margin-left: 5px;
    padding-bottom: 12px;
  }

  .van-sku-row__item {
    position: relative;
    min-width: 10%;
    text-align: center;
    border-radius: 1000px;
    padding: 6px 12px;
    margin: 0 5px 10px;
    display: inline-flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    font-size: 13px;
    line-height: 16px;
    vertical-align: middle;

    .van-sku-row__item-name {
      padding: 0;
    }
  }

  .van-sku-row__item.van-sku-row__item--active {
    color: #fff;
    background: var(--primary-color);
  }
</style>
