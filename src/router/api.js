const userApiHost = 'http://127.0.0.1'
const userApiPort = '9091'
const userApiPrefix = '/api/user/'

const userApiLink = userApiHost + ':' + userApiPort + userApiPrefix

const userLoginApi = userApiLink + 'login'
const userRegisterApi = userApiLink + 'register'
const userAddUserApi = userApiLink + 'addUser'
const userDelUserApi = userApiLink + 'delUser'
const userCheckUserStatusApi = userApiLink + 'checkUserStatus'
const userCheckUserAuthorityApi = userApiLink + 'checkUserAuthority'
const userGetUserAuthorityListApi = userApiLink + 'getUserAuthorityList'
const userGetAuthorityListApi = userApiLink + 'getAuthorityList'
const userAddUserRoleApi = userApiLink + 'addUserRole'
const userDelUserRoleApi = userApiLink + 'delUserRole'
const userGetRoleListApi = userApiLink + 'getRoleList'
const userGetUserRoleListApi = userApiLink + 'getUserRoleList'
const userGetUserListApi = userApiLink + 'getUserList'
const userLogout = userApiLink + 'logout'

const userApi = {
  userLoginApi: userLoginApi,
  userRegisterApi: userRegisterApi,
  userAddUserApi: userAddUserApi,
  userDelUserApi: userDelUserApi,
  userCheckUserStatusApi: userCheckUserStatusApi,
  userCheckUserAuthorityApi: userCheckUserAuthorityApi,
  userGetUserAuthorityListApi: userGetUserAuthorityListApi,
  userGetAuthorityListApi: userGetAuthorityListApi,
  userAddUserRoleApi: userAddUserRoleApi,
  userDelUserRoleApi: userDelUserRoleApi,
  userGetRoleListApi: userGetRoleListApi,
  userGetUserRoleListApi: userGetUserRoleListApi,
  userGetUserList: userGetUserListApi,
  userLogout: userLogout,
}

const captchaApiHost = 'http://127.0.0.1'
const captchaApiPort = '9091'
const captchaApiPrefix = '/api/captcha/'

const captchaApiLink = captchaApiHost + ':' + captchaApiPort + captchaApiPrefix

const captchaGetCaptcha = captchaApiLink + 'getCaptcha'
const commonApi = {
  captchaGetCaptcha: captchaGetCaptcha
}

export { userApi, commonApi }
