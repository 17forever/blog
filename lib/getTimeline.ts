import { getFileList, getFileInfo, py } from './common'
import { extract } from '@node-rs/jieba'

const baseDirection = 'timeline'

export const getTimelineFileList = () => {
  return getFileList(baseDirection).map((id) => {
    return {
      params: {
        id,
      },
    }
  })
}

export const getTimelineFileListWithHotWords = () => {
  return getFileList(baseDirection).map((id) => {
    // console.log(getTimelineData(id))
    const analyzeText = getTimelineData(id).data.reduce((prev, next): string => {
      prev += `${next?.mood || ''} ${next?.body || ''}`
      return prev
    }, '')
    // console.log(analyzeText)
    return {
      id,
      words: extract(analyzeText, 10)
        .map((word) => word.keyword)
        .filter((i) => !!i.replace(/\s/g, '')),
    }
  })
}

export const getTimelineData = (
  id: string,
): {
  id: string
  data: any[]
} => {
  return {
    id,
    data: parseTimelineContent(getFileInfo(baseDirection, id)),
  }
}

interface IContentData {
  body: string
  // [propName: string]: any
}

const parseTimelineContent = (content: string): IContentData[] => {
  return content
    .split('---')
    .map(
      (item: string): IContentData => {
        const text = item.trim()
        const match = text.match(/^(?<date>\S+)\s+(?<weather>\S+)\s+(?<mood>\S*)\s*\n+/)
        if (match) {
          return {
            ...match.groups,
            body: text.replace(match[0], ''),
          }
        }
        // TODO 返回不同类型
        // return null
        return {
          body: '',
        }
      },
    )
    .filter((i) => !!i)
}
