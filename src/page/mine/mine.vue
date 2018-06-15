<template>
	<div>
    	<head-top goBack='true' :headTitle='homepage'>
    		<router-link :to="'mine_setting'" class="link_search" slot="search">
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
    					<p class="person_introduce">简介：{{loginUser.personIntro}}</p>
    				</div>
    			</div>
    			<div class="person_introduce_bottom_detail">
    				<div class="detail_attention">
    					<p class="attention_num">{{loginUser.following}}</p>
    					<p class="attention_chaim">关注</p>
    				</div>
    				<div class="detail_fans">
    					<p class="attention_num">{{loginUser.follower}}</p>
    					<p class="attention_chaim">粉丝</p>
    				</div>
    				<!--<div class="detail_topic">
    					<p class="attention_num">8</p>
    					<p class="attention_chaim">专题</p>
    				</div>
    				<div class="detail_subject">
    					<p class="attention_num">10</p>
    					<p class="attention_chaim">项目</p>
    				</div>-->
    			</div>
    		</section>
    		<section class="person_create">
    			<!--创建的专题-->
    			<!--<div class="create_topic">
    				<div class="topic_left">
    					<p class="my_create_topic">我创建的专题</p>
    					<p class="my_create_topic_num">点击查看</p>
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
    			</div>-->
    			<!--创建的项目-->
    			<!--<div class="create_subject">
    				<div class="subject_left">
    					<p class="my_create_subject">我创建的项目</p>
    					<p class="my_create_subject_num">点击查看</p>
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
    			</div>-->
    		</section>
    		<!--动态切换-->
    		<ul class="all_dynamic_items">
					<!--item_color-->
					<li :class="{all_dynamic_item:type == '' }" @click='changType(0)'>全部动态</li>
					<li :class="{all_dynamic_item:type == 4 }" @click='changType(4)'>文章</li>
					<li :class="{all_dynamic_item:type == 2 }" @click='changType(2)'>长评</li>
					<li :class="{all_dynamic_item:type == 1 }" @click='changType(1)'>短评</li>
				</ul>

    		<!--全部动态-->

				<div class="all_dynamic_content"  v-for="(item, index) in personDataList" :key="index" v-load-more="loaderMore">
	    			<!--文章-->
	    			<section class="publish_article" v-if='item.type == 4'>
						<div class="publish_article_list">
							<div class="publish_article_list_info">
								<img :src="item.userPic" class="publish_article_user_icon" />
								<div class="publish_article_name_time">
									<p class="publish_article_name">{{item.realName}}</p>
									<p class="publish_article_time">{{item.createTime.split(" ")[0]}}</p>
								</div>
								<span class="send_icon"><svg data-v-17048857="" class="sort_type_icon"><use data-v-17048857="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#sendKit"></use></svg></span>
							</div>
							<div class="publish_article_botton_list_user_content">
								<p class="publish_article_content_info">发表了文章
								</p>
							</div>
							<div class="publish_article_bottom_list_user_comment">
								<router-link :to="{ name: 'comment', params: {commentId: item.reviewId} }">
									<div class="publish_article_info">
										<p class="publish_article_title">{{item.textTitle}}</p>
										<p class="publish_article_score" v-text=''>{{item.textContent.substr(0,70)}}...</p>
									</div>
								</router-link>
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
	    			<!--长评-->
    				<section class="write_comment" v-if='item.type == 2'>
						<div class="write_comment_list">
							<div class="write_comment_list_info">
								<img :src="item.userPic" class="comment_list_user_icon" />
								<div class="comment_user_name_time">
									<p class="comment_user_name">{{item.realName}}</p>
									<p class="comment_user_time">{{item.createTime.split(" ")[0]}}</p>
								</div>
								<span class="send_icon"><svg data-v-17048857="" class="sort_type_icon"><use data-v-17048857="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#sendKit"></use></svg></span>
							</div>
							<div class="comment_botton_list_user_content">
								<p class="comment_user_content_info">写了
									<router-link :to="{ name: 'chainDetail', params: {projectId: item.projectId} }">
										{{item.projectBigName}}
									</router-link>
									的点评
								</p>
							</div>
							<div class="comment_bottom_list_user_comment">
								<router-link :to="{ name: 'chainDetail', params: {projectId: item.projectId} }">
									<img :src="item.projectLogo" class="comments_user_icon"/>
								</router-link>
								<router-link :to="{ name: 'comment', params: {commentId: item.reviewId} }">
									<div class="write_user_comment_info">
										<p class="write_comment_title">{{item.textTitle}}</p>
										<p class="write_comment_score">{{item.textContent.substr(0,70)}}...</p>
									</div>
								</router-link>

							</div>
							<div class="write_bottom_list_user_flow">
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
	    			<!--短评-->
	    			<section class="broadcast_wrapper_bottom" v-if='item.type == 1'>
						<div class="broadcast_wrapper_bottom_list">
							<div class="bottom_list_user_info">
								<img :src="item.userPic" class="user_icon" />
								<div class="user_name_time">
									<p class="user_name">{{item.realName}} </p>
									<p class="user_time">{{item.createTime.split(" ")[0]}}</p>
								</div>
								<span class="send_icon"><svg data-v-17048857="" class="sort_type_icon"><use data-v-17048857="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#sendKit"></use></svg></span>
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
									<router-link :to="{ name: 'chainDetail', params: {projectId: item.projectId} }">
										<p class="comment_title">{{item.projectBigName}}</p>
									</router-link>
									<p class="comment_score">{{countScore(item.score)}} <span class="comment_score_num">{{item.score}}</span></p>
								</div>
							</div>
							<div class="bottom_list_user_flow">
								<div class="flow_heart_icon">
									<span><svg data-v-17048857="" class="sort_type_icon"><use data-v-17048857="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#heart"></use></svg>
									</span>
									{{item.likes}}
								</div>
							</div>
						</div>
					</section>
	    		</div>
    		<!--</section>-->
    	</section>
			<transition name="loading">
				<loading v-show="showLoading"></loading>
			</transition>
    	<foot-guide></foot-guide>
	</div>
</template>

<script>
	import {mapState, mapActions} from 'vuex'
	import headTop from 'src/components/header/head'
	import footGuide from 'src/components/footer/footGuide'
	import {getUserDynamic,getBoradcastData,getUser} from 'src/service/getData'
	import {getStore, setStore, removeStore} from 'src/config/mUtils'
	import {loadMore} from 'src/components/common/mixin'
	import loading from 'src/components/common/loading'

    export default {
    	data(){
	    	return{
	        homepage:'我的主页',
	        currentPage: 1,
			pageSize: 12,
			type: '',
			personDataList: [],
			loginUser: {},
			user_id: '',
			showLoading: true, //显示加载动画
			preventRepeatReuqest: false, //到达底部加载数据，防止重复加载
			touchend: false, //没有更多数据

	      }
      },
			created(){
				//获取用户信息
				// if (getStore('user_id')) {
				// 	this.getUserInfo();
				// }
			},
			mounted(){
				this.$nextTick(()=>{
					this.initData();
				});

			},
	    components: {
	    	headTop,
	    	footGuide,
				loading,
	    },
			mixins: [loadMore],

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
					this.getDynamicData();
					// // 获取用户信息
					getUser().then(res => {
						this.loginUser = res.data.datas
					});

				},

				// 加载全部/文章/长评、短评
				getDynamicData(){
					this.touchend = true; //重置没有更多数据的flag
					this.currentPage = 1; //重置加载起始页
					this.personDataList = [];
					this.showLoading = true;
					getUserDynamic(this.currentPage,this.pageSize,this.user_id,this.type).then(res => {
						this.personDataList = res.data.datas;
						// 去除HTML标签
						for (var i = 0; i < this.personDataList.length; i++) {
							if(this.personDataList[i].type == 4 || this.personDataList[i].type == 2){
								this.personDataList[i].textContent = this.personDataList[i].textContent.replace(/<\/?[^>]*>/g, '').replace(/[|]*\n/, '').replace(/&npsp;/ig, '');
							}
						}
					}).catch(err => {
						console.log('获取列表数据错误:' + err)
					}).finally( () => {
						this.showLoading = false;
					})
				},



				// 加载更多
				loaderMore(){
					if (this.touchend) {
						return
					}
					this.preventRepeatReuqest = true;
					this.currentPage++;
					getUserDynamic(this.currentPage,this.pageSize,this.user_id,this.type).then(res => {
						this.personDataList = res.data.datas;
						// 去除HTML标签
						for (var i = 0; i < this.personDataList.length; i++) {
							if(this.personDataList[i].type == 4 || this.personDataList[i].type == 2){
								this.personDataList[i].textContent = this.personDataList[i].textContent.replace(/<\/?[^>]*>/g, '').replace(/[|]*\n/, '').replace(/&npsp;/ig, '');
							}
						}
						if (res.data.datas.length < this.pageSize) {
								this.touchend = true;
						}
					}).catch(err => {
						console.log('获取列表数据错误:' + err)
					}).finally( () => {
						this.preventRepeatReuqest = false;
					})
				},


				// 计算评分星星
				countScore: function(rate){
					var start = 5 - rate;
					var end = 10 - rate;
					return '★★★★★☆☆☆☆☆'.slice(start,end);
				},

				// 加载类型
				changType: function(e){
					if (e) {
						this.type = e;
						this.getDynamicData();
					}else{
						this.type = '';
						this.getDynamicData();
					}
				}

			},
			watch: {
				type: function(value){
					if (value) {
						this.type = value;
					}else {
						this.type = '';
					}
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
    					font-size: 0.5rem;
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
					.attention_num{
						font-weight: 600;
					}
					.attention_chaim{
						color: #999;
    					font-size: 0.5rem;
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
		.all_dynamic_items{
			display: -webkit-inline-box;
			padding: 0.3rem 0.6rem;
			li{
				margin: 0rem 0.5rem;
			}
			.all_dynamic_item{
				color: #007fcc;
			}
			.item_color{
				color: #007fcc;
			}
		}
		/*.person_dynamic{*/
			.all_dynamic_content{
				/*文章*/
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
								    	font-size: 0.5rem;
								    	margin-top: 0.1rem;
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
								padding-left: 0.1rem;
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
							margin: 0rem -0.6rem;

						}
						.publish_article_flow_send_icon,
						.publish_article_flow_comment_icon,
						.publish_article_flow_heart_icon{
							flex:1 ;
							text-align: center;
							padding: 0.5rem 0rem;
							color: #999;
						}
						.publish_article_flow_comment_icon{
							/*padding-left: 1.2rem;*/
						}
						.publish_article_flow_heart_icon{

						}
						.sort_type_icon{
							width: 0.8rem;
						    height: 0.8rem;
						    vertical-align: top;
						    margin-right: 0.2rem;
						}

					}
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
								    	font-size: 0.5rem;
								    	margin-top: 0.1rem;
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
								padding-left: 0.1rem;
								color: #999;
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
					/*border-bottom: solid 1px gainsboro;*/
					display: flex;
					margin: 0rem -0.6rem;
				}

				.write_flow_comment_icon{
					/*padding-left: 1.2rem;*/
					text-align: center;
					flex: 1;
					padding: 0.5rem 0rem;

				}
				.write_flow_heart_icon{
					/*padding-left: 2rem;*/
					flex: 1;
					padding: 0.5rem 0rem;
					text-align: center;
				}
				.sort_type_icon{
					width: 0.8rem;
				    height: 0.8rem;
				    vertical-align: top;
				    margin-right: 0.2rem;
				}


				/*写短评*/
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
										    	font-size: 0.5rem;
										    	margin-top: 0.1rem;
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
											padding-left: 0.1rem;
									}
								}
								.bottom_list_user_comment{
									/*margin-top: 0.4rem;*/
									margin: 0.4rem 0rem;
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
									    padding: 0.5rem 0rem;
										margin-right: 2rem;
										color: #999;
										display: none;
									}
								}

						}
				    }


			}
		/*}*/
	}

</style>
