import fs from 'fs'
import path from 'path'

const timelineDirectory = path.join(process.cwd(), 'data/timeline')

export const getTimelineFileList = () => {
  return fs.readdirSync(timelineDirectory).map(
    file => file.replace(/\.md$/, '')
  ) || []
}
