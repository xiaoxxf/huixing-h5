<template>
    <div class="loginContainer">
        <form class="loginForm">
        	<!--输入框-->
        	<section class="huixing_logo">
        		<img src="../../../huixing/static/loading.png" class="icon" />
        	</section>
        	<section class="input_container">
                <input type="text" placeholder="请输入用户名" v-model.lazy="userAccount">
            </section>
            <section class="input_container">
                <input type="text" placeholder="请输入手机号" v-model.lazy="phoneNum">
            </section>
            <section class="input_container">
                <input type="text" placeholder="输入验证码" v-model="codeNumber"/>
                <span class="get_code_btn" @click="checkNum">{{getCode}}</span>
            </section>
            <section class="input_container">
                <input  type="password" placeholder="请输入输入密码"  v-model="passWord">
            </section>
        </form>
		<!--注册-->
        <div class="login_box">
	        <div class="login_container" @click="signUp()">注册</div>
		        <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
		    </div>
	    </div>
</template>

<script>
    import alertTip from '../../components/common/alertTip'
    import {mapState, mapMutations} from 'vuex'

    import {checkWhetherPhoneExit,sendRegisterCode,sendRegisterInfo,accountLogin} from '../../service/getData'

    export default {
        data(){
            return {
				alertText: '', // 彈窗信息内容
				showAlert: false, // 是否彈窗
				userAccount:'',//用户名
				phoneNum:'',//手机号
				codeNumber:'',//验证码
				passWord:'',//密码
				checkPhoneNum:'',//手机号是否存在
				checkPhoneValid: false,
				getCode: '获取验证码',
				hasSendCode: false, //发送验证码防重点击
				accountValid: false, // 判断填写信息是否正确
            }
        },
        created(){
        },
        components: {
        	alertTip,

        },
        mounted(){

  		},
        computed: {

        },
        methods: {
            ...mapMutations([
                'RECORD_USERINFO',
            ]),

            closeTip(){
                this.showAlert = false;
            },

            // 校驗手機號格式
            registerFromValid(){
            	if(this.phoneNum == "" || !(/^1[0-9]{10}$/.test(this.phoneNum))) {
					this.checkPhoneValid = false
				}else{
					this.checkPhoneValid = true
				}
            },

            //检验手机号是否存在
            checkNum(){
            	if(this.checkPhoneValid || this.hasSendCode == false){
	            	console.log(this.phoneNum)
					checkWhetherPhoneExit(this.phoneNum).then(res => {

						this.checkPhoneNum = res.data.code;
	//					console.log(this.checkPhoneNum)
						// 可以注册
						if(this.checkPhoneNum == 0){
							this.getRegisterCode();
						}
						// 手机号已被注册
						else{
							this.showAlert = true
							this.alertText = '手机号已注册'
						}
					}).catch(err => {
						console.log('检验手机号是否存在错误:' + err)
					})
            	}else{
            		this.showAlert = true
					this.alertText = '请填写正确的手机号'
            	}
			},

			//发送验证码
			getRegisterCode(){
//				console.log(this.phoneNum)
				this.hasSendCode = true;
				sendRegisterCode(this.phoneNum).then(res => {
					// 开始倒计时
					this.getCode = 60;
					setInterval( () => {
						this.getCodeCount()
					},1000)
				}).catch(err => {
					console.log('发送验证码错误:' + err)
				})
			},

			getCodeCount(){
				if(this.getCode > 0){
					this.getCode--;
				}
				else if(this.getCode == 0){
					this.getCode = '重新发送验证码'
					this.hasSendCode = false;
				}
			},

			signUp(){

				if(!this.userAccount && !this.phoneNum && !this.codeNumber &&
					!this.passWord && this.checkPhoneNum == 0 && this.checkPhoneValid)
				{
					sendRegisterInfo(this.userAccount, this.phoneNum, this.codeNumber, this.passWord).then(res => {
						debugger
					}).catch(err => {
						console.log('注册错误:' + err)
					}).finally( () => {

					})
				}else{

					this.showAlert = true
					this.alertText = '请检查填写的信息是否完整正确'
				}

			},


      //发送登录信息
      async mobileLogin(){
          if (!this.userAccount) {
              this.showAlert = true;
              this.alertText = '请输入手机号/邮箱/用户名';
              return
          }else if(!this.passWord){
              this.showAlert = true;
              this.alertText = '请输入密码';
              return
          }
          this.userInfo = await accountLogin(this.userAccount, this.passWord);
          console.log("this.userInfo==>",this.userInfo)

          //如果返回的值不正确，则弹出提示框，返回的值正确则返回上一页
          if (this.userInfo.data.code !== 0) {
              this.showAlert = true;
              this.alertText = '账号密码不正确';
          }else{
              this.RECORD_USERINFO(this.userInfo.data.datas);
              this.$router.go(-1);
          }
      },


      closeTip(){
          this.showAlert = false;
      }

       },

        watch: {
        	phoneNum: function(){
        		this.registerFromValid();
        	}
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

    .loginContainer{
    	background: white;
        padding-top: 0.8rem;
        p, span, input{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
    }
    .change_login{
        position: absolute;
        @include ct;
        right: 0.75rem;
        @include sc(.7rem, #fff);
    }
	.go_login{
		font-size: 0.5rem;
		color: cornflowerblue;
	}
    .loginForm{
        background-color: #fff;
        margin-top: .4rem;
        .input_container{
            display: flex;
            justify-content: space-between;
            padding: .6rem .8rem;
            border-bottom: 1px solid #f1f1f1;
            input{
                @include sc(.7rem, #666);
            }
            button{
                @include sc(.65rem, #fff);
                font-family: Helvetica Neue,Tahoma,Arial;
                padding: .28rem .4rem;
                border: 1px;
                border-radius: 0.15rem;
            }
            .right_phone_number{
                background-color: #4cd964;
            }
            .get_code_btn{
            	font-size: 0.5rem;
    			color: #3b95e9;
            }

        }

        .phone_number{
            padding: .3rem .8rem;
        }
        .captcha_code_container{
            height: 2.2rem;
            .img_change_img{
                display: flex;
                align-items: center;
                img{
                    @include wh(3.5rem, 1.5rem);
                    margin-right: .2rem;
                }
                .change_img{
                    display: flex;
                    flex-direction: 'column';
                    flex-wrap: wrap;
                    width: 2rem;
                    justify-content: center;
                    p{
                        @include sc(.55rem, #666);
                    }
                    p:nth-of-type(2){
                        color: #3b95e9;
                        margin-top: .2rem;
                    }
                }
            }
        }
    }
    .login_tips{
        @include sc(.5rem, red);
        padding: .4rem .6rem;
        line-height: .5rem;
        a{
            color: #3b95e9;
        }
    }
    .login_container{
        margin:1rem;
        @include sc(.7rem, #fff);
        background-color: #3b95e9;
        padding: .5rem 0;
        border: 1px;
        text-align: center;
        border-radius: 2rem;
        clear: both;
    }
    .huixing_logo{
    	text-align: center;
    	padding: 1rem 0rem;
    	.icon{
    		width: 3rem;
    		height: 3rem;
    	}
    }
    .button_switch{
        background-color: #ccc;
        display: flex;
        justify-content: center;
        @include wh(2rem, 1rem);
        padding: 0.2rem;
        border: 1px;
        border-radius: 0.5rem;
        position: relative;
        .circle_button{
            transition: all .3s;
            position: absolute;
            top: -0.2rem;
            z-index: 1;
            left: -0.3rem;
            @include wh(1.2rem, 1.2rem);
            box-shadow: 0 0.026667rem 0.053333rem 0 rgba(0,0,0,.1);
            background-color: #f1f1f1;
            border-radius: 50%;
        }
        .trans_to_right{
            transform: translateX(1.3rem);
        }
        span{
            @include sc(.45rem, #fff);
            transform: translateY(.05rem);
            line-height: .6rem;
        }
        span:nth-of-type(2){
            transform: translateY(-.08rem);
        }
    }
    .change_to_text{
        background-color: #3b95e9;
    }
    .to_forget{
        float: right;
        @include sc(.6rem, #3b95e9);
        margin: 1rem .3rem
    }
    .login_box{
    	background-color: white;
    	height: 15rem;
    }
</style>
