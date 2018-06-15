<template>
  <div>
    <head-top goBack='true' :headTitle='title'>
      <router-link :to="'/search/geohash'" class="link_search" slot="search">
          <svg class="head_search_icon">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="'#search'"></use>
          </svg>
      </router-link>
      <nav class="project_type_nav_wrapper" slot='menu'>
        <div class="project_type_wrapper">
          <div class="type_list_container" id="wrapper_menu"  ref="searchWrapper" >
            <ul class="project_type_wrap" ref="warpperMune">
              <li :class="{type_active: !typeActive}" @click='changeActive()'>
                所有
              </li>
              <li v-for="(item, index) in chainType" :key="index" :class="{type_active: item.id == typeActive}" @click='changeActive(item.id)'>
                {{item.dicValue}}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </head-top>

    <!-- <section> -->
      <section class="project_list" v-load-more="loaderMore">
        <router-link :to="{ name: 'chainDetail', params: {projectId: item.projectId} }" v-for="(item, index) in projectList" :key="index"
            :class="{'project_item': true, 'border': (index+1)%3 != 0, 'div_bottom': (index+1)%6 == 4 || (index+1)%6 == 5 || (index+1)%6 == 0}">
        <!-- <router-link :to="'/chain/chain_detail/' + item.projectId"  v-for="(item, index) in projectList" :key="index"
            :class="{'project_item': true, 'border': (index+1)%3 != 0, 'div_bottom': (index+1)%6 == 4 || (index+1)%6 == 5 || (index+1)%6 == 0}"> -->
          <div>
            <img :src="item.projectLogo" alt="">
            <p class="project_big_name">{{item.projectBigName}}</p>
          </div>
        </router-link>
      </section>
    <!-- </section> -->

    <!-- <transition name="loading">
      <loading-more :loadingMoreShow='loadingMoreShow'></loading-more>
    </transition> -->

	  <span class="fake_container"></span>
  	<foot-guide></foot-guide>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
// import {imgBaseUrl} from 'src/config/env'
import headTop from 'src/components/header/head'
import footGuide from 'src/components/footer/footGuide'
import {loadMore} from 'src/components/common/mixin'
import {showBack, animate} from 'src/config/mUtils'
import {getProjectCategory, queryProjectByType} from 'src/service/getData'
import loading from 'src/components/common/loading'
import loadingMore from 'src/components/common/loadingMore'

// import 'src/plugins/swiper.min.js'
// import 'src/style/swiper.min.css'
import BScroll from 'better-scroll'

export default {
  data(){
    return{
      headTitle: '链库',
      chainType: [],
      typeActive: '', //选中的项目类型
      projectList: [],
      preventRepeatReuqest: false, //到达底部加载数据，防止重复加载
			touchend: false, //没有更多数据
      showLoading: true, //显示加载动画
      currentPage: 1,
      pageSize: 6,
      title:'彗星链库',
      loadingMoreShow: false

    }
  },

  components: {
    footGuide,
    headTop,
    loading,
    loadingMore
  },
  mixins: [loadMore],

  mounted(){
    // 项目类型
    getProjectCategory()
    .then(res => {
      this.chainType = res.data.datas
    })
    .then(() => {
      //初始化better-scroll
      const remWidth = window.screen.width/375*24;
      let wrapperW = this.chainType.length*remWidth*3.6;
      this.$refs.warpperMune.style.width=wrapperW+'px';
      this.$nextTick(()=>{
        this.menu_scroll = new BScroll(this.$refs.searchWrapper, {
            startX:0,
            click:true,
            scrollX:true,
            scrollY:false,
            eventPassthrough:'vertical'
        })
      });
    })

    // 渲染所有项目数据
    this.initData()

  },

  methods: {

    async initData(){
      await queryProjectByType().then(res => {
        this.projectList = res.data.datas;
        this.showLoading = false;
      });
    },

    // 改变选中的项目类型
    changeActive(e){
      this.typeActive = e
    },

    // 根据项目类型项目列表
    async getProjectByType(){
      // 重置
      this.currentPage = 1;
      this.touchend = false;
      var projectType = this.typeActive;
      // var currentPage = this.currentPage;
      // var pageSize = this.pageSize;
      this.projectList = [];
      this.showLoading = true;
      await queryProjectByType(projectType).then(res => {
        this.projectList = res.data.datas
        this.showLoading = false;
      }).catch(err => {
        console.log('加载项目列表错误:' + err);
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
      this.loadingMoreShow = true;
      this.currentPage ++;
      var more_project_list = [];
      await queryProjectByType(this.typeActive,this.currentPage,this.pageSize).then(res => {
        more_project_list = res.data.datas
        this.projectList = [...this.projectList, ...more_project_list]
        // 已无更多数据
        if (more_project_list.length < this.pageSize) {
          this.touchend = true;
        }
      }).catch(err => {
        console.log('加载更多错误:' + err);
      }).finally(() => {
        this.preventRepeatReuqest = false;
        this.loadingMoreShow = false;

      })

			// this.hideLoading();

		}

  },

  watch: {
    //typeActive 改变时渲染不同类型的项目
    typeActive:function(value){
      this.getProjectByType();
      // this.project_list_scroll.refresh();
    }
  }

}

</script>

<style lang="scss" scoped>
@import '../../style/mixin';
  .fake_container{
    display: block;
    width: 100%;
    height: 2rem;
  }
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
  // 分类
  .project_type_nav_wrapper{
    // position: fixed;
    padding: 1.5rem 0.4rem 0 0.4rem;
    background-color: #fff;
    border-bottom:0.025rem solid $bc;

    // margin-top: 1.9rem;
    .project_type_wrapper{
      position: relative;
      // height: 100%;
      overflow: hidden;
      .type_list_container{
        .project_type_wrap{
          display: flex;
            li{
              font-size: .65rem;
              margin-right: 1rem;
              padding-bottom: .3rem;
              text-align: left;
            }
            .type_active{
              color: #1267a6;
              border-bottom: 2px solid #1267a6;
            }
        }
      }
    }
  }

  // 项目列表
  .project_list{
    margin-top: 4rem;
    @include fj($type: column);
    // height: 100%;
    // padding: 4.0rem 0 2.0rem 0;
    // width:100%;
    // overflow: hidden;
    flex-wrap: wrap;
    .border{
      border-right:  0.01rem solid #E2E1E1;
    }
    .div_bottom{
      margin-bottom: 30px;
    }
    .project_item{
      // border: 0.01rem solid grey;
      border-bottom:  0.01rem solid #E2E1E1;

      background-color: white;
      width: 33.33%;
      padding: 0.4rem 1.3rem;
      img{
        @include wh(2.4rem,2.4rem);
        text-align: center;
      }

      .project_big_name{
        color: #383737;
        // padding-left: 0.3rem;
        text-align: center;
      }
    }
  }

</style>
