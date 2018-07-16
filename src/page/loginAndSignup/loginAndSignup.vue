<template>
    <div>
        <head-top :head-title="title" goBack="true">
            <!--<div slot="changeLogin" class="change_login" @click="changeLoginWay">{{loginWay? "密码登录":"短信登录"}}</div>-->
   			<!--<span class="go_login">去登录</span>-->

        <div class="go_register" slot="search">
  	    		<!--<svg class="head_search_icon">
  					<use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="'#search'"></use>
  				</svg>-->
			     <span class="go_register_btn" @click='changeWay()'>{{this.goTo}}</span>
	  	  </div>

        </head-top>

        <login v-if='login'></login>
        <register v-else></register>

	   </div>
</template>

<script>
    import headTop from '../../components/header/head'
    import alertTip from '../../components/common/alertTip'
    import {localapi, proapi, imgBaseUrl} from 'src/config/env'
    import {mapState, mapMutations} from 'vuex'
    import {mobileCode, checkExsis, sendLogin, getcaptchas, accountLogin} from '../../service/getData'
    import login from 'src/components/loginAndSignUp/login'
    import register from 'src/components/loginAndSignUp/register'

    export default {
        data(){
            return {
              title: '登录',
              goTo: '去注册',
              login: true,
            }
        },
        created(){
        },
        components: {
            headTop,
            alertTip,
            login,
            register
        },
        computed: {

        },
        methods: {
          changeWay(){
            this.login = !this.login
            if (this.login) {
              this.title = '登录';
              this.goTo = '去注册';
            }else{
              this.title = '注册';
              this.goTo = '去登录';
            }
          }
        }
    }

</script>

<style lang="scss" >
  @import '../../style/mixin';
  body{
    background: white !important;
  }
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

  .loginContainer{
      padding-top: 0.8rem;
      p, span, input{
          font-family: Helvetica Neue,Tahoma,Arial;
      }
  }
</style>
