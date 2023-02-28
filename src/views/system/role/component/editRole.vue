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
							<el-tree  ref="treeRef"
                       :data="menuData"
                       :props="menuProps"
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
					<el-button @click="getCheckedKeys" size="default">取 消</el-button>
					<el-button type="primary" @click="onSubmit" size="default">修 改</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>


<script lang="ts">
import {reactive, toRefs, defineComponent,ref} from 'vue';
import { ElTree } from 'element-plus'
import { useRole} from "/@/api/role";
import {ElMessage} from "element-plus/es";
// import {useMenuApi} from "/@/api/menu";

const treeRef = ref<InstanceType<typeof ElTree>>()
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
      // eslint-disable-next-line no-console
      // console.log(treeRef.value?.getCheckedKeys(false))
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
      state.menuData = [
        {
          id: 1,
          label: 'Level one 1',
          children: [
            {
              id: 4,
              label: 'Level two 1-1',
              children: [
                {
                  id: 9,
                  label: 'Level three 1-1-1',
                },
                {
                  id: 10,
                  label: 'Level three 1-1-2',
                },
              ],
            },
          ],
        },
        {
          id: 2,
          label: 'Level one 2',
          children: [
            {
              id: 5,
              label: 'Level two 2-1',
            },
            {
              id: 6,
              label: 'Level two 2-2',
            },
          ],
        },
        {
          id: 3,
          label: 'Level one 3',
          children: [
            {
              id: 7,
              label: 'Level two 3-1',
            },
            {
              id: 8,
              label: 'Level two 3-2',
            },
          ],
        },
      ]


      // useMenuApi().getMenuAll().then((res:any)=>{
      //   if ( res.code == 200 ) {
      //     state.menuData = res.data
      //   }
      // })
		};
    const getCheckedKeys = () => {
      console.log(treeRef.value.getCheckedKeys(false))
    }
		return {
			openDialog,
			closeDialog,
			onCancel,
			onSubmit,
      getCheckedKeys,
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
