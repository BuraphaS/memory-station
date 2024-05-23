import { openSSOPopup } from './utils/open-sso-popup'
import { queryStringToObject } from './utils/query-string-to-object'

type SocialType = 'facebook' | 'google'

interface IUser {
  id: number;
  customerNo: string;
  firstName: string;
  lastName: string;
  isRegisted: boolean;
  loginType: string
}

interface IResult {
  customer: IUser
  token: {
    accessToken: string;
    expireIn: number
  }
}

export function socialSignIn (type: SocialType): Promise<IResult> {
  return new Promise(
    (
      resolve: (value: IResult) => void,
      reject: (reson?: Error) => void
    ): void => {
      const apiBase = import.meta.env.VITE_ENV_BASE_API?.toString() || 'http://localhost:3001'
      const authUrl = `${apiBase}/v1/auth/${type}`
      const popup = openSSOPopup(authUrl)
      const popupInterval = setInterval((): void => {
        try {
          const queryString = popup?.location?.search
          const getAuth = queryStringToObject(queryString)
          if (getAuth) {
            const result: IResult = {
              customer: {
                id: getAuth?.id,
                customerNo: getAuth?.customerNo,
                firstName: getAuth?.firstName,
                lastName: getAuth?.lastName,
                loginType: type,
                isRegisted: getAuth?.isRegisted
              },
              token: {
                accessToken: getAuth?.accessToken,
                expireIn: getAuth?.expireIn
              }
            }
            popup?.close()
            clearInterval(popupInterval)
            resolve(result)
          }
          if (popup?.closed) {
            clearInterval(popupInterval)
            const error = new Error(`Login with ${type} not finished`)
            reject(error)
          }
        } catch (error) {

        }
      }, 100)
    }
  )
}
