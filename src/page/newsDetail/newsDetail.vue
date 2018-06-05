<template>
    <div class="container-detail">
        <head-top go-back='true' :head-title="profiletitle"></head-top>
        <section class="newsdetail_wrapper">
        	<div class="broadcast_detail_title">
        		矿机巨头争抢台积电产能，嘉楠耘智7nm ASIC芯片量产或早于比特大陆
        	</div>
        	<div class="broadcast_detail_content">
        		有媒体称，比特大陆联合创始人兼CEO詹克团上周来台，密访台积电、力晶等供应链伙伴
        		，寻求为新一代高效能挖矿芯片展开合作。而日前供应链传出，嘉楠耘智新一代ASIC同样在台积电投片，
        		且由上一代的16nm跳到7nm，并计划在7月量产，在先进制程的使用上，进度比头号竞争对手比特大陆更快。不过这一消息未得到台积电的证实。（雷锋网）
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
        	profiletitle: '播报内容',
        	news_id:null
        }
    },
    created(){
        this.news_id = this.$route.query.news_id;
        console.log(this.news_id)
    },
    async beforeMount(){
	},
    mounted(){
	
    },
	components: {
	    headTop,
	    footGuide,
	},
    computed: {

    },
    methods: {
    
    },
    watch: {

    }
}

</script>

<style lang="scss" scoped>
    @import 'src/style/mixin';
	.container-detail{
        position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #fff;
		z-index: 12;
        padding-top: 1.95rem;
        p, span{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
    }
    .newsdetail_wrapper{
    	background-color: white;
    	padding:0.6rem;
    	font-size: 0.65rem;
    }
    .broadcast_detail_title{
    	font-weight: 600;
	    line-height: 1.0rem;
	    color: black;
	    font-size: 0.7rem;
	    padding: 0.4rem 0rem;
	    border-bottom: solid 1px gainsboro;
    }
    .broadcast_detail_content{
    	text-indent: 1.4rem;
    	margin-top: 0.4rem;
    	line-height: 1.1rem;
    }
</style>
