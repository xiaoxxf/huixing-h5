<template>
	<div>
		<head-top goBack='true' :headTitle='register'>
    		<router-link :to="'/mine_setting'" class="link_search" slot="search">
	    		
	  		</router-link>
    	</head-top>
    	<section class="register_top">
    		<div class="download">
    			<span>彗星-最好玩的区块链内容社区</span>
    			<span class="download_btn">下载</span>
    		</div>
    		<div class="register_detail">
    			<p>成为彗星创世成员</p>
    			<p>活动时间:</p>
    			<p>注册即获得28HUI彗星币奖励</p>
    			<p>邀请好友得18HUI</p>
    		</div>
    	</section>
    	<section class="register_bottom">
    		<div class="register_container">
    			<input type="text" class="register_phone_num" placeholder="请输入手机号"/>
    			<input type="text" class="register_phone_code" placeholder="请输入验证码"/><span class="gain_code">获取验证码</span>
    			<input type="text" class="register_phone_psw" placeholder="设置密码"/>
    			<div class="register_btn">立即注册</div>
    			<a href="" class="download_app">已注册？下载APP</a>
    		</div>
    	</section>
	</div>
</template>

<script>
	import headTop from 'src/components/header/head'
	import footGuide from 'src/components/footer/footGuide'
	import {getStore, setStore, removeStore} from 'src/config/mUtils'
	
    export default {
    	data(){
	    	return{
		        register:'注册',
		        currentPage: 1,
				pageSize: 12,
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
	
			methods: {
//				initData(){
//					// debugger
//					// this.loginUser = this.userInfo;
//					this.user_id = getStore('user_id');
//					this.getDynamicData();
//					// // 获取用户信息
//					getUser().then(res => {
//						this.loginUser = res.data.datas
//					});
//
//				},
//
//				getDynamicData(){
//					this.touchend = false; //重置没有更多数据的flag
//					this.preventRepeatReuqest = false;
//
//					this.currentPage = 1; //重置加载起始页
//					this.personDataList = [];
//					this.showLoading = true;
//					getUserDynamic(this.currentPage,this.pageSize,this.user_id,this.type).then(res => {
//						this.personDataList = res.data.datas;
//						// 去除HTML标签
//						for (var i = 0; i < this.personDataList.length; i++) {
//							if(this.personDataList[i].type == 4 || this.personDataList[i].type == 2){
//								this.personDataList[i].textContent = this.personDataList[i].textContent.replace(/<\/?[^>]*>/g, '').replace(/[|]*\n/, '').replace(/&npsp;/ig, '');
//							}
//						}
//					}).catch(err => {
//						console.log('获取列表数据错误:' + err)
//					}).finally( () => {
//						this.showLoading = false;
//					})
//				}



				
				

			},
			watch: {
				
			}

    }
</script>

<style lang="scss" scoped>
	@import 'src/style/mixin';
	.register_top{
	    margin-top: 2rem;
	    padding: 0rem .5rem .5rem.5rem;
	    font-size: .7rem;
	    background-color:white;
	    .download{
	    	background-color: #9e9e9ebf;
	    	padding: .5rem 1rem;
	    	.download_btn{
	    		width: 2rem;
			    height: 1rem;
			    background-color: white;
			    float: right;
			    text-align: center;
			    font-size: .6rem;
			    border-radius: .0.1rem;
			    padding-top: .09rem;
	    	}
	    }
	    .register_detail{
	    	background-color: gainsboro;
	    	padding: 1.5rem;
	    	p{
	    		line-height:1.5rem;
	    	}
	    }
	}
	.register_bottom{
		padding: 1.5rem;
		font-size: .7rem;
	    background-color:white;
		
		.register_container{
		    border: solid 0.1rem gainsboro;
		    margin-top: -3rem;
		    background-color: white;
		    padding: 1.5rem;
			.register_phone_num{
				border-bottom: solid 0.01rem #9E9E9E;
			    width: 100%;
			    padding: .5rem .5rem .5rem 0rem;
			}
			.register_phone_code{
				border-bottom: solid 0.01rem #9E9E9E;
			    width: 100%;
			    padding: .5rem .5rem .5rem 0rem;
			}
			.gain_code{
				float: right;
			    position: relative;
			    top: -1.3rem;
			    font-size: .6rem;
			}
			.register_phone_psw{
				border-bottom: solid 0.01rem #9E9E9E;
			    width: 100%;
			    padding: .5rem .5rem .5rem 0rem;
			}
			.register_btn{
				margin-top: 2rem;
			    width: 100%;
			    border: solid 0.01rem gainsboro;
			    padding: 0.2rem;
			    text-align: center;
			}
			.download_app{
				margin-top: 1rem;
			    display: block;
			    text-align: center;
			}
		}
	}
	
</style>