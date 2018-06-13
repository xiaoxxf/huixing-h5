<template>
    <div class="container-detail">
        <head-top go-back='true' :head-title="profiletitle"></head-top>

        <section class="news_index_section" v-load-more="loaderMore">
          <div v-for="(item, index) in news_list" :key="index" class="new_item" @click='goToDetail(item)'>
            <p class="news_title">{{item.title}}</p>
            <p class="news_content">
              {{item.newsContent.substr(0,30)}}...
              <!--<span class="news_item">{{item.createTime.split(' ')[0]}}</span>-->
            </p>
            <p class="news_item">{{item.createTime.split(' ')[0]}}</p>
			
          </div>
        </section>
        <transition name="loading">
          <loading v-show="showLoading"></loading>
        </transition>
    </div>
</template>
<script>
import headTop from 'src/components/header/head'
import footGuide from 'src/components/footer/footGuide'
import {loadMore} from 'src/components/common/mixin'
import {showBack, animate} from 'src/config/mUtils'
import {getNewsIndex} from 'src/service/getData'
import loading from 'src/components/common/loading'
export default {
	  data(){
        return {
          news_list: [],
        	profiletitle: '彗星播报',
        	news_id:null,
          preventRepeatReuqest: false, //到达底部加载数据，防止重复加载
          touchend: false, //没有更多数据
          showLoading: true, //显示加载动画
          currentPage: 1,
          pageSize: 24,
        }
    },

    mounted(){
      this.initData()
    },
  	components: {
  	    headTop,
  	    footGuide,
        loading,
  	},
    mixins: [loadMore],

    computed: {

    },
    methods: {
      initData(){
        getNewsIndex(this.currentPage,this.pageSize).then(res => {
          this.news_list = res.data.datas;
          // 去除HTML标签
          for (var i = 0; i < this.news_list.length; i++) {
            this.news_list[i].newsContent = this.news_list[i].newsContent.replace(/<\/?[^>]*>/g, '').replace(/[|]*\n/, '').replace(/&npsp;/ig, '');
          }
          this.showLoading = false;
        }).catch(res => {
          console.log('获取列表数据错误:' + err);
        })
      },
      goToDetail(item){
        this.$router.push({ name: 'newsDetail', params: { newsId: item.newsId  }})
      },

      //到达底部加载更多数据
  		loaderMore(){
  			if (this.touchend) {
  				return
  			}
  			//防止重复请求
  			if (this.preventRepeatReuqest) {
  				return
  			}
  			this.preventRepeatReuqest = true;
        this.currentPage ++;
        var more_project_list = [];
        getNewsIndex(this.currentPage,this.pageSize).then(res => {
          more_project_list = res.data.datas
          // 去除HTML标签
          for (var i = 0; i <res.data.datas.length; i++) {
            res.data.datas[i].newsContent = res.data.datas[i].newsContent.replace(/<\/?[^>]*>/g, '').replace(/[|]*\n/, '').replace(/&npsp;/ig, '');
          }
          this.news_list = [...this.news_list, ...more_project_list];
          // 已无更多数据
          if (more_project_list.length < this.pageSize) {
            this.touchend = true;
          }
        }).catch(res => {
          console.log('加载更多错误:' + err);
        }).finally(() => {
          this.preventRepeatReuqest = false
        })


  		}
    },
    watch: {

    }
}

</script>

<style lang="scss" scoped>
  @import 'src/style/mixin';
  .news_index_section{
    margin-top: 2rem;
    padding: 0.8rem;
    background-color:white;
    .new_item{
      margin-bottom: 0.5rem;
      border-bottom:0.005rem solid #D4DADE;
      /*min-height:5rem;*/
    }
    .news_title{
      @include sc(0.7rem,#232121)
    }
    .news_content{
      margin: 0.4rem 0;
      @include sc(0.6rem,#8A8A8A)
      .news_item{
        @include sc(0.6rem,#8A8A8A)
        float: right;
      }
    }
    .news_item{
    	margin: 0.4rem 0;
	    font-size: 0.6rem;
	    color: #716a6a;
	    /*float: right;*/
	    display: inline-block;
    	padding-right: 0.4rem;
    }
  }
</style>
