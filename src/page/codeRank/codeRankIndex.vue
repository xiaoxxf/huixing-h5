<template>
  <div >
    <head-top goBack='true'>
      <router-link :to="'/search/geohash'" class="link_search" slot="search">
          <svg class="head_search_icon">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="'#search'"></use>
          </svg>
      </router-link>
      <section class="title_head ellipsis" slot='msite-title'>
          <button type="button" name="button" :class="[order_active == 1 ? 'active_click' : 'title_button'] " @click='changeTitle(1)'>活跃榜</button>
          <button type="button" name="button" :class="[order_active == 2 ? 'active_click' : 'title_button'] " @click='changeTitle(2)'>人气榜</button>
      </section>

      <nav class="code_date_nav_wrapper" slot='menu'>
        <div class="code_date_wrapper">
          <ul class="code_date_wrap" ref="warpperMune">
            <li :class="[date_active == 3 ? 'date_active' : ''] " @click='changeDate(3)'>三个月</li>
            <li :class="[date_active == 6 ? 'date_active' : ''] " @click='changeDate(6)'>六个月</li>
            <li :class="[date_active == 9 ? 'date_active' : ''] " @click='changeDate(9)'>九个月</li>
            <li :class="[date_active == 12 ? 'date_active' : ''] " @click='changeDate(12)'>十二个月</li>
          </ul>
        </div>
      </nav>
    </head-top>

    <!-- 代码 -->

    <section class="code_rank_list_section" v-load-more="loaderMore">
      <table>
        <tr class="tr_head">
          <td>排名</td>
          <td>代码提交次数</td>
          <td>贡献者</td>
        </tr>
        <tr v-for="(item, index) in codeList" :key="index" class="tr_content">
          <td>{{index}}{{item.token}}</td>
          <td>{{item.commits}}</td>
          <td>{{item.contributors}}</td>
        </tr>
      </table>
    </section>

    <transition name="loading">
      <loading v-show="showLoading"></loading>
    </transition>

	  <span class="fake_container"></span>
  	<foot-guide></foot-guide>
  </div>
</template>

<script>
// import {mapMutations} from 'vuex'
// import {imgBaseUrl} from 'src/config/env'
import headTop from 'src/components/header/head'
import footGuide from 'src/components/footer/footGuide'
import {loadMore} from 'src/components/common/mixin'
import {getCodeRankData} from 'src/service/getData'
import {showBack, animate} from 'src/config/mUtils'
import loading from 'src/components/common/loading'
// import 'src/plugins/swiper.min.js'
// import 'src/style/swiper.min.css'

export default {
  data(){
    return{
      order_active: 1, // 1->选择活跃榜， 2->人气榜
      date_active: 3, // 选择时间排行
      currentPage: 1,
      pageSize: 24,
      preventRepeatReuqest: false, //到达底部加载数据，防止重复加载
			touchend: false, //没有更多数据
      showLoading: true, //显示加载动画
      title:'周排行',
      codeList: []
    }
  },

  components: {
    footGuide,
    headTop,
    loading,
  },
  mixins: [loadMore],

  mounted(){

    // 渲染所有项目数据
    this.getCodeRank()

  },

  methods: {

    // 加载代码列表
    async getCodeRank(){
      var sortByOrder = this.order_active;
      var monthNum = this.date_active;
      this.currentPage = 1;

      this.codeList = [];
      this.showLoading = true;
      await getCodeRankData(this.currentPage,this.pageSize,monthNum,sortByOrder).then(res => {
        this.codeList = res.data
        this.showLoading = false;
      }).catch(err => {
        console.log('加载代码列表错误:' + err);
      });
    },

    //到达底部加载更多数据
    async loaderMore(){
      if (this.touchend) {
        return
      }
      //防止重复请求
      if (this.preventRepeatReuqest) {
        return
      }
      this.preventRepeatReuqest = true;
      this.currentPage++;
      var more_code_list = [];
      var sortByOrder = this.order_active;
      var monthNum = this.date_active;
      await getCodeRankData(this.currentPage,this.pageSize,monthNum,sortByOrder).then(res => {
        more_code_list = res.data;
        if (more_code_list.length < this.pageSize) {
          this.touchend = true;
        }
        this.codeList = [...this.codeList, ...more_code_list]
        // this.hideLoading();
      }).catch(err => {
        console.log('加载更多错误:' + err);
      })
      this.preventRepeatReuqest = false;

    },

    // 改变加载的顺序
    changeTitle(e){
      this.order_active = e;
    },
    // 改变加载的月份
    changeDate(e){
      this.date_active = e;
    }

  },

  watch: {
    //date_active 改变时加载不同的月份
    date_active:function(value){
      this.getCodeRank();
      // this.getProjectByType();
      // this.project_list_scroll.refresh();
    },

    //order_active 改变时按不同顺序加载
    order_active:function(){
      this.getCodeRank();
    }
  }

}

</script>

<style lang="scss" scoped>
@import '../../style/mixin';

  // 头部
  .link_search{
		right: .8rem;
		@include wh(.8rem, .8rem);
		@include ct;
		.head_search_icon{
			@include wh(.8rem, .8rem);
			vertical-align: top;
		}
	}
  .title_head{
    padding-top: 0.22rem !important;
  }
  .title_button{
    width: 2.8rem;
    border: solid 1px #006bb3;
    color: #006bb3 !important;
    font-size: 0.1rem !important;
    padding: 0.3rem;
    background: white;
    border-radius: 0.2rem;
  }
  .active_click{
    width: 2.8rem;
    border: solid 1px #006bb3;
    color: white !important;
    font-size: 0.1rem !important;
    padding: 0.3rem;
    background: #006bb3;
    border-radius: 0.2rem;
  }

  // 分类
  .code_date_nav_wrapper{
    // position: fixed;
    padding: 1.5rem 0.4rem 0 0.4rem;
    background-color: #fff;
    border-bottom:0.025rem solid $bc;
    // margin-top: 1.9rem;
    .code_date_wrapper{
      margin-bottom: 0.3rem;

      // position: relative;
      // height: 100%;
      // overflow: hidden;
      margin-left: 12%;
      .code_date_wrap{
        display: flex;
          li{
            font-size: .65rem;
            margin-right: 1rem;
            padding-bottom: .3rem;
            text-align: left;
          }
          .date_active{
            color: #1267a6;
            border-bottom: 2px solid #1267a6;
          }
      }

    }
  }

  // 代码列表
  .code_rank_list_section{
    padding: 0.8rem;
    margin-top:4rem;
    margin-bottom:2rem;

    .tr_head{
      font-size: 0.7rem;
      // background-color: #fff;
      border-bottom:0.025rem solid $bc;
    }
    .tr_content{
      border-bottom:0.025rem solid $bc;
      background-color: #fff;
    }
  }

</style>
