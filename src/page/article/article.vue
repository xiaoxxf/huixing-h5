<template>
    <div>
		<div class="">    
			  <vue-html5-editor :content="content" :height="200" :z-index="100" :auto-height="true" :show-module-name="false" @click="focus" @change="updateData" ref="editor"></vue-html5-editor>
		</div>   
    	<foot-guide></foot-guide>
    </div>    
</template>

<script>
import {mapMutations} from 'vuex'
// import {imgBaseUrl} from 'src/config/env'
import headTop from 'src/components/header/head'
import footGuide from 'src/components/footer/footGuide'
import {loadMore} from 'src/components/common/mixin'
import {} from 'src/service/getData'

export default {
	data(){
        return {
            msiteTitle: '编写文章', // msite页面头部标题
			imgBaseUrl: 'https://fuss10.elemecdn.com', //图片域名地址
			content: '彗星',
        }
    },
    async beforeMount(){
		
	},
	created(){
	},
    mounted(){
		

	},
	mixins: [loadMore],
    components: {
    	headTop,
		footGuide,
    },
    computed: {

    },
    methods: {
		 updateData: function (data) {
			// sync content to component
			let c1 = data.replace(/<img width="100%"/g, '<img');    
			let c2 = c1.replace(/<img/g, '<img width="100%"');    
			this.content = c2; 
		},
		 focus: function () {
			this.$refs.editor.focus()
		},
	},
    watch: {
    }
}

</script>

<style lang="scss" scoped>
	@import 'src/style/mixin';
	.link_search{
		right: .8rem;
		@include wh(.8rem, .8rem);
		@include ct;
		.head_search_icon{
			@include wh(.8rem, .8rem);
			vertical-align: top;
		}
	}
	.msite_title{
		@include center;
        width: 60%;
        color: #999;
        text-align: center;
        .title_text{
            @include sc(0.55rem, #999);
            text-align: center;
            display: block;
			padding:.1rem 0;
			border: 1px solid #ddd;
			@include borderRadius(1rem);
			.head_search_icon{
				@include wh(.7rem, .7rem);
				vertical-align: bottom;
			}
        }
	}
	.msite_nav{
		padding-top: 2.1rem;
		background-color: #fff;
		//border-bottom: 0.025rem solid $bc;
		//height: 10.6rem;
		.swiper-container{
			@include wh(94%, auto);
			.swiper-pagination{
				bottom: 1rem;
			}
		}
		.fl_back{
			@include wh(100%, 100%);
		}
	}
</style>
