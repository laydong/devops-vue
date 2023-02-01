<template>
	<div class="system-menu-container">
		<el-card shadow="hover">
			<div class="system-menu-search mb15">
				<el-input size="default" placeholder="请输入API名称" style="max-width: 180px"> </el-input>
				<el-button size="default" type="primary" class="ml10">
					<el-icon>
						<ele-Search />
					</el-icon>
					查询
				</el-button>
				<el-button size="default" type="success" class="ml10" @click="onOpenAddMenu">
					<el-icon>
						<ele-FolderAdd />
					</el-icon>
					新增API
				</el-button>
			</div>
			<el-table :data="menuTableData" style="width: 100%" row-key="path" :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
				<el-table-column label="API名称" show-overflow-tooltip>
					<template #default="scope">
<!--						<SvgIcon :name="scope.row.meta.icon" />-->
						<span class="ml10">{{ $t(scope.row.title) }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="path" label="路由路径" show-overflow-tooltip>
          <template #default="scope">
            <span>{{ scope.row.url }}</span>
          </template>
        </el-table-column>
				<el-table-column label="请求方式" show-overflow-tooltip>
					<template #default="scope">
						<span>{{ scope.row.method }}</span>
					</template>
				</el-table-column>
				<el-table-column label="是否鉴权" show-overflow-tooltip>
          <template #default="scope">
            <el-tag type="success" v-if="scope.row.hidden == 1">鉴权</el-tag>
            <el-tag type="info" v-else>不鉴权</el-tag>
          </template>
				</el-table-column>
        <el-table-column label="鉴权类型" show-overflow-tooltip>
          <template #default="scope">
            <el-tag type="success" v-if="scope.row.type == 1">角色鉴权</el-tag>
            <el-tag type="info" v-else>登录鉴权</el-tag>
          </template>
        </el-table-column>
				<el-table-column label="排序" show-overflow-tooltip width="80">
					<template #default="scope">
						{{ scope.row.sort }}
					</template>
				</el-table-column>

        <el-table-column label="状态" show-overflow-tooltip>
          <template #default="scope">
            <el-switch v-model="scope.row.value" active-value=1 inactive-value=2></el-switch>
          </template>
        </el-table-column>
				<el-table-column label="更新时间" show-overflow-tooltip>
					<template #default="scope">
						{{ scope.row.updated_at }}
					</template>
				</el-table-column>
				<el-table-column label="操作" show-overflow-tooltip width="140">
					<template #default="scope">
<!--						<el-button size="small" text type="primary" @click="onOpenAddMenu">新增</el-button>-->
						<el-button size="small" text type="primary" @click="onOpenEditApi(scope.row)">修改</el-button>
						<el-button size="small" text type="primary" @click="onTabelRowDel(scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
		<AddMenu ref="addMenuRef" />
		<EditMenu ref="editMenuRef" />
	</div>
</template>

<script lang="ts">
import { ref, toRefs, reactive, computed, defineComponent } from 'vue';
import { RouteRecordRaw } from 'vue-router';
import { ElMessageBox, ElMessage } from 'element-plus';
import AddMenu from '/@/views/system/api/component/addApi.vue';
import EditMenu from '/@/views/system/api/component/editApi.vue';
import {useLoginApi} from "/@/api/api";

interface TableData {
  id :number;
  title: string;
  hidden: number;
  type:number;
  url: string;
  method: string;
  sort: number;
  status:number;
  value:boolean;
  remark:string;
  created_at:string;
  updated_at:string;
}

interface TableDataState {
  tableData: {
    data: Array<TableData>;
    total: number;
    loading: boolean;
    param: {
      pageNum: number;
      pageSize: number;
    };
  };
}
export default defineComponent({
	name: 'systemApi',
	components: { AddMenu, EditMenu },
	setup() {
		// const stores = useRoutesList();
		// const { routesList } = storeToRefs(stores);
		const addMenuRef = ref();
		const editMenuRef = ref();
    const state = reactive<TableDataState>({
      tableData: {
        data: [],
        total: 0,
        loading: false,
        param: {
          pageNum: 1,
          pageSize: 10,
        },
      },
    });
    const data: Array<TableData> = [];
		// 获取 API数据
    var params = [
      {
        page:state.tableData.param.pageNum,
        per_page:state.tableData.param.pageSize,
        name:'',
        status:0,
      }
    ]
    useLoginApi().listApi(params).then((res)=>{
      if (res.code == 200 ) {
        res.data.data.forEach((item) => {
          return data.push({
            id: item.id,
            title: item.title,
            hidden: item.hidden,
            type: item.type,
            url: item.url,
            method: item.method,
            sort: item.sort,
            status: item.status,
            value: item.status == 1 ? true: false,
            remark: item.remark,
            created_at: item.created_at,
            updated_at: item.updated_at
          });
        })
        state.tableData.data = data;
        state.tableData.total = state.tableData.data.length;
      }
    })

		const menuTableData = computed(() => {
			return state.tableData.data;
		});
		// 打开新增菜单弹窗
		const onOpenAddMenu = () => {
			addMenuRef.value.openDialog();
		};
		// 打开编辑菜单弹窗
		const onOpenEditApi = (row: RouteRecordRaw) => {
			editMenuRef.value.openDialog(row);
		};
		// 删除当前行
		const onTabelRowDel = (row: RouteRecordRaw) => {
			ElMessageBox.confirm(`此操作将永久删除路由：${row.path}, 是否继续?`, '提示', {
				confirmButtonText: '删除',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					ElMessage.success('删除成功');
				})
				.catch(() => {});
		};
		return {
			addMenuRef,
			editMenuRef,
			onOpenAddMenu,
      onOpenEditApi,
			menuTableData,
			onTabelRowDel,
			...toRefs(state),
		};
	},
});
</script>
