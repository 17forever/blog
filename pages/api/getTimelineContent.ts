import fs from 'fs'
import path from 'path'

const timelineDirectory = path.join(process.cwd(), 'public/data/timeline')

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

export default (req, res) => {
  const { file } = req.query
  if (!file) {
    res.status(404).json({
      status: 'fail',
      msg: 'Need a filename',
      data: []
    })
    return
  }
  const fullPath = path.join(timelineDirectory, `${file}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  res.status(200).json({
    status: 'success',
    msg: '',
    data: parseTimelineContent(fileContents)
  })
}
