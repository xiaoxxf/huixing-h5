<template>
  <div>
    <head-top goBack='true' headTitle='彗星链库'>
      <router-link :to="'/search/geohash'" class="link_search" slot="search">
          <svg class="head_search_icon">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="'#search'"></use>
          </svg>
      </router-link>
    </head-top>

    <!-- 项目基础信息 -->
    <section>

    </section>

    <!-- 项目简介 -->
    <section>

    </section>

    <!-- 项目团队 -->
    <section>

    </section>

    <!-- 短评 -->
    <section>

    </section>

    <!-- 长评 -->
    <section>

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
import {queryProjectInfo} from 'src/service/getData'
import BScroll from 'better-scroll'

export default {
  data(){
    return{
      projectInfo: {},
      projectId: '',
      currentPage: 1,
      pageSize: 6
    }
  },

  components: {
    footGuide,
    headTop
  },

  mounted(){

    // 渲染所有项目数据
    this.initData();

  },

  methods: {
    async initData(){
      this.projectId = this.$route.params.projectId;
      this.projectInfo =  await queryProjectInfo(this.projectId);
    },


  },

  watch: {

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
