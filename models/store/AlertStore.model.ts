export enum EAlertType {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
  NONE = ''
}

export interface IAlert {
  isActive?: boolean
  type?: EAlertType
  title?: string
  desc?: string
  timeout?: number
}
