<template>
	<div>
	    <head-top go-back='true' :head-title="walletTitle"></head-top>
	    <section class="like-top"></section>
	    <section class="like_content" >
	    	<div class="like_box">
		    	<div class="wallet_left">
		    		<div class="hui_coin"><span class="coin_name">HUI</span><span class="coin_name_num">1</span></div>
		    		<div class="hui_coin_day"><span class="coin_day">币天</span><span class="coin_day_num">1</span></div>
		    	</div>
		    	<div class="wallet_right">提币</div>
	    	</div>
	    </section>
	    
    </div>
</template>

<script>
import headTop from 'src/components/header/head'
import footGuide from 'src/components/footer/footGuide'
import {messageLike} from 'src/service/getData'
import {getStore, setStore, removeStore} from 'src/config/mUtils'
import {mapState, mapActions} from 'vuex'
	export default {
	  data(){
        return {
        	walletTitle: '我的钱包',
        	currentPage:1,
        	pageSize:12,
			creator:'',
			userPwd:'',
			likeList:[]
        }
    },

    mounted(){
//    	this.initData();

    },
  	components: {
  	    headTop,
  	    footGuide,
  	},

    computed: {
	//判断文章是否投稿过
//      ...mapState([
//          'userInfo'
//      ]),
    },
    methods: {
    	//加载我的文章
//	  	initData(){
//			this.creator = getStore('user_id');
//			this.passWord = JSON.parse(getStore('user_info')).userPwd;
//	    	messageLike(this.creator,this.passWord,this.currentPage,this.pageSize,3).then(res => {
//		        this.likeList = res.data.datas;
//		    }).catch(res => {
//		        console.log('获取列表数据错误:' + err);
//	      	})
//	    },
	    
    },
 
    watch: {

    },
    computed:{
    	
    }
}
</script>

<style lang="scss">
	@import 'src/style/mixin';
	.like-top{
		margin-top: 2rem;
	}
	.like_content{
		display: flex;
		border-bottom: solid 0.01rem #9e9e9eeb;
		font-size:0.6rem;
		padding: 0.5rem;
    	background-color: white;
    	.like_box{
    		display: flex;
    		background-color: #1a68a4;
		    width: 100%;
		    border-radius: 0.3rem;
		    padding: 0.8rem;
    		.wallet_left{
    			flex: 3;
    			color:white;
    			.hui_coin{
    				padding: .3rem;
    				border-bottom: solid 0.01rem gainsboro;
    				display:flex;
    				.coin_name{
    					flex: 1;
    					color: white;
    				}
    				.coin_name_num{
    					flex: 1;
    					color: white;
    					
    				}
    			}
    			.hui_coin_day{
    				padding: .3rem;
    				display: flex;
    				.coin_day{
    					flex: 1;
    					color: white;
    					
    				}
    				.coin_day_num{
    					flex: 1;
    					color: white;
    					
    				}
    				
    			}
			}
			.wallet_right{
				color: #1a68a4;
				flex: 1;
				margin-left: 1rem;
			    width: .8rem;
			    line-height: 1rem;
			    border-radius: 0.1rem;
			    height: 1rem;
			    text-align: center;
			    background-color: white;
			    margin-top: 1rem;
			}
    	}
		
	}
</style>