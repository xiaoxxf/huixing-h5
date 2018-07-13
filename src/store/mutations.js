import {
	GET_USERINFO,
	RECORD_USERINFO,
	DEL_USERINFO,
	// RECORD_ADDRESS,
	// ADD_CART,
	// REDUCE_CART,
	// INIT_BUYCART,
	// CLEAR_CART,
	// RECORD_SHOPDETAIL,
	// CONFIRM_REMARK,
	// CONFIRM_INVOICE,
	// CHOOSE_SEARCH_ADDRESS,
	// SAVE_GEOHASH,
	// CONFIRM_ADDRESS,
	// CHOOSE_ADDRESS,
	// NEED_VALIDATION,
	// SAVE_CART_ID_SIG,
	// SAVE_ORDER_PARAM,
	// CHANGE_ORDER_PARAM,
	// ORDER_SUCCESS,
	// SAVE_SHOPID,
	// SAVE_ORDER,
	// OUT_LOGIN,
	// RETSET_NAME,
	// SAVE_AVANDER,
	// SAVE_ADDRESS,
	// SAVE_ADDDETAIL,
	// SAVE_QUESTION,
	// ADD_ADDRESS,
	// BUY_CART,
} from './mutation-types.js'

import {setStore, getStore} from '../config/mUtils'

import {localapi, proapi} from 'src/config/env'

export default {

	// 记录用户信息
	[RECORD_USERINFO](state, info) {
		console.log("info===?",info)
		state.userInfo = info;
		state.login = true;
		setStore('user_id', info.id);
		setStore('user_info', info);
	},
	// 删除用户信息，退出登录
	[DEL_USERINFO](state, info) {
		// console.log("info===?",info)
		state.userInfo = null;
		state.login = false;
	},
	//获取用户信息存入vuex
	[GET_USERINFO](state, info) {
		state.userInfo = {...info};

		// if (state.userInfo && (state.userInfo.username !== info.username)) {
		// 	return;
		// };
		// if (!state.login) {
		// 	return
		// }
		// if (!info.message) {
		// 	state.userInfo = {...info};
		// } else {
		// 	state.userInfo = null;
		// }
	},

}
