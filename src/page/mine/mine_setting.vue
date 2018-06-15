<template>
	<div>
		<head-top goBack='true' :headTitle='homepage_setting'>
	    </head-top>
		<section class="homepage_wrapper">
			<div class="exit_login_btn" @click="exitLogin()">
				注销
			</div>
		</section>
	    <foot-guide></foot-guide>
	</div>
</template>

<script>
	import headTop from 'src/components/header/head'
	import footGuide from 'src/components/footer/footGuide'
	import {getStore, setStore, removeStore} from 'src/config/mUtils'
	import {mapState, mapMutations} from 'vuex'
	export default {
    	data(){
            return{
                homepage_setting:'个人中心',
            }
       },
        created(){

        },
        mounted(){

        },
	    components: {
	    	headTop,
	    	footGuide,
	    },

        methods: {
					...mapMutations([
							'DEL_USERINFO',
					]),

        	exitLogin(){
        		removeStore('user_id');
						removeStore('user_info');
						this.DEL_USERINFO(null);
        		this.$router.push({path: '/home',})
        	}

        }



    }
</script>

<style lang="scss" scoped>
	@import 'src/style/mixin';
	.homepage_wrapper{
		font-size:0.8rem;
		background-color: white;
		margin-top:2rem;
		height: 30rem;
		.exit_login_btn{
			color: #1a68a4;
    		padding: 1rem;

		}
	}

</style>
