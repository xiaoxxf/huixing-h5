<template>
    <header id='head_top'>
         <router-link :to="userInfo? '/mine':'/login'" v-if='signinUp' class="head_login">
            <svg class="user_avatar">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#user"></use>
            </svg>
            <!-- <span class="login_span user_default" v-else>登录|注册</span> -->

             <!-- <svg class="user_avatar" v-else>
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#search"></use>
            </svg> -->
        </router-link>
        <slot name='logo'></slot>
        <slot name='search'></slot>
        <section class="head_goback" v-if="goBack" @click="$router.go(-1)">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
                <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(0,0,0);stroke-width:2"/>
            </svg>
        </section>
        <section class="title_head ellipsis" v-if="headTitle">
            <span class="title_text">{{headTitle}}</span>
        </section>
        <slot name='menu'></slot>

        <slot name="edit"></slot>
        <slot name="msite-title"></slot>
        <slot name="changecity"></slot>
        <slot name="changeLogin"></slot>
    </header>
</template>

<script>
    import {mapState, mapActions} from 'vuex'
    import { getStore } from 'src/config/mUtils'

    export default {
    	data(){
            return{

            }
        },
        mounted(){

        },
        created(){
          //获取用户信息
          if (getStore('user_id')) {
            this.getUserInfo();
          }
        },
        props: ['signinUp', 'headTitle', 'goBack'],
        computed: {
            ...mapState([
                'userInfo'
            ]),
        },
        methods: {
            ...mapActions([
                'getUserInfo'
            ]),
        },

    }

</script>

<style lang="scss" scoped>
    @import '../../style/mixin';

    #head_top{
        background-color: #fff;
        position: fixed;
        z-index: 100;
        left: 0;
        top: 0;
        @include wh(100%, 1.95rem);
        @include boxshadeBottom(0,0,1px,rgba(0,0,0,.5));
        transition: all 1s;
    }
    .head_goback{
        margin-top: 0.2rem;
        left: 0.4rem;
        @include wh(0.6rem, 1rem);
        line-height: 2.2rem;
        margin-left: .4rem;
    }
    .head_login{
        left: 0.55rem;
        @include wh(.8rem, .8rem);
        @include ct;
        .login_span{
            color: #aaaaaa;
        }
        .user_avatar{
            fill: #aaaaaa;
            @include wh(.8rem, .8rem);
            vertical-align: top;
        }
    }
    .title_head{
        @include center;
        width: 50%;
        color: #aaaaaa;
        text-align: center;
        .title_text{
            @include sc(0.8rem, #383737);
            text-align: center;
            font-weight: bold;
        }
    }
</style>
