import fs from 'fs'
import path from 'path'

const postsDirectory = path.join(process.cwd(), 'data/posts')
const dateList = fs.readdirSync(postsDirectory, 'utf-8') || []

const removeExtension = (name: string): string => name.replace(/\.md$/, '')
const addExtension = (name: string): string => `${name}.md`

/**
 * 首页文章列表
 * /posts
 * @return {*}  {*}
 */
export const getPostsFileList = (): any => {
  return dateList.map((date: string): object => {
    const fileList = fs.readdirSync(`${postsDirectory}/${date}`, 'utf-8') || []
    return {
      date,
      list: fileList.map((file): object => {
        return {
          date,
          name: removeExtension(file),
        }
      }),
    }
  })
}

export /**
 * 取到时间目录列表
 * /posts/[date]
 * @return {*}  {*}
 */
const getPostsDateList = (): any => {
  return dateList.map((date: string) => {
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
  const fileList = fs.readdirSync(`${postsDirectory}/${date}`, 'utf-8') || []
  return fileList.map((file) => {
    return removeExtension(file)
  })
}

export /**
 * 取到所有文章列表
 * @return {*}  {*}
 */
const getPostsFileIdList = (): any => {
  const dataList = getPostsFileList()
  let data = []
  dataList.forEach((dataItem) => {
    const { list = [] } = dataItem
    list.forEach((item) => {
      const { date, name } = item
      data.push({
        params: {
          id: [date, name],
        },
      })
    })
  })
  return data
}

const parsePostContent = (content: string) => {
  const [info, body] = content.split('---').filter((i) => !!i)
  const infoList = info.split('\n').filter(i => !!i)
  return {
    ...infoList.reduce(
      (prev, next) => {
        const [key, value] = next.split(':')
        prev[key.trim()] = value.trim()
        return prev
      },
      {}
    ),
    body: body.trim(),
  }
}

export const getPostData = (id: string) => {
  const [date, name] = id
  const fullPath = path.join(postsDirectory, date, addExtension(name))
  const content = fs.readFileSync(fullPath, 'utf-8')
  return {
    id,
    data: parsePostContent(content),
  }
}
