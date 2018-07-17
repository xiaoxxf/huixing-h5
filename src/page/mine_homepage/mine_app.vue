<template>
	<div  >
    	<head-top>
    		<router-link :to="'/mine_setting'" class="link_search" slot="search">
    			<svg class="head_edit_icon">
					<use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="'#edit'"></use>
				</svg>
	    		<svg class="head_search_icon">
					<use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="'#setting'"></use>
				</svg>
	  		</router-link>
    	</head-top>
    	<section class="person_homepage">
    		<section class="person_introduce">
    			<div class="person_introduce_detail">
    				<img :src="loginUser.userPic" class="person_icon"/>
    				<div class="person_name_introduce">
    					<a href="" class="person_name">{{loginUser.realName}}</a>
    					<span class="grade">LV:</span>
    					<p class="person_introduce">体力值：</p>
    				</div>
    			</div>
    			<div class="person_introduce_bottom_detail">
    				<div class="detail_send_article">
    					<p class="attention_num">1</p>
    					<p class="attention_chaim">帖子</p>
    				</div>
    				<div class="detail_attention">
    					<p class="attention_num">{{loginUser.following}}</p>
    					<p class="attention_chaim">关注</p>
    				</div>
    				<div class="detail_fans">
    					<p class="attention_num">{{loginUser.follower}}</p>
    					<p class="attention_chaim">粉丝</p>
    				</div>
    				
    			</div>
    			<!--钱包-->
				<div class="my_wallet">
					<svg class="head_wallet_icon">
						<use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="'#wallet_icon'"></use>
					</svg>
					<span class="wallet">钱包</span>
					<span class="right_wallet">&rsaquo;</span>
				</div>    			
    			<!--我的赞-->
    			<div class="my_like">
    				<svg class="head_like_icon">
						<use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="'#like_icon'"></use>
					</svg>
					<span class="like">我的赞</span>
					<span class="right_like">&rsaquo;</span>
					<span class="like_num">34</span>
					
    			</div>
    			<!--我的回复-->
    			<div class="my_answer">
    				<svg class="head_answer_icon">
						<use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="'#answer_icon'"></use>
					</svg>
					<span class="answer">我的回复</span>
					<span class="right_answer">&rsaquo;</span>
					<span class="answer_num">34</span>
    			</div>
    		</section>
    		
    		
    	</section>
    	<foot-guide></foot-guide>
	</div>
</template>

<script>
	import {mapState, mapActions} from 'vuex'
	import headTop from 'src/components/header/head'
	import footGuide from 'src/components/footer/footGuide'
	import {getUserDynamic,getBoradcastData,getUser} from 'src/service/getData'
	import {getStore, setStore, removeStore} from 'src/config/mUtils'
//	import {loadMore} from 'src/components/common/mixin'
	import loading from 'src/components/common/loading'
//	import loadingMore from 'src/components/common/loadingMore'


    export default {
    	data(){
	    	return{
	        currentPage: 1,
			pageSize: 12,
			type: '',
			personDataList: [],
			loginUser: {},
			user_id: '',
			
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
		

		computed: {
	      ...mapState([
	          'userInfo'
	      ]),
	    },
			methods: {
				initData(){
					// debugger
					// this.loginUser = this.userInfo;
					this.user_id = getStore('user_id');
					// // 获取用户信息
					getUser().then(res => {
						this.loginUser = res.data.datas
					});

				},

			
			
			},
			watch: {
			
			}

    }
</script>

<style lang="scss" scoped>
	@import 'src/style/mixin';
	#head_top{
		box-shadow: none !important;
	}
	.link_search{
		right: .8rem;
		@include wh(.8rem, .8rem);
		@include ct;
		.head_edit_icon{
			@include wh(.8rem,.8rem)
		}
		.head_search_icon{
			@include wh(.8rem, .8rem);
			vertical-align: top;
		}
		.head_edit_icon{
			@include wh(.8rem, .8rem);
			vertical-align: top;
			right: 2rem;
    		position: absolute;
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
	.person_homepage{
		margin-top: 1.9rem;
		margin-bottom: 2rem;
		/*padding: 0rem 0.6rem;*/
		font-size: .65rem;
		.person_introduce{
			.person_introduce_detail{
				padding: 0.8rem 0.6rem;
    			border-bottom: solid 1px #99999929;
    			background-color: white;
    			border-bottom: solid 0.06rem #1a68a4;
				.person_icon{
					float: left;
				    width: 1.5rem;
				    height: 1.5rem;
				    border-radius: 1rem;
				    margin-right:0.5rem;
				}
				.person_name_introduce{

					.person_name{
						font-weight: 600;
					}
					.grade{
						display: inline-block;
					    margin-left: 0.5rem;
					    padding-left: 0.5rem;
					    width: 2.5rem;
					    color: white;
					    height: .8rem;
					    line-height: .8rem;
					    background-color: #1a68a4;
					    border-radius: 0.1rem;
					}
					.person_introduce{
						color: #999;
    					font-size: 0.5rem;
    					margin-top: 0.2rem;
					}
				}
			}
			.person_introduce_bottom_detail{
				padding:1rem 0rem 0.5rem;
				display: flex;
				background-color: white;
				.detail_attention,.detail_fans,.detail_send_article{
					-webkit-box-flex: 1;
					flex: 1;
					text-align: center;
					.attention_num{
						font-weight: 600;
					}
					.attention_chaim{
						color: #999;
    					font-size: 0.5rem;
					}
				}
			}
			.my_wallet{
				margin-top: 0.5rem;
			    background-color: white;
			    padding: 0.5rem;
			    .head_wallet_icon{
			    	height: .8rem;
			    	width: .8rem;
			    }
			    .wallet{
			    	display: inline-block;
			    	margin-left: 0.3rem;
			    }
			    .right_wallet{
			    	float: right;
			    	margin-right: 0.5rem;
			    	color: darkgray;
			    	
			    }
			} 
			.my_like{
				margin-top: 0.5rem;
			    background-color: white;
			    padding: 0.5rem;
			    .head_like_icon{
			    	height: .8rem;
			    	width: .8rem;
			    }
			    .like_num{
			    	float: right;
			    	margin-right: 0.5rem;
			    	color: darkgray;
			    }
			    .like{
			    	display: inline-block;
			    	margin-left: 0.3rem;
			    }
			    .right_like{
			    	float: right;
			    	margin-right: 0.5rem;
			    	color: darkgray;
			    	
			    }
			} 
			.my_answer{
				margin-top: 0.5rem;
			    background-color: white;
			    padding: 0.5rem;
			    .head_answer_icon{
			    	height: .8rem;
			    	width: .8rem;
			    }
			    .answer_num{
			    	float: right;
			    	margin-right: 0.5rem;
			    	color: darkgray;
			    }
			    .answer{
			    	display: inline-block;
			    	margin-left: 0.3rem;
			    }
			    .right_answer{
			    	float: right;
			    	margin-right: 0.5rem;
			    	color: darkgray;
			    	
			    }
			}
		}
		.person_create{
			margin-top: 0.3rem;
			background-color: white;
			.create_topic{
				padding: .3rem 0.6rem;
    			display: flex;
				.topic_left{
					flex:12;

					.my_create_topic{

					}
					.my_create_topic_num{
					    color: #999;
					    font-size: 0.5rem;
					    margin-top: 0.2rem;
					}
				}
				.topic_right{
					flex:1;
					.topic_return{
						.topic_return_icon{
							width: 0.6rem;
						    height: 0.6rem;
						    vertical-align: top;
    						margin-top: 0.5rem;
						}
					}
				}
			}
			.create_subject{
				padding: .3rem 0.6rem;
    			display: flex;
    			border-top: solid 1px #99999929;
				.subject_left{
					flex:12;

					.my_create_subject{

					}
					.my_create_subject_num{
					    color: #999;
					    font-size: 0.5rem;
					    margin-top: 0.2rem;
					}
				}
				.subject_right{
					flex:1;
					.subject_return{
						.subject_return_icon{
							width: 0.6rem;
						    height: 0.6rem;
						    vertical-align: top;
    						margin-top: 0.5rem;
						}
					}
				}
			}
		}
		
	}

</style>
