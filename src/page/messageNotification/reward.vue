<template>
    <head-top go-back='true' :head-title="likeTitle"></head-top>
</template>

<script>
	import headTop from 'src/components/header/head'
import footGuide from 'src/components/footer/footGuide'
import {getStore, setStore, removeStore} from 'src/config/mUtils'
import {mapState, mapActions} from 'vuex'
	export default {
	  data(){
        return {
        	likeTitle: '获赞',
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
</style>