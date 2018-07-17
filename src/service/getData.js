import fetch from '../config/fetch'
import { getStore } from '../config/mUtils'
import { baseUrl } from '../config/env'
import axios from 'axios'
import md5 from 'js-md5' //md5对用户密码进行加密传送
axios.defaults.baseURL = baseUrl;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


/**
 * 获取新闻列表
 */

export const newList = () => fetch('/api/news', {}, 'GET');

/*export const searchTopic = () => fetch('/topic/seachTopic', {
	'currentPage': '1',
	'pageSize': '6',
}, 'get');
*/
// 获取专题列表
export const searchTopic = () => axios.get('/topic/seachTopic', {
	params: {
		currentPage: '1',
		pageSize: '6',
	}
}).then(function(res){
	return res.data.datas;
})
.catch(function(err){
	console.log(err);
});

export const queryArticle = (topicId,currentPage,pageSize) => axios.get('/topic/quaryArticle', {
	params: {
		currentPage,
		pageSize,
		topicId,
	}
}).then(function(res){
	return res.data.datas;
})
.catch(function(err){
	console.log(err);
});

/**
 * 账号密码登录
 */
export const accountLogin = (userName, userPwd) => axios.get('/news/login', {
	params: {
		userName,
		userPwd:md5.hex(userName+userPwd)
	}
}).then(function(res){
	return res;
})
.catch(function(err){
	console.log(err);
});

/**
 * 获取用户信息
 */

export const getUser = () => axios.get('/news/quaryusers', {
	params: {
		userId: getStore('user_id')
	}
});


//账号密码注册
export const accountRegister = (userName, userPwd,phoneCode) => axios.get('/news/registerUser', {
	params: {
		userName,
		userPwd:md5.hex(userName+userPwd),
		phoneCode:phoneCode
	}
}).then(function(res){
	return res;
})
.catch(function(err){
	console.log(err);
});


// 获取项目的分类列表
export const getProjectCategory = () => axios.get('blockchain/quary', {
	params: {
		parentId: 1
	}
})

// 获取项目信息（列表）
export const queryProjectByType = (projectType,currentPage = 1,pageSize = 24) => axios.get('blockchain/quaryProjetList', {
	params: {
		'currentPage': currentPage,
		'pageSize': pageSize,
		'projectType': projectType,
		// 'order': 3 //排序 不传->评论数  2->评分（评价） 3->时间
	}
})
// 获取项目信息（详情）
export const queryProjectInfo = (projectId) => axios.get('blockchain/detail',{
	params: {
		'projectId': projectId
	}
}).then(function(res){
	return res.data.datas
}).catch(function(err){
	console.log('获取项目信息错误:' + err)
})

// 获取项目下的评论 type=1为短评 type=2为长评
export const queryCommentByProject = (projectId,currentPage=1,pageSize=2,type) => axios.get('blockchain/quaryReview',{
	params: {
		'projectId': projectId,
		'currentPage': currentPage,
		'pageSize': pageSize,
		'type': type
	}
})

// 点赞评论（文章） likes = 1点赞， likes = 0取消点赞
export const addLikeToArticle = (reviewId,userId,likes) => axios.get('blockchain/addLike',{
	params: {
		'reviewId': reviewId,
		'userId': userId,
		'likes': likes
	}
})

export const queryCommentDetail = (reviewId) => axios.get('topic/quaryArticleDeatail',{
	params:{
		'reviewId': reviewId
	}
})
//管理的专题
export const manageTopic = (currentPage,pageSize,topic,creator) => axios.get('topic/seachTopic',{
	params:{
		'currentPage':currentPage,
		'pageSize':pageSize,
		'creator':creator
	}
})
//推荐专题
export const commentTopic = (currentPage,pageSize,topic,creator) => axios.get('topic/seachTopic',{
	params:{
		'currentPage':currentPage,
		'pageSize':pageSize,
		'topic':topic,
		'creator':creator
	}
})
/**
	关注类型
	type
	1-我关注的人
	2-关注专题
	3-关注项目
	4-关注我的人
**/
export const follow = (attentionId,creator,password,type) => axios.get('attention/attent',{
	params: {
		'attentionId': attentionId, //关注的对象Id
		'creator': creator, // 关注动作发起者
		'password': password,
		'type': type // 关注类型
	}
})

/**
	获取广播列表数据
	like = 1 按点赞数加载（推荐）
**/
export const getBoradcastData = (currentPage,pageSize,like,loginUser) => axios.get('blockchain/quaryReviewByUser',{
	params: {
		'currentPage': currentPage,
		'pageSize': pageSize,
		'like': like,
		'loginUser': loginUser
	}
})

//获取个人主页信息
export const getPersonData = (currentPage,pageSize,userId) => axios.get('http://testapi.blockcomet.com/news/quaryusers',{
	params: {
		'currentPage': currentPage,
		'pageSize': pageSize,
		'userId':userId
	}
})
/**
	获取代码排行榜列表
**/
export const getCodeRankData = (currentPage,pageSize,month,order) => axios.get('http://rank.blockcomet.com/',{
	params: {
		'pageNumber': currentPage,
		'pageSize': pageSize,
		'month': month,
		'order': order
	}
})

/**
	获取播报列表
**/
export const getNewsIndex = (currentPage,pageSize) => axios.get('http://testapi.blockcomet.com/news/search',{
	params: {
		'currentPage': currentPage,
		'pageSize': pageSize,
	}
})
export const getNewsDetail = (newsId) => axios.get('http://testapi.blockcomet.com/news/getinfo',{
	params: {
		'newsId': newsId
	}
})


/**
	个人中心页，获取动态
**/
export const getUserDynamic = (currentPage,pageSize,creator,type) => axios.get('blockchain/quaryReviewByUser',{
	params: {
		'currentPage': currentPage,
		'pageSize': pageSize,
		'creator': creator,
		'type': type
	}
})


/**
	发布文章
**/
export const postArticle = (textTitle,textContent,userId,type) => axios.post('blockchain/addReview',{

	'textTitle': textTitle,
	'textContent': textContent,
	'userId': userId,
	'type': type

})
//投稿

export const postSendArticle = (creator,password,topic_id,reviewId) => axios.get('topic/submission',{
	params: {
		'creator': creator,
		'password': password,
		'topicId': topic_id,
		'reviewId': reviewId
	}
})

//注册-验证手机号是否存在
export const checkWhetherPhoneExit = (userName) => axios.get('news/virty',{
	params:{
		'userName': userName,
	}
})
//注册-发送验证码
export const sendRegisterCode = (phoneNo) => axios.get('blockchain/getCode',{
	params:{
		'phoneNo': phoneNo

	}
})
//注册

export const sendRegisterInfo = (realName,userName,phoneCode,userPwd) => axios.post('news/registerUser',{
	'realName': realName,
	'userName': userName,
	'userPwd': userPwd,
//	'tel': $("#session_phone").val(),
	'phoneCode': phoneCode,
	'tel': userName

})

//读书活动
//广州站
//var uri = 'topic/seachTopic?currentPage=' + subject_page + '&pageSize=5&creator=db2bc250-1b48-4add-b0c4-bc849bf79723'
export const readingCampaign = (currentPage,pageSize,creator) => axios.get('topic/seachTopic',{
	params:{
		'currentPage': currentPage,
		'pageSize': pageSize,
		'creator': creator
	}
})
//深圳站
export const getSZreadingCampaign = (currentPage,pageSize,creator) => axios.get('topic/seachTopic',{
	params:{
		'currentPage': currentPage,
		'pageSize': pageSize,
		'creator': creator
	}
})


//投稿-加载我的文章
export const getMyArticle = (currentPage,pageSize,creator,type) => axios.get('blockchain/quaryReviewByUser',{
	params:{
		'currentPage': currentPage,
		'pageSize': pageSize,
		'creator': creator,
		'type':type
	}
})
//var uri = 'topic/submission?creator=' + userId + '&password=' + userinfo.userPwd
           //+ '&topicId=' + topicId + '&reviewId=' + reviewId


//投稿-是否已经投稿
export const sendArticleOrNot = (creator,password,topicId,reviewId) => axios.get('topic/submission',{
	params:{
		'creator': creator,
		'password': password,
		'topicId': topicId,
		'reviewId':reviewId
	}
})

//消息-获赞
export const messageLike = (creator,passWord,currentPage,pageSize,type) => axios.get('news/getMessage',{
	params:{
		'userId': creator,
		'userPwd': passWord,
		'currentPage':currentPage,
		'pageSize': pageSize,
		'type':type
	}
})
//消息-评论
export const messageComment = (creator,passWord,currentPage,pageSize,type) => axios.get('news/getMessage',{
	params:{
		'userId': creator,
		'userPwd': passWord,
		'currentPage':currentPage,
		'pageSize': pageSize,
		'type':type
	}
})

//消息-新关注
export const messageAttention = (currentPage,pageSize,creator,password,type) => axios.get('attention/quaryAttentionData',{
	params:{
		'currentPage':currentPage,
		'pageSize': pageSize,
		'creator':creator,
		'password':password,
		'type':type
	}
})
// 关注/取消关注
export const messageCheckoutAttentionPeople = (attentionId,creator,password,type) => axios.get('attention/checkAttent',{
	params:{
		'attentionId':attentionId,
		'creator': creator,
		'password':password,
		'type':type,
	}
})
//关注人
export const messageAttentionPeople = (attentionId,creator,password,type) => axios.get('attention/attent',{
	params:{
		'attentionId':attentionId,
		'creator': creator,
		'password':password,
		'type':type,
	}
})

//var uri = 'attention/attent?attentionId=' + userid_search + '&creator=' + userId + '&password='
//	 					+ userinfo.userPwd + '&type=1';
	 					
	 					
/**   --------------------------------------    分割线  -------------------------------------              **/
