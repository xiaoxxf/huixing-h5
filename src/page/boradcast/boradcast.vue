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
    	</head-top>	
    	<!--切换项-->
		<section class="broadcast_wrapper">
			<div class="broadcast_wrapper_top">
				<ul class="broadcast_wrapper_top_list">
					<li class="attention_icon"><a href="" class="attention_item">关注</a></li>
					<li><a href="" class="comment_item">推荐</a></li>
					<li><a href="#/news">播报</a></li>
				</ul>
			</div>
		</section>
		
		<!--所有动态-->
		<section class="all_dynamic">
	    	<!--关注-->
			<section class="broadcast_wrapper_bottom">
				<div class="broadcast_wrapper_bottom_list">
					<div class="bottom_list_user_info">
						<img src="../../images/elmlogo.jpeg" class="user_icon" />
						<div class="user_name_time">
							<p class="user_name">子不语</p>
							<p class="user_time">12分钟前</p>
						</div>
						<span class="user_attention_btn">关注</span>
						<!--转发-->
						<span class="send_icon"><svg data-v-17048857="" class="sort_type_icon"><use data-v-17048857="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#sendKit"></use></svg></span>
						
					</div>
					<div class="botton_list_user_content">
						<p class="user_content_info">我们常常使用let来声明一个值会被改变的变量，可以称之为常量。当值为基础数据类型时，那么这里的值，就是指值本身
							而当值对应的为引用数据类型时，那么我这里说的值
						</p>
					</div>
					<div class="bottom_list_user_comment">
						<img src="../../images/fenxiang.png" class="comment_user_icon"/>
						<div class="user_comment_info">
							<p class="comment_title">decentraland</p>
							<p class="comment_score">评分</p>
						</div>
					</div>
					<div class="bottom_list_user_flow">
						<div class="flow_send_icon">
							<span><svg data-v-17048857="" class="sort_type_icon"><use data-v-17048857="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#comment"></use></svg></span>123
						</div>
						<div class="flow_comment_icon">
							<span><svg data-v-17048857="" class="sort_type_icon"><use data-v-17048857="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#comment"></use></svg></span>123
						</div>
						<div class="flow_heart_icon">
							<span><svg data-v-17048857="" class="sort_type_icon"><use data-v-17048857="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#heart"></use></svg></span>123
						</div>
					</div>
				</div>
			</section>
	
			<!--点评-->
			<section class="write_comment">
				<div class="write_comment_list">
					<div class="write_comment_list_info">
						<img src="../../images/elmlogo.jpeg" class="comment_list_user_icon" />
						<div class="comment_user_name_time">
							<p class="comment_user_name">子不语</p>
							<p class="comment_user_time">12分钟前</p>
						</div>
						<!--<span class="comment_user_attention_btn">关注</span>-->
						<span class="send_icon"><svg data-v-17048857="" class="sort_type_icon"><use data-v-17048857="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#sendKit"></use></svg></span>
					</div>
					<div class="comment_botton_list_user_content">
						<p class="comment_user_content_info">写了xxx的点评
						</p>
					</div>
					<div class="comment_bottom_list_user_comment">
						<img src="../../images/fenxiang.png" class="comments_user_icon"/>
						<div class="write_user_comment_info">
							<p class="write_comment_title">我们常常使用let来声明</p>
							<p class="write_comment_score">这里的值，就是指值本身而当值对应的为引用数据类型时</p>
							
						</div>
					</div>
					<div class="write_bottom_list_user_flow">
						<div class="write_flow_send_icon">
							<span><svg data-v-17048857="" class="sort_type_icon"><use data-v-17048857="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#comment"></use></svg></span>123
						</div>
						<div class="write_flow_comment_icon">
							<span><svg data-v-17048857="" class="sort_type_icon"><use data-v-17048857="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#comment"></use></svg></span>123
						</div>
						<div class="write_flow_heart_icon">
							<span><svg data-v-17048857="" class="sort_type_icon"><use data-v-17048857="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#heart"></use></svg></span>123
						</div>
					</div>
				</div>
			</section>
			<!--发短评-->
			<section class="short_comment">
				<div class="short_comment_list_info">
					<img src="../../images/elmlogo.jpeg" class="short_comment_list_user_icon" />
					<div class="short_comment_user_name_time">
						<p class="short_comment_user_name">子不语</p>
						<p class="short_comment_time">12分钟前</p>
					</div>
					<span class="send_icon"><svg data-v-17048857="" class="sort_type_icon"><use data-v-17048857="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#sendKit"></use></svg></span>
				</div>
				<p class="short_comment_content">
					彗星项目很棒！
				</p>
				<div class="short_bottom_list_user_flow">
					<div class="short_flow_send_icon">
						<span><svg data-v-17048857="" class="short_sort_type_icon"><use data-v-17048857="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#comment"></use></svg></span>123
					</div>
					<div class="short_flow_comment_icon">
						<span><svg data-v-17048857="" class="short_sort_type_icon"><use data-v-17048857="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#comment"></use></svg></span>123
					</div>
					<div class="short_flow_heart_icon">
						<span><svg data-v-17048857="" class="short_sort_type_icon"><use data-v-17048857="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#heart"></use></svg></span>123
					</div>
				</div>
			</section>
			
			<!--转发评论-->
			<section class="send_comment">
				<div class="send_comment_list">
					<div class="send_comment_list_info">
						<img src="../../images/elmlogo.jpeg" class="send_comment_list_user_icon" />
						<div class="send_comment_user_name_time">
							<p class="send_comment_user_name">子不语</p>
							<p class="send_comment_user_time">12分钟前</p>
						</div>
						<!--<span class="send_comment_user_attention_btn">关注</span>-->
						<span class="send_icon"><svg data-v-17048857="" class="sort_type_icon"><use data-v-17048857="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#sendKit"></use></svg></span>
					</div>
					<div class="send_comment_botton_list_user_content">
						<p class="send_comment_user_content_info">转发比特币
						</p>
					</div>
					<div class="send_comment_bottom_list_user_comment">
						<p class="send_author">自瑜：写了评论</p>
						<img src="../../images/fenxiang.png" class="send_comments_user_icon"/>
						<div class="send_user_comment_info">
							<p class="send_comment_title">我们常常使用let来声明</p>
							<p class="send_comment_score">这里的值，就是指值本身而当值对应的为引用数据类型时</p>
							
						</div>
					</div>
					<div class="send_bottom_list_user_flow">
						<div class="send_flow_send_icon">
							<span><svg data-v-17048857="" class="sort_type_icon"><use data-v-17048857="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#comment"></use></svg></span>123
						</div>
						<div class="send_flow_comment_icon">
							<span><svg data-v-17048857="" class="sort_type_icon"><use data-v-17048857="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#comment"></use></svg></span>123
						</div>
						<div class="send_flow_heart_icon">
							<span><svg data-v-17048857="" class="sort_type_icon"><use data-v-17048857="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#heart"></use></svg></span>123
						</div>
					</div>
				</div>
			</section>
			<!--发表文章-->
			<section class="publish_article">
				<div class="publish_article_list">
					<div class="publish_article_list_info">
						<img src="../../images/elmlogo.jpeg" class="publish_article_user_icon" />
						<div class="publish_article_name_time">
							<p class="publish_article_name">子不语</p>
							<p class="publish_article_time">12分钟前</p>
						</div>
						<!--<span class="publish_article_attention_btn">关注</span>-->
						<span class="send_icon"><svg data-v-17048857="" class="sort_type_icon"><use data-v-17048857="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#sendKit"></use></svg></span>
					</div>
					<div class="publish_article_botton_list_user_content">
						<p class="publish_article_content_info">发表了文章
						</p>
					</div>
					<div class="publish_article_bottom_list_user_comment">
						<img src="../../images/fenxiang.png" class="publish_article_icon"/>
						<div class="publish_article_info">
							<p class="publish_article_title">我们常常使用let来声明</p>
							<p class="publish_article_score">这里的值，就是指值本身而当值对应的为引用数据类型时</p>
							
						</div>
					</div>
					<div class="publish_article_bottom_list_user_flow">
						<div class="publish_article_flow_send_icon">
							<span><svg data-v-17048857="" class="sort_type_icon"><use data-v-17048857="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#comment"></use></svg></span>123
						</div>
						<div class="publish_article_flow_comment_icon">
							<span><svg data-v-17048857="" class="sort_type_icon"><use data-v-17048857="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#comment"></use></svg></span>123
						</div>
						<div class="publish_article_flow_heart_icon">
							<span><svg data-v-17048857="" class="sort_type_icon"><use data-v-17048857="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#heart"></use></svg></span>123
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
    export default {
    	data(){
            return{
                
            }
       },
        created(){
           
        },
        mounted(){
            
        },
	    components: {
	    	headTop,
	    	footGuide,
	    },
        computed: {

        },
        methods: {
        	gotoAddress(path){
        		this.$router.push(path)
        	}
        },

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
						    margin-right: 1.5rem;
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
						}
					}
					.bottom_list_user_comment{
						margin-top: 0.4rem;
					    background-color: #c3c8c85c;
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
						}
					}
					.bottom_list_user_flow{
						border-bottom: solid 1px gainsboro;
						.flow_comment_icon{
							padding-left: 1.2rem;
						}
						.flow_heart_icon{
							padding-left: 2rem;
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

	
	
	/*点评*/
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
			    background-color: #c3c8c85c;
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
	}
	.write_user_comment_info{
		width: 80%;
	}
	/*点评底部转发评论点赞*/
	.write_bottom_list_user_flow{
		border-bottom: solid 1px gainsboro;
		
	}
	.write_flow_send_icon,.write_flow_comment_icon,.write_flow_heart_icon{
		width: 32%;
		display: inline-flex;
		padding: 0.5rem 0rem;
		color: #999;
	}
	.write_flow_comment_icon{
		padding-left: 1.2rem;
	}
	.write_flow_heart_icon{
		padding-left: 2rem;
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
	
	
	/*转发*/
	.send_comment{
		.send_comment_list{
			background-color: white;
			font-size: .65rem;
			padding: 0rem 0.6rem;
			.send_comment_list_info{
				padding: 0.6rem 0rem;
				.send_comment_list_user_icon{
					float: left;
				    width: 1.5rem;
				    height: 1.5rem;
				    border-radius: 1rem;
				}
				.send_comment_user_name_time{
					width: 30%;
			    	margin-left: 2rem;
			    		.send_comment_user_name{
							/*display: inline;*/
						}
						.send_comment_user_time{
							color: #999;
					    	font-size: 0.1rem;
						}
				}
				.send_comment_user_attention_btn{
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
			.send_comment_botton_list_user_content {
				.send_comment_user_content_info{
					padding: 0rem 0.2rem;
				}
				
			}
			.send_comment_bottom_list_user_comment{
				margin-top: 0.4rem;
			    background-color: #c3c8c85c;
			    padding: 0.5rem;
				border-radius: 0.1rem;
				.send_author{
					margin-bottom: 0.3rem;
				}
			}
			
		}
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
			margin-bottom: 3rem;
			.publish_article_list_info{
				padding: 0.6rem 0rem;
				.publish_article_user_icon{
					float: left;
				    width: 1.5rem;
				    height: 1.5rem;
				    border-radius: 1rem;
				}
				.publish_article_name_time{
					width: 30%;
			    	margin-left: 2rem;
			    		.publish_article_name{
							/*display: inline;*/
						}
						.publish_article_time{
							color: #999;
					    	font-size: 0.1rem;
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
				}
				
			}
			.publish_article_bottom_list_user_comment{
				margin-top: 0.4rem;
			    background-color: #c3c8c85c;
			    padding: 0.5rem;
				border-radius: 0.1rem;
				
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
		
	}
	.publish_article_flow_send_icon,
	.publish_article_flow_comment_icon,
	.publish_article_flow_heart_icon{
		width: 32%;
		display: inline-flex;
		padding: 0.5rem 0rem;
		color: #999;
	}
	.publish_article_flow_comment_icon{
		padding-left: 1.2rem;
	}
	.publish_article_flow_heart_icon{
		padding-left: 2rem;
	}
	.publish_article_sort_type_icon{
		width: 0.8rem;
	    height: 0.8rem;
	    vertical-align: top;
	    margin-right: 0.2rem;
	}  
	}
	
</style>