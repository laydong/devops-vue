import request from '/@/utils/request';

/**
 * api接口集合
 * @method listApi 接口列表
 * @method addApi 新增接口
 */
export function useLoginApi() {
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
	};
}
