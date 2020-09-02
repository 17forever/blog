import fs from 'fs'
import path from 'path'

const timelineDirectory = path.join(process.cwd(), 'data/timeline')

export const getTimelineFileList = () => {
  const fileList = fs.readdirSync(timelineDirectory, 'utf-8') || []
  return fileList.map(
    // file => file.replace(/\.md$/, '')
    file => {
      return {
        params: {
          id: file.replace(/\.md$/, '')
        }
      }
    }
  )
}

const parseTimelineContent = content => {
  return content.split('---').map(item => {
    const text = item.trim()
    const match = text.match(/^(?<date>\S+)\s+(?<weather>\S+)\s+(?<mood>\S*)\s*\n+/)
    if (match) {
      return {
        ...match.groups,
        body: text.replace(match[0], '')
      }
    }
    return ''
  }).filter(i => !!i)
}

export const getTimelineData = id => {
  const fullPath = path.join(timelineDirectory, `${id}.md`)
  const content = fs.readFileSync(fullPath, 'utf-8')
  // Combine the data with the id
  return {
    id,
    data: parseTimelineContent(content)
  }
}
