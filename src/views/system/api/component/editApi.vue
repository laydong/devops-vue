<template>
	<div class="system-edit-menu-container">
		<el-dialog title="修改API" v-model="isShowDialog" width="769px">
			<el-form :model="ruleForm" size="default" label-width="80px">
        <el-form-item label="API名称">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>

        <el-form-item label="API路由">
          <el-input v-model="ruleForm.url"></el-input>
        </el-form-item>

				<el-row :gutter="35">
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
            <el-form-item label="请求方式">
              <el-select v-model="ruleForm.method" placeholder="请选择">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="是否鉴权">
              <div style="margin-top: 20px">
                <el-radio v-model="ruleForm.hidden" label=1 border size="medium">鉴权</el-radio>
                <el-radio v-model="ruleForm.hidden" label=2 border size="medium">不鉴权</el-radio>
              </div>
<!--              <el-radio v-model="ruleForm.hidden" label=1>鉴权</el-radio>-->
<!--              <el-radio v-model="ruleForm.hidden" label=2>不鉴权</el-radio>-->
<!--							<el-radio-group v-model="ruleForm.hidden">-->
<!--								<el-radio label=1>鉴权</el-radio>-->
<!--								<el-radio label=2>不鉴权</el-radio>-->
<!--							</el-radio-group>-->
						</el-form-item>
					</el-col>

          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
            <el-form-item label="鉴权类型">
              <div style="margin-top: 20px">
                <el-radio v-model="ruleForm.type" label=1 border size="medium">角色鉴权</el-radio>
                <el-radio v-model="ruleForm.type" label=2 border size="medium">登录鉴权</el-radio>
              </div>
              <!--              <el-radio v-model="ruleForm.hidden" label=1>鉴权</el-radio>-->
              <!--              <el-radio v-model="ruleForm.hidden" label=2>不鉴权</el-radio>-->
              <!--							<el-radio-group v-model="ruleForm.hidden">-->
              <!--								<el-radio label=1>鉴权</el-radio>-->
              <!--								<el-radio label=2>不鉴权</el-radio>-->
              <!--							</el-radio-group>-->
            </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
            <el-form-item label="状态">
              <el-switch v-model="ruleForm.status"  active-value=1 inactive-value=2>></el-switch>
            </el-form-item>
          </el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="菜单排序">
							<el-input-number v-model="ruleForm.sort" controls-position="right" placeholder="请输入排序" class="w100" />
						</el-form-item>
					</el-col>

<!--          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">-->

<!--          </el-col>-->

<!--					<template v-if="ruleForm.menuType === 'menu'">-->
<!--						<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">-->
<!--							<el-form-item label="是否隐藏">-->
<!--								<el-radio-group v-model="ruleForm.meta.isHide">-->
<!--									<el-radio :label="true">隐藏</el-radio>-->
<!--									<el-radio :label="false">不隐藏</el-radio>-->
<!--								</el-radio-group>-->
<!--							</el-form-item>-->
<!--						</el-col>-->
<!--						<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">-->
<!--							<el-form-item label="页面缓存">-->
<!--								<el-radio-group v-model="ruleForm.meta.isKeepAlive">-->
<!--									<el-radio :label="true">缓存</el-radio>-->
<!--									<el-radio :label="false">不缓存</el-radio>-->
<!--								</el-radio-group>-->
<!--							</el-form-item>-->
<!--						</el-col>-->
<!--						<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">-->
<!--							<el-form-item label="是否固定">-->
<!--								<el-radio-group v-model="ruleForm.meta.isAffix">-->
<!--									<el-radio :label="true">固定</el-radio>-->
<!--									<el-radio :label="false">不固定</el-radio>-->
<!--								</el-radio-group>-->
<!--							</el-form-item>-->
<!--						</el-col>-->
<!--						<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">-->
<!--							<el-form-item label="是否外链">-->
<!--								<el-radio-group v-model="ruleForm.isLink" :disabled="ruleForm.meta.isIframe">-->
<!--									<el-radio :label="true">是</el-radio>-->
<!--									<el-radio :label="false">否</el-radio>-->
<!--								</el-radio-group>-->
<!--							</el-form-item>-->
<!--						</el-col>-->
<!--						<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">-->
<!--							<el-form-item label="是否内嵌">-->
<!--								<el-radio-group v-model="ruleForm.meta.isIframe" @change="onSelectIframeChange">-->
<!--									<el-radio :label="true">是</el-radio>-->
<!--									<el-radio :label="false">否</el-radio>-->
<!--								</el-radio-group>-->
<!--							</el-form-item>-->
<!--						</el-col>-->
<!--					</template>-->
				</el-row>

        <template>
          <el-radio v-model="ruleForm.type" label="1">备选项1</el-radio>
          <el-radio v-model="ruleForm.type" label="2">备选项2</el-radio>
        </template>
        <el-form-item label="鉴权类型">
          <el-radio-group v-model="ruleForm.type">
            <el-radio label=1>角色鉴权</el-radio>
            <el-radio label=2>登录鉴权</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="接口说明">
          <el-input type="textarea" v-model="ruleForm.remark"></el-input>
        </el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="onCancel" size="default">取 消</el-button>
					<el-button type="primary" @click="onSubmit" size="default">修 改</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts">
import { reactive, toRefs, onMounted, defineComponent } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoutesList } from '/@/stores/routesList';
import { i18n } from '/@/i18n/index';
// import IconSelector from '/@/components/iconSelector/index.vue';
// import { setBackEndControlRefreshRoutes } from "/@/router/backEnd";

export default defineComponent({
	name: 'systemEditMenu',
	// components: { IconSelector },
	setup() {
		const stores = useRoutesList();
		const { routesList } = storeToRefs(stores);
		const state = reactive({
			isShowDialog: false,
			// 参数请参考 `/src/router/route.ts` 中的 `dynamicRoutes` 路由菜单格式
			ruleForm: {
        id :0,
        title: '',
        hidden: 1,
        type:1,
        url: '',
        method: '',
        sort: 99,
        status:1,
        value:false,
        remark:'',
        created_at:'',
        updated_at:'',
			},
      options: [{
        value: 'get',
        label: 'GET'
      }, {
        value: 'post',
        label: 'POST'
      }, {
        value: 'head',
        label: 'HEAD'
      }, {
        value: 'put',
        label: 'PUT'
      }, {
        value: 'delete',
        label: 'DELETE'
      }, {
        value: 'patch',
        label: 'PATCH'
      }, {
        value: 'connect',
        label: 'CONNECT'
      }, {
        value: 'options',
        label: 'OPTIONS'
      }, {
        value: 'trace',
        label: 'TRACE'
      }],
			menuData: [], // 上级菜单数据
		});
		// 获取 vuex 中的路由
		const getMenuData = (routes: any) => {
			const arr: any = [];
			routes.map((val: any) => {
				val['title'] = i18n.global.t(val.meta.title);
				val['id'] = Math.random();
				arr.push({ ...val });
				if (val.children) getMenuData(val.children);
			});
			return arr;
		};
		// 打开弹窗
		const openDialog = (row: any) => {
			// 模拟数据，实际请走接口
			row.menuType = 'menu';
			row.menuSort = Math.random();
			row.component = `${row.component} `
				.match(/\'(.+)\'/g)
				?.join('')
				.replace(/\'/g, '');
			state.ruleForm = row;
			state.isShowDialog = true;
		};
		// 关闭弹窗
		const closeDialog = () => {
			state.isShowDialog = false;
		};
		// 是否内嵌下拉改变
		const onSelectIframeChange = () => {
			if (state.ruleForm.meta.isIframe) state.ruleForm.isLink = true;
			else state.ruleForm.isLink = false;
		};
		// 取消
		const onCancel = () => {
			closeDialog();
		};
		// 新增
		const onSubmit = () => {
			closeDialog(); // 关闭弹窗
			// setBackEndControlRefreshRoutes() // 刷新菜单，未进行后端接口测试
		};
		// 页面加载时
		onMounted(() => {
			state.menuData = getMenuData(routesList.value);
		});
		return {
			openDialog,
			closeDialog,
			onSelectIframeChange,
			onCancel,
			onSubmit,
			...toRefs(state),
		};
	},
});
</script>
