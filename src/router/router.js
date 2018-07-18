import App from '../App'
const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')

// 项目列表
const chain_index = r => require.ensure([], () => r(require('../page/chain/chain_index')), 'chain_index')
// 项目详情
const chain_detail = r => require.ensure([], () => r(require('../page/chain/chain_detail')), 'chain_detail')
// 广播
const boradcast = r => require.ensure([], () => r(require('../page/boradcast/boradcast')), 'boradcast')
// 个人主页
const mine = r => require.ensure([], () => r(require('../page/mine/mine')), 'mine')
//个人设置
const mine_setting = r => require.ensure([], () => r(require('../page/mine/mine_setting')), 'mine_setting')
// 写文章
const article = r => require.ensure([], () => r(require('../page/article/article')), 'article')

// 代码榜列表
const codeRankIndex = r => require.ensure([], () => r(require('../page/codeRank/codeRankIndex')), 'codeRankIndex')
// 代码榜详情
const codeRankDetail = r => require.ensure([], () => r(require('../page/codeRank/codeRankDetail')), 'codeRankDetail')

// 播报列表
const newsIndex = r => require.ensure([], () => r(require('../page/news/newsIndex')), 'newsIndex')
// 播报详情
const newsDetail = r => require.ensure([], () => r(require('../page/news/newsDetail')), 'newsDetail')

// 文章详情
const comment = r =>  require.ensure([], () => r(require('../page/comment/comment')), 'comment')
//文章投稿到专题
const sendTopicArticle = r =>  require.ensure([], () => r(require('../page/sendTopicArticle/sendTopicArticle')), 'sendTopicArticle')
//我的文章投稿到读书活动
const mineArticle = r =>  require.ensure([], () => r(require('../page/article/mineArticle')), 'mineArticle')
//管理专题查看全部
const sendTopicArticleDetail = r =>  require.ensure([], () => r(require('../page/sendTopicArticle/sendTopicArticleDetail')), 'sendTopicArticleDetail')
//注册
//const register = r =>  require.ensure([], () => r(require('../page/register/register')), 'register')
// 登录
const loginAndSignup = r => require.ensure([], () => r(require('../page/loginAndSignup/loginAndSignup')), 'loginAndSignup')


const forget = r => require.ensure([], () => r(require('../page/forget/forget')), 'forget')
const search = r => require.ensure([], () => r(require('../page/search/search')), 'search')

//读书活动

const readingCampaign = r => require.ensure([], () => r(require('../page/readingCampaign/readingCampaign')), 'readingCampaign')
//我的(h5+app)
const mine_homepage = r => require.ensure([], () => r(require('../page/homePage/mine_homepage')), 'mine_homepage')
//我的主页(h5+app)
const mine_app = r => require.ensure([], () => r(require('../page/mine_homepage/mine_app')), 'mine_app')
//设置
const setting = r =>require.ensure([],() => r(require('../page/setting/setting')),'setting')

//消息
const messageNotification = r => require.ensure([], () => r(require('../page/messageNotification/messageNotification')), 'messageNotification')
//获赞
const like = r => require.ensure([], () => r(require('../page/messageNotification/like')), 'like')
//新关注
const heart = r => require.ensure([], () => r(require('../page/messageNotification/heart')), 'heart')
//评论
const messageComment = r => require.ensure([], () => r(require('../page/messageNotification/comment')), 'comment')
//弹窗
const dialog = r => require.ensure([], () => r(require('../page/messageNotification/dialog')), 'dialog')
//钱包
const wallet = r => require.ensure([], () => r(require('../page/wallet/wallet')), 'wallet')



export default [{
    path: '/',
    component: App, //顶层路由，对应index.html
    children: [ //二级路由。对应App.vue
        //地址为空时跳转home页面
        {
            path: '',
            redirect: '/home'
        },
        {
            path: '/home',
            component: home
        },

        // 链库首页
        {
            path: '/chain/chain_index',
            component: chain_index
        },

        // 项目详情页
        {
          path: '/chain/chain_detail/:projectId',
          name: 'chainDetail',
          component: chain_detail
        },
		//投稿专题
        {
        	path:'/sendTopicArticle/sendTopicArticle/:commentId/:topicIdList',
        	name:'sendTopicArticle',
        	component:sendTopicArticle
        },
        //我的文章投稿到读书活动
        {
        	path:'/article/mineArticle/:topicId',
        	name: 'mineArticle',
        	component:mineArticle
        },
        //我管理的专题查看全部

        {
        	path:'/sendTopicArticle/sendTopicArticleDetail',
        	component:sendTopicArticleDetail
        },
        //广播列表页
        {
        	path:'/boradcast',
        	component:boradcast
        },
        // 播报列表
        {
          path: '/news/newsIndex',
          component: newsIndex
        },
        // 播报详情
        {
            path: '/news/newsDetail/:newsId',
            name: 'newsDetail',
            component: newsDetail
        },
       	//个人主页
        {
        	path:'/mine',
          name: 'mine',
        	component:mine
        },
        //个人设置
        {
        	path:'/mine_setting',
        	component:mine_setting
        },
         //编写文章
        {
            path:'/article',
            component: article
        },
        // 代码榜列表
        {
          path:'/codeRank/codeRankIndex',
          component: codeRankIndex
        },
        // 代码榜详情
        {
          path:'/codeRank/codeRankDetail/:codeIndex',
          name:'codeDetail',
          component: codeRankDetail
        },
        // 文章详情
        {
          path:'/comment/comment/:commentId',
          name:'comment',
          component: comment
        },
        //搜索页
        {
            path: '/search/:geohash',
            component: search
        },
        //登录注册页
        {
            path: '/loginAndSignup',
            component: loginAndSignup
        },
        {
            path: '/readingCampaign',
            component: readingCampaign
        },

        //修改密码页
        {
            path: '/forget',
            component: forget
        },

      //我的主页(app+h5)
        {
        	path:'/homePage/mine_homepage',
        	component:mine_homepage
        },
        //我的(app+h5)
         {
        	path:'/mine_app',
        	component:mine_app
        },
        //设置
        {
        	path:'/setting',
        	component:setting
        },

        //消息
        {
            path: '/messageNotification',
            component: messageNotification
        },
        //获赞
        {
            path: '/messageNotification/like',
            component: like
        },
        
        {
        	path: '/messageNotification/heart',
            component: heart
        },
		{
        	path: '/messageNotification/comment',
            component: messageComment
        },
		{
        	path: '/messageNotification/dialog',
            component: dialog
        },
        //钱包
        {
        	path: '/wallet/wallet',
            component: wallet
        },
       
        

    ]
}]
