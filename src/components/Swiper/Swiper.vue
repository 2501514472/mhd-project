<template>
  <div class="swiper-container" ref = 'swiper'>
        <div class="swiper-wrapper">
           <slot></slot>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
    </div>
</template>

<script>
// 引入 Swiper 核心js文件 和  Swiper样式
import Swiper from 'swiper/swiper-bundle.js'
import 'swiper/swiper-bundle.css'
export default {
  name: 'Swiper',
  props: {
    autoplay: {
      type: Number,
      default: 0
    },
    loop: {
      type: Boolean,
      default: true
    }
  },
  mounted () {
    var that = this
    /* eslint-disable */
    // 解决swiper复用 时 小圆点不能动 this.$refs.swiper
//     使用 ref 标记 （推荐）
//     1. 首先先使用 ref 去标记元素
//     2. 然后通过 this.$refs.xxx 去获取dom元素
//       1. ref 标记的是普通dom元素，那么后续得到的就是这个元素的DOM对象
//       2. ref 标记的是自定义组件，那么后续得到的是这个组件的实例对象。
    new Swiper(this.$refs.swiper, {
      loop: this.loop, //是否进行循环轮播
      autoplay: this.autoplay ? {
        delay: this.autoplay,
        stopOnLastSlide: false,
        disableOnInteraction: true
      } : false,
      pagination: {
        el: ".swiper-pagination"
      },
      on : {
        slideChangeTransitionEnd: function () {
          // console.log(this.activeIndex)
          // console.log(this.realIndex)
          // 触发一个自定义事件
          that.$emit('change', this.realIndex)
        }
      }
    });
    /* eslint-enable */
  }
}
</script>
<style lang="scss" scoped>
.swiper-container {
  width: 100%;
  height: 180px;
}
</style>
<style lang="scss">
.swiper-pagination-bullet {
  opacity: 1;
  vertical-align: middle;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: hsla(0, 0%, 100%, 0.7);
}

.swiper-pagination-bullet-active {
  width: 20px;
  height: 10px;
  background: url("../../assets/icon/dot.png") no-repeat;
  background-size: 100%;
}
</style>
