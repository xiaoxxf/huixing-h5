<template>
  <div>
    <head-top goBack='true' :headTitle='"代码详情"'>
      <router-link :to="'/search/geohash'" class="link_search" slot="search">
          <svg class="head_search_icon">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="'#search'"></use>
          </svg>
      </router-link>
    </head-top>

    <!-- 代码详情 -->
    <section class="codeInfoSection">
      <div class="codeInfo">
        <div class="section_one">
          <span class="code_name">{{this.codeInfo.name}}</span>
          <a href="#" class="go_to_huixing_chain">去链库看评价</a>
        </div>

        <div class="section_two">
          <span class="code_language">代码语言:{{this.codeInfo.language}}</span>
          <span class="follow_count">关注数量:{{this.codeInfo.watchers}}</span>
        </div>
        <div class="section_three">
          <span class="cooperate_contributors">协作共享:{{this.codeInfo.contributors}}</span>
          <span class="most_active_contributor">最活跃共享者:{{this.codeInfo.others.substr(this.codeInfo.others.indexOf(':')+1,this.codeInfo.others.length)}}</span>
        </div>
        <div class="section_four">
          <span class="github_page">Github主页:{{this.codeInfo.githref}}</span>
        </div>
      </div>
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
import {getCodeRankData} from 'src/service/getData'
import BScroll from 'better-scroll'

export default {
  data(){
    return{
      codeInfo: {}
    }
  },

  components: {
    footGuide,
    headTop
  },

  computed: {

  },

  mounted(){
    this.initData();

  },

  methods: {
    initData(){
      var code_index = this.$route.params.codeIndex;
      var date = this.$route.params.date;
      var order = this.$route.params.order;
      getCodeRankData(1,code_index+1,date,order).then(res => {
        this.codeInfo = res.data[code_index];
        console.log(this.codeInfo);
      }).catch(err => {
        console.log('获取数据错误:' + err)
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

  // 代码详情
  .codeInfoSection{
    margin-top: 2rem;
    padding: 0.8rem;
    .codeInfo{
      background-color: white;
      border-radius: 0.5rem;
      display: row;
      .section_one{
        padding: 0 0.6rem;

        .code_name{
        }
        .go_to_huixing_chain{

        }
      }
      .section_two{
        padding: 0 0.6rem;

        .code_language{
          // float: left;
        }
        .follow_count{
          // float: right;
        }
        span{
          @include sc(.6rem,#7C7C7C);
        }

      }
      .section_three{
        padding: 0 0.6rem;

        .cooperate_contributors{
          // float: left;
        }
        .most_active_contributor{
          // float:right;
        }
        span{
          @include sc(.6rem,#7C7C7C);
        }

      }
      .section_four{
        padding-left: 0.6rem;

        .github_page{
          @include sc(.6rem,#7C7C7C);
        }
      }
    }
  }




</style>
