import { apiConfig } from './config/index'

const userApiHost = apiConfig.user_api_host
const userApiPort = apiConfig.user_api_port
const userApiPrefix = apiConfig.user_api_prefix

const userApiLink = userApiHost + ':' + userApiPort + userApiPrefix

const userCheckUserStatusApi = userApiLink + 'checkToken'
const userLogoutUserStatusApi = userApiLink + 'logout'

const userApi = {
  userCheckUserStatusApi: userCheckUserStatusApi,
  userLogout: userLogoutUserStatusApi
}

const commonApi = {
}

const fileApiHost = apiConfig.file_api_host
const fileApiPort = apiConfig.file_api_port
const fileApiPrefix = apiConfig.file_api_prefix

const fileApiLink = fileApiHost + ':' + fileApiPort + fileApiPrefix

const fileApi = {
  getFileListApi: fileApiLink + 'getFileList',
  getPathListApi: fileApiLink + 'getPathList',
  uploadFileApi: fileApiLink + 'upload',
  delUserPathApi: fileApiLink + 'batchDelUserPath',
  delUserFileApi: fileApiLink + 'batchDelUserFile',
  batchMoveUserFileApi: fileApiLink + 'batchMoveUserFile',
  batchMoveUserPathApi: fileApiLink + 'batchMoveUserPath',
  saveUserPathApi: fileApiLink + 'saveUserPath',
  getChildPathList: fileApiLink + 'getChildPathList',
  getUploadToken: fileApiLink + 'getUploadToken',
  ssoUploadSuccessCallback: fileApiLink + 'ssoUploadSuccessCallback',
  getDownLoadUrlApi: fileApiLink + 'getDownLoadUrl'
}

export { userApi, commonApi, fileApi }
