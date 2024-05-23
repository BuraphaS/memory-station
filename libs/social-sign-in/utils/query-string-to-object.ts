interface QueryParams {
  [key: string]: any
}

export function queryStringToObject (queryString: string | undefined): QueryParams | null {
  if (!queryString) {
    return null
  }

  const params = new URLSearchParams(queryString)
  const result: QueryParams = {}

  for (const [key, value] of params.entries()) {
    if (value === 'true' || value === 'false') {
      result[key] = value === 'true'
    } else if (/^\d+$/.test(value)) {
      result[key] = Number(value)
    } else {
      result[key] = value
    }
  }

  return result
}
