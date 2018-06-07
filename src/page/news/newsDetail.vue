<template>
    <div class="container-detail">
        <head-top go-back='true' :head-title="profiletitle"></head-top>
        <section class="newsdetail_wrapper">
        	<div class="broadcast_detail_title">
        		{{this.newsDetail.title}}
        	</div>
        	<div class="broadcast_detail_content">
            {{this.newsDetail.newsContent}}
        	</div>
        </section>
    </div>
</template>
<script>
import headTop from 'src/components/header/head'
import footGuide from 'src/components/footer/footGuide'
import {loadMore} from 'src/components/common/mixin'
import {showBack, animate} from 'src/config/mUtils'
import {getNewsDetail} from 'src/service/getData'
import loading from 'src/components/common/loading'

export default {
	data(){
        return {
        	profiletitle: '播报内容',
        	news_id:null,
          newsDetail: {}
        }
    },
    created(){
        this.news_id = this.$route.params.newsId;
        console.log(this.news_id)
    },

    mounted(){
      this.initData()
    },
  	components: {
  	    headTop,
  	    footGuide,
  	},
    computed: {
    },
    methods: {
      initData(){
        getNewsDetail(this.news_id).then(res => {
          this.newsDetail = res.data.datas;
        }).catch(err => {
          console.log('获取详情错误:' + err)
        })
      }
    },
    watch: {

    }
}

</script>

<style lang="scss" scoped>
    @import 'src/style/mixin';
	.container-detail{
        position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #fff;
		z-index: 12;
        padding-top: 1.95rem;
        p, span{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
    }
    .newsdetail_wrapper{
    	background-color: white;
    	padding:0.6rem;
    	font-size: 0.65rem;
    }
    .broadcast_detail_title{
    	font-weight: 600;
	    line-height: 1.0rem;
	    color: black;
	    font-size: 0.7rem;
	    padding: 0.4rem 0rem;
	    border-bottom: solid 1px gainsboro;
    }
    .broadcast_detail_content{
    	text-indent: 1.4rem;
    	margin-top: 0.4rem;
    	line-height: 1.1rem;
    }
</style>
