import request from '/@/utils/request';


/**
 * 用户api接口集合
 * @method UserInfo 用户信息
 * @method UserToken 刷新token
 * @method UserSet 更新用户信息
 * @method UserSetPaw 更新用户密码
 */
export function userApi() {
	return {
		UserInfo: () => {
			return request({
				url: '/user/info',
				method: 'get',
			})
		},
		UserToken: () => {
			return request({
				url: '/user/token',
				method: 'post',
			})
		},
		UserSet: (params?: object) => {
			return request({
				url: '/user/set',
				method: 'post',
				data:params
			})
		},
		UserSetPaw: (params?: object) => {
			return request({
				url: '/user/set_paw',
				method: 'post',
				data:params
			})
		},
	};
}
