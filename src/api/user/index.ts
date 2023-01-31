import request from '/@/utils/request';


/**
 * 用户api接口集合
 * @method UserInfo 用户信息
 */
export function userApi() {
	return {
		UserInfo: () => {
			return request({
				url: '/user/info',
				method: 'get',
			})
		},
	};
}
