<template>
  <div>
    <head-top goBack='true' headTitle='链库'>
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

    <section class="project_list">
      <router-link :to="'/chain/chain_detail/' + item.projectId"  v-for="(item, index) in projectList" :key="index"
          :class="{'project_item': true, 'border': (index+1)%3 != 0, }">
        <div>
          <img :src="item.projectLogo" alt="">
          <p class="project_big_name">{{item.projectBigName}}</p>
        </div>
      </router-link>
    </section>


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
import {getProjectCategory, queryProjectByType} from 'src/service/getData'
import 'src/plugins/swiper.min.js'
import 'src/style/swiper.min.css'
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
      pageSize: 6
    }
  },

  components: {
    footGuide,
    headTop
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
    this.initData().then(() => {
      this.$nextTick(() => {
        this.project_list_scroll = new BScroll('.project_list', {
          probeType: 3,
					deceleration: 0.003,
					bounce: false,
					swipeTime: 2000,
					click: true,
        });
        console.log(this.project_list_scroll)
        this.project_list_scroll.on('scroll', (pos) => {
          if (Math.abs(Math.round(pos.y)) >=  Math.abs(Math.round(this.project_list_scroll.maxScrollY))) {
            console.log("hotReviewScrollhotReviewScroll");
            this.loaderMore();
            // this.topicActiveScroll.refresh();
          }
        })
      })
    })

  },

  methods: {
    async initData(){
      this.projectList =  await queryProjectByType();
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
      // this.preventRepeatReuqest = false;

      var projectType = this.typeActive;
      // var currentPage = this.currentPage;
      // var pageSize = this.pageSize;
      this.projectList =  await queryProjectByType(projectType);
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

      this.currentPage ++;
      this.projectList = [...this.projectList, ...queryProjectByType(this.typeActive,this.currentPage,this.pageSize)]
			// this.hideLoading();

			this.preventRepeatReuqest = false;
		}

  },

  watch: {
    //typeActive 改变时渲染不同类型的项目
    typeActive:function(value){
      this.getProjectByType();
      this.project_list_scroll.refresh();
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
    @include fj($type: column);
    // height: 100%;
    padding: 4.0rem 0 2.0rem 0;
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
