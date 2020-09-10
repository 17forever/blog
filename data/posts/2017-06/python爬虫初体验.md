---
date: 2017-06-03
---

之前用 nodejs 爬过 instagram，StackOverflow 和 segmentfault，使用的模拟登录方式。爬微博时由于主机在韩国止于验证码，今天试用 Python 写爬虫，总结如下

> python 版本：3.6
> 使用内置`urllib`做 HTTP 代理
> DOM 解析用`BeautifulSoup`和`lxml`，相当于 nodejs 的`cheerio`

```py
# HTTP代理模块
import urllib.request
import urllib.error

# DOM解析模块
# from bs4 import BeautifulSoup
import lxml.html
import lxml.cssselect

# 写入csv文件模块
import csv

url = 'http://example.webscraping.com'

# url = 'http://localhost:3000'
# user_agent = 'custom'
# headers = {'User-Agent': user_agent}


def download(url):
    print('Download: ' + url)
    try:
        html = urllib.request.urlopen(url).read().decode('utf8')

        # 加用户代理User-Agent
        # html = urllib.request.urlopen(urllib.request.Request(url, headers=headers))

    except urllib.error.URLError as e:
        print('Download error: ' + e.reason)
        html = None
    return html

# 使用BeautifulSoup
# html = download(url)
# soup = BeautifulSoup(html)
# result = soup.find(attrs={'id', 'results'})

# 使用lxml
# tree = lxml.html.fromstring(download(url)).cssselect('#results')[0].text_content()
tree = lxml.html.fromstring(download(url)).cssselect('#results a')

# 写入到文件
# newline=''是为防止出现空白行
csv_file = csv.writer(open('data.csv', 'w', newline=''))
csv_file.writerow(['country'])

for country in tree:
    csv_file.writerow([country.text_content()])

print('ok')


```

其中，
1，download 函数中注释的部分为自定义用户代理，默认为 Python-urllib/版本号
2，`BeautifulSoup`和`lxml.html.fromstring`均有将不规范的 html 代码补充完善的功能
3，lxml 可使用类似于 css 选择器的功能操作 DOM，但是需要单独安装`cssselect`这个模块
4，与 css 选择器不同的是，选择 id 仍需要数组下标[0]唯一指定
5，lxml 的性能比 BeautifulSoup 快得多
6，csv 的 writerow 参数为可迭代参数，为数组则迭代数组项，为字符串则迭代字符串每一项
7，不要忘记`newline=""`，可防止出现写入到文件中的隔行空白。
