<template>
	<div>
		<!--<head-top signin-up='msite' :class="topicBarFixed == true ? 'headFadeOut' :''">-->
    	<head-top goBack='true' :headTitle='homepage'>
			
    	</head-top>
    	<section class="person_homepage">
    		<section class="person_introduce">
    			<div class="person_introduce_detail">
    				<img src="../../../elm/static/img/activity.png" class="person_icon"/>
    				<div class="person_name_introduce">
    					<a href="" class="person_name">尼古拉</a>
    					<p class="person_introduce">简介：币圈老韭菜一枚。</p>
    				</div>
    			</div>
    			<div class="person_introduce_bottom_detail">
    				<div class="detail_attention">
    					<p class="attention_num">6</p>
    					<p class="attention_chaim">关注</p>
    				</div>
    				<div class="detail_fans">
    					<p class="attention_num">12</p>
    					<p class="attention_chaim">粉丝</p>
    				</div>
    				<div class="detail_topic">
    					<p class="attention_num">8</p>
    					<p class="attention_chaim">专题</p>
    				</div>
    				<div class="detail_subject">
    					<p class="attention_num">10</p>
    					<p class="attention_chaim">项目</p>
    				</div>
    			</div>
    		</section>
    		<section class="person_create">
    			<!--创建的专题-->
    			<div class="create_topic">
    				<div class="topic_left">
    					<p class="my_create_topic">我创建的专题</p>
    					<p class="my_create_topic_num">56篇文章</p>
    				</div>
    				<div class="topic_right">
    					<router-link :to="'/createTopic/createTopic'">
							<span class="topic_return">
								<svg class="topic_return_icon">
									<use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="'#return'"></use>
								</svg>
							</span>
				        </router-link>
    				</div>
    			</div>
    			<!--创建的项目-->
    			<div class="create_subject">
    				<div class="subject_left">
    					<p class="my_create_subject">我创建的项目</p>
    					<p class="my_create_subject_num">6篇文章</p>
    				</div>
    				<div class="subject_right">
    					<router-link :to="'/createSubject/createSubject'">
							<span class="subject_return">
								<svg class="subject_return_icon">
									<use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="'#return'"></use>
								</svg>
							</span>
				        </router-link>
    				</div>
    			</div>
    		</section>
    		<!--全部动态-->
    		<section class="person_dynamic">
    			<ul class="all_dynamic_items">
					<li class="all_dynamic_item">全部动态</li>
					<li class="all_dynamic_item">文章</li>
					<li class="all_dynamic_item">长评</li>
					<li class="all_dynamic_item">短评</li>
				</ul>
				<div class="all_dynamic_content">
	    			<!--文章-->
	    			
	    			<!--长评-->
	    			
	    			<!--短评-->
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
                homepage:'我的主页'
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
	.person_homepage{
		margin-top: 2rem;
		/*padding: 0rem 0.6rem;*/
		font-size: .65rem;
		.person_introduce{
			.person_introduce_detail{
				padding: 0.5rem 0.6rem;
    			border-bottom: solid 1px #99999929;
    			background-color: white;
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
					.person_introduce{
						color: #999;
    					font-size: 0.1rem;
    					margin-top: 0.2rem;
					}
				}
			}
			.person_introduce_bottom_detail{
				padding: 0.3rem 0rem;
				display: flex;
				background-color: white;
				.detail_attention,.detail_fans,.detail_topic,.detail_subject{
					-webkit-box-flex: 1;
					flex: 1;
					text-align: center;
					.attention_chaim{
						color: #999;
    					font-size: 0.1rem;
					}
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
		.person_dynamic{
			
			.all_dynamic_items{
				display: -webkit-inline-box;
				padding: 0.3rem 0.6rem;
				.all_dynamic_item{
					margin-right: 1rem;
					
				}
			}
			.all_dynamic_content{
				/*文章*/
				
			}
		}
	}
	
</style>