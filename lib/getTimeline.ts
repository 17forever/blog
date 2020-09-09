import { getFileList, getFileInfo, sortByDate } from './common'
import { extract } from '@node-rs/jieba'
import times from '../utils/times'

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

interface IItem {
  id: string
  words: IWordsItem[]
}
interface IWordsItem {
  word: string
  weight: number
}

export const getTimelineFileListWithHotWords = (): IItem[] => {
  return getFileList(baseDirection).map(
    (id: string): IItem => {
      // console.log(getTimelineData(id))
      const analyzeText = getTimelineData(id).data.reduce((prev, next): string => {
        prev += `${next?.mood || ''} ${next?.body || ''}`
        return prev
      }, '')
      // console.log(analyzeText)
      return {
        id,
        words: extract(analyzeText, times.myAge)
          .map(
            (item): IWordsItem => ({
              word: item.keyword,
              weight: Number(item.weight.toFixed(2)),
            }),
          )
          .filter((i) => !!i.word.replace(/\s/g, '')),
      }
    },
  )
}

export const getTimelineData = (
  id: string,
): {
  id: string
  data: any[]
} => {
  return {
    id,
    data: sortByDate(parseTimelineContent(getFileInfo(baseDirection, id))),
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
        // \u0020 为空格
        const match = text.match(/^(?<date>\S+)\u0020+(?<weather>\S+)\u0020+(?<mood>\S*)\s*\n+/)
        console.log(match, text)
        if (match) {
          const groups = match?.groups || {}
          return {
            ...Object.keys(groups).filter(key => !!groups[key]).reduce(
              (prev, next) => {
                prev[next] = groups[next]
                return prev
              },
              {}
            ),
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
