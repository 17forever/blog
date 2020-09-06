import { getFileList, getFileInfo, py, sortByDate } from './common'

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
  path: string,
  groupDate: string,
}

export const getPostsFileList = (): IPostsFileListItem[] => {
  return sortByDate(
    getFileList(baseDirection).map(
      (date: string): IPostsFileListItem => {
        return {
          date,
          list: sortByDate(
            getFileList(baseDirection, date).map(
              (name): IPostsFileListSubItem => {
                return {
                  name,
                  date: parsePostContent(getFileInfo(baseDirection, date, name))?.date || '',
                  path: py(name),
                  groupDate: date
                }
              },
            ),
          ),
        }
      },
    ),
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
  return sortByDate(
    getFileList(baseDirection, date).map((name) => {
      return {
        name,
        date: parsePostContent(getFileInfo(baseDirection, date, name))?.date || '',
        path: py(name),
      }
    }
  ))
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
    const { list = [], date } = dataItem
    list.forEach((item) => {
      const { path } = item
      data.push({
        params: {
          id: [date, path],
        },
      })
    })
  })
  return data
}

export const getPostData = (id: string[]): any => {
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
  // 不一定有info，但一定有body
  const [body, info = ''] = content.split('---').filter((i) => !!i).reverse()
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
