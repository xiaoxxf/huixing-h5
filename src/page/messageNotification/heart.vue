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
    		<span class="user_attwntion" @click="followPeople(item.id)" :data-id='item.id'>关注</span>
    		<!--<span class="user_attwntion" @click="followPeople(item.id)" :data-id='item.id'>取消关注</span>-->
    		
    		<!--获取id-->
    		<span class="getId" >{{item.id}}</span>
    	</section>
	</div>

    
</template>

<script>
import headTop from 'src/components/header/head'
import footGuide from 'src/components/footer/footGuide'
import {messageAttention,messageAttentionPeople,messageCheckoutAttentionPeople} from 'src/service/getData'
import {getStore, setStore, removeStore} from 'src/config/mUtils'
import {mapState, mapActions} from 'vuex'
	export default {
	  data(){
        return {
        	heartTitle: '新关注',
        	currentPage:1,
        	pageSize:12,
        	attentionId:'', //用户id
        	userId:'',
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
		        this.heartList = res.data.datas;
		    }).catch(res => {
		        console.log('获取列表数据错误:' + err);
	      	})
	    },
	    //检查是否关注过
//	    followPeopleOrNot(){
//	    	this.creator = getStore('user_id');//登录用户
//			this.password = JSON.parse(getStore('user_info')).userPwd;
//		   this.attentionId=e;//(查看用户);
//		   messageCheckoutAttentionPeople(this.attentionId,this.creator,this.password,1).then(res => {
//	    		debugger
//		        this.followOrNotList = res.data.msg;
//		    }).catch(res => {
//		        console.log('获取列表数据错误:' + err);
//	      	})
//	    }
	    
		//关注
		followPeople(e){
			this.creator = getStore('user_id');//登录用户
			this.password = JSON.parse(getStore('user_info')).userPwd;
		   this.attentionId=e;//(查看用户);
		   messageAttentionPeople(this.attentionId,this.creator,this.password,1).then(res => {
	    		debugger
		        this.followList = res.data.msg;
		    }).catch(res => {
		        console.log('获取列表数据错误:' + err);
	      	})
		}
	    
    },
 
    watch: {

    },
    computed:{
    	
    }
}
</script>

<style lang="scss">
	@import 'src/style/mixin';
	.getId{
		display: none;
	}
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

<!--If follow == 1
 	{{aa}}
else follow == 0
	{{bb}}-->
