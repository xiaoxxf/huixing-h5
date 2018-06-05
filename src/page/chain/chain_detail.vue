<template>
  <div>
    <head-top goBack='true' :headTitle='this.projectInfo.projectName'>
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
            <span class="score_star">
              {{countScore(this.projectInfo.score/2)}}
            </span>
            <span class="score">
              {{this.projectInfo.score}}
            </span>
            <span class="type">{{this.projectType}}</span>
          </div>
        </div>
        <div class="follow_btn" v-if="userInfo">
          <button type="button" name="button" class="btn" @click='followProject()'>关注</button>
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
        <svg class="book_icon">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="'#book'"></use>
        </svg>
        <p class="white_paper_slogan">下载白皮书了解更多</p>
        <a :href="this.projectInfo.whitePaper" target="_blank" class="dowload_white_paper">
          <button type="button" name="button" class="btn">下载</button>
        </a>

      </div>

    </section>

    <!-- 项目简介 -->
    <section class="project_intro_section">

      <h3 class="project_content_title">
        <svg class="project_inro_icon">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="'#project_intro'"></use>
        </svg>
        项目简介
      </h3>
      <div class="project_content" v-if="showShortContent">
        &#12288&#12288
        {{this.projectShortContent}}...
        <span class="show_more_content_button" @click='changeShowContentType()'>展开</span>
      </div>
      <div class="project_content" v-else>
        &#12288&#12288
        {{this.projectInfo.projectContent}}
        <span class="show_more_content_button" @click='changeShowContentType()'>收起</span>

      </div>
    </section>

    <!-- 项目团队 -->
    <section class="project_team_section">
      <h3 class="project_team_slogan">
        <svg class="project_team_icon">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="'#team'"></use>
        </svg>
        团队
      </h3>
      <div class="project_team_list" ref="teamWrapper">
        <div class="project_team_item" v-for="(item, index) in projectInfo.chainTeamList" :key="index">
          <img :src="item.picHref" alt="">
          <p>{{item.position}}</p>
          <p>{{item.name}}</p>
        </div>
      </div>
    </section>

    <!-- 短评 -->
    <section class="project_short_comment_section"  v-if='shortCommentList.length != 0'>
      <div class="project_short_comment_head">
        <span class="block_span"></span>
        <h3 class="short_comment_slogan">短评</h3>
        <router-link :to="{ name: '', params: {} }" class="write_short_comment" v-if="userInfo">
          <button type="button" name="button">+写短评</button>
        </router-link>
      </div>

      <div class="short_comment_list">
        <div class="short_comment_item" v-for="(item, index) in shortCommentList" :key="index">
          <!-- 名称、评分 -->
          <div class="comment_user_and_score">
            <img v-lazy="item.userPic" alt="">
            <span class="creator_real_name">{{item.realName}}</span>
            <span class="score_star">{{countScore(item.score/2)}}</span>
          </div>
          <!-- 评论内容 -->
          <div class="comment_text_content">
            &#12288&#12288{{item.textTitle}}
          </div>
          <!-- 时间 -->
          <div class="meta">
            <span class="created_time">{{item.createTime.split(' ')[0]}}</span>
          </div>
        </div>
      </div>
      <router-link :to="{ name: '', params: {} }" v-if='shortCommentList.length == short_comment_list_page_size'>
        <button type="button" name="button" class="read_more">查看更多</button>
      </router-link>
    </section>

    <!-- 长评 -->
    <section class="project_long_comment_section"  v-if='longCommentList.length != 0'>
      <div class="project_long_comment_head">
        <span class="block_span"></span>
        <h3 class="long_comment_slogan">长评</h3>
        <router-link :to="{ name: '', params: {} }" class="write_long_comment" v-if="userInfo">
          <button type="button" name="button">+写长评</button>
        </router-link>
      </div>

      <div class="long_comment_list">
        <div class="long_comment_item" v-for="(item, index) in longCommentList" :key="index">
          <!-- 名称、评分 -->
          <div class="comment_user_and_score">
            <img v-lazy="item.userPic" alt="">
            <span class="creator_real_name">{{item.realName}}</span>
            <span class="score_star">{{countScore(item.score/2)}}</span>
          </div>
          <!-- 评论内容 -->
          <div class="comment_text_title">
            {{item.textTitle}}
          </div>
          <div class="comment_text_content">
            &#12288&#12288
            {{item.textContent.substr(0,70)}}...
          </div>
          <!-- 时间 -->
          <div class="meta">
            <span class="created_time">{{item.createTime.split(' ')[0]}}</span>
          </div>
        </div>
      </div>
      <router-link :to="{ name: '', params: {} }" v-if='longCommentList.length == long_comment_list_page_size'>
        <button type="button" name="button" class="read_more">查看更多</button>
      </router-link>
    </section>

    <span class="fake_container"></span>
  	<foot-guide></foot-guide>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
// import {imgBaseUrl} from 'src/config/env'
import headTop from 'src/components/header/head'
import footGuide from 'src/components/footer/footGuide'
import {queryProjectInfo, getProjectCategory, queryCommentByProject, follow} from 'src/service/getData'
import BScroll from 'better-scroll'

export default {
  data(){
    return{
      projectInfo: {},
      projectShortContent: '',
      showShortContent: true, //项目简介展示部分or全部
      projectType: '', //类型中文名
      projectId: '',
      // initScore: ''★★★★★☆☆☆☆☆'',
      // projectScore: '★★★★★☆☆☆☆☆', //评分
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

  computed: {
      ...mapState([
          'userInfo'
      ]),
  },

  mounted(){

    // 渲染所有项目数据
    this.$nextTick(()=>{
      this.initData().then(res => {
        // 团队的scroll
        if (this.projectInfo.chainTeamList) {
          this.menu_scroll = new BScroll(this.$refs.teamWrapper, {
              startX:0,
              click:true,
              scrollX:true,
              scrollY:false,
              eventPassthrough:'vertical'
          })
        }

      })
    })

  },

  methods: {
    // 初始化数据
    async initData(){
      this.projectId = this.$route.params.projectId;
      // 查询项目基础信息
      await queryProjectInfo(this.projectId)
            .then(res => {
              this.projectInfo = res;
              // 纯文本项目内容
              this.projectInfo.projectContent = this.projectInfo.projectContent.replace(/<\/?[^>]*>/g, '').replace(/[|]*\n/, '').replace(/&npsp;/ig, '');
              this.projectShortContent = this.projectInfo.projectContent.substr(0,70);
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
              for (var i = 0; i < this.longCommentList.length; i++) {
                this.longCommentList[i].textContent = this.longCommentList[i].textContent.replace(/<\/?[^>]*>/g, '').replace(/[|]*\n/, '').replace(/&npsp;/ig, '');

              }
            })
            .catch(err => {
              console.log('获取长评错误:' + err);
            });

    },

    // 计算评分星星
    countScore: function(rate){
      var start = 5 - rate;
      var end = 10 - rate;
      return '★★★★★☆☆☆☆☆'.slice(start,end);
    },
    // 项目详情展开
    changeShowContentType(){
      this.showShortContent = !this.showShortContent;
    },
    // // 关注项目
    followProject(){
      if (this.userinfo) {
        follow(this.$route.params.projectId,this.userInfo.id,this.userInfo.userPwd,3)
              .then(res => {
                console.log(res)
              })
              .catch(err => {
                console.log('关注错误:' + err);
              })
      }
    }

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



  // 项目基础信息
  .project_basis_info{
    background-color: white;
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    padding: 0.8rem;
    border-bottom:0.04rem solid #D4DADE;
    .project_basis_info_part_one{
      display: flex;
      flex-direction: row;
      margin-bottom: 1.0rem;
      .project_logo{
        width: 25%;
        img{
          border-radius: 20px;
          @include wh(2.4rem,2.4rem);
        }
      }
      .project_name_type_score{
        width: 50%;
        .score{
          color: grey;
          font-size: 0.44rem;
        }
        .type{
          color: grey;
          font-size: 0.44rem;
        }
      }
      .follow_btn{
        width: 20%;
        button{
          background: #006bb3;
          font-size: 0.6rem;
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
      display: flex;
      flex-direction: row;
      // margin-top: 0.5rem;
      padding: 1.1rem 0.8rem 0rem 0.4rem;
      .book_icon{
        @include wh(.8rem, .8rem);
        vertical-align: top;
        padding-right: 0.2rem;
        color: #006bb3;
      }
      .white_paper_slogan{
        font-size: 0.57rem;
        font-weight: bolder;
        color: #151616;
      }
      // 下载白皮书
      .dowload_white_paper{
        margin-left: 30%;
        // width: 20%;
        margin-top: -0.5rem;
        button{
          padding: 0 0.4rem;
          background: #006bb3;
          font-size: 0.6rem;
          color: white;
          width: 100%;
          // height: 1.2rem;
          border-radius: 0.2rem;
          // margin-top: 0.7rem;
        }
      }
    }
  }

  // 项目简介
  .project_intro_section{
    background-color: white;
    padding: 0.6rem;
    border-bottom:0.04rem solid #D4DADE;
    .project_content_title{
      color:#006bb3;
      font-size: 0.65rem;
      font-weight: 700;
      margin-bottom: 0.2rem;
      .project_inro_icon{
        @include wh(.8rem, .8rem);
        vertical-align: top;
        // padding-top: 0.5rem;
      }
    }

    .project_content{
      font-size: 0.55rem;
      color: grey;
      line-height: 1.7;
    }
    .show_more_content_button{
      font-size: 0.55rem;
      margin-top: 0.1rem;
      color:#006bb3;
      float: right;
    }
  }

  // 项目团队
  .project_team_section{
    background-color: white;
    padding: 0.6rem;
    width: 100%;
    overflow: auto;
    margin-bottom: 1rem;
    border-bottom:0.04rem solid #D4DADE;
    .project_team_slogan{
      color:#006bb3;
      font-size: 0.65rem;
      font-weight: 700;
      margin-bottom: 0.4rem;
      .project_team_icon{
        @include wh(1.0rem, 1.0rem);
        vertical-align: top;
      }
    }
    .project_team_list{
      display: flex;
      flex-direction: row;
      .project_team_item{
        // padding: 0 1rem;
        margin-right: 1.0rem;
        min-width: 4.5rem;
        img{
          @include wh(2.4rem,2.4rem);
          border-radius: 10px;
        }
        p{
          // text-align: center;
          color: #7C7C7C;
          font-size: 0.6rem;
        }
      }
    }
  }

  // 短评列表
  .project_short_comment_section{
    margin-bottom: 1.5rem;
    background-color: white;
    padding: 0.8rem;
    .project_short_comment_head{
      display: flex;
      flex-direction: row;
      .block_span{
        position: relative;
        // margin-top: 5px;
        float: left;
        width: 0.2rem;
        height: 0.8rem;
        margin-right: 0.3rem;
        background-color: #006bb3;
      }
      .short_comment_slogan{
        color:#151616;
        font-size: 0.65rem;
        font-weight: 700;
      }
      .write_short_comment{
        padding: 0 0.4rem;
        background: white;
        font-size: 0.6rem;
        border: solid 1px #006bb3;
        margin-left: 65%;
        border-radius: 0.2rem;
        button{
          color: #006bb3;
          background: white;
        }
      }
    }

    // 短评列表
    .short_comment_list{
      margin-top: 0.4rem;
      display: flex;
      flex-direction: column;
      .short_comment_item{
        padding: 0.5rem;
        background-color: #f1f5f7;
        border-radius: 5px;
        margin-bottom: 0.4rem;
        // 评论人、评分
        .comment_user_and_score{
          display: flex;
          flex-grow: row;
          color: #7C7C7C;
          font-size: 0.6rem;
          padding: 0.1rem 0;
          img{
            @include wh(1.2rem,1.2rem);
            border-radius:30px;
            margin-top: 0.15rem;
            // background-color: white;
          }
          .creator_real_name{
            margin: 0.3rem;
            color:#7C7C7C;
          }
          .score_star{
            margin-top: 0.4rem;
          }
        }
        // 评论内容
        .comment_text_content{
          color: #7C7C7C;
          font-size: 0.6rem;
          padding: 0.3rem 0;
        }
        .meta{
          margin-top: 0.2rem;
          .created_time{
            color: #7C7C7C;
            font-size: 0.3rem;
            float: left;
          }
        }
      }
    }
  }

  // 长评列表
  .project_long_comment_section{
    margin-bottom: 2rem;
    background-color: white;
    padding: 0.8rem;
    .project_long_comment_head{
      display: flex;
      flex: row;
      .write_long_comment{
        padding: 0 0.4rem;
        background: white;
        font-size: 0.6rem;
        border: solid 1px #006bb3;
        margin-left: 65%;
        border-radius: 0.2rem;
        button{
          color: #006bb3;
          background: white;
        }
      }
      .block_span{
        position: relative;
        // margin-top: 5px;
        float: left;
        width: 0.2rem;
        height: 0.8rem;
        margin-right: 0.3rem;
        background-color: #006bb3;
      }
      .long_comment_slogan{
        color:#151616;
        font-size: 0.65rem;
        font-weight: 700;
      }
    }

    // 长评列表
    .long_comment_list{
      margin-top: 0.4rem;
      display: flex;
      flex-direction: column;
      .long_comment_item{
        padding: 0.5rem;
        background-color: #f1f5f7;
        border-radius: 5px;
        margin-bottom: 0.4rem;
        // 评论人、评分
        .comment_user_and_score{
          display: flex;
          flex-grow: row;
          color: #7C7C7C;
          font-size: 0.6rem;
          padding: 0.2rem 0;
          img{
            @include wh(1.2rem,1.2rem);
            border-radius:30px;
            margin-top: 0.15rem;
            // background-color: white;
          }
          .creator_real_name{
            margin: 0.3rem;
            color:#7C7C7C;
          }
          .score_star{
            margin-top: 0.4rem;
          }
        }
        // 长评标题
        .comment_text_title{
          color: #7C7C7C;
          font-size: 0.6rem;
          padding: 0.3rem 0;
        }
        // 长评内容
        .comment_text_content{
          color: #7C7C7C;
          font-size: 0.6rem;
          padding: 0.1rem 0;
        }
        .meta{
          margin-top: 0.2rem;
          .created_time{
            color: #7C7C7C;
            font-size: 0.3rem;
            float: left;
          }
        }
      }
    }
  }

  .read_more{
    padding: 0 0.4rem;
    background: #006bb3;
    color: white;
    font-size: 0.6rem;
    // width: 100%;
    margin-left: 40%;
    // height: 1.2rem;
    border-radius: 0.2rem;
  }
  .score_star{
    color: #75A8E2 !important;
    font-size: 0.44rem;
  }




</style>
