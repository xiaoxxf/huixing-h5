<template>
    <div>
    	<head-top signin-up='msite'>
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
    	<nav class="msite_nav">
    		<div class="swiper-container" v-if="fakeBanner.length">
		        <div class="swiper-wrapper">
		            <div class="swiper-slide food_types_container" v-for="(item, index) in fakeBanner" :key="index">
	            		<router-link :to="{path: '/food'}" class="link_to_food">
	            			<figure>
	            				<img :src="item" />
	            			</figure>
	            		</router-link>
		            </div>
		        </div>
		        <div class="swiper-pagination"></div>
		    </div>
			
		    <img src="../../images/fl.svg" class="fl_back animation_opactiy" v-else>
    	</nav>
		<section class="change_link_nav">
				<div class="sort_type_wrap">
					<span class="sort_type">
						<svg class="sort_type_icon">
							<use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="'#sort'"></use>
						</svg>
						分类
					</span>
				</div>
				<div>
					<span class="code_rank">
						<svg class="sort_type_icon">
							<use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="'#rank'"></use>
						</svg>
						排行
					</span>
				</div>
		</section>
		<nav class="search_nav_wrapper">
			<div class="search_topic_wrapper">
				<div class="type_list_container" id="wrapper_menu"  ref="searchWrapper" >
					<ul class="article_type_wrap" ref="warpperMune">
						<li v-for="(item, index) in searchTopic" :key="index" :class="{topic_active: item.id == topicActive}" :data-topicid="item.id" @click="changeActice(item.id)">{{item.topic}}</li>
					</ul>
				</div>
			</div>
		</nav>
		<section class="hot_review_region" id="hotReviewContainer" ref="hotReviewContainer">
			 <section v-load-more="getArticleByType">
				 <section>
					<a v-for="(item, index) in topicActiveData" :key="index" href="//www.baidu.com" class="hot_review_item">
						<div class="review_item_left">
							<h2 class="review_title">{{item.textTitle}}</h2>
							<div class="review_content" v-html="subStrArticle(item.textContent)"></div>
							<div class="author_info">
								<span class="author_pic">
									<img :src="item.userPic" alt="">
								</span>
								<span class="author_name">{{item.realName}}</span>
							</div>
						</div>
						<div class="review_item_right">
								<img src="http://www.huixing.io/img/1519917063959.jpg" alt="">
						</div>
					</a>
				 </section>
			</section>
		</section>
		<span class="fake_container"></span>
    	<foot-guide></foot-guide>
    </div>    
</template>

<script>
import {mapMutations} from 'vuex'
// import {imgBaseUrl} from 'src/config/env'
import headTop from 'src/components/header/head'
import footGuide from 'src/components/footer/footGuide'
import shopList from 'src/components/common/shoplist'
import {loadMore} from 'src/components/common/mixin'
import {msiteAddress, msiteFoodTypes, searchTopic, queryArticle} from 'src/service/getData'
import 'src/plugins/swiper.min.js'
import 'src/style/swiper.min.css'
import BScroll from 'better-scroll'

export default {
	data(){
        return {
        	geohash: '', // city页面传递过来的地址geohash
            msiteTitle: '搜索彗星内容', // msite页面头部标题
			imgBaseUrl: 'https://fuss10.elemecdn.com', //图片域名地址
			fakeBanner:[], //首页banner图
			searchTopic:[],
			topicActive:'',//热门选择栏目
			topicScroll: null, //栏目Scroll
			topicActiveData:[],//选择栏目数据
			topicActiveScroll: null, //选择栏目文章Scroll
			currentPage:1,
			pageSize:6,
			preventRepeatRequest:false,// 防止多次触发数据请求
        }
    },
    async beforeMount(){
		
	},
	created(){

	},
    mounted(){
		this.initData();
		this.windowHeight = window.innerHeight;
		//查找热门
		/* searchTopic().then(res => {
			this.searchTopic = res.data.datas;
			if(this.searchTopic.length>0){
				this.topicActive = this.searchTopic[0].id;
			}
			
        }).then(() => {
			//初始化better-scroll
				const remWidth = window.screen.width/375*24;
				let wrapperW = this.searchTopic.length*remWidth*3.6
                this.$refs.warpperMune.style.width=wrapperW+'px';
                this.$nextTick(()=>{
                    if (!this.topicScroll) {
                        this.topicScroll=new BScroll(this.$refs.searchWrapper, {
                            startX:0,
                            click:true,
                            scrollX:true,
                            scrollY:false,
                            eventPassthrough:'vertical'
                        })
                    }else{
                        this.topicScroll.refresh();
                    }
                });
		})
		*/
		//模拟请求延时
	
        //获取导航食品类型列表
       	msiteFoodTypes().then(res => {
       		this.fakeBanner = [
					'http://www.huixing.io/img/reading-banner.png',
					'http://www.huixing.io/img/reading-banner.png']
        }).then(() => {
			//初始化swiper
				new Swiper('.swiper-container', {
					pagination: '.swiper-pagination',
					loop: true,
					autoplay: 2000, 
				});
		})

	},
	mixins: [loadMore],
    components: {
    	headTop,
    	shopList,
    	footGuide,
    },
    computed: {

    },
    methods: {
    	...mapMutations([
    		'RECORD_ADDRESS', 'SAVE_GEOHASH'
		]),
		async initData(){
			this.searchTopic = await searchTopic();
			//获取除可滑动区域的高度
			var pageH = document.querySelector(".msite_nav").offsetHeight + document.querySelector(".change_link_nav").offsetHeight + document.querySelector(".search_nav_wrapper").offsetHeight + document.querySelector("#foot_guide").offsetHeight
			console.log("sss",pageH)
			this.$refs.hotReviewContainer.style.height = pageH+"px";
			this.topicActive = this.searchTopic[0].id;
			const remWidth = window.screen.width/375*24;
			let wrapperW = this.searchTopic.length*remWidth*3.6
			this.$refs.warpperMune.style.width=wrapperW+'px';
			this.$nextTick(()=>{
				if (!this.topicScroll) {
					this.topicScroll=new BScroll(this.$refs.searchWrapper, {
						startX:0,
						click:true,
						scrollX:true,
						scrollY:false,
						eventPassthrough:'vertical'
					})
				}else{
					this.topicScroll.refresh();
				}
			});
			this.topicActiveData = await queryArticle(this.topicActive,this.currentPage,this.pageSize);
			console.log(this.topicActive)
		},
		changeActice(id){
			this.topicActive = id;
			this.currentPage = 0;
			this.preventRepeatRequest = false;
			this.topicActiveData = [];
			this.getArticleByType();
		},
		async getArticleByType(){
			console.log("getArticleByType",this.currentPage)
			 if (this.preventRepeatRequest) {
                    return
			}
			this.preventRepeatRequest = true;
			this.currentPage ++;
			let activeDate = await queryArticle(this.topicActive,this.currentPage,this.pageSize);
			this.topicActiveData = [...this.topicActiveData,...activeDate];
			 if (activeDate.length >= this.pageSize) {
                    this.preventRepeatRequest = false;
                }
			this.$nextTick(() => {
				this.topicActiveScroll = new BScroll('#hotReviewContainer', {
					probeType: 3,
					deceleration: 0.003,
					bounce: false,
					swipeTime: 2000,
					click: true,
				});
			})
			/*
			then(res => {
				if(res.code === 0){
					this.topicActiveData = res.datas;
				}
				console.log(res)
			})*/
		},
    },
    watch: {
		//topicActive 改变时则出发栏目文章查找方法
		topicActive:function(value){
			this.$nextTick(() => {
				this.topicActiveScroll = new BScroll('#hotReviewContainer', {
					probeType: 3,
					deceleration: 0.003,
					bounce: false,
					swipeTime: 2000,
					click: true,
				});
				this.topicActiveScroll.on('scroll', (pos) => {
					if (Math.abs(Math.round(pos.y)) >=  Math.abs(Math.round(this.topicActiveScroll.maxScrollY))) {
						console.log("hotReviewScrollhotReviewScroll");
						this.getArticleByType();
						this.topicActiveScroll.refresh();
					}
				})
			})
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
	
	.food_types_container{
		display:flex;
		flex-wrap: wrap;
		.link_to_food{
			width: 100%;
			padding-top: 0.4rem;
			@include fj(center);
			figure{
				img{
					@include wh(100%, 8rem);
					@include borderRadius(0.3rem);
				}
				figcaption{
					text-align: center;
					@include sc(0.55rem, #666);
				}
			}
		}
	}
	
	.change_link_nav{
		display: flex;
        background-color: #fff;
        padding: .3rem 0;
        div{
            flex: 1;
            text-align: center;
            span{
				display: inline-block;
                @include sc(.65rem, #646c88);
                padding: .2rem .1rem;
				border-bottom: 0.12rem solid #fff;
				width: 100%;
			}
			.sort_type{
				border-right:0.025rem  solid #ebebeb;
			}
            .activity_show{
                color: #3190e8;
                border-color: #3190e8;
            }
			.sort_type_icon{
				width: 0.8rem;
				height: 0.8rem;
				vertical-align: top;
				margin-right: 0.2rem;
			}
        }
	}
	.search_nav_wrapper{
		padding: 0.4rem 0.4rem 0 0.4rem;
		background-color: #fff;
		margin-top: 0.4rem;
		.search_topic_wrapper{
			position: relative;
			height: 100%;
			overflow: hidden;
			border-bottom:0.025rem solid $bc;
			.type_list_container{
				.article_type_wrap{
					display: flex;
						li{
							font-size: .65rem;
							margin-right: 1rem;
							padding-bottom: .3rem;
							text-align: left;
						}
						.topic_active{
							color: #1267a6;
							border-bottom: 2px solid #1267a6;
						}
				}
			}
		}
	
	}
	.hot_review_region{
		padding: 0.2rem 0.4rem;
		background-color: #fff;
		flex: 1;
        overflow-y: hidden;
        flex-direction: column;
		.hot_review_item{
			display: flex;
			flex: 1;
			border-bottom: 0.025rem solid #e4e4e4;
			.review_item_left{
				flex: 4;
				.review_title{
					@include sc(0.65rem,#000);
					padding: .5rem 0;
					line-height: 1rem
				}
				.review_content{
					@include sc(0.6rem,#999);
					line-height: 0.8rem;
				}
				.author_info{
					height: 1rem;
					line-height: 1rem;
					margin: .5rem 0;
					.author_pic{
						display: inline-block;
						img{
							width: .7rem;
							height: .7rem;
							@include borderRadius(50%);
						}
					}
					.author_name{
						@include sc(0.55rem,#666666);
						vertical-align: top;
					}
				}
			}
			.review_item_right{
				width: 4rem;
				vertical-align: super;
				display: flex;
				justify-content: center;
				align-items: center;
				img{
					width: 3.5rem;
					margin-top: -1rem;
					@include borderRadius(50%)
				}
			}
		}
		.hot_review_item:last-child{
			border-bottom: none;
		}
		
	}
	.fake_container{
		display: block;
		width: 100%;
		height: 2rem;
	}
	

</style>
