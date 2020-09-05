import { getFileList, getFileInfo, py } from './common'

const baseDirection = 'posts'

/**
 * 首页文章列表
 * /posts
 * @return {*}  {*}
 */

interface IPostsFileListItem {
  date: string
  list: IPostsFileListSubItem[]
}
interface IPostsFileListSubItem {
  date: string
  name: string
  path: string
}

export const getPostsFileList = (): IPostsFileListItem[] => {
  return getFileList(baseDirection).map(
    (date: string): IPostsFileListItem => {
      return {
        date,
        list: getFileList(baseDirection, date).map(
          (name): IPostsFileListSubItem => {
            return {
              date,
              name,
              path: py(name),
            }
          },
        ),
      }
    },
  )
}

export /**
 * 取到时间目录列表
 * /posts/[date]
 * @return {*}  {*}
 */
const getPostsDateList = (): any => {
  return getFileList(baseDirection).map((date: string) => {
    return {
      params: {
        date,
      },
    }
  })
}

export /**
 * 获取具体时间目录下的文章列表
 * /posts/[date]
 * @param {string} date
 * @return {*}  {*}
 */
const getPostsDateFileList = (date: string): any => {
  return getFileList(baseDirection, date).map((name) => {
    return {
      name,
      path: py(name),
    }
  })
}

interface IPostsFileIdListData {
  params: {
    id: [string, string]
  }
}

export /**
 * 取到所有文章列表
 * @return {*}  {*}
 */
const getPostsFileIdList = () => {
  const dataList = getPostsFileList()
  let data: IPostsFileIdListData[] = []
  dataList.forEach((dataItem) => {
    const { list = [] } = dataItem
    list.forEach((item) => {
      const { date, path } = item
      data.push({
        params: {
          id: [date, path],
        },
      })
    })
  })
  return data
}

export const getPostData = (id: string) => {
  const [date, _path] = id
  let name = ''
  const dataList = getPostsFileList()
  dataList.forEach((item) => {
    if (item.date === date) {
      item.list.forEach((i) => {
        if (i.path === _path) {
          name = i.name
        }
      })
    }
  })
  if (name) {
    return {
      id,
      name,
      data: parsePostContent(getFileInfo(baseDirection, date, name)),
    }
  }
  return {
    id,
    data: null,
  }
}

const parsePostContent = (content: string) => {
  const [info, body] = content.split('---').filter((i) => !!i)
  const infoList = info
    .split('\n')
    .map((item) => item.replace(/\s/, ''))
    .filter((i) => !!i)
  return {
    ...infoList.reduce((prev: object, next: string) => {
      const [key, value] = next.split(':')
      // TODO
      prev[key?.trim()] = value?.trim()
      return prev
    }, {}),
    body: body.trim(),
  }
}
