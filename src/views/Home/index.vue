<template>
   <div class = 'page-home'>
     <router-link to="/city">当前城市 ： {{$store.getters['city/curCityName']}}</router-link>
     <index-header></index-header>
    <div class="index-main">
      <Swiper class="my-swiper" v-if="bannerList.length > 0" :autoplay="3000">
      <SwiperItem v-for="item in bannerList" :key="item.id">
         <img v-lazy="item.imageurl" alt />
      </SwiperItem>
    </Swiper>
   <index-nav></index-nav>
     <index-recommend v-for = "item in recommentList" :key = "item.specialid" :info = "item"></index-recommend>

      <div class="my-icp">
        <a
          class="record"
          href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31011202006214"
          target="_blank"
        >
          <img class="img"  v-lazy="`https://wechatapp.zhuishushenqi.com/mhd/201711/gongan.jpg`" />
          <div>沪公网安备 31011202006214号</div>
        </a>
        <div class="licence">
          增值电信业务经营许可证沪B2-20170022
          <br />网络文化经营许可证沪网文（2016）3206-227号
          <br />出版物经营许可证新出发沪批字第U7659号
        </div>
      </div>
    </div>

  </div>
</template>

<script>
// 引入抽离出来的插件
import { Swiper, SwiperItem } from '@/components/Swiper'
import { getBanner, getIndexRecomment } from '@/api/cartoon'
// 引入抽离出来的组件
import indexHeader from './components/indexHeader'
import indexNav from './components/indexNav'
import indexRecommend from './components/indexRecommend'
export default {
  name: 'Home',
  data () {
    return {
      bannerList: [],
      recommentList: []
    }
  },
  components: {
    Swiper,
    SwiperItem,
    indexHeader,
    indexNav,
    indexRecommend
  },
  methods: {
    changeHandler (payload) {
      console.log('index', payload)
    },
    getBanner () {
      getBanner().then(res => {
      // console.log(res)
        if (res.code === 200) {
          this.bannerList = res.info
        } else {
          alert(res.code_msg)
        }
      })
        .catch(err => {
          alert('网络异常，请稍后' + err)
        })
    },
    getIndexRecomment () {
      getIndexRecomment().then(res => {
      // console.log(res)
        if (res.code === 200) {
          this.recommentList = res.info
        } else {
          alert(res.code_msg)
        }
      })
        .catch(err => {
          alert('网络异常，请稍后' + err)
        })
    }
  },
  created () {
    // 轮播图数据
    this.getBanner()
    // 推荐数据
    this.getIndexRecomment()
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/mixins.scss";
.page-home {
  .index-main {
    flex: 1;
    overflow-y: auto;
  }
  .my-swiper {
    img {
      width: 100%;
    }
  }
  display: flex;
  flex-direction: column;
  height: 100%;

  .my-icp {
    padding: 5px 0;
    font-size: 12px;
    .record {
      display: flex;
      align-items: center;
      justify-content: center;
      .img {
        width: 15px;
        height: 15px;
        margin-right: 4px;
      }
    }
    .licence {
      margin-top: 4px;
      text-align: center;
    }
  }
}
</style>
