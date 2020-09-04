import fs from 'fs'
import path from 'path'
import pinyin from 'pinyin'

const py = name => pinyin(name, {
  style: pinyin.STYLE_NORMAL
}).flat().join('-')

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
        const name = removeExtension(file)
        return {
          date,
          name,
          path: py(name)
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
    const name = removeExtension(file)
    return {
      name,
      path: py(name)
    }
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

export const getPostData = (id) => {
  console.log(id)
  const [date, _path] = id
  let name = ''
  const dataList = getPostsFileList()
  dataList.forEach(item => {
    if (item.date === date) {
      item.list.forEach(i => {
        if (i.path === _path) {
          name = i.name
        }
      });
    }
  });
  if (name) {
    const fullPath = path.join(postsDirectory, date, addExtension(name))
    const content = fs.readFileSync(fullPath, 'utf-8')
    return {
      id,
      name,
      data: parsePostContent(content),
    }
  }
  return {
    id,
    data: null
  }
}

const parsePostContent = (content: string) => {
  const [info, body] = content.split('---').filter((i) => !!i)
  const infoList = info.split('\n').map(
    item => item.replace(/\s/, '')
  ).filter(i => !!i)
  console.log(infoList)
  return {
    ...infoList.reduce(
      (prev, next) => {
        const [key, value] = next.split(':')
        prev[key?.trim()] = value?.trim()
        return prev
      },
      {}
    ),
    body: body.trim(),
  }
}
