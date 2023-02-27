<template>
	<div class="system-edit-role-container">
		<el-dialog title="修改角色" v-model="isShowDialog" width="769px">
			<el-form :model="roleForm" size="default" label-width="90px">
				<el-row :gutter="35">
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="角色名称">
							<el-input v-model="roleForm.name" placeholder="请输入角色名称" clearable></el-input>
						</el-form-item>
					</el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
            <el-form-item label="排序">
              <el-input-number v-model="roleForm.sort" :min="0" :max="999" controls-position="right" placeholder="请输入排序" class="w100" />
            </el-form-item>
          </el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="角色状态">
              <el-switch v-model="roleForm.status" :active-value="1" :inactive-value="2" inline-prompt active-text="启" inactive-text="禁" @click="OpenStatus(scope.row)"></el-switch>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="角色描述">
							<el-input v-model="roleForm.describe" type="textarea" placeholder="请输入角色描述" maxlength="150"></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="菜单权限">
							<el-tree :data="menuData"
                       :props="menuProps"
                       :default-checked-keys="roleForm.menu_ids"
                       node-key="id"
                       highlight-current
                       show-checkbox
                       class="menu-data-tree" />
						</el-form-item>
					</el-col>
				</el-row>
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
import {reactive, toRefs, defineComponent} from 'vue';
import { useRole} from "/@/api/role";
import {ElMessage} from "element-plus/es";
import {useMenuApi} from "/@/api/menu";
// 定义接口来定义对象的类型
interface MenuDataTree {
	id: number;
	label: string;
	children?: MenuDataTree[];
}

interface Role {
  id :number;
  name: string;
  sort: number;
  status: number;
  describe: string;
  menu_ids: any;
}
interface RoleState {
	isShowDialog: boolean;
  roleForm:Role;
	menuData: Array<MenuDataTree>;
	menuProps: {
		children: string;
		label: string;
	};
  menu_ids:any;
}

export default defineComponent({
	name: 'systemEditRole',
	setup() {
		const state = reactive<RoleState>({
			isShowDialog: false,
      roleForm: {
        id:0,//ID
        name: '', // 角色名称
        sort: 0, // 排序
        status: 2, // 角色状态
        describe: '', // 角色描述
        menu_ids:[],
      },
			menuData: [],
			menuProps: {
				children: 'children',
				label: 'label',
			},
      menu_ids:[],
		});
		// 打开弹窗
		const openDialog = (row: Role) => {
			state.roleForm = row;
      useRole().getRoleInfo({"id":state.roleForm.id}).then((res:any)=>{
        if ( res.code == 200 ) {
          state.roleForm = res.data
        }else {
          ElMessage.error(res.msg);
        }
      })
			state.isShowDialog = true;
			getMenuData();
		};
		// 关闭弹窗
		const closeDialog = () => {
			state.isShowDialog = false;
		};
		// 取消
		const onCancel = () => {
			closeDialog();
		};
		// 更新
		const onSubmit = () => {
      // state.roleForm.menu_ids.getCheckedNodes(false, true)
      // console.log(state.roleForm)

      useRole().UpdateRole(state.roleForm).then((res:any)=>{
        if ( res.code == 200 ) {
          ElMessage.success(res.msg);
          closeDialog();
        }else {
          ElMessage.error(res.msg);
        }
      })
		};
		// 获取菜单结构数据
		const getMenuData = () => {
      useMenuApi().getMenuAll().then((res:any)=>{
        if ( res.code == 200 ) {
          state.menuData = res.data
        }
      })
			// state.menuData = [
			// 	{
			// 		id: 1,
			// 		label: '系统管理',
			// 		children: [
			// 			{
			// 				id: 11,
			// 				label: '菜单管理',
			// 				children: [
			// 					{
			// 						id: 111,
			// 						label: '菜单新增',
			// 					},
			// 					{
			// 						id: 112,
			// 						label: '菜单修改',
			// 					},
			// 					{
			// 						id: 113,
			// 						label: '菜单删除',
			// 					},
			// 					{
			// 						id: 114,
			// 						label: '菜单查询',
			// 					},
			// 				],
			// 			},
			// 			{
			// 				id: 12,
			// 				label: '角色管理',
			// 				children: [
			// 					{
			// 						id: 121,
			// 						label: '角色新增',
			// 					},
			// 					{
			// 						id: 122,
			// 						label: '角色修改',
			// 					},
			// 					{
			// 						id: 123,
			// 						label: '角色删除',
			// 					},
			// 					{
			// 						id: 124,
			// 						label: '角色查询',
			// 					},
			// 				],
			// 			},
			// 			{
			// 				id: 13,
			// 				label: '用户管理',
			// 				children: [
			// 					{
			// 						id: 131,
			// 						label: '用户新增',
			// 					},
			// 					{
			// 						id: 132,
			// 						label: '用户修改',
			// 					},
			// 					{
			// 						id: 133,
			// 						label: '用户删除',
			// 					},
			// 					{
			// 						id: 134,
			// 						label: '用户查询',
			// 					},
			// 				],
			// 			},
			// 		],
			// 	},
			// 	{
			// 		id: 2,
			// 		label: '权限管理',
			// 		children: [
			// 			{
			// 				id: 21,
			// 				label: '前端控制',
			// 				children: [
			// 					{
			// 						id: 211,
			// 						label: '页面权限',
			// 					},
			// 					{
			// 						id: 212,
			// 						label: '页面权限',
			// 					},
			// 				],
			// 			},
			// 			{
			// 				id: 22,
			// 				label: '后端控制',
			// 				children: [
			// 					{
			// 						id: 221,
			// 						label: '页面权限',
			// 					},
			// 				],
			// 			},
			// 		],
			// 	},
			// ];
		};

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

<style scoped lang="scss">
.system-edit-role-container {
	.menu-data-tree {
		width: 100%;
		border: 1px solid var(--el-border-color);
		border-radius: var(--el-input-border-radius, var(--el-border-radius-base));
		padding: 5px;
	}
}
</style>
