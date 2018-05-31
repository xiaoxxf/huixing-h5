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
      <div class="" v-for="(item, index) in projectList" :key="index" class="project_item">
        <img :src="item.projectLogo" alt="">
        <p>{{item.projectBigName}}</p>
      </div>
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
      projectList: []
    }
  },

  components: {
    footGuide,
    headTop
  },

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
          if (!this.scroll) {
              this.scroll=new BScroll(this.$refs.searchWrapper, {
                  startX:0,
                  click:true,
                  scrollX:true,
                  scrollY:false,
                  eventPassthrough:'vertical'
              })
          }else{
              this.scroll.refresh();
          }
      });
    })

    queryProjectByType().then(res => {
      this.projectList = res.data.datas
    })

    // 项目数据

  },

  methods: {
    changeActive(e){
      this.typeActive = e
    },

    async getProjectByType(){
      var projectType = this.typeActive
      queryProjectByType(projectType).then(res => {
        this.projectList = res.data.datas
      });

    }
  },

  watch: {
    //typeActive 改变时渲染不同类型的项目
    typeActive:function(value){
      // if(value != ''){
        this.getProjectByType();
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
    padding: 0.8rem 0.4rem 0 0.4rem;
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
    // @include fj($type: column);
    padding-top: 4.4rem;
    .project_item{
      img{
        width: 2.4rem;
        height: 2.4rem;
      }
    }
  }

</style>
