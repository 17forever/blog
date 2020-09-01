import { basePath } from '../next.config'

export default (path, params = {}) => {
  const paramsStr = Object.keys(params).reduce(
    (prev, next) => `&${prev}${next}=${params[next]}`
    , '')
  return new Promise((resolve, reject) => {
    fetch(`${basePath}/api${path}${paramsStr ? `?${paramsStr.slice(1)}` : ''}`)
      .then(res => res.json())
      .then(res => {
        const { status, msg, data } = res
        if (status === 'success') {
          resolve(data)
        } else {
          reject(
            new Error(msg)
          )
        }
      })
      .catch(err => {
        reject(err)
      })
  })
}
