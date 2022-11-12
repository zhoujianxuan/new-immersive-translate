# Application to Store





## Purpose

This extension is used to translate web pages, as well as selected text. Unlike other translation extensions, this extension supports bilingual display at the same time, and translates only the important content of the web page instead of the whole web page, it is like the browser's reading mode, designed to improve the user experience and help user to learn the target language when reading translated pages. It supports most websites out of the box, but has special adaptations for Twitter, Reddit and other information flow websites to make it a better experience.


## Storage

Since web page translation requires a lot of requests, we cache the parts that are translated as a way to save unnecessary requests, and I provide a storage management page in the plugin's options to help users manage the plugin's cache.


## ActiveTab

We need ActiveTab access to get the pages and text that the user wants to translate.

## ContextMenu

We provide a quick translation of this page menu item in the menu

## Request

We need web request permission to get the translated results from network.


## web navigation

This is an optional option that we provide for the user to set to automatically translate the target page when the link to the page is clicked, this is an optional option to request this permission only when the user opens this setting.


## Host permission

This is a translation plugin, it may be requested by any host, so we need the permission of any host.


## description cn:

让我们体验一下沉浸式的网页翻译，双语同时显示，只翻译重要内容！

这个插件与其他翻译插件的不同之处在于：

1. 双语显示，按段落分割
2. 只翻译页面的内容区域，大大增强了翻译的阅读体验，而不像其他插件，所有元素都被翻译，它就像浏览器的阅读模式，但是是翻译。所以该插件被命名为 "沉浸式翻译"
3. 我希望这个插件有足够的通用性，不需要为大多数网站定制，但往往有一些网站是不规范的，或者是非内容网站，这些网站单独优化后效果更好，所以我会对这类网站做单独的适配，不好的地方是，如果网站有更新，优化可能会失效，所以这里需要持续的跟进，如果你有一个常用的网站翻译体验不好，请随时在 https://github.com/immersive-translate/immersive-translate/issues 提出。
4. 支持PDF文件的双语翻译
5. 与https://1paragraph.app/ 等epub在线阅读网站配合，实现国外电子书的双语阅读

这个插件比较关注经常需要阅读外文的用户，让他们在阅读外文网页时有一个好的体验（我想做这个插件是因为我经常需要在https://www.buzzing.cc，浏览大量的外媒文章），所以这个插件的目标群体是：

1. 经常阅读国外的长篇文章、论文
2. 阅读外文PDF、外文电子书
3. 希望快速浏览Twitter、Reddit、Hacker News、Github Issue和其他外国论坛网站
4. 希望显示两种语言来学习目标语言
5. 希望同时显示双语，以平衡一些机器翻译的不可知性
6. 希望尽快摆脱这个扩展，这对你来说是一个过渡的助手

该扩展支持（依赖）Google翻译引擎或Yandex翻译引擎，同时也支持使用Bing、Deepl进行文本选中翻译，该插件完全免费，希望大家都能尽可能平等的获得知识，感谢原扩展：https://github.com/FilipePS/Traduzir-paginas-weboriginal，感谢他为这个项目付出的巨大努力。


## description en

Let's experience immersive web translation, with bilingual simultaneous display and translation of only the important content. 

What makes this plugin different from other translation plugins is that:

1. Bilingual display, split by paragraph
2. Translation of only the content area of the page, which greatly enhances the reading experience of the translation, instead of the previous one where all elements of the page are translated, similar to the browser reading mode, so the plugin was named "Immersive Translation"
3. I hope this plugin is universal enough that it does not need to be customized for most websites, but there are often some websites that are not standardized, or non-content websites, and these websites are better after separate optimization, so we will do separate adaptations for such websites, and the downside is that the website may not work at any time. The bad thing is that the website may fail at any time with the update of the website, so here I will continue to optimize. If you have a commonly used website that does not translate well, please feel free to ask in https://github.com/immersive-translate/immersive-translate/issues
4. Support bilingual translation of PDF files
5. Cooperate with epub online reading website like https://1paragraph.app/ , to realize bilingual reading of foreign e-books

This plugin is more concerned about users who often need to read foreign languages to have a good experience when reading foreign language pages (I want to do this plugin because I often need to browse a lot of foreign media articles on https://www.buzzing.cc ), so the target group of this plugin is:

1. You often read long articles, papers from abroad
2. Read foreign language PDF, foreign language e-books
3. You want to quickly browse Twitter, Reddit, Hacker News, Github Issue and other foreign forum sites
4. You want to display both languages to learn the target language
5. You hope to display bilingualism at the same time to balance the unknowingness of some machine translation
6. You hope to get rid of this extension as soon as possible, which is an excessive assistant for users who are directly used to reading the original language

The extension also supports (relies on) Google translation engine or Yandex translation engine, while supporting the use of Bing, Deepl for text selection translation, the plug-in is completely free, I hope we can all get knowledge as equally as possible, thanks to the original extension: https://github.com/FilipePS/Traduzir-paginas-weboriginal for the great effort he put into this project.


## Notes for review


This extension is used to translate web pages, as well as selected text. Unlike other translation extensions, this extension supports bilingual display at the same time, and translates only the important content of the web page instead of the whole web page, it is like the browser's reading mode, designed to improve the user experience and help user to learn the target language when reading translated pages. It supports most websites out of the box, but has special adaptations for Twitter, Reddit and other information flow websites to make it a better experience.

For the experience, after installing the plugin, you can select a target language, such as Chinese, and then you can open an English web page, for example:

https://github.com/microsoft/vscode

https://mfiano.net/posts/2022-09-04-from-common-lisp-to-julia/index.html

Or the Twitter homepage at

https://twitter.com/spectatorindex/

Then right click and select Translate that page and you can see the translated effect.





## Examples

- <https://twitter.com/elonmusk>
- <https://twitter.com/spectatorindex>
- <https://twitter.com/i/lists/1591319857319903233>
- <https://news.ycombinator.com/>
- <https://hn.algolia.com/>
- <https://www.reddit.com/>
- <https://www.judiciary.senate.gov/imo/media/doc/Haidt%20Testimony.pdf>
- <https://1paragraph.app/>
- <https://github.com/bitcoin/bitcoin>
- <https://www.nature.com/articles/d41586-022-03611-w>
- <https://www.cell.com/cell-reports/fulltext/S2211-1247(22)01482-6>
- <https://www.reuters.com/markets/currencies/exclusive-least-1-billion-client-funds-missing-failed-crypto-firm-ftx-sources-2022-11-12/>
- <https://www.youtube.com/watch?v=LNm9kZR15m8>
- <https://www.facebook.com/groups/cheapmealideas>


