<template>
	<div>
		<head-top signin-up='msite' :class="topicBarFixed == true ? 'headFadeOut' :''">
			<router-link :to="'/search/geohash'" slot="search" class="msite_title">
					<span class="title_text ellipsis">
						<svg class="head_search_icon">
							<use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="'#search'"></use>
						</svg>
						{{mineTitle}}
				</span>
			</router-link>
			<router-link :to="'/search/geohash'" class="link_search" slot="search">
	    		<svg class="head_search_icon">
					<use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="'#search'"></use>
				</svg>
    		</router-link>
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
    			<div class="create_topic">
    				<div class="topic_left"></div>
    			</div>
    			<div class="create_subject">
    				
    			</div>
    			
    		</section>
    		<section class="person_dynamic"></section>
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
                mineTitle:'我的主页'
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
		background-color: white;
		margin-top: 2rem;
		/*padding: 0rem 0.6rem;*/
		font-size: .65rem;
		.person_introduce{
			.person_introduce_detail{
				padding: 0.5rem 0.6rem;
    			border-bottom: solid 1px gainsboro;
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
			.create_topic{
				
			} 
			.create_subject{
				
			}
		}
		.person_dynamic{
			
		}
	}
	
</style>