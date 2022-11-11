const enhanceMarkAttributeName = "data-translationmark";

const enhanceOriginalDisplayValueAttributeName = "data-translationoriginaldisplay";
const enhanceHtmlTagsInlineIgnore = ['BR', 'CODE', 'KBD', 'WBR'] // and input if type is submit or button, and pre depending on settings
const enhanceHtmlTagsNoTranslate = ['TITLE', 'SCRIPT', 'STYLE', 'TEXTAREA', 'SVG', 'svg'] //TODO verificar porque 'svg' é com letras minúsculas
const blockElements = [
    'H1', 'H2', 'H3', 'H4', 'H5', 'H6','TABLE',  'OL',  'UL', 'P',
  ];
if (twpConfig.get('translateTag_pre') !== 'yes') {
    blockElements.push('PRE')
}

const headingElements = ['h1' ];

const pdfSelectorsConfig =   {
    regex:
      "translatewebpages.org/result/.+$",
    selectors:[
      'div'
    ],
    style:"none",
  };

const inlineElements = [
  "a",
  "abbr",
  "acronym",
  "b",
  "bdo",
  "big",
  "br",
  "button",
  "cite",
  "code",
  "dfn",
  "em",
  "i",
  "img",
  "input",
  "kbd",
  "label",
  "map",
  "object",
  "output",
  "q",
  "samp",
  "script",
  "select",
  "small",
  "span",
  "strong",
  "sub",
  "sup",
  "textarea",
  "time",
  "tt",
  "var",
];

const translateSelectors = [
  {
    hostname:["twitter.com","tweetdeck.twitter.com","mobile.twitter.com"],
    selectors:[
     '[data-testid="tweetText"]',".tweet-text" ,".js-quoted-tweet-text"
    ]
  },
  {
    hostname:"news.ycombinator.com",
    selectors:[
      ".titleline >a",
      '.comment',
      '.toptext'

    ]
  },
  {
    hostname:"www.reddit.com",
    selectors:[
      "[data-adclicklocation=title]",
    ],
    containerSelectors:[
      "[data-testid=comment]",
      "[data-adclicklocation=media]"
    ]
  },
  {
    hostname:"old.reddit.com",
    selectors:[
      "a.title",
    ],
    containerSelectors:[
      "[role=main] .md-container"
    ]
  },
  {
    regex:"finance\.yahoo\.com\/$",
    selectors:[
      "h3"
    ]

  },
  {
    regex:["www\.bloomberg\.com\/[A-Za-z0-9]+$","www\.bloomberg\.com\/$"],
    selectors:[
      "article h3",
      "article .single-story-module__headline-link",
      "article [data-tracking-type=Story]",
      "article .story-list-story__info__headline"

    ]
  },
  pdfSelectorsConfig,
  {
    hostname:"www.cell.com",
    selectors:[
      "div.section-paragraph > div.section-paragraph > div.section-paragraph",
      "section > div.section-paragraph",
      "h4","h3","h2"
    ],
  },
  {
    // TODO
    hostname:["www.msdmanuals.com","localhost"],
    noTranslateSelectors:[
      ".d-none"
    ]
  },
  {
    hostname:"www.reuters.com",
    containerSelectors:'main',
  },
  {
    regex:"finance\.yahoo\.com/news",
    containerSelectors:"[role=article]"
  },
  {
    hostname:"www.whatsonweibo.com",
    containerSelectors:"#mvp-post-main"
  },
  {
    hostname:["www.wsj.com","www.economist.com"],
    containerSelectors:"main"
  },

  {
    hostname:["mail.jabber.org","antirez.com"],
    selectors:["pre"],
    containerSelectors: "pre",
    style: 'none'
  },
  {
    hostname:"github.com",
    containerSelectors:".markdown-body"
  },
  {
    hostname:"www.youtube.com",
    selectors:["#content-text"]
  },
  {
    hostname:"www.facebook.com",
    selectors:["div[data-ad-comet-preview=message] > div > div","div[role=article] > div > div > div > div > div > div > div > div "]
    
  },
  {
    regex:'\.substack\.com\/',
    selectors:[
      ".post-preview-title",
      ".post-preview-description"
    ],
    containerSelectors:[
      ".post"
    ]
  },
  {
    hostname:"www.nature.com",
    containerSelectors:"article"
  }

]

function addWrapperToNode(node, wrapper){
  try{

    const parent = node.parentNode;
        // set the wrapper as child (instead of the element)
    parent.replaceChild(wrapper, node);
        // set element as child of wrapper
    wrapper.appendChild(node);

  }catch(e){
    console.error('add wrapper error',e);
  }
}

function getPageSpecialConfig(ctx){
  const currentUrl = ctx.tabUrl;
  const currentUrlObj = new URL(currentUrl);
  const currentHostname = currentUrlObj.hostname;
  const currentUrlWithoutSearch = currentUrlObj.origin + currentUrlObj.pathname;
  let specialConfig = null;

  for(const enhance of translateSelectors){
    if(enhance.hostname){
      if(!Array.isArray(enhance.hostname)){
        enhance.hostname = [enhance.hostname];
      }
      if(enhance.hostname.indexOf(currentHostname) !== -1){
        return enhance;
        break;
      }
    }else if(enhance.regex){
      if(!Array.isArray(enhance.regex)){
        enhance.regex = [enhance.regex];
      }
      let isMatched = false;
      for(const regex of enhance.regex){
        const reg = new RegExp(regex);
        if(reg.test(currentUrlWithoutSearch)){
            return enhance;
        }
      }
    }
  }
  // handle nitter, there are too many domains, so we detect it by meta, and element
  // if og:sitename is "Nitter", and there is class name tweet-content, then it is nitter
  const nitterMeta = document.querySelector('meta[property="og:site_name"]');
  if(nitterMeta && nitterMeta.getAttribute('content') === 'Nitter'){
    const nitterTweetContent = document.querySelector('.tweet-content');
    if(nitterTweetContent){
      return {
        name:"nitter",
        selectors:['.tweet-content','.quote-text']
      }
    }
  }
}



function isValidNode(node){
  if(node.hasAttribute && node.hasAttribute(enhanceMarkAttributeName)){
    return false;
  }
  if(enhanceHtmlTagsInlineIgnore.indexOf(node.nodeName) !== -1 ||
  enhanceHtmlTagsNoTranslate.indexOf(node.nodeName) !== -1 ||
  node.classList.contains("notranslate") ||
  node.getAttribute("translate") === "no" ||
  node.isContentEditable) {
    return false
  }
  
  // check is parent has enhanceMarkAttributeName
  if(node.parentNode && node.parentNode.hasAttribute && node.parentNode.hasAttribute(enhanceMarkAttributeName)){
    return false;
  }
  // check ancestors
  if(node.closest && node.closest(`[${enhanceMarkAttributeName}=copiedNode]`)){
    return false;
  }

  // check is there is notranslate class
  return true;
}
function showCopyiedNodes(){
  const copiedNodes = document.querySelectorAll(`[${enhanceMarkAttributeName}="copiedNode"]`);
  for(const node of copiedNodes){
    // @ts-ignore: its ok
    if(node && node.style && node.style.display === "none"){
       // delete display
      const originalDisplay = node.getAttribute(enhanceOriginalDisplayValueAttributeName);
      if(originalDisplay){
        // @ts-ignore: its ok
        node.style.display = originalDisplay;
      } else {
        // delete display
        // @ts-ignore: its ok
        node.style.removeProperty("display");
      }
    }
  }

}
function removeCopyiedNodes(){
  const copiedNodes = document.querySelectorAll(`[${enhanceMarkAttributeName}="copiedNode"]`);
  for(const node of copiedNodes){
    node.remove()
  }
}


function isBody(el) {
  return document.body === el;
}
function isDuplicatedChild(array,child){
  for(const item of array){
    if(item.contains(child)){
      return true;
    }
  }
  return false;
}
function getNodesThatNeedToTranslate(root,ctx,options){
  options = options || {};
  const pageSpecialConfig = getPageSpecialConfig(ctx);
  const twpConfig = ctx.twpConfig
  const isShowDualLanguage = twpConfig.get("isShowDualLanguage")==='no'?false:true;
  const allBlocksSelectors = pageSpecialConfig && pageSpecialConfig.selectors || []
  const noTranslateSelectors = pageSpecialConfig && pageSpecialConfig.noTranslateSelectors || []
  if(noTranslateSelectors.length > 0){
    const noTranslateNodes = root.querySelectorAll(noTranslateSelectors.join(","));
    for(const node of noTranslateNodes){
      // add class notranslate
      // node.classList.add("notranslate");
      // add parent placeholder for position
      const placeholder = document.createElement("span");
      placeholder.classList.add("notranslate");
      addWrapperToNode(node,placeholder);
    }
  }


  // all block nodes, nodes should have a order from top to bottom
  let allNodes = [];

  const currentUrl = ctx.tabUrl;
  const currentUrlObj = new URL(currentUrl);
  const currentUrlWithoutSearch = currentUrlObj.origin + currentUrlObj.pathname;
  const currentHostname = currentUrlObj.hostname;
  let currentTargetLanguage = twpConfig.get("targetLanguage")

  // check sites
  if(allBlocksSelectors.length>0){
    for(const selector of allBlocksSelectors){
      const nodes = root.querySelectorAll(selector);
      for(const node of nodes){
        if(currentHostname==="twitter.com" || currentHostname==="twitterdesk.twitter.com" || currentHostname==="mobile.twitter.com"){
          // check language
          try{
            const lang = node.getAttribute("lang");
            if(lang &&  currentTargetLanguage.startsWith(lang)){
              continue;
            }
          }catch(e){
            // ignore
            // console.log("e", e)
          }
        }

        if(isValidNode(node) && !isDuplicatedChild(allNodes,node)){
          allNodes.push(node);
        }
      }
    }
  }


  if((pageSpecialConfig && pageSpecialConfig.containerSelectors) || allBlocksSelectors.length === 0){
    const originalRoot = root;
    const contentContainers = getContainers(root,pageSpecialConfig);
    let containers = [root]
    if(contentContainers && Array.isArray(contentContainers)){
      containers = contentContainers;
    }  
    for(const root of containers){
      for(const blockTag of blockElements){
        const paragraphs = root.querySelectorAll(blockTag.toLowerCase());
        for (const paragraph of paragraphs) {
          if(isValidNode(paragraph) && !isDuplicatedChild(allNodes,paragraph)){
            allNodes.push(paragraph);
          }
        }
      }
      if(!pageSpecialConfig || !pageSpecialConfig.containerSelectors){
       // add addition heading nodes
        for(const headingTag of headingElements){
          const headings = originalRoot.querySelectorAll(headingTag.toLowerCase());
          for (const heading of headings) {
            if(isValidNode(heading)){
              // check if there is already exist in allNodes
              let isExist = false;
              for(const node of allNodes){
                if(node === heading){
                  isExist = true;
                  break;
                }
              }
              if(!isExist){
               allNodes.push(heading);
              }
            }
          }
        }
      }
    }
  }


  // sort allNodes, from top to bottom
  allNodes.sort(function(a, b) {
    return a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
  })

  if(!isShowDualLanguage){
      return allNodes;
  }

  // is pdf, if pdf, then treat it as a special case
  const isPdf = new RegExp(pdfSelectorsConfig.regex).test(currentUrlWithoutSearch);
  if(isPdf){
    // add flex container to div
    for(const node of allNodes){
      const parent = node.parentNode;
      const pdfContainer = document.createElement("div");
      pdfContainer.style.display = "flex";
      addWrapperToNode(node,pdfContainer);
    }
  }

  for(const node of allNodes){
    // check if there is a copy already
    const previousSibling = node.previousSibling;
    // console.log("previousSibling.hasAttribute(markAttributeName)", previousSibling.hasAttribute(markAttributeName))
    if(!previousSibling || !previousSibling.hasAttribute || !previousSibling.hasAttribute(enhanceMarkAttributeName)){
      // add 
      let copyNode = node.cloneNode(true);
      if(inlineElements.includes(copyNode.nodeName.toLowerCase())){
        // add a space
        copyNode.style.paddingRight = "8px";
      }else{
        copyNode.style.paddingBottom = "8px";
      }
      // get original display value
      let originalDisplay = node.style.display;
      // if nitter
      if(pageSpecialConfig && pageSpecialConfig.name && pageSpecialConfig.name === "nitter"){
        // display to block
        originalDisplay = "block";
      }
      formatCopiedNode(copyNode,originalDisplay,ctx,pageSpecialConfig);
      if(ctx.tabHostName === "www.youtube.com"){
        // special, we need to insert all children of the copied node to node
        const copiedChildren = copyNode.childNodes;
        const firstNode = node.childNodes[0];
        for(let copiedChild of copiedChildren){
          // if copiedChildNode is a text node, add span wrapper
          if(copiedChild.nodeType === Node.TEXT_NODE){
            const span = document.createElement("span");
            span.appendChild(copiedChild);
            copiedChild = span;
          }
          formatCopiedNode(copiedChild,undefined,ctx,pageSpecialConfig);
          node.insertBefore(copiedChild,firstNode);
        }
        // new line span node
        const newLineSpan = document.createElement("span");
        newLineSpan.innerHTML = "\n";
        formatCopiedNode(newLineSpan,undefined,ctx,pageSpecialConfig);
        node.insertBefore(newLineSpan,firstNode);
      }else{
        node.parentNode.insertBefore(copyNode, node)
      }
    }
  }
  // copy 
  return allNodes;
}

// get the main container, copy from: https://github.com/ZachSaucier/Just-Read/blob/master/content_script.js

function getContainers(root,pageSpecialConfig){ 
    if(pageSpecialConfig && pageSpecialConfig.containerSelectors){
      // is array
      if(!Array.isArray(pageSpecialConfig.containerSelectors)){
        pageSpecialConfig.containerSelectors = [pageSpecialConfig.containerSelectors];
      }
      let containers =[];
      for(const selector of pageSpecialConfig.containerSelectors){
          const allContainer = root.querySelectorAll(pageSpecialConfig.containerSelectors);
          if(allContainer){
            for(const container of allContainer){
              containers.push(container);
            } 
          }
      }
      return containers.length>0?containers:null;
    }

    if(!(root && root.innerText)){
      return null
    }
    // role=main
    // const main = root.querySelector("[role=main]");
    // if(main){
    //   return main;
    // }
    let selectedContainer;
    const matched =  root.innerText.match(/\S+/g);
    const numWordsOnPage =matched?matched.length:0;
    let ps = root.querySelectorAll("p");

    // Find the paragraphs with the most words in it
    let pWithMostWords = root,
        highestWordCount = 0;

    if(ps.length === 0) {
        ps = root.querySelectorAll("div");
    }

    ps.forEach(p => {
        if(checkAgainstBlacklist(p, 3) // Make sure it's not in our blacklist
        && p.offsetHeight !== 0) { //  Make sure it's visible on the regular page
            const myInnerText = p.innerText.match(/\S+/g);
            if(myInnerText) {
                const wordCount = myInnerText.length;
                if(wordCount > highestWordCount) {
                    highestWordCount = wordCount;
                    pWithMostWords = p;
                }
            }
        }

    });

    // Keep selecting more generally until over 2/5th of the words on the page have been selected
    selectedContainer = pWithMostWords;
    let wordCountSelected = highestWordCount;

    while(wordCountSelected / numWordsOnPage < 0.4
    && selectedContainer != root
    && selectedContainer.parentElement && selectedContainer.parentElement.innerText) {
        selectedContainer = selectedContainer.parentElement;
        wordCountSelected = selectedContainer.innerText.match(/\S+/g).length;
    }

    // Make sure a single p tag is not selected
    if(selectedContainer.tagName === "P") {
        selectedContainer = selectedContainer.parentElement;
    }

    return [selectedContainer];
}

// Check given item against blacklist, return null if in blacklist
const blacklist = ["comment"];
function checkAgainstBlacklist(elem, level) {
    if(elem && elem != null) {
        const className = elem.className,
              id = elem.id;

        const isBlackListed = blacklist.map(item => {
            if((typeof className === "string" && className.indexOf(item) >= 0)
            || (typeof id === "string" && id.indexOf(item) >= 0)
            ) {
                return true;
            }
        }).filter(item => item)[0];

        if(isBlackListed) {
            return null;
        }

        const parent = elem.parentElement;
        if(level > 0 && parent && !parent.isSameNode(document.body)) {
            return checkAgainstBlacklist(parent, --level);
        }
    }

    return elem;
}
function getStyle(el) {
  return window.getComputedStyle(el)
}

function formatCopiedNode(copyNode,originalDisplay,ctx,pageSpecialConfig){
      copyNode.setAttribute(enhanceMarkAttributeName, "copiedNode");
      // add data-translationoriginaldisplay
      if(originalDisplay){
        copyNode.setAttribute(enhanceOriginalDisplayValueAttributeName, originalDisplay);
      }
      // add display none
      copyNode.style.display = "none";
      // add notranslate class
      copyNode.classList.add("notranslate");
      const twpConfig = ctx.twpConfig;
      const isShowDualLanguage = twpConfig.get("isShowDualLanguage")==='no'?false:true;
      if (isShowDualLanguage && (!pageSpecialConfig || pageSpecialConfig.style!=="none")) {
        let customDualStyle = twpConfig.get("customDualStyle");
        let dualStyle = customDualStyle || twpConfig.get("dualStyle") || 'underline';
        if(pageSpecialConfig && pageSpecialConfig.style){
          dualStyle = pageSpecialConfig.style;
        }
        if (dualStyle === 'mask') {
          copyNode.classList.add("immersive-translate-mask-next-sibling");
        }
      }
}

function addStyle(){
  try{

  // important style
  var css = '.immersive-translate-mask-next-sibling + *{filter:blur(5px);transition: filter 0.1s ease; } .immersive-translate-mask-next-sibling + *:hover {filter:none !important;}';
  var style = document.createElement('style');
  if (style.styleSheet) {
      style.styleSheet.cssText = css;
  } else {
      style.appendChild(document.createTextNode(css));
  }
  document.getElementsByTagName('head')[0].appendChild(style);
  }catch(e){
    // ignore
  }
}

addStyle()
