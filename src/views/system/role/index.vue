<template>
	<div class="system-role-container">
		<el-card shadow="hover">
			<div class="system-user-search mb15">
				<el-input type="text" size="default" placeholder="请输入角色名称" style="max-width: 180px"> </el-input>
				<el-button size="default" type="primary" class="ml10">
					<el-icon>
						<ele-Search />
					</el-icon>
					查询
				</el-button>
				<el-button size="default" type="success" class="ml10" @click="onOpenAddRole">
					<el-icon>
						<ele-FolderAdd />
					</el-icon>
					新增角色
				</el-button>
			</div>
			<el-table :data="tableData.data" style="width: 100%">
				<el-table-column prop="id" label="序号" width="60" />
				<el-table-column prop="name" label="角色名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="isAdmin" label="是否超管" show-overflow-tooltip>
          <template #default="scope">
            <el-tag type="success" v-if="scope.row.isAdmin == 1">是</el-tag>
            <el-tag type="info" v-else>否</el-tag>
          </template>
        </el-table-column>
				<el-table-column prop="status" label="角色状态" show-overflow-tooltip>
          <template #default="scope">
            <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="2" inline-prompt active-text="启" inactive-text="禁" @click="OpenStatus(scope.row)"></el-switch>
          </template>
				</el-table-column>
        <el-table-column prop="sort" label="排序" show-overflow-tooltip></el-table-column>
				<el-table-column prop="describe" label="角色描述" show-overflow-tooltip></el-table-column>
				<el-table-column prop="createTime" label="创建时间" show-overflow-tooltip></el-table-column>
				<el-table-column label="操作" width="100">
					<template #default="scope">
						<el-button :disabled="scope.row.id === 1" size="small" text type="primary" @click="onOpenEditRole(scope.row)"
							>修改</el-button
						>
						<el-button :disabled="scope.row.id === 1" size="small" text type="primary" @click="onRowDel(scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination
				@size-change="onHandleSizeChange"
				@current-change="onHandleCurrentChange"
				class="mt15"
				:pager-count="5"
				:page-sizes="[10, 20, 30]"
				v-model:current-page="tableData.param.page"
				background
				v-model:page-size="tableData.param.per_page"
				layout="total, sizes, prev, pager, next, jumper"
				:total="tableData.total"
			>
			</el-pagination>
		</el-card>
		<AddRole ref="addRoleRef" />
		<EditRole ref="editRoleRef" />
	</div>
</template>

<script lang="ts">
import { toRefs, reactive, onMounted, ref, defineComponent } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import AddRole from '/@/views/system/role/component/addRole.vue';
import EditRole from '/@/views/system/role/component/editRole.vue';
import {useRole} from "/@/api/role";

// 定义接口来定义对象的类型
interface TableData {
  id :number;
	name: string;
	// roleSign: string;
	describe: string;
  isAdmin:number;
	sort: number;
	status: number;
	createTime: string;
}
interface TableDataState {
	tableData: {
		data: Array<TableData>;
		total: number;
		loading: boolean;
		param: {
      page: number;
      per_page: number;
      name:string;
      status:number;
		};
	};
}

export default defineComponent({
	name: 'systemRole',
	components: { AddRole, EditRole },
	setup() {
		const addRoleRef = ref();
		const editRoleRef = ref();
		const state = reactive<TableDataState>({
			tableData: {
				data: [],
				total: 0,
				loading: false,
				param: {
          page: 1,
          per_page: 10,
          name:'',
          status:0,
				},
			},
		});
		// 初始化表格数据
		const initTableData = () => {
			const data: Array<TableData> = [];
      useRole().getRoleList(state.tableData.param).then((res:any)=>{
        if (res.code == 200 ) {
          res.data.data.forEach((v:any) => {
            return data.push({
              id: v.id,
              name: v.name,
              sort: v.sort,
              describe: v.describe,
              isAdmin: v.is_admin,
              status: v.status,
              createTime: v.created_at,
            });
          })
          state.tableData.data = data;
          state.tableData.total = state.tableData.data.length;
        }
      })
		};

    const OpenStatus = (row:any) =>{
      useRole().UpdateRole(row).then((res:any)=>{
        if (res.code == 200 ) {
          if (row.status == 1){
            row.status = 2
          }else {
            row.status = 1
          }
        }
      })
    }
		// 打开新增角色弹窗
		const onOpenAddRole = () => {
			addRoleRef.value.openDialog();
		};
		// 打开修改角色弹窗
		const onOpenEditRole = (row: Object) => {
			editRoleRef.value.openDialog(row);
		};
		// 删除角色
		const onRowDel = (row: any) => {
			ElMessageBox.confirm(`此操作将永久删除角色名称：“${row.roleName}”，是否继续?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					ElMessage.success('删除成功');
				})
				.catch(() => {});
		};
		// 分页改变
		const onHandleSizeChange = (val: number) => {
			state.tableData.param.per_page = val;
		};
		// 分页改变
		const onHandleCurrentChange = (val: number) => {
			state.tableData.param.page = val;
		};
		// 页面加载时
		onMounted(() => {
			initTableData();
		});
		return {
			addRoleRef,
			editRoleRef,
      OpenStatus,
			onOpenAddRole,
			onOpenEditRole,
			onRowDel,
			onHandleSizeChange,
			onHandleCurrentChange,
			...toRefs(state),
		};
	},
});
</script>
