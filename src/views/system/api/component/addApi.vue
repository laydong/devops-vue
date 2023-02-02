<template>
	<div class="system-add-menu-container">
		<el-dialog title="新增API" v-model="isShowDialog" width="769px">
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
              <el-radio-group v-model="ruleForm.hidden">
                <el-radio :label="1">鉴权</el-radio>
                <el-radio :label="2">不鉴权</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
            <el-form-item label="鉴权类型">
              <el-radio-group v-model="ruleForm.type">
                <el-radio :label="1">角色鉴权</el-radio>
                <el-radio :label="2">登录鉴权</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
            <el-form-item label="状态">
              <el-switch v-model="ruleForm.status" :active-value="1" :inactive-value="2" inline-prompt active-text="启" inactive-text="禁"></el-switch>
            </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
            <el-form-item label="菜单排序">
              <el-input-number v-model="ruleForm.sort" controls-position="right" placeholder="请输入排序" class="w100" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="接口说明">
          <el-input type="textarea" v-model="ruleForm.remark"></el-input>
        </el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="onCancel" size="default">取 消</el-button>
					<el-button type="primary" @click="onSubmit" size="default">新 增</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts">
import { reactive, toRefs, onMounted, defineComponent } from 'vue';
import {useApi} from "/@/api/api";
import {ElMessage} from "element-plus/es";
// import { storeToRefs } from 'pinia';
// import { useRoutesList } from '/@/stores/routesList';
// import { i18n } from '/@/i18n/index';
// import IconSelector from '/@/components/iconSelector/index.vue';

export default defineComponent({
	name: 'systemAddApi',
	// components: { IconSelector },
	setup() {
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
        remark:'',
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
		});
		// 打开弹窗
		const openDialog = () => {
			state.isShowDialog = true;
		};
		// 关闭弹窗
		const closeDialog = () => {
			state.isShowDialog = false;
		};
		// 取消
		const onCancel = () => {
			closeDialog();
		};
		// 新增
		const onSubmit = () => {

      if (state.ruleForm.title ==""){
        ElMessage.error('请填写API标题');
        return
      }

      if (state.ruleForm.url ==""){
        ElMessage.error('请填写API路由');
        return
      }

      if (state.ruleForm.method ==""){
        ElMessage.error('请选择请求方式');
        return
      }
      useApi().addApi(state.ruleForm).then((res:any)=>{
        if (res.code == 200 ) {
          ElMessage.success(res.msg)
          //刷新列表数据
          closeDialog(); // 关闭弹窗
          window.location.reload();
        } else  {
          ElMessage.error(res.msg);
        }
      })
		};
		// 页面加载时
		onMounted(() => {
			// state.menuData = getMenuData(routesList.value);
		});
		return {
			openDialog,
			closeDialog,
			onCancel,
			onSubmit,
			...toRefs(state),
		};
	},
});
</script>
