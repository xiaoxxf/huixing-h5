<template>
	<div>
	    <head-top go-back='true' :head-title="commentTitle"></head-top>
	    <section class="comment_top" >
	    	<div class="comment_header" v-for="(item, index) in commentList">
	    		<span class="user_icon"><img src="../../images/elmlogo.jpeg"/></span>
	    		<div class="user_info">
	    			<p class="user_name">{{item.realName}}</p>
	    			<p class="user_time">{{item.createTime}}</p>
	    			<div class="comment_article_title">
			    		评论了你的文章 <span class="article">{{'《'+ item.title +'》'}}</span>
			    	</div>
			    	<div class="comment_content">
			    		{{item.content}}
			    	</div>
	    		</div>
	    		<span class="comment">回复</span>
	    	</div>
	    </section>
    </div>
</template>

<script>
import headTop from 'src/components/header/head'
import footGuide from 'src/components/footer/footGuide'
import {messageComment} from 'src/service/getData'
import {getStore, setStore, removeStore} from 'src/config/mUtils'
import {mapState, mapActions} from 'vuex'
import dialogBar from './dialog.vue'
	export default {
	  data(){
        return {
        	commentTitle: '评论',
        	currentPage:1,
        	pageSize:12,
        	creator:'',
			userPwd:'',
			commentList:[]

        }
    },

    mounted(){
      	this.initData();

    },
  	components: {
  	    headTop,
  	    footGuide,
    	'dialog-bar': dialogBar,
  	    
  	},

    computed: {
	
    },
    methods: {
    	//加载我的文章
	  	initData(){
			this.creator = getStore('user_id');
			this.passWord = JSON.parse(getStore('user_info')).userPwd;
	    	messageComment(this.creator,this.passWord,this.currentPage,this.pageSize,2).then(res => {
	    		debugger
		        this.commentList = res.data.datas;
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
	.comment_top{
		margin-top: 2rem;
		background-color: white;
		font-size:.6rem;
		padding: 0.5rem;
		.comment_header{
			display:flex;
			padding: 0.8rem 0rem;
   		 	border-bottom: solid 0.01rem gainsboro;
			.user_icon{
				flex:1;
				img{
					@include wh(1.5rem, 1.5rem);
					    border-radius: 1rem;
				}
			}
			.user_info{
				flex:5;
				.user_name{
					font-weight:bold;
				}
			}
			.comment{
				flex:.5;
				border: solid 0.01rem gainsboro;
			    height: .5rem;
			    padding: .1rem .3rem;
			    display: inline-table;
			}
			
		}
		.comment_article_title{
			padding: 0.5rem 0rem;
			.article{
				margin-left: .5rem;
				color: #007fcc;
			}
		}
		.comment_content{
			background-color: #f4f4f4;
   			padding: .5rem;
		}
		
	}
</style>