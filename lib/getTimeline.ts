import fs from 'fs'
import path from 'path'

// const timelineDirectory = path.relative(__dirname, 'data')
const timelineDirectory = path.join(process.cwd(), 'data/timeline')

export const getTimelineFileList = () => {
  return fs.readdirSync(timelineDirectory) || []
}
