import React from 'react'
import PropTypes from 'prop-types'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import styled from 'styled-components'
import theme from '../utils/getTheme'

const StyledMarkdown = styled.div`
  p {
    text-indent: 2em;
    line-height: 1.6;
    color: ${theme.palette.neutralDark};
  }
`

const md = new MarkdownIt({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' + hljs.highlight(lang, str, true).value + '</code></pre>'
      } catch (__) {}
    }

    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
  },
})

export default function Markdown(props) {
  const { data } = props
  const result = md.render(data)
  return <StyledMarkdown id='_markdown' dangerouslySetInnerHTML={{ __html: result }} />
}

Markdown.propTypes = {}
