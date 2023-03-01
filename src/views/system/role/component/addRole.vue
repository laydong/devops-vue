<template>
	<div class="system-add-role-container">
		<el-dialog title="新增角色" v-model="isShowDialog" width="769px">
			<el-form :model="ruleForm" size="default" label-width="90px">
				<el-row :gutter="35">
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="角色名称">
							<el-input v-model="ruleForm.name" placeholder="请输入角色名称" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="排序">
							<el-input-number v-model="ruleForm.sort" :min="0" :max="999" controls-position="right" placeholder="请输入排序" class="w100" />
						</el-form-item>
					</el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
            <el-form-item label="角色状态">
              <el-switch v-model="ruleForm.status" :active-value="1" :inactive-value="2" inline-prompt active-text="启" inactive-text="禁"></el-switch>
            </el-form-item>
          </el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="角色描述">
							<el-input v-model="ruleForm.describe" type="textarea" placeholder="请输入角色描述" maxlength="150"></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="菜单权限">
							<el-tree ref="treeRef" :data="menuData" :props="menuProps"  node-key="id" show-checkbox class="menu-data-tree" />
						</el-form-item>
					</el-col>
				</el-row>
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
import {reactive, toRefs, defineComponent, onMounted, ref} from 'vue';
import {useMenuApi} from "/@/api/menu";
import {ElMessage, ElTree} from "element-plus/es";
import {useRole} from "/@/api/role";

// 定义接口来定义对象的类型
interface MenuDataTree {
	id: number;
	label: string;
	children?: MenuDataTree[];
}
interface RoleState {
	isShowDialog: boolean;
	ruleForm: {
    name: string;
    sort: number;
    status: number;
    describe: string;
    menu_ids: any;
	};
	menuData: Array<MenuDataTree>;
	menuProps: {
		children: string;
		label: string;
	};
}

export default defineComponent({
	name: 'systemAddRole',
	setup() {
    const treeRef = ref<InstanceType<typeof ElTree>>()
		const state = reactive<RoleState>({
			isShowDialog: false,
			ruleForm: {
				name: '', // 角色名称
				sort: 0, // 排序
				status: 1, // 角色状态
				describe: '', // 角色描述
        menu_ids:[],
			},
			menuData: [],
			menuProps: {
				children: 'children',
				label: 'label',
			},
		});
		// 打开弹窗
		const openDialog = () => {
			state.isShowDialog = true;
			// getMenuData();
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
      state.ruleForm.menu_ids = treeRef.value!.getCheckedKeys(false)
      useRole().CreateRole(state.ruleForm).then((res:any)=>{
        if ( res.code == 200 ) {
          ElMessage.success(res.msg);
          closeDialog();
        }else {
          ElMessage.error(res.msg);
        }
      })
			closeDialog();
		};
		// 获取菜单结构数据
		const getMenuData = () => {
      useMenuApi().getMenuAll().then((res:any)=>{
        if ( res.code == 200 ) {
          state.menuData = res.data
        }
      })
		};
    // 页面加载时
    onMounted(() => {
      getMenuData();
    });
		return {
      treeRef,
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
.system-add-role-container {
	.menu-data-tree {
		width: 100%;
		border: 1px solid var(--el-border-color);
		border-radius: var(--el-input-border-radius, var(--el-border-radius-base));
		padding: 5px;
	}
}
</style>
