<template>
    <div>
		<div class="container">
			<div class="news-wrap" >
				<div v-for="item in newsList" :key="item.id" class="news-item" @click="gotoNewsDetail(item.id)">
					<div class="news-title">
						{{item.title}}{{item.title}}
					</div>
					<div class="news-info">
						<span class="time">1分钟前</span>
						<span class="comes-from">来源:华尔街 </span>
					</div>
				</div>
			</div>
			<div class="no-data-tip" hidden="">--别太放肆，我是有底线的--</div>
			</div>
    	<foot-guide></foot-guide>
    </div>    
</template>

<script>
import {mapMutations} from 'vuex'
// import {imgBaseUrl} from 'src/config/env'
import headTop from 'src/components/header/head'
import footGuide from 'src/components/footer/footGuide'
import shopList from 'src/components/common/shoplist'
import { newList } from 'src/service/tempData'
import { replyFormat } from 'src/utils/replyFormat'
import 'src/plugins/swiper.min.js'
import 'src/style/swiper.min.css'

export default {
	data(){
        return {
            msiteTitle: '请选择地址...', // msite页面头部标题
            foodTypes: [], // 食品分类列表
            hasGetData: false, //是否已经获取地理位置数据，成功之后再获取商铺列表信息
            imgBaseUrl: 'https://fuss10.elemecdn.com', //图片域名地址
			htmlData:'',
			newsList:[],
			pageSize: 10,
    		currentPage:1,
        }
    },
    async beforeMount(){
	},
    mounted(){
		//获取新闻列表
		this.newsList = newList().list;
		console.log(this.newsList)
		//let newsList = newList();
		//this.htmlData = replyFormat(newsList)
		//console.log(this.htmlData)
		this.formatData();
    },
    components: {
    	headTop,
    	shopList,
    	footGuide,
    },
    computed: {

    },
    methods: {
    	...mapMutations([
    		'RECORD_ADDRESS', 'SAVE_GEOHASH'
    	]),
    	// 解码url地址，求去restaurant_category_id值
    	getCategoryId(url){
    		let urlData = decodeURIComponent(url.split('=')[1].replace('&target_name',''));
    		if (/restaurant_category_id/gi.test(urlData)) {
    			return JSON.parse(urlData).restaurant_category_id.id
    		}else{
    			return ''
    		}
    	},
		formatData(){
			this.htmlData = "<a isclick=true>测试html</a>"
		},
		gotoNewsDetail(id){
			this.$router.push({ path: 'newsDetail', query: { news_id: id } });
		}
    },
    watch: {

    }
}

</script>

<style lang="scss" scoped>
    @import 'src/style/mixin';
	
	.container {
		padding-top: 0rem;
		@include sc(0.6rem, #666);
		width: 100%;
	}
	.username{
		color:#006cb4
	}
	.news-wrap {
		width: 96%;
		margin-left: 2%;
		margin-top: .3rem;
	}
	.news-wrap  .news-item{
		padding:.3rem;
		border-radius:.2rem;
		background-color:#fff;
		margin-top:.2rem;
	}
	.news-wrap .news-item .news-title{
		height:auto;
		@include sc(0.55rem, #000);
		line-height: 0.8rem
	}
	.news-wrap .news-info{
		display:flex;
		flex-direction: row;
		height:.6rem;
		line-height:.6rem;
		font-size: 0.45rem
	}
	.news-wrap .news-info .time{
		padding-right:.15rem;
		color:#006cb4;
	}
	.news-wrap .news-info .comes-from{
		color:#c7c8cd;
	}
	.news-item .news-replies{
		position:relative;
		z-index: 0;
		padding-top:.1rem;
		border-top:1px solid #e5e5e5;
	}
	.news-item .news-replies .new-replies-title{
		font-size:.55rem;
	}
	.news-item .news-replies .author{
		color:#006cb4;
	}
	/*
	.msite_title{
		@include center;
        width: 50%;
        color: #fff;
        text-align: center;
        margin-left: -0.5rem;
        .title_text{
            @include sc(0.8rem, #fff);
            text-align: center;
            display: block;
        }
	}
	*/
	/*
	.msite_nav{
		padding-top: 2.1rem;
		background-color: #fff;
		border-bottom: 0.025rem solid $bc;
		height: 10.6rem;
		.swiper-container{
			@include wh(100%, auto);
			padding-bottom: 0.6rem;
			.swiper-pagination{
				bottom: 0.2rem;
			}
		}
		.fl_back{
			@include wh(100%, 100%);
		}
	}*/
	/*.food_types_container{
		display:flex;
		flex-wrap: wrap;
		.link_to_food{
			width: 25%;
			padding: 0.3rem 0rem;
			@include fj(center);
			figure{
				img{
					margin-bottom: 0.3rem;
					@include wh(1.8rem, 1.8rem);
				}
				figcaption{
					text-align: center;
					@include sc(0.55rem, #666);
				}
			}
		}
	}*/
	/*.shop_list_container{
		margin-top: .4rem;
		border-top: 0.025rem solid $bc;
		background-color: #fff;
		.shop_header{
			.shop_icon{
				fill: #999;
				margin-left: 0.6rem;
				vertical-align: middle;
				@include wh(0.6rem, 0.6rem);
			}
			.shop_header_title{
				color: #999;
				@include font(0.55rem, 1.6rem);
			}
		}
	}*/

</style>
