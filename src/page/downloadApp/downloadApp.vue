<template>
	<div>
		<head-top goBack='true' :headTitle='download'>
    		<router-link :to="'/mine_setting'" class="link_search" slot="search">
	    		
	  		</router-link>
    	</head-top>

    	<section class="download_container">
    		<div class="download_inner">
    			<img src="../../../huixing/static/huixingLogo.png" class="huixing_logo" />
    			<p class="title">彗星</p>
    			<p>注册成功</p>
    			<p>下载APP，登录即可领取并查看奖励</p>
    			<div class="Android"><span>安卓</span></div>
    			<div class="IOS"><span>IOS</span></div>
    			<p>邀请好友注册登录可额外获取28HUI奖励</p>
    			<p>
    				<a href="" class="copy_link">一键复制邀请链接</a>
    			</p>
				<p>
    				<a href="" class="get_code">获取二维码</a>
				</p>

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
		        download:'下载',
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


		},
		watch: {
			
		}

    }
</script>

<style lang="scss" scoped>
	@import 'src/style/mixin';
	.download_container{
		font-size:0.7rem;
		margin-top:2rem;
		padding:1.5rem;
		text-align:center;
		background-color:white;
		
		.download_inner{
			line-height: 1.5rem;
			.huixing_logo{
				width: 3rem;
			}
			.title{
				font-size: .8rem;
    			font-weight: bold;
			}
			.Android{
				span{
				    display: inline-block;
    				width: 3rem;
				    border: solid 0.01rem gainsboro;					
				} 
			}
			.IOS{
				margin-top: .5rem;
				span{
				    display: inline-block;
    				width: 3rem;
				    border: solid 0.01rem gainsboro;					
				} 
			}
			.copy_link{
				color: #67bee8;
			}
			.get_code{
				color: #67bee8;
			}
			
		}
	}
</style>