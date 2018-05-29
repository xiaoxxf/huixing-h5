<template>
    <div>
    	<head-top signin-up='msite'>
    		<router-link :to="'/search/geohash'" class="link_search" slot="search">
	    		<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
	    			<circle cx="8" cy="8" r="7" stroke="rgb(170,170,170)" stroke-width="1" fill="none"/>
	    			<line x1="14" y1="14" x2="20" y2="20" style="stroke:rgb(170,170,170);stroke-width:2"/>
	    		</svg>
    		</router-link>
			<router-link to="/home" slot="msite-title" class="msite_title">
				<span class="title_text ellipsis">{{msiteTitle}}</span>
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
					<span class="sort_type">分类</span>
				</div>
				<div>
					<span class="code_rank">排行</span>
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
		<section class="hot_review_region">
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
import {msiteAddress, msiteFoodTypes, searchTopic, queryArticle} from 'src/service/getData'
import 'src/plugins/swiper.min.js'
import 'src/style/swiper.min.css'
import BScroll from 'better-scroll'

export default {
	data(){
        return {
        	geohash: '', // city页面传递过来的地址geohash
            msiteTitle: '请选择地址...', // msite页面头部标题
			imgBaseUrl: 'https://fuss10.elemecdn.com', //图片域名地址
			fakeBanner:[], //首页banner图
			searchTopic:[],
			topicActive:'',//热门选择栏目
			topicActiveData:[],//选择栏目数据
        }
    },
    async beforeMount(){
		
	},
	created(){
	},
    mounted(){
		//查找热门
		searchTopic().then(res => {
			this.searchTopic = res.datas;
			if(res.datas.length>0){
				this.topicActive = res.datas[0].id;
			}
			
        }).then(() => {
			//初始化better-scroll
				const remWidth = window.screen.width/375*24;
				let wrapperW = this.searchTopic.length*remWidth*3.6
				console.log("this.topicActive",this.topicActive)
                this.$refs.warpperMune.style.width=wrapperW+'px';
                this.$nextTick(()=>{
                    if (!this.scroll) {
                        this.scroll=new BScroll(this.$refs.searchWrapper, {
                            startX:0,
                            click:true,
                            scrollX:true,
                            scrollY:false,
                            eventPassthrough:'vertical'
                        })
                    }else{
                        this.scroll.refresh();
                    }
                });
		})
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
		changeActice(id){
			this.topicActive = id;
		},
		async getArticleByType(){
			queryArticle(this.topicActive).then(res => {
				if(res.code === 0){
					this.topicActiveData = res.datas;
				}
				console.log(res)
			})
		},
    },
    watch: {
		//topicActive 改变时则出发栏目文章查找方法
		topicActive:function(value){
			if(value != ''){
				this.getArticleByType();
			}
		}	
    }
}

</script>

<style lang="scss" scoped>
    @import 'src/style/mixin';
	.link_search{
		left: .8rem;
		@include wh(.9rem, .9rem);
		@include ct;
	}
	.msite_title{
		@include center;
        width: 50%;
        color: #fff;
        text-align: center;
        margin-left: -0.5rem;
        .title_text{
            @include sc(0.8rem, #fff);
            text-align: center;
            display: block;
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
