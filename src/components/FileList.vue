<template>
  <div id="file_list">
    <wlExplorer
      ref="wl-explorer-cpt"
      :header-dropdown="headerHandle"
      :upload-options="uploadOptions"
      :columns="file_table_columns"
      :all-path="all_folder_list"
      :is-folder-fn="isFolderFn"
      :folderType="rource_type"
      :data="file_table_data"
      :props="explorer_prop"
      size="small"
      @handleFolder="handleFolder"
      @upload="fileUpload"
      @download="download"
      @search="fileSearch"
      @del="fileDel"
      @preview="handleFileView"
      @move="fileMove"
      @closeFade="closeOtherLayout(fade)"
    >
      <!-- 操作文件夹滑入区 -->
      <fadeIn v-show="fade.folder">
        <h3 class="edit-header">
          <p>{{ buttonLabel }}文件夹</p>
        </h3>
        <el-scrollbar class="scroll">
          <el-form
            size="medium"
            ref="folder_form"
            label-position="top"
            :model="folder_form"
            :rules="folder_rules"
            class="folder_form rule-form"
            @keyup.enter.native="submitFolderFrom('folder_form')"
          >
            <el-form-item label="文件路径" prop="parent_id">
              <wlTreeSelect
                class="u-full"
                @change="onChange"
                :props="tree_select_prop"
                size="small"
                :data="tree_folder_list"
                v-model="folder_form.selectedTree"
              ></wlTreeSelect>
            </el-form-item>
            <el-form-item label="文件夹名称 " prop="path_name">
              <el-input v-model="folder_form.path_name" placeholder="请输入文件夹名称"></el-input>
            </el-form-item>
          </el-form>
        </el-scrollbar>
        <div class="submit-btn-box">
          <submit-btn @btn="submitFolderFrom('folder_form')" :status="load.folder"></submit-btn>
          <el-button size="medium" @click="fade.folder = false">取消</el-button>
        </div>
      </fadeIn>
    </wlExplorer>
  </div>
</template>

<script>
import wlExplorer from '../pages/WlExplorer/index.vue'
import { fileApi } from '../router/api.js'
import fadeIn from '@/components/fade-in' // 导入文件管理器
import submitBtn from '@/components/submit-btn' // 导入防抖提交组件
import wlTreeSelect from '@/components/wl-tree/' // 树形下拉
// import wlVueSelect from '@/components/wl-vue-select' // 下拉
import { closeOtherLayout, arrayToTree } from '@/util' // 导入关闭其他弹出类视图函数
import sha1 from 'js-sha1'

export default {
  name: 'app',
  components: {
    fadeIn,
    submitBtn,
    wlExplorer,
    wlTreeSelect
    // wlVueSelect
  },
  data () {
    const _GB = 1024 * 1024 * 1024
    const _MB = 1024 * 1024
    const _KB = 1024
    // const vm = this;
    return {
      uploadType: 1,
      pathId: 0, // pathid = 0 代表根目录
      uploadUrl: fileApi.uploadFileApi,
      load: {
        folder: false
      }, // loading管理
      fade: {
        folder: false
      }, // 弹出类视图管理
      headerHandle: [{ name: '权限', command: 'auth' }], // 头部按钮更多操作-自定义权限
      file_table_columns: [
        {
          label: '名称',
          prop: 'file_name',
          minWidth: 120
        },
        {
          label: '修改日期',
          align: 'center',
          prop: 'update_datetime',
          width: 120,
          formatter (row) {
            return row.update_datetime.split('T')[0] || '-'
          }
        },
        {
          label: '类型',
          align: 'center',
          width: 90,
          prop: 'type',
          formatter (row) {
            switch (row.type) {
              case 0:
                return '自建文件'
              case 1:
                return '文件夹'
              case 2:
                return '图像'
              case 3:
                return '视频'
              case 4:
                return '其他'
            }
          }
        },
        {
          label: '大小',
          minWidth: 90,
          align: 'center',
          prop: 'size',
          formatter (row) {
            if (row.type === 1) {
              row.size = null
            }
            if (row.size === null) return '-'
            if (row.size < _KB) {
              // 1024以下显示kb
              return row.size + 'B'
            }
            if (row.size < _MB) {
              // 1024*1024
              const _kb = (row.size / _KB).toFixed(2)
              return parseFloat(_kb) + 'KB'
            }
            if (row.size < _GB) {
              // 1024*1024
              const _mb = (row.size / _MB).toFixed(2)
              return parseFloat(_mb) + 'MB'
            }
            const _gb = (row.size / _GB).toFixed(2)
            return parseFloat(_gb) + 'GB'
          }
        },
        {
          label: '创建日期',
          align: 'center',
          prop: 'add_datetime',
          width: 120,
          formatter (row) {
            return row.add_datetime.split('T')[0] || '-'
          }
        }
      ], // 自定义表格列
      file_table_data: [], // 表格数据
      all_folder_list: [], // 所有文件夹列表
      tree_folder_list: [], // 树形文件夹列表
      type: {
        virtual: 0,
        folder: 1,
        img: 2,
        video: 3,
        other: 4,
        pdf: 5
      }, // 文件类型
      rource_type: {
        self: 1 // 自建
      }, // 数据来源类型
      explorer_prop: {
        name: 'file_name',
        match: 'Name',
        splic: true,
        suffix: 'SuffixName',
        pathId: 'id',
        pathPid: 'parent_id',
        pathName: 'path_name',
        pathChildren: 'Children', // String 路径数据 children字段
        pathConnector: '\\', // String 路径父子数据拼接连接符,默认为'\'
        pathParents: 'Parents', // String 路径数据所有直系祖先节点自增长identityId逗号拼接
        pathIdentityId: 'IdentityId' // String 路径数据自增长id
      }, // 文件管理器配置项
      path: {}, // 路径数据
      folder_form: {
        selectedTree: '',
        path_name: '',
        path_id: 0,
        preview: [],
        handle: [],
        Describe: ''
      }, // 文件夹表单
      folder_rules: {
        path_name: [{ required: true, message: '请填写文件夹名称', trigger: 'blur' }]
      }, // 文件夹表单验证
      child_act_saved: {}, // 存储子组件数据，用于编辑更新
      tree_select_prop: {
        label: 'path_name',
        value: 'id',
        children: 'Children'
      }, // 树形下拉框配置项
      uploadOptions: {
        uid: this.$store.getters.getUid
      } // 上传文件附加参数
    }
  },
  methods: {
    handleFileView (row, showFuc) {
      // 判断类型
      if (![2, 3, 5].includes(row.type)) {
        this.$message.error('该文件不支持打开')
      }

      if (row.type === 2) {
        this.$refs['wl-explorer-cpt'].previewType = 'img'
      } else if (row.type === 3) {
        this.$refs['wl-explorer-cpt'].previewType = 'video'
      } else if (row.type === 5) {
        this.$refs['wl-explorer-cpt'].previewType = 'iframe'
      }

      showFuc()
    },
    /**
       * @name 上传文件提交操作
       */
    fileUpload (file, cb) {
      this.uploadOptions.path_id = this.pathId
      var fileList = this.$refs['wl-explorer-cpt'].$data.fileList

      fileList
        .filter(file => file.status === 'ready')
        .forEach(file => {
          var lastFile = fadeIn
          if (fileList[fileList.length - 1] == file) {
            lastFile = true
          }
          this.uploadSingleFile(file, lastFile)
        })
    },
    uploadSingleFile (file, lastFile) {
      var _this = this
      var reader = new FileReader()
      reader.onload = function (event) {
        var fileSha1 = sha1(event.target.result)

        _this.doUpload(_this, file, fileSha1, lastFile)
      }
      reader.readAsArrayBuffer(file.raw)
    },
    doUpload (_this, file, fileSha1, lastFile) {
      var formData = new FormData()

      // formData.append(...this.uploadOptions)
      for (var it in _this.uploadOptions) {
        if (_this.uploadOptions[it] !== undefined) {
          formData.append(it, _this.uploadOptions[it])
        }
      }

      if (this.uploadType === 0) {
        formData.append('file', file.raw)
        _this.$up_load(fileApi.uploadFileApi, formData).then(
          res => {
            if (lastFile) {
              this.$message.success(res.msg)
            }
          }
        )
      } else {
        formData.append('file_name', file.name)
        formData.append('file_sha1', fileSha1)
        formData.append('file_size', file.size)
        _this.$up_load(fileApi.getUploadToken, formData).then(
          res => {
            if (res.data.is_upload === true) {
              this.$message.success('上传成功')
              this.onFileUploadSuccess(file)
              if (lastFile) {
                this.getFileList()
              }
            } else {
              // 这里是sso直传逻
              var formParam = formData = new FormData()
              var fileExtension = file.name.split('.').pop().toLowerCase()
              formParam.append('key', res.data.token.dir + '/' + fileSha1 + '.' + fileExtension)
              formParam.append('policy', res.data.token.policy)
              formParam.append('OSSAccessKeyId', res.data.token.access_id)
              formParam.append('success_action_status', 201)
              formParam.append('callback', res.data.token.callback)
              formParam.append('Signature', res.data.token.signature)
              formParam.append('dir', res.data.token.dir)
              formData.append('file', file.raw)

              _this.$up_load_to_oss(res.data.token.host, formParam, formData).then(res => {
                if (res.data.new_id > 0) {
                  this.onFileUploadSuccess(file)
                  this.$message.success(file.name + ' upload success !')
                  if (lastFile) {
                    // 刷新页面
                    this.getFileList()
                  }
                }
              })
            }
          }

        )
      }
    },
    download (data, func) {
      console.log(data, func)
    },
    onChange (val) {
      if (val[0] === undefined) {
        this.folder_form.parent_id = 0
      } else {
        this.folder_form.parent_id = val[0].id
      }
    },
    /**
   *
   * 根据关键词搜索文件
   * file: Object 文件属性
   * update: Boolean 数据是否需要更新（不需要表示已存在）
   */
    fileSearch (file, update) {
      if (update) {
        this.path = file
        this.getFileList()
      }
    },
    // 获取文件列表
    getFileList () {
      this.$get(fileApi.getFileListApi, {
        uid: this.$store.getters.getUid,
        path_id: this.path.id,
        search_key: this.path.key
      })
        .then(res => {
          this.pathId = res.data.path_id
          this.file_table_data = res.data.file_list

          this.$get(fileApi.getChildPathList, {
            uid: this.$store.getters.getUid,
            parent_id: this.path.id,
            search_key: this.path.key
          }).then(
            res => {
              var pathList = res.data.path_list
              // 把path作为一种file插入
              for (const it in pathList) {
                pathList[it].file_name = pathList[it].path_name
                pathList[it].path_id = pathList[it].parent_id
                pathList[it].type = this.type.folder

                this.file_table_data.push(pathList[it])
              }
            }
          )
        })
    },
    /**
   * 编辑文件夹
   * act:Object 当前选中文件夹
   * type:String 操作类型 add添加edit编辑
   * file:Object 当前路径信息
   */
    handleFolder (act, type, file) {
      this.path = file

      // 显示表单
      this.fade.folder = true

      if (type === 'add') {
        this.$refs.folder_form.resetFields()
        this.folder_form.path_id = 0
        this.folder_form.path_name = ''
        this.folder_form.parent_id = file.id
        return
      } else {
        this.folder_form.path_id = act.id
        this.folder_form.path_name = act.path_name
        this.folder_form.parent_id = file.parent_id
      }

      this.child_act_saved = act
    // this.folder_form = { ...act }
    },
    // 提交文件夹表单
    submitFolderFrom (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.load.folder = true
          setTimeout(() => {
            this.load.folder = false
            // let res_data = data.Data;
            var data = {
              uid: this.$store.getters.getUid,
              path_name: this.folder_form.path_name,
              parent_id: this.folder_form.parent_id ? this.folder_form.parent_id : 0,
              path_id: this.folder_form.path_id
            }
            this.$post(fileApi.saveUserPathApi, data).then(res => {
              var newFolderData = res.data
              if (newFolderData.id) {
                // 刷新
                this.getFileList()
                this.getAllFolders()
              } else {
                // 编辑
                this.child_act_saved.path_name = newFolderData.path_name
              }
            }
            )
            this.fade.folder = false
          }, 1000)
        } else {
          return false
        }
      })
    },
    // 删除文件
    fileDel (data) {
      const cannot_del_data = [] // 收集不可删除数据
      const normal_data_file = [] // 收集可删除文件
      const normal_data_folder = [] // 收集可删除文件夹
      data.forEach(i => {
        i.type === this.type.virtual
          ? cannot_del_data.push(i) // 不可删除数据
          : i.type === this.type.folder
            ? normal_data_folder.push(i.id) // 可删除文件夹
            : normal_data_file.push(i.id) // 可删除文件
      })
      // 不可删除数据进行提示
      if (cannot_del_data.length > 0) {
        let _msg = '<p class="title">以下文件或文件夹不可删除，已自动过滤</p>'
        cannot_del_data.forEach(i => {
          _msg += `<p class="msg">${i.Name}</p>`
        })
        this.$message({
          dangerouslyUseHTMLString: true,
          showClose: true,
          message: _msg,
          type: 'warning',
          customClass: 'mulit-msg'
        })
      }
      if (normal_data_folder.length === 0 && normal_data_file.length === 0) {
        return
      }
      // 可删除数据正常删除
      const _data = {
        FolderIds: normal_data_folder,
        FolderFileIds: normal_data_file
      }

      // 批量删除用户文件
      if (_data.FolderIds.length > 0) {
        this.$post(fileApi.delUserPathApi, {
          id_map: _data.FolderIds,
          uid: this.$store.getters.getUid
        }).then(res => {
          this.$message.success(res.msg)
        })
      }

      // 批量删除用户文件
      if (_data.FolderFileIds.length > 0) {
        this.$post(fileApi.delUserFileApi, {
          id_map: _data.FolderFileIds,
          uid: this.$store.getters.getUid
        }).then(res => {
          this.$message.success(res.msg)
        })
      }

      setTimeout(function () {
        this.getFileList()
        this.getAllFolders()
      }, 3000)
    },
    // 获取所有文件夹
    getAllFolders () {
      console.log(this.$store.getters.getUserInfo)
      console.log(this.$store.getters.getUid)
      this.$get(fileApi.getPathListApi, { uid: this.$store.getters.getUid }).then(res => {
        this.all_folder_list = res.data.path_list || []
        const _list = [...this.all_folder_list]
        const options = {
          id: this.explorer_prop.pathId,
          pid: this.explorer_prop.pathPid,
          children: 'Children'
        }
        this.tree_folder_list = arrayToTree(_list, options)
      })
    },
    // 判断是否文件夹函数
    isFolderFn (row) {
      return row.type === this.type.folder
    },
    fileMove (targetFolderInfo, fileCheckedList, move) {
    // 第一步

      var parentId = targetFolderInfo.id
      var moveFolderList = []
      var moveFileList = []
      for (const it in fileCheckedList) {
      // 如果是不可移动的文件夹
        if (fileCheckedList[it].type === this.type.virtual) {
          continue
        }

        // todo 验证 ，不能让自己移动到自己的子文件目录
        if (fileCheckedList[it].isFolder === true && fileCheckedList[it].id !== parentId) {
          moveFolderList.push(fileCheckedList[it].id)
        } else {
          moveFileList.push(fileCheckedList[it].id)
        }
      }

      if (moveFolderList.length !== 0) {
        this.$post(fileApi.batchMoveUserPathApi, {
          id_map: moveFolderList,
          uid: this.$store.getters.getUid,
          parent_id: parentId
        }).then(
          res => {
            if (res.data.success === true) {
              this.$message({
                showClose: true,
                message: '文件夹移动成功',
                type: 'success'
              })
            }
          }
        )
      }

      if (moveFileList.length !== 0) {
        this.$post(fileApi.batchMoveUserFileApi, {
          id_map: moveFileList,
          uid: this.$store.getters.getUid,
          parent_id: parentId
        }).then(
          res => {
            if (res.data.success === true) {
              this.$message({
                showClose: true,
                message: '文件移动成功',
                type: 'success'
              })
            }
          }
        )
      }

      setTimeout(function () {
        this.getFileList()
      }, 3000)
    },
    // 上传成功调用的方法
    onFileUploadSuccess (file) {
      var index
      for (var i = 0; i < this.$refs['wl-explorer-cpt'].fileList.length; i++) {
        if (this.$refs['wl-explorer-cpt'].fileList[i] == file) {
          index = i
          break
        }
      }
      ;
      if (index > -1) {
        this.$refs['wl-explorer-cpt'].$refs['upload-item'].fileList.splice(index, 1)
      }
    }
  },
  created () {
    this.closeOtherLayout = closeOtherLayout
    this.getAllFolders()
    this.getFileList()
  },
  watch: {
  },
  computed: {
    buttonLabel: function () {
      var lab = this.folder_form.path_id > 0 ? '编辑' : '新增'
      return lab
    }
  }

}
</script>

<style>
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    position: absolute;
    top: 0;
    left: 0;
    padding: 25px;
    width: 100%;
    height: 100%;
    background: #f7f7f7;
    box-sizing: border-box;
  }

  #file_list {
    height: 100%;
  }

</style>
