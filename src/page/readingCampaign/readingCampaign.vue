<template>
	<div>
        <head-top go-back='true' :head-title="profiletitle"></head-top>
		<section class="reading_campaign">
			
			<div class="reading_campaign_banner">
				
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
				<div class="team_gz">
					<div class="team_header">
						<img src="../../images/elmlogo.jpeg" class="team_header_icon" />
						<span class="team_header_name">广州站</span>
					</div>
					<div class="team_content">
						<img src="../../images/activity.png" class="team_content_icon" />
						<div class="team_content_detail">
							
						</div>
					</div>
					<div class="team_content_send_article"></div>
				</div>
				<!--深圳队-->
				<div class="team_sz">
					
				</div>
			</div>
			
		</section>
	</div>
</template>

<script>
import headTop from 'src/components/header/head'
import footGuide from 'src/components/footer/footGuide'
export default {
	  data(){
        return {
        profiletitle: '读书活动',
        currentPage: 1,
        pageSize: 24,
        }
    },

    mounted(){
//    this.initData()
    },
  	components: {
  	    headTop,
  	    footGuide,
  	},

    computed: {

    },
    methods: {
//  	initData(){
//      getNewsIndex(this.currentPage,this.pageSize).then(res => {
//        this.news_list = res.data.datas;
//      }).catch(res => {
//        console.log('获取列表数据错误:' + err);
//      })
//    },
     
    },
 
    watch: {

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
	.team_gz{
		display: flex;
	    background-color: #9999992b;
	    padding: 0.3rem;	
	}
	.team_header{
		flex: 1;		
				
	}
	.team_header img{
		width: 2rem;
	    height: 2rem;
	    border-radius: 1rem;		
				
	}
	.team_content{
		flex: 1;
	}
	.team_content_send_article{
		flex: 1;
	}
</style>