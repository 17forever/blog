import { getTheme } from '@fluentui/react'

const theme = getTheme()

const { palette } = theme

let colorKeys = ''
const colorValueList = []
Object.keys(palette).forEach((key) => {
  const colorValue = palette[key]
  colorKeys += `%c${key}: ${colorValue} \n`
  colorValueList.push(`color: ${colorValue};`)
})
const logTheme = () => {
    console.log(colorKeys, ...colorValueList)
}

export default logTheme
