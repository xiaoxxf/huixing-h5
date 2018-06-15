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
//管理专题查看全部
const sendTopicArticleDetail = r =>  require.ensure([], () => r(require('../page/sendTopicArticle/sendTopicArticleDetail')), 'sendTopicArticleDetail')
//注册
//const register = r =>  require.ensure([], () => r(require('../page/register/register')), 'register')
// 登录
const loginAndSignup = r => require.ensure([], () => r(require('../page/loginAndSignup/loginAndSignup')), 'loginAndSignup')


const forget = r => require.ensure([], () => r(require('../page/forget/forget')), 'forget')
const search = r => require.ensure([], () => r(require('../page/search/search')), 'search')

/**   --------------------------------------    分割线  -------------------------------------              **/
// const city = r => require.ensure([], () => r(require('../page/city/city')), 'city')
// const project = r => require.ensure([], () => r(require('../page/project/project')), 'project')
// //const msite = r => require.ensure([], () => r(require('../page/msite/msite')), 'msite')
// const shop = r => require.ensure([], () => r(require('../page/shop/shop')), 'shop')
// const profile = r => require.ensure([], () => r(require('../page/profile/profile')), 'profile')
// const order = r => require.ensure([], () => r(require('../page/order/order')), 'order')
// const orderDetail = r => require.ensure([], () => r(require('../page/order/children/orderDetail')), 'orderDetail')
// const vipcard = r => require.ensure([], () => r(require('../page/vipcard/vipcard')), 'vipcard')
// const invoiceRecord = r => require.ensure([], () => r(require('../page/vipcard/children/invoiceRecord')), 'invoiceRecord')
// const useCart = r => require.ensure([], () => r(require('../page/vipcard/children/useCart')), 'useCart')
// const vipDescription = r => require.ensure([], () => r(require('../page/vipcard/children/vipDescription')), 'vipDescription')
// const food = r => require.ensure([], () => r(require('../page/food/food')), 'food')
// const confirmOrder = r => require.ensure([], () => r(require('../page/confirmOrder/confirmOrder')), 'confirmOrder')
// const remark = r => require.ensure([], () => r(require('../page/confirmOrder/children/remark')), 'remark')
// const payment = r => require.ensure([], () => r(require('../page/confirmOrder/children/payment')), 'payment')
// const userValidation = r => require.ensure([], () => r(require('../page/confirmOrder/children/userValidation')), 'userValidation')
// const invoice = r => require.ensure([], () => r(require('../page/confirmOrder/children/invoice')), 'invoice')
// const chooseAddress = r => require.ensure([], () => r(require('../page/confirmOrder/children/chooseAddress')), 'chooseAddress')
// const addAddress = r => require.ensure([], () => r(require('../page/confirmOrder/children/children/addAddress')), 'addAddress')
// const searchAddress = r => require.ensure([], () => r(require('../page/confirmOrder/children/children/children/searchAddress')), 'searchAddress')
// const foodDetail = r => require.ensure([], () => r(require('../page/shop/children/foodDetail')), 'foodDetail')
// const shopDetail = r => require.ensure([], () => r(require('../page/shop/children/shopDetail')), 'shopDetail')
// const shopSafe = r => require.ensure([], () => r(require('../page/shop/children/children/shopSafe')), 'shopSafe')
// const info = r => require.ensure([], () => r(require('../page/profile/children/info')), 'info')
// const setusername = r => require.ensure([], () => r(require('../page/profile/children/children/setusername')), 'setusername')
// const address = r => require.ensure([], () => r(require('../page/profile/children/children/address')), 'address')
// const add = r => require.ensure([], () => r(require('../page/profile/children/children/children/add')), 'add')
// const addDetail = r => require.ensure([], () => r(require('../page/profile/children/children/children/children/addDetail')), 'addDetail')
// const balance = r => require.ensure([], () => r(require('../page/balance/balance')), 'balance')
// const balanceDetail = r => require.ensure([], () => r(require('../page/balance/children/detail')), 'balanceDetail')
// const benefit = r => require.ensure([], () => r(require('../page/benefit/benefit')), 'benefit')
// const coupon = r => require.ensure([], () => r(require('../page/benefit/children/coupon')), 'coupon')
// const hbDescription = r => require.ensure([], () => r(require('../page/benefit/children/hbDescription')), 'hbDescription')
// const hbHistory = r => require.ensure([], () => r(require('../page/benefit/children/hbHistory')), 'hbHistory')
// const exchange = r => require.ensure([], () => r(require('../page/benefit/children/exchange')), 'exchange')
// const commend = r => require.ensure([], () => r(require('../page/benefit/children/commend')), 'commend')
// const points = r => require.ensure([], () => r(require('../page/points/points')), 'points')
// const pointsDetail = r => require.ensure([], () => r(require('../page/points/children/detail')), 'pointsDetail')
// const service = r => require.ensure([], () => r(require('../page/service/service')), 'service')
// const questionDetail = r => require.ensure([], () => r(require('../page/service/children/questionDetail')), 'questionDetail')
// const find = r => require.ensure([], () => r(require('../page/find/find')), 'find')
// const download = r => require.ensure([], () => r(require('../page/download/download')), 'download')

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

/**   --------------------------------------    分割线  -------------------------------------              **/
        /**
          原项目
        **/





        //修改密码页
        {
            path: '/forget',
            component: forget
        },


    ]
}]
