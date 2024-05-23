import { useUserStore } from '~/stores/user'

interface IToken {
  key: string
  value: string
}

export const getUserAccessToken = (): string => {
  const userStore = useUserStore()
  const accessToken: string = userStore.getAccessToken
  const tokenExpire: number = userStore.getTokenExpire
  // const dateTime: number = new Date().getTime()

  // if (!accessToken || !tokenExpire || tokenExpire <= dateTime) {
  if (!accessToken || !tokenExpire) {
    userStore.clearAuth()
    return ''
  }
  return accessToken
}

export const getUserAuthToken = (): IToken | null => {
  const token: IToken = {
    key: 'Authorization',
    value: 'Bearer'
  }
  const accessToken: string = getUserAccessToken()
  if (accessToken) {
    token.value += ` ${accessToken}`
    return token
  }
  return null
}

export default {
  getUserAccessToken,
  getUserAuthToken
}
