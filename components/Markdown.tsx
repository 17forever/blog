import React from 'react'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import styled from 'styled-components'
import theme from '../utils/getTheme'
import mila from 'markdown-it-link-attributes'
import markdownItAttrs from 'markdown-it-attrs'

interface IProps {
  data: string
}

const StyledMarkdown = styled.div`
  /* font-size: 14px; */
  p {
    color: ${theme.palette.neutralDark};
    line-height: 1.7;
  }
  code {
    font-family: Consolas, 'Courier New', Courier, monospace;
  }
  &.markdown-body {
    box-sizing: border-box;
    min-width: 200px;
    /* max-width: 980px; */
    margin: 0 auto;
    padding: 20px 0;
  }
`

const md = new MarkdownIt({
  html: true,
  typographer: true,
  linkify: true,
  xhtmlOut: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' + hljs.highlight(lang, str, true).value + '</code></pre>'
      } catch (__) {}
    }

    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
  },
})

md.use(mila, {
  pattern: /^https?/,
  attrs: {
    target: '_blank',
    rel: 'noopener noreferrer',
    referrerPolicy: 'no-referrer',
  },
})

md.use(markdownItAttrs, {
  // optional, these are default options
  leftDelimiter: '{',
  rightDelimiter: '}',
  allowedAttributes: [], // empty array = all attributes are allowed
})

// 给img设置 alt 和 referrerpolicy 属性
md.renderer.rules.image = (tokens, idx, options, env, slf) => {
  const token = tokens[idx]
  token.attrs[token.attrIndex('alt')][1] = slf.renderInlineAsText(token.children, options, env)
  if (!token.attrIndex('referrerpolicy')?.length) {
    token.attrPush(['referrerpolicy', 'no-referrer']) // add new attribute
  }
  return slf.renderToken(tokens, idx, options)
}

const Markdown: React.FC<IProps> = (props) => {
  const { data } = props
  const result = md.render(data)
  return <StyledMarkdown id="_markdown" className="markdown-body" dangerouslySetInnerHTML={{ __html: result }} />
}

export default Markdown
