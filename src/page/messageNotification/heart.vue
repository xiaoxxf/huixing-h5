<template>
	<div>
    	<head-top go-back='true' :head-title="heartTitle"></head-top>
    	<section class="heart_top"></section>
    	<section class="heart_content" v-for="(item, index) in heartList">
    		<span class="user_icon">
    			<img :src='item.userPic'  @error="imgError(item)"/>
    			<!--<v-else="img src='../../images/default.png'" />-->
    		</span>
    		<div class="user_info">
    			<p class="user_name">{{item.realName}}关注了你</p>
    			<!--<p class="user_time">{{item.personIntro}}</p>-->
    		</div>
    		<span class="user_attwntion">关注</span>
    	</section>
	</div>

    
</template>

<script>
import headTop from 'src/components/header/head'
import footGuide from 'src/components/footer/footGuide'
import {messageAttention} from 'src/service/getData'
import {getStore, setStore, removeStore} from 'src/config/mUtils'
import {mapState, mapActions} from 'vuex'
	export default {
	  data(){
        return {
        	heartTitle: '新关注',
        	currentPage:1,
        	pageSize:12,
        	userId:'',
        	userPwd:'',
        	heartList:[]
        }
    },

    mounted(){
      	this.initData();

    },
  	components: {
  	    headTop,
  	    footGuide,
  	},

    computed: {

    },
    imgError(item){
    	item.img = require("../../images/default.png");
    },
    methods: {
    	//加载我的文章
	  	initData(){
			this.userId = getStore('user_id');
			this.passWord = JSON.parse(getStore('user_info')).userPwd;
	    	messageAttention(this.currentPage,this.pageSize,this.userId,this.passWord,1).then(res => {
	    		debugger
		        this.heartList = res.data.datas;
		    }).catch(res => {
		        console.log('获取列表数据错误:' + err);
	      	})
	    },
	    
    },
 
    watch: {

    },
    computed:{
    	
    }
}
</script>

<style lang="scss">
	@import 'src/style/mixin';
	.heart_top{
		margin-top: 2rem;

	}
	.heart_content{
		background-color: white;
		font-size:.6rem;
		display:flex;
		padding: 0.5rem;
		.user_icon{
			border-radius:1rem;
			flex:1;
			img{
				@include wh(1.5rem,1.5rem);
				    border-radius: 1rem;
			}
		}
		.user_info{
			flex:5;
			.user_name{
				
			}
			.user_time{
				
			}
			
		}
		.user_attwntion{
			flex:1;
			background-color: #0481cd;
		    color: white;
		    padding: 0rem 0.2rem;
		    height: 1rem;
		    text-align: center;
		    line-height: 1rem;
		    border-radius: .1rem;
			
		}
	}
</style>