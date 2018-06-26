<template>
	<div>
        <head-top go-back='true' :head-title="mineArticletitle"></head-top>
		<section>
			<div class="page_title">我的文章</div>
			<div class="article_list" v-for="(item, index) in articlesList">
				<div class="article_list_title">{{item.textTitle}}</div>
				<div class="article_list_send" @click="sendArticleToTopic(item)">投稿</div>
			</div>
		</section>
	</div>
</template>

<script>
import headTop from 'src/components/header/head'
import footGuide from 'src/components/footer/footGuide'
import {getMyArticle,sendArticleOrNot} from 'src/service/getData'
import {getStore, setStore, removeStore} from 'src/config/mUtils'
import {mapState, mapActions} from 'vuex'
	export default {
	  data(){
        return {
        	mineArticletitle: '我的文章',
        	currentPage:1,
        	pageSize:12,
        	creator:'',
        	type:'',
        	articlesList:[],//我的文章信息列表
        	password:'',
        	topicId:'',
        }
    },

    mounted(){
      	this.initData();
      	console.log("params:" + this.$route.params.topicId);
	   	this.topicId=this.$route.params.topicId;
//	   	console.log(this.articleId)
    },
  	components: {
  	    headTop,
  	    footGuide,
  	},

    computed: {
	//判断文章是否投稿过
        ...mapState([
            'userInfo'
        ]),
    },
    methods: {
    	//加载我的文章
	  	initData(){
			this.creator = getStore('user_id');
	    	getMyArticle(this.currentPage,this.pageSize,this.creator,4).then(res => {
		        this.articlesList = res.data.datas;
		    }).catch(res => {
		        console.log('获取列表数据错误:' + err);
	      	})
	    },
	    //投稿到专题
	    sendArticleToTopic(review){
			this.creator = getStore('user_id');
			var passWord = JSON.parse(getStore('user_info')).userPwd;
	    	sendArticleOrNot(this.creator,passWord, this.topicId,review.reviewId).then(res => {
	    		this.sendArticle=res.data.datas;
	    	}).catch(res => {
	    		console.log('获取列表数据错误：'+err);
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
	.article_list{
		display: flex;
	    margin-top: 0.8rem;
	    padding: 0.3rem;
	    border-bottom: solid 1px gainsboro;
	    font-size: 0.7rem;
		.article_list_title{
			flex: 1;
		}
		.article_list_send{
			color: #007fcc;
		    border: solid 1px #007fcc;
		    padding: 0.1rem 0.2rem;
		    font-size: 0.6rem;
		}
	}
	
</style>