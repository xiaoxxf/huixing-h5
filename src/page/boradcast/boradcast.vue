<template>
	<div>
		<head-top signin-up='msite' :class="topicBarFixed == true ? 'headFadeOut' :''">
		<router-link :to="'/search/geohash'" slot="search" class="msite_title">
				<span class="title_text ellipsis">
					<svg class="head_search_icon">
						<use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="'#search'"></use>
					</svg>
					{{msiteTitle}}
			</span>
		</router-link>
		<router-link :to="'/search/geohash'" class="link_search" slot="search">
				<svg class="head_search_icon">
					<use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="'#search'"></use>
				</svg>
			</router-link>
			<router-link :to="'/search/geohash'" class="link_search" slot="search">
	    		<svg class="head_search_icon">
					<use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="'#search'"></use>
				</svg>
    	</router-link>
    	</head-top>
    	<!--切换项-->
		<section class="broadcast_wrapper">
			<div class="broadcast_wrapper_top">
				<ul class="broadcast_wrapper_top_list">
					<li :class="{attention_icon: like == ''}" @click='changeLike(0)'>关注</li>
					<li :class="{attention_icon: like == 1}" @click='changeLike(1)'>推荐</li>
				</ul>
			</div>
		</section>

		<!--所有动态-->
		<section class="all_dynamic"  v-for="(item, index) in dataList" :key="index" v-load-more="loaderMore">
	    <!-- 短评 -->
			<section class="broadcast_wrapper_bottom" v-if='item.type == 1'>
				<div class="broadcast_wrapper_bottom_list">
					<div class="bottom_list_user_info">
						<img :src="item.userPic" class="user_icon" />
						<div class="user_name_time">
							<p class="user_name">{{item.realName}}</p>
							<p class="user_time">{{item.createTime.split(" ")[0]}}</p>
						</div>
						<span class="user_attention_btn">关注</span>
						<!--<span class="send_icon"><svg data-v-17048857="" class="sort_type_icon"><use data-v-17048857="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#sendKit"></use></svg></span>-->

					</div>
					<div class="botton_list_user_content">
						<p class="user_content_info">
							{{item.textTitle}}
						</p>
					</div>
					<div class="bottom_list_user_comment">
		        	<router-link :to="{ name: 'chainDetail', params: {projectId: item.projectId} }">
								<img :src="item.projectLogo" class="comment_user_icon"/>
		        	</router-link>
						<div class="user_comment_info">
							<p class="comment_title">{{item.projectBigName}}</p>
							<p class="comment_score">{{countScore(item.score)}} <span class="comment_score_num">{{item.score}}</span></p>
						</div>
					</div>
					<div class="bottom_list_user_flow">
						<div class="flow_heart_icon">
							<span><svg data-v-17048857="" class="sort_type_icon"><use data-v-17048857="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#heart"></use></svg></span>123
						</div>
					</div>
				</div>
			</section>

			<!--长评-->
			<section class="write_comment" v-if='item.type == 2'>
				<div class="write_comment_list">
					<div class="write_comment_list_info">
						<img :src="item.userPic" class="comment_list_user_icon" />
						<div class="comment_user_name_time">
							<p class="comment_user_name">{{item.realName}}</p>
							<p class="comment_user_time">{{item.createTime.split(" ")[0]}}</p>
						</div>
						<span class="comment_user_attention_btn">关注</span>
						<!-- <span class="send_icon"><svg data-v-17048857="" class="sort_type_icon"><use data-v-17048857="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#sendKit"></use></svg></span> -->
					</div>
					<div class="comment_botton_list_user_content">
						<p class="comment_user_content_info">写了{{item.projectBigName}}的点评
						</p>
					</div>
					<div class="comment_bottom_list_user_comment">
						<img :src="item.projectLogo" class="comments_user_icon"/>
						<div class="write_user_comment_info">
							<p class="write_comment_title">{{item.textTitle}}</p>
							<p class="write_comment_score">{{item.textContent.substr(0,70)}}...</p>
						</div>
					</div>
					<div class="write_bottom_list_user_flow">
						<!-- <div class="write_flow_send_icon">
							<span><svg data-v-17048857="" class="sort_type_icon"><use data-v-17048857="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#comment"></use></svg></span>123
						</div> -->
						<div class="write_flow_comment_icon">
							<span><svg data-v-17048857="" class="sort_type_icon"><use data-v-17048857="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#comment"></use></svg></span>
							{{item.review}}
						</div>
						<div class="write_flow_heart_icon">
							<span><svg data-v-17048857="" class="sort_type_icon"><use data-v-17048857="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#heart"></use></svg></span>
							{{item.likes}}
						</div>
					</div>
				</div>
			</section>

			<!--发表文章-->
			<section class="publish_article" v-if='item.type == 4'>
				<div class="publish_article_list">
					<div class="publish_article_list_info">
						<img :src="item.userPic" class="publish_article_user_icon" />
						<div class="publish_article_name_time">
							<p class="publish_article_name">{{item.realName}}</p>
							<p class="publish_article_time">{{item.createTime.split(" ")[0]}}</p>
						</div>
						<span class="publish_article_attention_btn">关注</span>
						<!-- <span class="send_icon"><svg data-v-17048857="" class="sort_type_icon"><use data-v-17048857="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#sendKit"></use></svg></span> -->
					</div>
					<div class="publish_article_botton_list_user_content">
						<p class="publish_article_content_info">发表了文章
						</p>
					</div>
					<div class="publish_article_bottom_list_user_comment">
						<!-- <img src="../../images/fenxiang.png" class="publish_article_icon"/> -->
						<div class="publish_article_info">
							<p class="publish_article_title">{{item.textTitle}}</p>
							<p class="publish_article_score">{{item.textContent.substr(0,70)}}...</p>
						</div>
					</div>
					<div class="publish_article_bottom_list_user_flow">
						<div class="publish_article_flow_send_icon">
							<span>
								<svg data-v-17048857="" class="sort_type_icon">
									<use data-v-17048857="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#comment"></use>
								</svg>
							</span>
							{{item.review}}
						</div>
						<!-- <div class="publish_article_flow_comment_icon">
							<span><svg data-v-17048857="" class="sort_type_icon"><use data-v-17048857="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#comment"></use></svg></span>123
						</div> -->
						<div class="publish_article_flow_heart_icon">
							<span>
								<svg data-v-17048857="" class="sort_type_icon">
									<use data-v-17048857="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#heart">
									</use>
								</svg>
							</span>
							{{item.likes}}
						</div>
					</div>
				</div>
			</section>

		</section>
    <foot-guide></foot-guide>
	</div>
</template>

<script>
	import headTop from 'src/components/header/head'
	import footGuide from 'src/components/footer/footGuide'
	import {getBoradcastData} from 'src/service/getData'
	import {getStore, setStore, removeStore} from 'src/config/mUtils'
	import {loadMore} from 'src/components/common/mixin'

    export default {
			data(){
				return{
					msiteTitle: '搜索彗星内容', // msite页面头部标题
					topicBarFixed:false,
					dataList: [],
					currentPage: 1,
					pageSize: 12,
					like: '',
					loginUser: ''
				}
			},

			created(){

			},

			mounted(){
				this.$nextTick(()=>{
					this.initData();

				});
			},

			components: {
				headTop,
				footGuide,
			},
			mixins: [loadMore],
			computed: {

			},

			methods: {
				initData(){
					this.loginUser = getStore('user_id');
					this.currentPage = 1;
					getBoradcastData(this.currentPage,this.pageSize,this.like,this.loginUser).then(res => {
						this.dataList = res.data.datas;
						// 去除HTML标签
						for (var i = 0; i < this.dataList.length; i++) {
							if(this.dataList[i].type != 1){
								this.dataList[i].textContent = this.dataList[i].textContent.replace(/<\/?[^>]*>/g, '').replace(/[|]*\n/, '').replace(/&npsp;/ig, '');
							}
						}
//						console.log(this.dataList)

					}).catch(err => {
						console.log('获取列表数据错误:' + err)
					})
				},
				 // 计算评分星星
			    countScore: function(rate){
			      var start = 5 - rate;
			      var end = 10 - rate;
			      return '★★★★★☆☆☆☆☆'.slice(start,end);
			    },
				// 加载关注or全部
				changeLike(e){
					if (e) {
						this.like = 1
					}else{
						this.like = ''
					}
				},

				// 加载更多
				loaderMore(){
					this.currentPage ++;
					getBoradcastData(this.currentPage,this.pageSize,this.like,this.loginUser).then(res => {
						var temp_list = res.data.datas;
						// 去除HTML标签
						for (var i = 0; i < temp_list.length; i++) {
							temp_list[i].textContent = temp_list[i].textContent.replace(/<\/?[^>]*>/g, '').replace(/[|]*\n/, '').replace(/&npsp;/ig, '');
						}
						this.dataList = [...this.dataList,...temp_list,];
					}).catch(err => {
						console.log('获取列表数据错误:' + err)
					})
				}
			},

			watch: {
				like:function(value){
					this.dataList = []
					this.initData()
				}
			}

    }
</script>

<style lang="scss" scoped>
    @import 'src/style/mixin';
	.link_search{
		right: .8rem;
		@include wh(.8rem, .8rem);
		@include ct;
		.head_search_icon{
			@include wh(.8rem, .8rem);
			vertical-align: top;
		}
	}
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
	.msite_nav{
		padding-top: 2.1rem;
		background-color: #fff;
		//border-bottom: 0.025rem solid $bc;
		//height: 10.6rem;
		.swiper-container{
			@include wh(94%, auto);
			.swiper-pagination{
				bottom: 1rem;
			}
		}
		.fl_back{
			@include wh(100%, 100%);
		}
	}
	/*关注*/
	.broadcast_wrapper{
		margin-top:2rem ;
	    background-color: white;
	    padding: .1rem 0;
		    .broadcast_wrapper_top{
			margin-top: 1rem;
		    font-size: .65rem;
		    border-bottom: solid 1px gainsboro;
			    .broadcast_wrapper_top_list{
					display: inline-flex;
				}
				.broadcast_wrapper_top_list li{
					margin-left: 0.5rem;
					padding: 0.2rem 0rem;
				}
				.attention_icon{
					color: #007fcc;
			    	border-bottom: solid 1px #007fcc;
			    	.attention_item{
			    		color: #007fcc;
			    	}

				}
			}


	}

	/*导航栏分离*/
	.all_dynamic{
		.broadcast_wrapper_bottom{
		.broadcast_wrapper_bottom_list{
				background-color: white;
				font-size: .65rem;
				padding: 0rem 0.6rem;
					.bottom_list_user_info{
						padding: 0.6rem 0rem;
						.user_icon{
							float: left;
						    width: 1.5rem;
						    height: 1.5rem;
						    border-radius: 1rem;
						}
						.user_name_time{
							width: 30%;
					    	margin-left: 2rem;
						    	.user_name{
								}
								.user_time{
									color: #999;
							    	font-size: 0.1rem;
								}
						}
						.user_attention_btn{
						    /*margin-right: 1.5rem;*/
						    float: right;
						    margin-top: -1.4rem;
						    border: solid 1px #2196F3;
						    color: #2196F3;
						    padding: 0.1rem;
						    border-radius: 0.1rem;
						    font-size: 0.1rem;

						}
						.send_icon{
							float: right;
    						margin-top: -1.2rem;
						}

					}
					.botton_list_user_content{
							.user_content_info{
								color: #999;
						}
					}
					.bottom_list_user_comment{
						margin-top: 0.4rem;
					    background-color: #f1f5f7;
					    padding: 0.5rem;
						border-radius: 0.1rem;
						.comment_user_icon{
							float: left;
						    width: 1.5rem;
						    height: 1.5rem;
						    border-radius: 1rem;
						}
						.user_comment_info{
							width: 80%;
					    	margin-left: 2rem;
					    	.comment_title{
								color: #999;
							}
							.comment_score{
								color: #2196F3;
								.comment_score_num{
									color: #999;
									margin-left: 0.2rem;
								}
							}
						}
					}
					.bottom_list_user_flow{
						border-bottom: solid 1px gainsboro;
						text-align: right;
						.flow_comment_icon{
							padding-left: 1.2rem;
						}
						.flow_heart_icon{
							/*padding-left: 2rem;*/
						}
					}

			}
	}
	/*关注底部转发评论点赞*/
	.flow_send_icon,.flow_comment_icon,.flow_heart_icon{
		width: 32%;
		display: inline-flex;
		padding: 0.5rem 0rem;
		color: #999;
	}

	.sort_type_icon{
		width: 0.8rem;
	    height: 0.8rem;
	    vertical-align: top;
	    margin-right: 0.2rem;
	}



	/*写长评*/
	.write_comment{
		.write_comment_list{
			background-color: white;
			font-size: .65rem;
			padding: 0rem 0.6rem;
			.write_comment_list_info{
				padding: 0.6rem 0rem;
				.comment_list_user_icon{
					float: left;
				    width: 1.5rem;
				    height: 1.5rem;
				    border-radius: 1rem;
				}
				.comment_user_name_time{
					width: 30%;
			    	margin-left: 2rem;
			    		.comment_user_name{
							/*display: inline;*/
						}
						.comment_user_time{
							color: #999;
					    	font-size: 0.1rem;
						}
				}
				.comment_user_attention_btn{
					float: right;
				    margin-top: -1.4rem;
				    border: solid 1px #2196F3;
				    color: #2196F3;
				    padding: 0.1rem;
				    border-radius: 0.1rem;
			    	font-size: 0.1rem;

				}
				.send_icon{
					float: right;
					margin-top: -1.2rem;
				}

			}
			.comment_botton_list_user_content {
				.comment_user_content_info{
					/*padding: 0rem 0.6rem;*/
				}

			}
			.comment_bottom_list_user_comment{
				margin-top: 0.4rem;
			    background-color: #f1f5f7;
			    padding: 0.5rem;
				border-radius: 0.1rem;

			}

		}
	}
	/*点评写评论项目图片*/
	.comments_user_icon{
		float: right;
	    width: 1.5rem;
	    height: 1.5rem;
	    border-radius: 1rem;
	    margin-top: 1.8rem;
	}
	.write_user_comment_info{
		width: 80%;
		.write_comment_title{
			font-weight: 600;
		}
		.write_comment_score{
			color: #999;
			font-size: 0.61rem;
			margin-top: 0.2rem;
		}
	}
	/*点评底部转发评论点赞*/
	.write_bottom_list_user_flow{
		border-bottom: solid 1px gainsboro;
		display: flex;

	}
	.write_flow_send_icon,.write_flow_comment_icon,.write_flow_heart_icon{
		width: 32%;
		display: inline-flex;
		padding: 0.5rem 0rem;
		color: #999;
	}
	.write_flow_comment_icon{
		padding-left: 1.2rem;
		flex: 1;
	}
	.write_flow_heart_icon{
		padding-left: 2rem;
		flex: 1;
	}
	.write_sort_type_icon{
		width: 0.8rem;
	    height: 0.8rem;
	    vertical-align: top;
	    margin-right: 0.2rem;
	}
	/*写短评*/
	.short_comment{
		background-color: white;
	    font-size: .65rem;
	    padding: 0rem 0.6rem;
	    .short_comment_list_info{
	    	padding: 0.6rem 0rem;
	    	.short_comment_list_user_icon{
	    		float: left;
			    width: 1.5rem;
			    height: 1.5rem;
			    border-radius: 1rem;
	    	}
	    	.short_comment_user_name{
    			margin-left: 2rem;
	    	}
	    	.short_comment_time{
	    		color: #999;
    			font-size: 0.1rem;
	    		width: 30%;
    			margin-left: 2rem;
	    	}

	    }
	}
	.short_comment_content{

	   }
	.short_bottom_list_user_flow{
    	border-bottom: solid 1px gainsboro;
    }
	.short_flow_send_icon,
	.short_flow_comment_icon,
	.short_flow_heart_icon{
		width: 32%;
		display: inline-flex;
		padding: 0.5rem 0rem;
		color: #999;
	}
	.short_flow_comment_icon{
		padding-left: 1.2rem;
	}
	.short_flow_heart_icon{
		padding-left: 2rem;
	}
	.short_sort_type_icon{
		width: 0.8rem;
	    height: 0.8rem;
	    vertical-align: top;
	    margin-right: 0.2rem;
	}

	/*点评写评论项目图片*/
	.send_comments_user_icon{
		float: right;
	    width: 1.5rem;
	    height: 1.5rem;
	    border-radius: 1rem;
	    position: relative;
	    right: .6rem;
	    top: 1rem;
	    margin-left: 1rem;
	}
	.send_user_comment_info{
		width: 100%;
	    background-color: white;
	    padding: 0.4rem 0.3rem;
	    /*margin: 0.4rem 0rem;*/
	    border-radius: 0.1rem;
	}
	/*点评底部转发评论点赞*/
	.send_bottom_list_user_flow{
		border-bottom: solid 1px gainsboro;

	}
	.send_flow_send_icon,.send_flow_comment_icon,.send_flow_heart_icon{
		width: 32%;
		display: inline-flex;
		padding: 0.5rem 0rem;
		color: #999;
	}
	.send_flow_comment_icon{
		padding-left: 1.2rem;
	}
	.send_flow_heart_icon{
		padding-left: 2rem;
	}
	.send_sort_type_icon{
		width: 0.8rem;
	    height: 0.8rem;
	    vertical-align: top;
	    margin-right: 0.2rem;
	}

	 /*发表文章*/
	.publish_article{
		.publish_article_list{
			background-color: white;
			font-size: .65rem;
			padding: 0rem 0.6rem;
			/*margin-bottom: 3rem;*/
			.publish_article_list_info{
				padding: 0.6rem 0rem;
				.publish_article_user_icon{
					float: left;
				    width: 1.5rem;
				    height: 1.5rem;
				    border-radius: 1rem;
				}
				.publish_article_name_time{
					width: 60%;
			    	margin-left: 2rem;
			    		.publish_article_name{
							font-weight: 600;
							color: #333;
						}
						.publish_article_time{
							color: #999;
					    	font-size: 0.1rem;
					    	margin-top: 0.2rem;
						}
				}
				.publish_article_attention_btn{
					float: right;
				    margin-top: -1.4rem;
				    border: solid 1px #2196F3;
				    color: #2196F3;
				    padding: 0.1rem;
				    border-radius: 0.1rem;
			    	font-size: 0.1rem;

				}
				.send_icon{
					float: right;
					margin-top: -1.2rem;
				}

			}
			.publish_article_botton_list_user_content {
				.publish_article_content_info{
					/*padding: 0rem 0.6rem;*/
					color: #999;
				}

			}
			.publish_article_bottom_list_user_comment{
				margin-top: 0.4rem;
			    background-color: #f1f5f7;
			    padding: 0.5rem;
				border-radius: 0.1rem;
				.publish_article_info{
					.publish_article_title{
						font-weight: 600;
    					line-height: 1rem;
					}
					.publish_article_score{
						color: #999;
    					line-height: 1rem;
    					font-size: 0.61rem;
    					margin-top: 0.2rem;
					}
				}
			}

		}
	}
	/*点评写评论项目图片*/
	.publish_article_icon{
		float: right;
	    width: 1.5rem;
	    height: 1.5rem;
	    border-radius: 1rem;
	}
	.publish_article_comment_info{
		width: 80%;
	}
	/*点评底部转发评论点赞*/
	.publish_article_bottom_list_user_flow{
		border-bottom: solid 1px gainsboro;
		display: flex;

	}
	.publish_article_flow_send_icon,
	.publish_article_flow_comment_icon,
	.publish_article_flow_heart_icon{
		/*width: 32%;*/
		flex:1 ;
		text-align: center;
		padding: 0.5rem 0rem;
		color: #999;
	}
	.publish_article_flow_comment_icon{
		padding-left: 1.2rem;
	}
	.publish_article_flow_heart_icon{
		/*padding-left: 2rem;*/
	}
	.publish_article_sort_type_icon{
		width: 0.8rem;
	    height: 0.8rem;
	    vertical-align: top;
	    margin-right: 0.2rem;
	}
	}

</style>
