<template>
	<div>
		<head-top :head-title="loginWay? '登录':'密码登录'" goBack="true">
            
   			<router-link :to="'/login/login'" class="go_register" slot="search">
	    		<!--<svg class="head_search_icon">
					<use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="'#search'"></use>
				</svg>-->
				<span class="go_register_btn">去登录</span>
	  		</router-link>
   			
        </head-top>
        
	</div>
</template>

<script>
    import headTop from '../../components/header/head'
	export default {
        data(){
            return {
                
            }
        },
        created(){
        },
        components: {
            headTop,
        },
        computed: {

        },
        methods: {

        }
    }
</script>

<style lang="scss" scoped>
    @import '../../style/mixin';
	.go_register{
		right: .8rem;
		@include wh(2rem, .8rem);
		@include ct;
		.go_register_btn{
			@include wh(.8rem, .8rem);
			vertical-align: top;
			font-size: 0.6rem;
    		color: #3b95e9;
		}
	}
	
	
</style>