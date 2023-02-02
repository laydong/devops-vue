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
				<el-button size="default" type="success" class="ml10" @click="onOpenAddApi">
					<el-icon>
						<ele-FolderAdd />
					</el-icon>
					新增API
				</el-button>
			</div>
			<el-table :data="apiTableData" style="width: 100%" row-key="path" :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
				<el-table-column label="API名称" show-overflow-tooltip>
					<template #default="scope">
						<span class="ml10">{{ $t(scope.row.title) }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="url" label="路由路径" show-overflow-tooltip>
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
            <el-switch v-model="scope.row.hidden" :active-value="1" :inactive-value="2" inline-prompt active-text="是" inactive-text="否" @click="OpenHidden(scope.row)"></el-switch>
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
            <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="2" inline-prompt active-text="启" inactive-text="禁" @click="OpenStatus(scope.row)"></el-switch>
          </template>
        </el-table-column>
				<el-table-column label="更新时间" show-overflow-tooltip>
					<template #default="scope">
						{{ scope.row.updated_at }}
					</template>
				</el-table-column>
				<el-table-column label="操作" show-overflow-tooltip width="140">
					<template #default="scope">
						<el-button size="small" text type="primary" @click="onOpenEditApi(scope.row)">修改</el-button>
						<el-button size="small" text type="primary" @click="onTabelRowDel(scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
      <el-pagination
          @size-change="onHandleSizeChange"
          @current-change="onHandleCurrentChange"
          class="mt15"
          :pager-count="tableData.total"
          :page-sizes="[10, 20, 30]"
          v-model:current-page="tableData.param.page"
          background
          v-model:page-size="tableData.param.per_page"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.total"
      >
      </el-pagination>
		</el-card>
		<AddAPI ref="addAPIRef" />
		<EditAPI ref="editAPIRef" />
	</div>
</template>

<script lang="ts">
import {ref, toRefs, reactive, computed, defineComponent, onMounted} from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import AddAPI from '/@/views/system/api/component/addApi.vue';
import EditAPI from '/@/views/system/api/component/editApi.vue';
import {useApi} from "/@/api/api";

interface TableData {
  id :number;
  title: string;
  hidden: number;
  type:number;
  url: string;
  method: string;
  sort: number;
  status:number;
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
      page: number;
      per_page: number;
      name:string;
      status:number;
    };
  };
}

export default defineComponent({
	name: 'systemApi',
	components: { AddAPI, EditAPI },
	setup() {
		const addAPIRef = ref();
		const editAPIRef = ref();
    const state = reactive<TableDataState>({
      tableData: {
        data: [],
        total: 0,
        loading: false,
        param: {
          page: 1,
          per_page: 10,
          name:'',
          status:1,
        },
      },
    });

    //刷新获取列表数据
    const getTableData  = () => {
      // 获取 API数据
      useApi().listApi(state.tableData.param).then((res:any)=>{
        if (res.code == 200 ) {
          const data: Array<TableData> = [];
          res.data.data.forEach((item:any) => {
            return data.push({
              id: item.id,
              title: item.title,
              hidden: item.hidden,
              type: item.type,
              url: item.url,
              method: item.method,
              sort: item.sort,
              status: item.status,
              remark: item.remark,
              created_at: item.created_at,
              updated_at: item.updated_at
            });
          })
          state.tableData.data = data;
          state.tableData.total = state.tableData.data.length;
        }
      })
    };

    //更新鉴权状态
    const OpenHidden = (row: any) =>{
      useApi().updateApi(row).then((res :any)=>{
        if (res.code != 200 ) {
          if (row.hidden == 1){
            row.hidden = 2
          }else {
            row.hidden = 1
          }
        }
      })
    }

    //更新状态
    const OpenStatus = (row: any) =>{
      useApi().updateApi(row).then((res :any)=>{
        if (res.code != 200 ) {
          if (row.status == 1){
            row.status = 2
          }else {
            row.status = 1
          }
        }
      })
    }

		const apiTableData = computed(() => {
			return state.tableData.data;
		});
		// 打开新增菜单弹窗
		const onOpenAddApi = () => {
			addAPIRef.value.openDialog();
		};
		// 打开编辑菜单弹窗
		const onOpenEditApi = (row: any) => {
      editAPIRef.value.openDialog(row);
		};
		// 删除当前行
		const onTabelRowDel = (row: any) => {
			ElMessageBox.confirm(`此操作将永久删除路由：${row.url}, 是否继续?`, '提示', {
				confirmButtonText: '删除',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
          useApi().delApi({"id":row.id}).then((res :any)=>{
            if (res.code == 200 ) {
              ElMessage.success('删除成功');
              //刷新列表数据
              getTableData()
            } else {
              ElMessage.error('删除失败');
            }
          })
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
      getTableData()
    });
		return {
      addAPIRef,
      editAPIRef,
      OpenHidden,
      OpenStatus,
			onOpenAddApi,
      onOpenEditApi,
      onHandleSizeChange,
      onHandleCurrentChange,
      apiTableData,
			onTabelRowDel,
			...toRefs(state),
		};
	},
});
</script>
