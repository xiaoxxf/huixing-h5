<template>
	<div>
		<head-top goBack='true' >
			<!--<router-link :to="'/search/geohash'" slot="search" class="msite_title">-->
			<section slot="search" class="msite_title">
				<input v-model="message" class="title_text ellipsis" placeholder="搜索专题" >
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
    	<section class="manage_topic" v-show="isShow">
    		<div class="manage_topic_title" >
    			<span class="my_topic">我管理的专题</span>
          			<router-link :to=" '/sendTopicArticle/sendTopicArticleDetail' ">
		    			<span class="my_more">
			    			查看全部&nbsp;&rsaquo;
		    			</span>
	    			</router-link>

    		</div>
    		<div class="manage_topic_info" >
    			<div class="inner_container" v-for="(item, index) in myManageTopic">
	    			<img :src="item.topicPic" class="topic_icon" />
	    			<div class="topic_title">{{item.topic.substr(0,6)}}...</div>
	    			<div class="send_article_btn" v-if='topiclist.indexOf(item.id.toString()) > -1'>已投稿</div>
    				<div class="send_article_btn" v-else >投稿</div>
    			</div>
    		</div>
    	</section>
    	<!--推荐投稿-->
    	<section class="introduce_sendArticle" v-show="isShow">
    		<div class="introduce_sendArticle_title">推荐投稿</div>
    		<div class="introduce_sendArticle_info" v-for="(item, index) in commentSendArticle">
    			<div class="introdece_wrapper_info">
    				<img :src="item.topicPic" class="introduce_icon" />
    				<div class="introduce_center">
    					<p class="introdece_title">{{item.topic}}</p>
    					<p class="introdece_already_get">已收录{{item.counts}}篇文章</p>
    				</div>
    				<div class="send_article_btn" v-if='topiclist.indexOf(item.id.toString()) > -1'>已投稿</div>
    				<div class="send_article_btn" v-else @click="send(item)">投稿</div>

    			</div>
    		</div>
    	</section>
    	<!--搜索专题-->
    	<section class="topic_list" v-show="!isShow">
    		<div class="topic_list_title">搜索专题</div>
    		<div class="topic_list_info" v-for="(item, index) in mysearchTopic">
    			<div class="topic_list_introdece_wrapper_info">
    				<img :src="item.topicPic" class="topic_list_introduce_icon" />
    				<div class="topic_list_introduce_center">
    					<p class="topic_list_introdece_title">{{item.topic}}</p>
    					<p class="topic_list_introdece_already_get">已收录{{item.counts}}篇文章</p>
    				</div>
    				<div class="topic_list_send_article_btn" >投稿</div>
    			</div>
    		</div>
    	</section>
	</div>

</template>

<script>
	import headTop from 'src/components/header/head'
	import {manageTopic,commentTopic,postSendArticle} from 'src/service/getData'
	import {getStore, setStore, removeStore} from 'src/config/mUtils'
    import {mapState, mapActions} from 'vuex'

export default {
  data(){
    return{
		topic_title: '搜索专题投稿',
		myManageTopic: [],
		commentSendArticle:[],
		mysearchTopic:[],
		// sendArticleList:[],  //投稿返回值
		currentPage: 1,
		ManageTopicpageSize: 4,
		pageSize: 12,
		reviewId: '',
		creator: '',
		message:'',
		isShow:true, //
		topiclist: [] // 该文章已投稿的专题
    }

  },

  components: {
  	headTop,
  },
  mounted(){
    this.initData();
    this.getIntrodeceArticle();
    console.log(this.$route.params)
   	this.reviewId=this.$route.params.commentId;
   	this.topiclist=this.$route.params.topicIdList.split(",");
   	this.topiclist.pop();
   	console.log(this.reviewId)
   	console.log(this.topiclist)

//  this.commentId = this.$route.params.commentId;
  },
  computed: {
	//判断文章是否投稿过
            ...mapState([
                'userInfo'
            ]),

  },

  methods: {
  	//我管理的专题
  	initData(){
		this.creator = getStore('user_id');
		this.currentPage = 1;
		manageTopic(this.currentPage,this.ManageTopicpageSize,this.creator).then(res => {
			this.myManageTopic = res.data.datas;

//			console.log(this.myManageTopic)

		}).catch(err => {
			console.log('我管理的专题加载错误:' + err)
		})
	},
	//推荐投稿
	async getIntrodeceArticle(){
      this.currentPage = 1;
      this.commentSendArticle = [];
      this.showLoading = true;
      await commentTopic(this.currentPage,6).then(res => {
        this.commentSendArticle = res.data.datas;
		//console.log(this.commentSendArticle)
      }).catch(err => {
        console.log('推荐专题加载错误:' + err);
      });
    },
	//搜索专题
	searchTopic(){
      this.currentPage = 1;
      this.mysearchTopic = [];
      this.showLoading = true;
     	commentTopic(this.currentPage,this.pageSize,this.message).then(res => {
        this.mysearchTopic = res.data.datas
        //搜索结果列表出来隐藏其他两个列表
		this.isShow=!this.isShow;
//		console.log(this.mysearchTopic)
      }).catch(err => {
        console.log('搜索专题错误:' + err);
      });
    },
  //投稿
  send(topic){
		this.creator = getStore('user_id');
		var passWord = JSON.parse(getStore('user_info')).userPwd;
    postSendArticle(this.creator,passWord,topic.id,this.reviewId).then(res => {
        	// this.sendArticleList = res.data.datas;
					topic.counts++;
					this.topiclist.push(topic.id.toString());
    	}).catch(err => {
        console.log('投稿错误:' + err);
      });
    }

  },
  watch: {
    message() {
       if(this.message ==""){
          this.isShow=true;
     	}
    }
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
	}
	/*推荐投稿*/
	.introduce_sendArticle{
    	font-size: 0.65rem;
    	.introduce_sendArticle_title{
    		padding:0.5rem;
    	}
    	.introduce_sendArticle_info{
    		background-color: white;
    		border-bottom: solid 1px #dcdcdc99;
    		.introdece_wrapper_info{
    			display: flex;
    			padding:0.5rem 0rem;
    			.introduce_icon{
				    flex: 0.5;
				    height: 2rem;
				    width: 2rem;
				    margin: 0rem 0.5rem;
				    border-radius: 0.3rem;
    			}
    			.introduce_center{
    				flex: 3;
    				.introdece_title{

    				}
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
    			.already_send_article{
    				display: none;
    			}
    			.introdece_already_get{
    				margin-top: 0.3rem;
				    font-size: 0.5rem;
				    color: #999;
    			}

    		}
    	}
	}
	/*搜索专题*/
	.topic_list{
    	font-size: 0.65rem;
    	.topic_list_title{
    		padding:0.5rem;
    		display: none;
    	}
    	.topic_list_info{
    		background-color: white;
    		border-bottom: solid 1px #dcdcdc99;
    		.topic_list_introdece_wrapper_info{
    			margin-top: 2rem;
    			display: flex;
    			padding:0.5rem 0rem;
    			.topic_list_introduce_icon{
				    flex: 0.5;
				    height: 2rem;
				    width: 2rem;
				    margin: 0rem 0.5rem;
				    border-radius: 0.3rem;
    			}
    			.topic_list_introduce_center{
    				flex: 3;
    				.introdece_title{

    				}
    			}
    			.topic_list_send_article_btn{
    				flex: 1;
    				color: #007fcc;
				    height: 1rem;
				    text-align: center;
				    margin-right: 0.3rem;
				    border-radius: 0.1rem;
				    border: solid 1px #007fcc;
				    margin: 0.5rem;
    			}
    			.topic_list_introdece_already_get{
    				margin-top: 0.3rem;
				    font-size: 0.5rem;
				    color: #999;
    			}

    		}
    	}
	}


</style>
