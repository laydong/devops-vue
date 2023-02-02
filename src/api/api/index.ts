import request from '/@/utils/request';

/**
 * api接口集合
 * @method listApi 接口列表
 * @method addApi 新增接口
 */
export function useApi() {
	return {
		listApi: (params: object) => {
			return request({
				url: '/api/list',
				method: 'get',
				data: params,
			});
		},
		addApi: (params: object) => {
			return request({
				url: '/api/create',
				method: 'post',
				data: params,
			});
		},
		updateApi: (params: object) => {
			return request({
				url: '/api/update',
				method: 'post',
				data: params,
			});
		},
		delApi: (params: object) => {
			return request({
				url: '/api/del',
				method: 'post',
				data: params,
			});
		},
	};
}
