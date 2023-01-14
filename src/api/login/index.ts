import request from '/@/utils/request';


export function UserInfo() {
	return request({
		url: '/v1/user/info',
		method: 'get',
	})
}

/**
 * 登录api接口集合
 * @method signIn 用户登录
 * @method signOut 用户退出登录
 */
export function useLoginApi() {
	return {
		signIn: (params: object) => {
			return request({
				url: '/v1/login',
				method: 'post',
				data: params,
			});
		},
		signOut: (params: object) => {
			return request({
				url: '/user/signOut',
				method: 'post',
				data: params,
			});
		},
	};
}
