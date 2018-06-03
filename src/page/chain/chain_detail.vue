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
    <section class="project_basis_info">
      <!-- 图片、名字、类型、评分 -->
      <div class="project_basis_info_part_one">
        <div class="project_logo">
          <img :src="this.projectInfo.projectLogo" alt="" >
        </div>
        <div class="project_name_type_score">
          <p>{{this.projectInfo.projectBigName}}</p>
          <div class="">
            <span class="score">评分:{{this.projectInfo.score}}分</span>
            <span class="type">{{this.projectType}}</span>
          </div>
        </div>
        <div class="follow_btn">
          <button type="button" name="button" class="btn">关注</button>
        </div>
      </div>
      <!-- 时间、流通量、总量 -->
      <div class="project_basis_info_part_tow">
        <div>
          <p class="value">{{this.projectInfo.fundraisingTime ? this.projectInfo.fundraisingTime.split(' ')[0] : '暂无'}}</p>
          <p class="title">募资时间</p>

        </div>
        <div>
          <p class="value">{{this.projectInfo.currencyCirculation ? this.projectInfo.currencyCirculation : '暂无'}}</p>
          <p class="title">流通量</p>
        </div>
        <div>
          <p class="value">{{this.projectInfo.currencyCount ? this.projectInfo.currencyCount : '暂无'}}</p>
          <p class="title">代币总量</p>
        </div>
      </div>
      <!-- 白皮书 -->
      <div class="project_basis_info_part_three">
        <!-- <p>下载白皮书了解更多</p> -->
      </div>

    </section>

    <!-- 项目简介 -->
    <section>
      <!-- <h1>{{this.projectInfo.projectBigName}}</h1> -->

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
import {queryProjectInfo, getProjectCategory, queryCommentByProject} from 'src/service/getData'
import BScroll from 'better-scroll'

export default {
  data(){
    return{
      projectInfo: {},
      projectType: '', //类型中文名
      projectId: '',
      currentPage: 1,
      pageSize: 6,
      shortCommentList: [],
      longCommentList: [],
      short_comment_list_current_page: 1,
      short_comment_list_page_size: 3,
      long_comment_list_current_page: 1,
      long_comment_list_page_size: 3,
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
      // 查询项目基础信息
      await queryProjectInfo(this.projectId)
            .then(res => {
              this.projectInfo = res;
            })
            .catch(err => {
              console.log('获取长评错误:' + err);
            });

      // 查询类型中文名
      await getProjectCategory()
      .then(res => {
        var projectType_list = res.data.datas;
        for (let type of projectType_list) {
          if (type.dicType == this.projectInfo.projectType) {
            this.projectType = type.dicValue;
          }
        }
      })
      .catch(res => {
        console.log('查询类型中文名错误:' + err)
      });
      // 查询短评
      await queryCommentByProject(this.$route.params.projectId,this.short_comment_list_current_page,this.short_comment_list_page_size,1)
            .then(res => {
              this.shortCommentList = res.data.datas;
            })
            .catch(err => {
              console.log('获取短评错误:' + err);
            });
      // 查询长评
      await queryCommentByProject(this.$route.params.projectId,this.long_comment_list_current_page,this.long_comment_list_page_size,2)
            .then(res => {
              this.longCommentList = res.data.datas;
            })
            .catch(err => {
              console.log('获取长评错误:' + err);
            });
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

  // 项目基础
  .project_basis_info{
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    padding: 0.8rem;
    border-bottom: 1px solid #87888A;
    .project_basis_info_part_one{
      display: flex;
      flex-direction: row;
      margin-bottom: 1.0rem;
      .project_logo{
        width: 30%;
        img{
          @include wh(2.4rem,2.4rem);
        }
      }
      .project_name_type_score{
        width: 50%;
        .score{
          color: grey;
          font-size: 0.64rem;
        }
        .type{
          color: grey;
          font-size: 0.64rem;
        }
      }
      .follow_btn{
        width: 20%;
        button{
          background: #3C5CC6;
          color: white;
          width: 100%;
          height: 1.2rem;
          border-radius: 0.2rem;
          margin-top: 0.7rem;
        }
      }

    }
    .project_basis_info_part_tow{

      .title{
        color: #7C7C7C;
        font-size: 0.6rem;
      }
      .value{
        color:#161515;
        margin-bottom: 0.4rem;
        font-size: 0.6rem;
      }
      display: flex;
      flex-direction: row;
      div{
        width: 33.33%;
        margin-left: 0.8rem;
      }
    }
    .project_basis_info_part_three{

    }

  }

</style>
