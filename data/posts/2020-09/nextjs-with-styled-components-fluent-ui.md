---
date: 2020-09-03
weather: 晴
---

昨晚发现，初始化和切换菜单时，ui 会抖动，以为是组件切换时布局不合理导致的，后来突然想到初始化和`a`标签跳转时应该用的服务端渲染，此时页面结构和样式文件几乎同时渲染，不应该抖动。  

后来想到只给`styled-components`做了`ssr`处理，`@fluent-ui`的样式依然是后加载的，检查了页面的 response，果然这样。  

nextjs 官方仓库有对`styled-components`做`ssr`的示例，也找到了`@fluent-ui`官方的[做法](https://github.com/microsoft/fluentui/wiki/Server-side-rendering-and-browserless-testing#nextjs-setup)，但是没有两者结合在一起的。

后来研究发现，`styled-components`的`ssr`处理是返回了一个 react 组件，而`@fluent-ui`返回一段 css 代码。这样，前者按 react 组件渲染，后者写入到 style 标签里，再结合到一个父组件内，放到页面 head 部分，就可以实现对两者样式的共同渲染。  

完整代码如下：

```js
import Document, { DocumentContext } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import { Stylesheet, InjectionMode } from '@uifabric/merge-styles'
import { resetIds } from '@uifabric/utilities'

// Do this in file scope to initialize the stylesheet before Fabric components are imported.
const stylesheet = Stylesheet.getInstance()

// Set the config.
stylesheet.setConfig({
  injectionMode: InjectionMode.none,
  namespace: 'server',
})

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    stylesheet.reset()
    resetIds()

    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      const styleTags = stylesheet.getRules(true)

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            <style type="text/css" dangerouslySetInnerHTML={{ __html: styleTags }} />
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }
}
```
