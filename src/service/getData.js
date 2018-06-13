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


/**   --------------------------------------    分割线  -------------------------------------              **/

// 原项目
/**
 * 获取首页默认地址
 */

/*export const cityGuess = () => fetch('/v1/cities', {
	type: 'guess'
});
*/

/**
 * 获取首页热门城市
 */

 /*
export const hotcity = () => fetch('/api/news', {
});
*/

/**
 * 获取首页所有城市
 */
/*
export const groupcity = () => fetch('/v1/cities', {
	type: 'group'
});
*/

/**
 * 获取当前所在城市
 */
/*
export const currentcity = number => fetch('/v1/cities/' + number);
*/

/**
 * 获取搜索地址
 */
/*
export const searchplace = (cityid, value) => fetch('/v1/pois', {
	type: 'search',
	city_id: cityid,
	keyword: value
});
*/

/**
 * 获取msite页面地址信息
 */
/*
export const msiteAddress = geohash => fetch('/v2/pois/' + geohash);
*/

/**
 * 获取msite页面食品分类列表
 */
/*
*/
export const msiteFoodTypes = () => fetch('/blockchain/quaryProjetList', {
	'currentPage': '1',
	'pageSize': '18',
},'get');

/*
/**
 * 获取msite商铺列表
 */
/*
export const shopList = (latitude, longitude, offset, restaurant_category_id = '', restaurant_category_ids = '', order_by = '', delivery_mode = '', support_ids = []) => {
	let supportStr = '';
	support_ids.forEach(item => {
		if (item.status) {
			supportStr += '&support_ids[]=' + item.id;
		}
	});
	let data = {
		latitude,
		longitude,
		offset,
		limit: '20',
		'extras[]': 'activities',
		keyword: '',
		restaurant_category_id,
		'restaurant_category_ids[]': restaurant_category_ids,
		order_by,
		'delivery_mode[]': delivery_mode + supportStr
	};
	return fetch('/shopping/restaurants', data);
};


/**
 * 获取search页面搜索结果
 */
/*
export const searchRestaurant = (geohash, keyword) => fetch('/v4/restaurants', {
	'extras[]': 'restaurant_activity',
	geohash,
	keyword,
	type: 'search'
});


/**
 * 获取food页面的 category 种类列表
 */
/*
export const foodCategory = (latitude, longitude) => fetch('/shopping/v2/restaurant/category', {
	latitude,
	longitude
});


/**
 * 获取food页面的配送方式
 */

export const foodDelivery = (latitude, longitude) => fetch('/shopping/v1/restaurants/delivery_modes', {
	latitude,
	longitude,
	kw: ''
});


/**
 * 获取food页面的商家属性活动列表
 */

export const foodActivity = (latitude, longitude) => fetch('/shopping/v1/restaurants/activity_attributes', {
	latitude,
	longitude,
	kw: ''
});


/**
 * 获取shop页面商铺详情
 */

export const shopDetails = (shopid, latitude, longitude) => fetch('/shopping/restaurant/' + shopid, {
	latitude,
	longitude: longitude + '&extras[]=activities&extras[]=album&extras[]=license&extras[]=identification&extras[]=statistics'
});



/**
 * 获取shop页面菜单列表
 */

export const foodMenu = restaurant_id => fetch('/shopping/v2/menu', {
	restaurant_id
});


/**
 * 获取商铺评价列表
 */

export const getRatingList = (shopid, offset, tag_name = '') => fetch('/ugc/v2/restaurants/' + shopid + '/ratings', {
	has_content: true,
	offset,
	limit: 10,
	tag_name
});


/**
 * 获取商铺评价分数
 */

export const ratingScores = shopid => fetch('/ugc/v2/restaurants/' + shopid + '/ratings/scores');


/**
 * 获取商铺评价分类
 */

export const ratingTags = shopid => fetch('/ugc/v2/restaurants/' + shopid + '/ratings/tags');


/**
 * 获取短信验证码
 */

export const mobileCode = phone => fetch('/v4/mobile/verify_code/send', {
	mobile: phone,
	scene: 'login',
	type: 'sms'
}, 'POST');


/**
 * 获取图片验证码
 */

export const getcaptchas = () => fetch('/v1/captchas', {},'POST');


/**
 * 检测帐号是否存在
 */

export const checkExsis = (checkNumber, type) => fetch('/v1/users/exists', {
	[type]: checkNumber,
	type
});


/**
 * 发送帐号
 */

export const sendMobile = (sendData, captcha_code, type, password) => fetch('/v1/mobile/verify_code/send', {
	action: "send",
	captcha_code,
	[type]: sendData,
	type: "sms",
	way: type,
	password,
}, 'POST');


/**
 * 确认订单
 */

export const checkout = (geohash, entities, shopid) => fetch('/v1/carts/checkout', {
	come_from: "web",
	geohash,
	entities,
	restaurant_id: shopid,
}, 'POST');


/**
 * 获取快速备注列表
 */

export const getRemark = (id, sig) => fetch('/v1/carts/' + id + '/remarks', {
	sig
});


/**
 * 获取地址列表
 */

export const getAddress = (id, sig) => fetch('/v1/carts/' + id + '/addresses', {
	sig
});


/**
 * 搜索地址
 */

export const searchNearby = keyword => fetch('/v1/pois', {
	type: 'nearby',
	keyword
});


/**
 * 添加地址
 */

export const postAddAddress = (userId, address, address_detail, geohash, name, phone, phone_bk, poi_type, sex, tag, tag_type) => fetch('/v1/users/' + userId + '/addresses', {
	address,
	address_detail,
	geohash,
	name,
	phone,
	phone_bk,
	poi_type,
	sex,
	tag,
	tag_type,
}, 'POST');


/**
 * 下订单
 */

export const placeOrders = (user_id, cart_id, address_id, description, entities, geohash, sig) => fetch('/v1/users/' + user_id + '/carts/' + cart_id + '/orders', {
	address_id,
	come_from: "mobile_web",
	deliver_time: "",
	description,
	entities,
	geohash,
	paymethod_id: 1,
	sig,
}, 'POST');


/**
 * 重新发送订单验证码
 */

export const rePostVerify = (cart_id, sig, type) => fetch('/v1/carts/' + cart_id + '/verify_code', {
	sig,
	type,
}, 'POST');



/**
 * 下订单
 */

export const validateOrders = ({
	user_id,
	cart_id,
	address_id,
	description,
	entities,
	geohash,
	sig,
	validation_code,
	validation_token
}) => fetch('/v1/users/' + user_id + '/carts/' + cart_id + '/orders', {
	address_id,
	come_from: "mobile_web",
	deliver_time: "",
	description,
	entities,
	geohash,
	paymethod_id: 1,
	sig,
	validation_code,
	validation_token,
}, 'POST');


/**
 * 重新发送订单验证码
 */

export const payRequest = (merchantOrderNo, userId) => fetch('/payapi/payment/queryOrder', {
	merchantId: 5,
	merchantOrderNo,
	source: 'MOBILE_WAP',
	userId,
	version: '1.0.0',
});



/**
 * 获取服务中心信息
 */

export const getService = () => fetch('/v3/profile/explain');



/**
*兑换会员卡
*/

export const vipCart = (id, number, password) => fetch('/member/v1/users/' + id + '/delivery_card/physical_card/bind',{
	number,
	password
}, 'POST')



/**
 * 获取红包
*/

export const getHongbaoNum = id => fetch('/promotion/v2/users/' + id + '/hongbaos?limit=20&offset=0');



/**
 * 获取过期红包
*/


export const getExpired = id => fetch('/promotion/v2/users/' + id + '/expired_hongbaos?limit=20&offset=0');


/**
 * 兑换红包
*/

export const exChangeHongbao = (id, exchange_code, captcha_code) => fetch('/v1/users/' + id + '/hongbao/exchange',{
	exchange_code,
	captcha_code,
}, 'POST');


/**
 * 获取用户信息
 */
/*
export const getUser = () => fetch('/v1/user', {user_id: getStore('user_id')});
*/

/**
 * 手机号登录
 */

var sendLogin = (code, mobile, validate_token) => fetch('/v1/login/app_mobile', {
	code,
	mobile,
	validate_token
}, 'POST');


/**
 * 获取订单列表
 */

export const getOrderList = (user_id, offset) => fetch('/bos/v2/users/' + user_id + '/orders', {
	limit: 10,
	offset,
});


/**
 * 获取订单详情
 */

export const getOrderDetail = (user_id, orderid) => fetch('/bos/v1/users/' + user_id + '/orders/' + orderid + '/snapshot');


/**
*个人中心里编辑地址
*/

export const getAddressList = (user_id) => fetch('/v1/users/'+user_id+'/addresses')

/**
*个人中心里搜索地址
*/

export const getSearchAddress = (keyword) => fetch('v1/pois',{
	keyword:keyword,
	type:'nearby'
})

/**
* 删除地址
*/

export const deleteAddress = (userid, addressid) => fetch( '/v1/users/' + userid + '/addresses/' + addressid, {}, 'DELETE')



/**
 * 账号密码登录
 */
// export const accountLogin = (username, password, captcha_code) => fetch('/v2/login', {username, password, captcha_code}, 'POST');


/**
 * 退出登录
 */
export const signout = () => fetch('/v2/signout');


/**
 * 改密码
 */
export const changePassword = (username, oldpassWord, newpassword, confirmpassword, captcha_code) => fetch('/v2/changepassword', {username, oldpassWord, newpassword, confirmpassword, captcha_code}, 'POST');
