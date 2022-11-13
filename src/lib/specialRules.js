const specialRules = [
  {
    "hostname": [
      "twitter.com",
      "tweetdeck.twitter.com",
      "mobile.twitter.com"
    ],
    "selectors": [
      "[data-testid=\"tweetText\"]",
      ".tweet-text",
      ".js-quoted-tweet-text"
    ]
  },
  {
    "hostname": "news.ycombinator.com",
    "selectors": [
      ".titleline >a",
      ".comment",
      ".toptext"
    ]
  },
  {
    "hostname": "www.reddit.com",
    "selectors": [
      "h1",
      "[data-click-id=body] h3",
      "[data-click-id=background] h3"
    ],
    "containerSelectors": [
      "[data-testid=comment]",
      "[data-adclicklocation=media]"
    ]
  },
  {
    "hostname": "old.reddit.com",
    "selectors": [
      "a.title"
    ],
    "containerSelectors": [
      "[role=main] .md-container"
    ]
  },
  {
    "regex": "finance.yahoo.com/$",
    "selectors": [
      "h3"
    ]
  },
  {
    "regex": [
      "www.bloomberg.com/[A-Za-z0-9]+$",
      "www.bloomberg.com/$"
    ],
    "selectors": [
      "article h3",
      "article .single-story-module__headline-link",
      "article [data-tracking-type=Story]",
      "article .story-list-story__info__headline"
    ]
  },
  {
    "regex": "translatewebpages.org/result/.+$",
    "selectors": [
      "div"
    ],
    "style": "none"
  },
  {
    "hostname": "www.cell.com",
    "selectors": [
      "div.section-paragraph > div.section-paragraph > div.section-paragraph",
      "section > div.section-paragraph",
      "h4",
      "h3",
      "h2"
    ]
  },
  {
    "hostname": [
      "www.msdmanuals.com",
      "localhost"
    ],
    "noTranslateSelectors": [
      ".d-none"
    ]
  },
  {
    "hostname": "www.reuters.com",
    "containerSelectors": "main"
  },
  {
    "regex": "finance.yahoo.com/news",
    "containerSelectors": "[role=article]"
  },
  {
    "hostname": "www.whatsonweibo.com",
    "containerSelectors": "#mvp-post-main"
  },
  {
    "hostname": [
      "www.wsj.com",
      "www.economist.com"
    ],
    "containerSelectors": "main"
  },
  {
    "hostname": [
      "mail.jabber.org",
      "antirez.com"
    ],
    "selectors": [
      "pre"
    ],
    "containerSelectors": "pre",
    "style": "none"
  },
  {
    "hostname": "github.com",
    "containerSelectors": ".markdown-body"
  },
  {
    "hostname": "www.youtube.com",
    "selectors": [
      "#content-text"
    ]
  },
  {
    "hostname": "www.facebook.com",
    "selectors": [
      "div[data-ad-comet-preview=message] > div > div",
      "div[role=article] > div > div > div > div > div > div > div > div "
    ]
  },
  {
    "regex": ".substack.com/",
    "selectors": [
      ".post-preview-title",
      ".post-preview-description"
    ],
    "containerSelectors": [
      ".post"
    ]
  },
  {
    "hostname": "www.nature.com",
    "containerSelectors": "article"
  },
  {
    "hostname": "seekingalpha.com",
    "containerSelectors": "div.wsb_section",
    "brToParagraph": true
  },
  {
    "hostname": "hn.algolia.com",
    "selectors": [
      ".Story_title"
    ]
  },
  {
    "hostname": "read.readwise.io",
    "selectors": [
      "div[class^=\"_titleRow_\"]",
      "div[class^=\"_description_\"]"
    ],
    "containerSelectors": [
      "#document-text-content"
    ]
  },
  {
    "hostname": "www.inoreader.com",
    "selectors": [
      ".article_title"
    ],
    "containerSelectors": [
      ".article_content"
    ]
  },
  {
    "hostname": "mail.google.com",
    "selectors": [
      "h2[data-thread-perm-id]",
      "span[data-thread-id]"
    ],
    "containerSelectors": [
      "div[data-message-id]"
    ],
    "blockElements": [
      "H1",
      "H2",
      "H3",
      "H4",
      "H5",
      "H6",
      "OL",
      "P",
      "LI"
    ]
  },
  {
    "hostname": "www.producthunt.com",
    "selectors": [
      "a[data-test^='post-']",
      "h2",
      "div.layoutCompact div[class^='styles_htmlText__']"
    ]
  },
  {
    "hostname": "arxiv.org",
    "selectors": [
      "blockquote.abstract",
      "h1"
    ]
  },
  {
    "hostname": "discord.com",
    "selectors": [
      "div[id^='message-content-']"
    ]
  },
  {
    "regex": "web.telegram.org/z/",
    "selectors": [
      ".text-content"
    ]
  }
]
