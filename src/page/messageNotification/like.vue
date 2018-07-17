<template>
	<div>
	    <head-top go-back='true' :head-title="likeTitle"></head-top>
	    <section class="like-top"></section>
	    <section class="like_content" v-for="(item, index) in likeList">
	    	<div class="like_left">
		    	<svg class="normal_user">
					<use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="'#message_like'"></use>
				</svg>
	    	</div>
	    	<div class="like_right">
	    		<p><span class="user_name">{{item.realName}}</span>喜欢了你的文章<span class="article">{{item.title}}</span></p>
	    		<p><span class="user_time">{{item.createTime}}</span></p>
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
        	likeTitle: '获赞',
        	currentPage:1,
        	pageSize:12,
			creator:'',
			userPwd:'',
			likeList:[]
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
	//判断文章是否投稿过
//      ...mapState([
//          'userInfo'
//      ]),
    },
    methods: {
    	//加载我的文章
	  	initData(){
			this.creator = getStore('user_id');
			this.passWord = JSON.parse(getStore('user_info')).userPwd;
	    	messageLike(this.creator,this.passWord,this.currentPage,this.pageSize,3).then(res => {
		        this.likeList = res.data.datas;
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
	.like-top{
		margin-top: 2rem;
	}
	.like_content{
		display: flex;
		border-bottom: solid 0.01rem #9e9e9eeb;
		font-size:0.6rem;
		padding: 0.5rem;
    	background-color: white;
		.like_left{
			flex:1;
			.normal_user{
				width: 0.8rem;
				height: 0.8rem;
			}
		}
		.like_right{
			flex:8;
			.user_name{
				color:#007fcc;
				margin-right: 0.3rem;
			}
			.article{
				margin-left: 0.3rem;
				color:#007fcc;
				line-height: 1rem;
			}
			.user_time{
				margin-right: 0.3rem;
			    font-size: 0.5rem;
			    margin-top: 0.3rem;
			    display: block;
			}
		}
	}
</style>