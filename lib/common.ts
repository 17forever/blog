import fs from 'fs'
import path from 'path'
import pinyin from 'pinyin'
import { isBefore } from 'date-fns'

export const py = (name: string): string =>
  pinyin(name.trim().replace(/\s/g, '-'), {
    style: pinyin.STYLE_NORMAL,
  })
    .flat()
    .join('-')

export const dataDirectory = path.join(process.cwd(), 'data')
export const removeExtension = (name: string): string => name.replace(/\.md$/, '')
export const addExtension = (name: string): string => `${name}.md`

export const getFileList = (...filePath: string[]) =>
  fs.readdirSync(path.join(dataDirectory, ...filePath), 'utf-8').map((name) => removeExtension(name)) || []

export const getFilePath = (filePath: string) => getFileList(filePath).map((name) => py(name)) || []

export const getFileInfo = (...filePath: string[]): string =>
  fs.readFileSync(addExtension(path.join(dataDirectory, ...filePath)), 'utf-8') || ''

export const sortByDate = (list: any[]): any[] =>
  list.sort((prev, next) => (isBefore(new Date(prev?.date), new Date(next?.date)) ? 1 : -1))
