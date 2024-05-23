export interface IFilters {
  numberFormat (data: string | number, local?: string, option?: Intl.NumberFormatOptions): string
  numberFormatBaht (data: string | number, local?: string | null, option?: Intl.NumberFormatOptions): string
  phoneFormat (data: string | number, hidden?: boolean): string
}

export function numberFormat (data: string | number, local?: string | null, option?: Intl.NumberFormatOptions): string {
  const num = Number(data)
  if (num || num === 0) {
    return new Intl.NumberFormat(local || 'th-TH', option).format(num)
  }
  return '-'
}

export function numberFormatBaht (data: string | number, local?: string | null, option?: Intl.NumberFormatOptions): string {
  return `฿${numberFormat(data, local, option)}`
}

export function phoneFormat (data: string | number, hidden?: boolean | string): string {
  const value = data as string
  const empty = ''
  if (!value) {
    return empty
  }
  if (value.includes('-')) {
    return value
  }
  const start = value?.slice(0, 3)
  const mid = hidden ? 'XXX' : value?.slice(3, 6)
  const end = value?.slice(6)
  return empty.concat(start, '-', mid, '-', end)
}

const filters: IFilters = {
  numberFormat,
  numberFormatBaht,
  phoneFormat
}

export default filters
