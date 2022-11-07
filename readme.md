
# Immersive Translate

Let's experience immersive web translation, with Google and Yandex under the hood, with support for both firefox and chrome 

[![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/immersive-translate/immersive-translate?label=latest%20version&sort=semver)](https://github.com/immersive-translate/releases)
[![GitHub release date](https://img.shields.io/github/release-date/immersive-translate/immersive-translate?labely)](https://github.com/immersive-translate/immersive-translate/latest)
[![GitHub issues](https://img.shields.io/github/issues/immersive-translate/immersive-translate?color=red)](https://github.com/immersive-translate/immersive-translate/issues)
[![GitHub license](https://img.shields.io/github/license/immersive-translate/immersive-translate?color=lightgrey)](https://github.com/immersive-translate/immersive-translate/blob/master/LICENSE)


说明： 该扩展Fork自[TWP](https://github.com/immersive-translate/immersive-translate)插件，我为其添加了以下功能：

- 双语显示
- 只翻译网页里的内容区域，这极大的增强了翻译的阅读体验，而不是像之前那样网页的所有元素都被翻译，类似浏览器的阅读模式，所以该插件被重新命名为“沉浸式翻译”
- 为常用网站做了定制优化，比如推特，Reddit，Hacker News等，我希望这个插件足够通用，不需要为绝大多数网站做定制，但是往往有一些网站由于不规范，或者非内容类网站，这些网站单独优化后体验更好，这里应该会持续优化，如果有常用的网站翻译显示不佳，欢迎在[Isuee](https://github.com/theowenyoung/Traduzir-paginas-web/issues)中提出
- 支持PDF文件双语对照翻译
- 配合epub在线阅读网站<https://1paragraph.app/> 即可实现双语阅读国外电子书

该扩展支持选择谷歌翻译引擎或Yandex翻译引擎，完全免费使用。同时使用Bing，Deepl进行选中文本翻译。

Firefox 已发布到商店，可以[直接下载](https://addons.mozilla.org/en-US/firefox/addon/immersive-translate/)使用，其他chrome类平台目前需要手动安装该扩展（正在加速发布商店中）。



Firefox商店[沉浸式翻译](https://addons.mozilla.org/en-US/firefox/addon/immersive-translate/)已上架, chrome,edge商店正在进行中。

目前依然处于Alpha阶段，但是常用内容网站使用上已经没有问题～在[Telegram 沉浸式插件讨论组](https://t.me/+rq848Z09nehlOTgx)中经常得到有用都反馈，如果你有反馈，也可以在[群里](https://t.me/+rq848Z09nehlOTgx)提出。

在[Release页面](https://github.com/theowenyoung/Traduzir-paginas-web/releases)会有一个nightly版本频繁的被构建，所以建议喜欢体验最新版的同学可以手动安装nightly版本，其中firefox的扩展包已签名，可以直接下载后作为扩展文件安装。

Chrome/Edge用户目前请手动安装：

1. 在[这里](https://github.com/theowenyoung/Traduzir-paginas-web/releases)下载chrome的压缩包
2. 解压到一个以后不会删除的文件夹
3. 打开扩展管理窗口，`chrome://extensions`
4. 激活开发者模式
5. 载入刚解压的扩展文件夹
6. 安装后，target语言可以选中文
7. 接下来可以设置为always自动翻译英文，或者右键手动点击翻译本页面，即可有双语显示，打开推特试试看！


> 现在还没有任何选项可以设置

## 截图

![twitter](assets/twitter.png)

![reddit](assets/reddit.png)

![pdf](assets/pdf.png)

![epub](assets/epub.jpg)

![hackernews](assets/hackernews.png)

![ft](assets/ft.png)

---

## Install

#### Firefox
- Desktop users, download from [Mozilla Addons](https://addons.mozilla.org/firefox/addon/traduzir-paginas-web/).
- Mobile users, see [this tutorial](https://www.ghacks.net/2020/10/01/you-can-now-install-any-add-on-in-firefox-nightly-for-android-but-it-is-complicated/).

#### Chromium based browsers

1. Download [this file](https://github.com/immersive-translate/immersive-translate/releases/download/v9.6/TWP.9.6.Chromium.zip), or any [other version](https://github.com/immersive-translate/immersive-translate/releases)
2. Extract the zip file
3. Open your browser's extension manager
4. Activate developer mode
5. Load the extension with the option "Load unpacked"
- Note: You can also install via [crx file](https://github.com/immersive-translate/immersive-translate/releases/download/v9.6/TWP.9.6.crx), download the file using a download manager/or firefox. Activate developer mode and drag the file into the chromium extension manager. It doesn't work on Chrome/Edge.

## Screenshots
| Menu 1 | Menu 2 | Translated |
| :--: | :--: | :--: |
| <img src="https://addons.mozilla.org/user-media/previews/full/258/258434.png" height="200"> | <img src="https://addons.mozilla.org/user-media/previews/full/258/258435.png" height="200"> | <img src="https://addons.mozilla.org/user-media/previews/full/258/258436.png" height="200"> |

## Contribute

- To collaborate with the translation of the extension interface use [Crowdin](https://crowdin.com/project/translate-web-pages).

## Donations

To make a donation use [Patreon](https://www.patreon.com/filipeps).

[<img src="https://github.com/immersive-translate/immersive-translate/blob/master/src/icons/patreon.png" alt="Patreon" height="50">](https://www.patreon.com/filipeps)

## FAQ

**What can this extension do?**

Your current page is translated without having to open new tabs.
It is possible to change the translation language.
You can select to automatically translate.
To change the translation engine just touch the Google Translate icon. 

**Why do you need to access your data on all the websites you visit?**

To translate any website it is necessary to access and modify the text of the web pages. And the extension can only do that, with that permission.

**How are the pages translated?**

The pages are translated using the Google or Yandex translation engine (you choose).

**And how's my privacy?**

[Privacy policy](https://addons.mozilla.org/addon/traduzir-paginas-web/privacy/): We do not collect any information. However, to translate, the contents of the web pages will be sent to Google or Yandex servers.

**Limitations**

Some pages like [support.mozilla.org](https://support.mozilla.org/) and [addons.mozilla.org](http://addons.mozilla.org/) will not be translated. For security reasons, the browser blocks extensions from accessing these sites.

## Todo


- [ ] - adapt for Github
- [ ] - backup默认文件名还是TWP
- [ ] - option页面从extension中打开的显示问题 
- [ ] - 版本号自动添加
- [ ] - youtube comments
- [ ] - better for github

---
