<template>
	<section class="hot_review_region" id="hotReviewContainer" :class="topicBarFixed == true ? 'containerFixed' :''">
			 <section v-load-more="getArticleByType">
				<div v-for="(item, index) in topicActiveData" :key="index"  class="hot_review_item">
					<div class="review_item_left">
						<router-link :to="{ name: 'comment', params: {commentId: item.reviewId} }">
							<h2 class="review_title">{{item.textTitle}}</h2>
						</router-link>
						<router-link :to="{ name: 'comment', params: {commentId: item.reviewId} }">
							<div class="review_content" v-html="subStrArticle(item.textContent)"></div>
						</router-link>
						<div class="author_info">
							<span class="author_pic">
								<img  v-lazy="item.userPic " alt="" v-if='item.userPic'>
								<svg class="normal_user" v-else>
									<use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="'#normal_user'"></use>
								</svg>
							</span>
							<span class="author_name">{{item.realName}}</span>
						</div>
					</div>
					<div class="review_item_right" v-if="item.type == 2">
							<img  v-lazy="item.projectLogo" alt="">
					</div>
				</div>
			</section>
			<transition name="loading">
				<loading v-show="showLoading"></loading>
			</transition>
		</section>
</template>
<script>

import {mapState} from 'vuex'
import {shopList,queryArticle} from 'src/service/getData'
import {imgBaseUrl} from 'src/config/env'
import {showBack, animate} from 'src/config/mUtils'
import {loadMore, getImgPath} from './mixin'
import loading from './loading'

export default {
	data(){
		return {
			offset: 0, // 批次加载店铺列表，每次加载20个 limit = 20
			currentPage:1,
			pageSize:6,
			shopListArr:[], // 店铺列表数据
			topicActiveData:[],//选择栏目数据
			preventRepeatReuqest: false, //到达底部加载数据，防止重复加载
			showBackStatus: false, //显示返回顶部按钮
			showLoading: true, //显示加载动画
			touchend: false, //没有更多数据
			imgBaseUrl,
		}
	},
	mounted(){
		this.initData();
	},
	components: {
		loading,
	},
	props: ['topicActive','topicBarFixed'],
	mixins: [loadMore, getImgPath],
	computed: {
	},
	updated(){
		// console.log(this.supportIds, this.sortByType)
	},
	methods: {
		async initData(){
			//获取数据
			this.showLoading = true;
			this.topicActiveData = await queryArticle(this.topicActive,this.currentPage,this.pageSize);
			if (this.topicActiveData < this.pageSize) {
				this.touchend = true;
			}
			this.hideLoading();
			//开始监听scrollTop的值，达到一定程度后显示返回顶部按钮
			showBack(status => {
				this.showBackStatus = status;
			});
		},
		//返回顶部
		backTop(){
			animate(document.body, {scrollTop: '0'}, 400,'ease-out');
		},
		//监听父级传来的数据发生变化时，触发此函数重新根据属性值获取数据
		async listenPropChange(){
			this.showLoading = true;
			this.currentPage = 0;
			this.preventRepeatRequest = false;
			this.topicActiveData = [];
			this.getArticleByType();
			//考虑到本地模拟数据是引用类型，所以返回一个新的数组
		},
		//开发环境与编译环境loading隐藏方式不同
		hideLoading(){
			this.showLoading = false;
		},
		async getArticleByType(){
			if (this.preventRepeatRequest) {
                    return
			}
			this.showLoading = true;
			this.preventRepeatRequest = true;
			this.currentPage ++;
			let activeDate = await queryArticle(this.topicActive,this.currentPage,this.pageSize);
			this.topicActiveData = [...this.topicActiveData,...activeDate];
			this.hideLoading();
			 if (activeDate.length >= this.pageSize) {
                    this.preventRepeatRequest = false;
                }
		},
	},
	watch: {
		topicActive:function(value){
			//监听父级页面传过来的topicActive的改变重置其他状态值
			this.listenPropChange();
		}

	}
}
</script>

<style lang="scss" scoped>
	@import 'src/style/mixin';
	.loader_more{
		@include font(0.6rem, 3);
		text-align: center;
	    color: #999;
	}
	.empty_data{
		@include sc(0.5rem, #666);
		text-align: center;
		line-height: 2rem;
	}
	.return_top{
		position: fixed;
		bottom: 3rem;
		right: 1rem;
		.back_top_svg{
			@include wh(2rem, 2rem);
		}
	}
	.loading-enter-active, .loading-leave-active {
		transition: opacity 1s
	}
	.loading-enter, .loading-leave-active {
		opacity: 0
	}
	.containerFixed{
		padding-top: 1.95rem;
	}
	.hot_review_region{
		padding: 0.2rem 0.4rem;
		min-height: 25rem;
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
						svg{
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
					width: 3.2rem;
					height: 3.2rem;
					margin-top: -1.5rem;
					@include borderRadius(50%)
				}
			}
		}
		.hot_review_item:last-child{
			border-bottom: none;
		}
		.loading-enter-active, .loading-leave-active {
			transition: opacity 1s
		}
		.loading-enter, .loading-leave-active {
			opacity: 0
		}

	}
</style>
