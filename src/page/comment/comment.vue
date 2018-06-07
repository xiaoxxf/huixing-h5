<template>
  <div>
    <head-top goBack='true' :headTitle='title'>
      <router-link :to="'/search/geohash'" class="link_search" slot="search">
          <svg class="head_search_icon">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="'#search'"></use>
          </svg>
      </router-link>
    </head-top>

    <!-- 文章作者信息 -->
    <section class="creator_info">
      <img :src="this.commentInfo.userPic" alt="">
      <div class="">
        <p class="creator_name">{{this.commentInfo.realName}}</p>
        <p class="create_time">{{this.commentInfo.createTime}}</p>
      </div>
    </section>

    <!-- 文章标题 -->
    <section class="comment_title">
      {{this.commentInfo.textTitle}}
    </section>

    <!-- 文章内容 -->
    <section class="comment_content"  v-html='this.commentInfo.textContent'>
      <!-- {{this.commentInfo.textContent}} -->
    </section>

    <!-- 评论列表 -->
    <section>

    </section>

    <transition name="loading">
      <loading v-show="showLoading"></loading>
    </transition>

    <span class="fake_container"></span>
  	<!-- <foot-guide></foot-guide> -->
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import headTop from 'src/components/header/head'
import footGuide from 'src/components/footer/footGuide'
import {queryCommentDetail} from 'src/service/getData'
import BScroll from 'better-scroll'
// 加载的
import {loadMore} from 'src/components/common/mixin'
import {showBack, animate} from 'src/config/mUtils'
import loading from 'src/components/common/loading'

export default {
  data(){
    return{
      commentInfo: {},
      commentId: '',
      title: '',
      showLoading: true, //显示加载动画
    }
  },

  components: {
    footGuide,
    headTop,
    loading
  },

  computed: {

  },

  created(){
    this.commentId = this.$route.params.commentId;
  },
  mounted(){
    this.initData();
  },

  methods: {
    initData(){
      queryCommentDetail(this.commentId).then(res => {
        this.commentInfo = res.data.datas;
        this.title = this.commentInfo.textTitle
        this.commentInfo.createTime = this.commentInfo.createTime.split(' ')[0]
      }).catch(err => {
        console.log('获取数据错误:' + err)
      }).finally( () => {
        this.showLoading = false;
      })

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

  // 作者信息
  .creator_info{
    margin-top: 2rem;
    display: flex;
    flex-direction: row;
    padding: 0.8rem;
    img{
      border-radius: 4rem;
      @include wh(2.4rem,2.4rem);
    }
    div{
      margin-left: 0.8rem;
      .creator_name{
        color: #373737;
        font-size: 1.0rem;
      }
      .create_time{
        margin-top: 0.2rem;
        color: #c0c0c0;
        font-size: 0.6rem;
      }
    }

  }

  // 文章标题
  .comment_title{
    padding: 0 0.8rem 0.8rem 0.8rem;
    font-weight: bold;
  }

  // 文章内容
  .comment_content{
    // max-width: 100%;
    // overflow: auto;
    padding: 0 0.8rem 0.8rem 0.8rem;
    color: #7e7e7e;
    img{
      border-radius: 100px;
    }
    p{
      color: #373737;
      font-size: 1.0rem;
    }
  }

</style>
