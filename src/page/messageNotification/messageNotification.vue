<template>
	<div>
        <head-top go-back='true' :head-title="mineArticletitle"></head-top>
		<section class="message">
			<!--获赞-->
			<router-link to="/messageNotification/like"> 
				<div class="message_like">
					<svg class="normal_user" >
						<use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="'#message_like'"></use>
					</svg>
					<span class="icon_right_text">获奖</span>
				</div>
			</router-link>
			<!--评论或@-->
			<router-link to="/messageNotification/comment"> 
				<div class="message_comment">
					<svg class="normal_user" >
						<use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="'#message_comment'"></use>
					</svg>
					<span class="icon_right_text">评论或@</span>
				</div>
			</router-link> 
			<!--新关注-->
			<router-link to="/messageNotification/heart"> 
				<div class="message_new_attention">
					<svg class="normal_user" >
						<use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="'#message_heart'"></use>
					</svg>
					<span class="icon_right_text">新关注</span>
				</div>
			</router-link>
			<!--奖励通知-->
			<router-link to="/messageNotification/reward"> 
				<div class="message_reward_notification">
					<svg class="normal_user" >
						<use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="'#message_reward'"></use>
					</svg>
					<span class="icon_right_text">奖励通知</span>
				</div>
			</router-link> 
			
			<!--社区公告-->
			<router-link to="/messageNotification/annouce"> 
			<div class="message_annouce">
				<svg class="normal_user" >
					<use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="'#message_annouce'"></use>
				</svg>
				<span class="icon_right_text">社区公告</span>
			</div>
			</router-link> 
		</section>
	</div>
	
</template>

<script>
import headTop from 'src/components/header/head'
import footGuide from 'src/components/footer/footGuide'
import {getStore, setStore, removeStore} from 'src/config/mUtils'
import {mapState, mapActions} from 'vuex'
	export default {
	  data(){
        return {
        	mineArticletitle: '消息',
        	currentPage:1,
        	pageSize:12,
//      	creator:'',
//      	type:'',
//      	articlesList:[],//我的文章信息列表
//      	password:'',
//      	topicId:'',
        }
    },

    mounted(){
//    	this.initData();
//    	console.log("params:" + this.$route.params.topicId);
//	   	this.topicId=this.$route.params.topicId;
//	   	console.log(this.articleId)
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
//	    	getMyArticle(this.currentPage,this.pageSize,this.creator,4).then(res => {
//		        this.articlesList = res.data.datas;
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
	.message{
		background-color: white;
		font-size: 0.6rem;
    	margin-top: 2.5rem;
		.message_like{
			border-bottom: solid 0.01rem #9e9e9ecc;
			padding: 0.5rem;
			.normal_user{
				@include wh(.8rem, .8rem);
				
			}
			.icon_right_text{
				vertical-align: top;
				margin-left: 0.3rem;
			}
		}
		.message_comment {
			border-bottom: solid 0.01rem #9e9e9ecc;
			padding: 0.5rem;
			.normal_user{
				@include wh(.8rem, .8rem);
				
			}
			.icon_right_text{
				vertical-align: top;
				margin-left: 0.3rem;
			}
		}
		.message_new_attention  {
			border-bottom: solid 0.01rem #9e9e9ecc;
			padding: 0.5rem;
			.normal_user{
				@include wh(.8rem, .8rem);
				
			}
			.icon_right_text{
				vertical-align: top;
				margin-left: 0.3rem;
			}
		}
		.message_reward_notification  {
			border-bottom: solid 0.01rem #9e9e9ecc;
			padding: 0.5rem;
			.normal_user{
				@include wh(.8rem, .8rem);
				
			}
			.icon_right_text{
				vertical-align: top;
				margin-left: 0.3rem;
			}
		}
		.message_annouce{
			border-bottom: solid 0.01rem #9e9e9ecc;
			padding: 0.5rem;
			.normal_user{
				@include wh(.8rem, .8rem);
				
			}
			.icon_right_text{
				vertical-align: top;
				margin-left: 0.3rem;
			}
		}
	}
	
</style>