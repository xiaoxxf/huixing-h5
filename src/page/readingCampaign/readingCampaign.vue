<template>
	<div>
        <head-top go-back='true' :head-title="profiletitle"></head-top>
		<section class="reading_campaign">
			
			<div class="reading_campaign_banner">
				<!--<img src="../../images/activity.png" alt="" />-->
            	<!--<img src="../../../static/banner.png"  />-->
				
			</div>
			<div class="reading_campaign_introduce">
				<div class="introdece_title">
					精读Ulord白皮书活动
				</div>
				<div class="introduce_content">
					Ulord是一条点对点价值传递公链，通过搭建区块链底层架构和数字资源分发协议，支持第三方开发商在其开源协议之上构建自己的应用程序，与众多行业合作伙伴一起形成区块链技术与应用的完整生态。
					基于Ulord创建的各种规则和协议，嫁接包括文字、图片、音乐、视频、软件等在内的各类数字资源应用场景，为信息创造者与消费者提供直接的对接平台。
					第三方开发商可以发行代币，构建自己的经济体系，也可以围绕Ulord重点打造各类应用，使用Ulord中的UlordToken作为系统内凭证。
					区别以往信息传递要借助平台或其他中心化机构才能进行传播获利这一模式，去除中间环节，信息提供者与消费者直接通过Ulord平台对接，保证了原创者利益的最大化。
					------《Ulord白皮书》
				</div>
			</div>
			<div class="reading_campaign_team">
				<!--广州队-->
				<div class="team_gz"  >
					<div class="team_header">
						<img src="../../images/elmlogo.jpeg" class="team_header_icon" />
						<span class="team_header_name">广州站</span>
					</div>
					<div class="team_content" v-for="(item, index) in newsList" :key="index" >
						<img :src="item.topicPic" class="team_content_icon" />
						<div class="team_content_detail">
							<p class="team_content_title">{{item.topic}}</p>
							<p class="team_content_include">已收录{{item.counts}}篇</p>
						</div>
          				<router-link :to="{ name: 'mineArticle', params: { topicId: item.id } }" class="team_content_send">
								投稿
						</router-link>
					</div>
				</div>
				<!--深圳队-->
				<div class="team_sz">
					<div class="team_header">
						<img src="../../images/elmlogo.jpeg" class="team_header_icon" />
						<span class="team_header_name">深圳站</span>
					</div>
					<div class="team_content" v-for="(item, index) in getSZnewsList" :key="index">
						<img :src="item.topicPic" class="team_content_icon" />
						<div class="team_content_detail">
							<p class="team_content_title">{{item.topic}}</p>
							<p class="team_content_include">已收录{{item.counts}}篇</p>
						</div>
						<!--<span class="team_content_send">投稿</span>-->
						<router-link :to="{ name: 'mineArticle', params: { topicId: item.id } }" class="team_content_send">
								投稿
						</router-link>
					</div>
				</div>
			</div>
			
		</section>
	</div>
</template>

<script>
import headTop from 'src/components/header/head'
import footGuide from 'src/components/footer/footGuide'
import {readingCampaign,getSZreadingCampaign} from 'src/service/getData'
export default {
	  data(){
        return {
        profiletitle: '读书活动',
        currentPage: 1,
        pageSize: 24,
        newsList:[],
        getSZnewsList:[],
        creator:'c8ed1e11-4603-495f-a57a-2b74e2b12018',
        szcreator:'db2bc250-1b48-4add-b0c4-bc849bf79723',
        }
    },

    mounted(){
      this.initData(),
      this.getSZinitData()
    },
  	components: {
  	    headTop,
  	    footGuide,
  	},

    computed: {

    },
    methods: {
	  	initData(){
	      readingCampaign(this.currentPage,this.pageSize,this.creator).then(res => {
	        this.newsList = res.data.datas;
	      }).catch(res => {
	        console.log('获取列表数据错误:' + err);
	      })
	    },
	    //深圳站数据
	    async getSZinitData(){
	    getSZreadingCampaign(this.currentPage,this.pageSize,this.szcreator).then(res => {
	        this.getSZnewsList = res.data.datas.splice(0,3);
	        console.log(this.getSZnewsList);
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

<style>
	.reading_campaign{
		margin-top: 2rem;
	}
	/*banner*/
	.reading_campaign_banner{
		padding: 0rem 0.6rem;
		border: solid 1px gainsboro;
		
		
	}
	/*白皮书*/
	.reading_campaign_introduce{
		padding: 0rem 0.6rem;
		font-size: 0.6rem;
		
	}
	.introdece_title{
		font-weight: bold;
		font-weight: bold;
    	font-size: 0.7rem;
    	padding: 0.4rem 0rem;
	}
	.introduce_content{
	    line-height: 1rem;
	}

	/*团队*/
	.reading_campaign_team{
		padding: 0rem 0.6rem;
		font-size: 0.6rem;
		padding: 1rem 0.6rem;
	}
	/*广州站*/
	.team_gz{
	}
	.team_header{
	    background-color: #9999992b;
	    padding: 0.3rem;
	    display: flex;
	    
	}
	.team_header img{
		width: 2rem;
	    height: 2rem;
	    border-radius: 1rem;		
				
	}
	.team_header_name{
		margin: 0.6rem;
    	font-size: 0.7rem;
	}
	.team_content{
		/*background-color: #9999992b;*/
		border: solid 1px #9999992b;
	    padding: 0.3rem;
	    display: flex;
	    margin-top: 0.5rem;
	    display: flex;
	}
	.team_content img{
		width: 2rem;
	    height: 2rem;
	    border-radius: 0.2rem;
	}
	.team_content_detail{
		margin-left: 0.6rem;
		flex: 1;
	}
	.team_content_send{
		margin-top: 0.6rem;
	    border: solid 0.01rem #007fcc;
	    padding: 0.1rem 0.2rem;
	    height: 1rem;
	    color: #007fcc;
	}
	.team_content_send_article{
		flex: 1;
	}
	/*深圳站*/
	.team_sz{
		margin-top: 1rem;
	}
	
</style>