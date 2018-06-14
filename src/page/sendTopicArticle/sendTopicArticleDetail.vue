<template>
	<div>
		<head-top goBack='true' >
			<!--<router-link :to="'/search/geohash'" slot="search" class="msite_title">-->
			<section slot="search" class="msite_title">	
				<input class="title_text ellipsis" placeholder="搜索专题" >
				</input>
			</section >
			<!--</router-link>-->
			
			<section class="link_search" slot="search">
				<svg class="head_search_icon" @click="searchTopic()" @keyup="searchTopic()">
					<use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="'#search'"></use>
				</svg>
				<!--<span class="cancel_search" @click="searchTopic()">取消</span>-->
			</section>
    	</head-top>
    	<!--我管理的专题-->
    	<section class="manage_topic" >
    		<div class="manage_topic_title" >
    			<span class="my_topic">我管理的专题</span>
    			
    		</div>
    		<div class="manage_topic_info">
    			<div class="inner_container" v-for="(item, index) in myManageTopic">
	    			<img :src="item.topicPic" class="topic_icon" />
	    			<div class="topic_title">{{item.topic.substr(0,6)}}...</div>
	    			<div class="send_article_btn">投稿</div>
	    			<!--<div class="send_article_btn" v-if='topiclist.indexOf(item.id.toString()) > -1'>已投稿</div>-->
    				<!--<div class="send_article_btn" v-else @click=''>投稿</div>-->
    			</div>
    		</div>
    		<p @click="loaderMore" class="loadmore">{{this.loadMore}}</p>
    	</section>
	</div>	
</template>

<script>
	import headTop from 'src/components/header/head'
	import {manageTopic} from 'src/service/getData'
	import {getStore, setStore, removeStore} from 'src/config/mUtils'
	import {loadMore} from 'src/components/common/mixin'

	export default {
  data(){
    return{
		topic_title: '搜索专题投稿',
		myManageTopic: [],
		currentPage: 1,
		pageSize: 4,
		creator: '',
      	preventRepeatReuqest: false, //到达底部加载数据，防止重复加载
		touchend: false, //没有更多数据
		loadMore: '加载更多'
    }
   
  },

  components: {
  	headTop,
  },
  
  mixins: [loadMore],

  mounted(){
    this.initData();
  },
  computed: {

  },

  methods: {
  	//我管理的专题
  	initData(){
		this.creator = getStore('user_id');
		this.currentPage = 1;
		manageTopic(this.currentPage,this.pageSize,this.creator).then(res => {
			this.myManageTopic = res.data.datas;
			
			console.log(this.myManageTopic)

		}).catch(err => {
			console.log('获取列表数据错误:' + err)
		})
	},
	//获取更多数据
	loaderMore(){
	    //防止重复请求
	    if (this.preventRepeatReuqest || this.touchend) {
	       return
	    }
	    this.preventRepeatReuqest = true;
	    this.loadMore = '加载中';
	    this.currentPage ++;
		manageTopic(this.currentPage,this.pageSize,this.creator).then(res => {
			var additional_data = res.data.datas;
			this.myManageTopic = [...this.myManageTopic, ...additional_data];
			console.log(this.myManageTopic)
			if(additional_data.length < this.pageSize){
				this.touchend = true;
				this.loadMore = '已无更多';
			}
		}).catch(err => {
			console.log('获取列表数据错误:' + err)
		}).finally( () => {
			this.preventRepeatReuqest = false;
			!this.touchend ? this.loadMore = '加载更多' : '';
		})
		
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
            text-indent: 0.5rem;
            display: block;
			padding:.1rem 0;
			border: 1px solid #ddd;
			width:100%;
			@include borderRadius(1rem);
			.head_search_icon{
				@include wh(.7rem, .7rem);
				vertical-align: bottom;
			}
        }
	}
	.link_search{
		right: .5rem;
		text-align:center;
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
		    font-size: 0.7rem;
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
				flex: 4;
				padding-left: 0.5rem;
			}
			.my_more{
				flex: 1;
				font-size: 0.5rem;
				color: #999;
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
				    margin-top: -2.5rem;
				    left: 0.6rem;
				    display: inline-block;
				    width: 3rem;
				    color: black;
				    text-align: center;
				}
				.send_article_btn{
    				flex: 1;
    				color: #007fcc;
				    height: 1rem;
				    text-align: center;
				    margin-right: 0.3rem;
				    border-radius: 0.1rem;
				    border: solid 1px #007fcc;
				    margin: 0.5rem;
				}
			}
		}
		.loadmore{
			text-align: center;
			margin-top: 2rem;
		}
	}
</style>