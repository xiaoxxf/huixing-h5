<template>
	<div>
        <head-top go-back='true' :head-title="mineArticletitle"></head-top>
		<section>
			<div class="page_title">我的文章</div>
			<div class="article_list">
				<div class="article_list_title"></div>
				<div class="article_list_send">投稿</div>
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
        mineArticletitle: '我的文章',
       
        }
    },

    mounted(){
//    this.initData(),
    },
  	components: {
  	    headTop,
  	    footGuide,
  	},

    computed: {

    },
    methods: {
//	  	initData(){
//	      readingCampaign(this.currentPage,this.pageSize,this.creator).then(res => {
//	        this.newsList = res.data.datas;
//	      }).catch(res => {
//	        console.log('获取列表数据错误:' + err);
//	      })
//	    },
	
 
    },
 
    watch: {

    },
    computed:{
    	
    }
}

</script>


<style>
	.page_title{
		margin-top: 3rem;
		font-size: 0.8rem;
	}
	.article_list{
		
	}
</style>