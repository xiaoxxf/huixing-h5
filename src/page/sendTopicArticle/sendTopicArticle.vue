<template>
	<div>
		<head-top goBack='true' >
			<router-link :to="'/search/geohash'" slot="search" class="msite_title">
				<span class="title_text ellipsis">
					{{topic_title}}
				</span>
			</router-link>
			
			<section class="link_search" slot="search">
				<span class="cancel_search">取消</span>
			</section>
    	</head-top>
    	
    	<!--我管理的专题-->
    	<section class="manage_topic">
    		<div class="manage_topic_title">
    			<span class="my_topic">我管理的专题</span>
    			<span class="my_more">查看全部</span>
    		</div>
    		<div class="manage_topic_info" >
    			<div class="inner_container" v-for="(item, index) in dataList">
	    			<img :src="item.topicPic" class="topic_icon" />
	    			<div class="topic_title">{{item.topic}}</div>
    			</div>
    		</div>
    	</section>
    	<!--推荐投稿-->
    	<section class="introduce_sendArticle">
    		<div class="introduce_sendArticle_title">推荐投稿</div>
    		<div class="introduce_sendArticle_info">
    			<div class="introdece_wrapper_info">
    				<img src="../../images/activity.png" class="introduce_icon" />
    				<div class="introduce_center">
    					<p class="introdece_title">公式算法</p>
    					<p class="introdece_already_get">已收录12篇文章</p>
    				</div>
    				<div class="send_article_btn">投稿</div>
    			</div>
    		</div>
    	</section>
    	
	</div>
	
</template>

<script>
	import headTop from 'src/components/header/head'
	import {manageTopic} from 'src/service/getData'
	import {getStore, setStore, removeStore} from 'src/config/mUtils'
	
export default {
  data(){
    return{
		topic_title: '搜索专题投稿',
		dataList: [],
		currentPage: 1,
		pageSize: 12,
		reviewId: '',
		creator: ''
    }
   
  },

  components: {
  	headTop,
  },
  mounted(){
    this.initData();
    this.getIntrodeceArticle();
  },
  computed: {

  },

  methods: {
  	initData(){
		this.creator = getStore('user_id');
		this.currentPage = 1;
		manageTopic(this.currentPage,this.pageSize,this.creator).then(res => {
			this.dataList = res.data.datas;

//			console.log(this.dataList)

		}).catch(err => {
			console.log('获取列表数据错误:' + err)
		})
	},
	//推荐投稿
	async getIntrodeceArticle(){
      this.currentPage = 1;
      this.articleList = [];
      this.showLoading = true;
      await manageTopic(this.currentPage,this.pageSize).then(res => {
        this.articleList = res.data.datas
        console.log(this.articleList)
      }).catch(err => {
        console.log('加载项目列表错误:' + err);
      });
    },
	
    
  },
  watch: {

  }

}

</script>

<style lang="scss" >
@import '../../style/mixin';
	//头部
	.msite_title{
		@include center;
        width: 60%;
        color: #999;
        text-align: center;
        .title_text{
            @include sc(0.55rem, #999);
            text-align: center;
            display: block;
			padding:.1rem 0;
			border: 1px solid #ddd;
			@include borderRadius(1rem);
			.head_search_icon{
				@include wh(.7rem, .7rem);
				vertical-align: bottom;
			}
        }
	}
	.link_search{
		right: .5rem;
		@include wh(2rem, 1rem);
		@include ct;
		.head_search_icon{
			@include wh(1rem, 1rem);
			vertical-align: top;
		}
		.cancel_search{
			width: 3rem;
		    display: inline-block;
		    position: fixed;
		    font-size: 0.8rem;
		    left: -0.2rem;
		    color: #bf0c0c;
		}
	}
	/*管理的专题*/
	.manage_topic{
		margin-top: 2rem;
   	 	font-size: 0.65rem;
		.manage_topic_title{
			display: flex;
			padding:0.4rem 0rem;
			.my_topic{
				flex: 3;
				padding-left: 0.5rem;
			}
			.my_more{
				flex: 1;
			}
		}
		.manage_topic_info{
			background-color: white;
			padding: 0.5rem 0rem;
			.inner_container{
				display: inline-grid;
		
				.topic_icon{
					width: 3rem;
				    height: 3rem;
				    padding: 0.5rem;
				    border: 10rem;
				}
				.topic_title{
					position: relative;
				    top: -2.5rem;
				    left: -3.5rem;
				    display: inline-block;
				    width: 3rem;
				    color: black;
				}
			}
		}
	}
	/*推荐投稿*/
	.introduce_sendArticle{
		/*margin-top: 1rem;*/
    	font-size: 0.65rem;

    	.introduce_sendArticle_title{
    		padding: 1rem 0.5rem;
    	}
    	.introduce_sendArticle_info{
    		background-color: white;
    		.introdece_wrapper_info{
    			display: flex;
    			padding:0.5rem 0rem;
    			.introduce_icon{
    				flex: 1;
    			}
    			.introduce_center{
    				flex: 3;
    				.introdece_title{
    					
    				}
    			}
    			.send_article_btn{
    				flex: 1;
    				color: #2196F3;
				    height: 1rem;
				    text-align: center;
				    margin-right: 0.3rem;
				    border-radius: 0.1rem;
				    border: solid 1px #2196F3;
				    margin-top: 0.3rem;
    			}
    			.introdece_already_get{
    				
    			}
    			
    		}
    	}
	}
	
</style>