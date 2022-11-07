const enhanceMarkAttributeName = "data-translationmark";

const enhanceOriginalDisplayValueAttributeName = "data-translationoriginaldisplay";
const enhanceHtmlTagsInlineIgnore = ['BR', 'CODE', 'KBD', 'WBR'] // and input if type is submit or button, and pre depending on settings
const enhanceHtmlTagsNoTranslate = ['TITLE', 'SCRIPT', 'STYLE', 'TEXTAREA', 'SVG', 'svg'] //TODO verificar porque 'svg' é com letras minúsculas
const blockElements = [
    'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'OL',  'P', 'TABLE', 'UL'
  ];

const pdfSelectorsConfig =   {
    regex:
      "translatewebpages.org/result/.+$",
    selectors:[
      'div'
    ]
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
    hostname:"twitter.com",
    selectors:[
     '[data-testid="tweetText"]' 
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
      "h3",
      "p"
    ]
  },
  {
    hostname:"old.reddit.com",
    selectors:[
      "a.title",
      ".usertext-body"
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
  pdfSelectorsConfig

]

const containerSelectorConfigs = [
  {
    regex:"finance\.yahoo\.com/news",
    selector:"[role=article]"
  }
]

function getAllBlocksSelectors(){
  const currentUrl = window.location.href;
  const currentUrlObj = new URL(currentUrl);
  const currentHostname = currentUrlObj.hostname;
  const currentUrlWithoutSearch = currentUrlObj.origin + currentUrlObj.pathname;
    let allNodesSelectors = [];

  for(const enhance of translateSelectors){
    if(enhance.hostname){
      if(!Array.isArray(enhance.hostname)){
        enhance.hostname = [enhance.hostname];
      }
      if(enhance.hostname.indexOf(currentHostname) !== -1){
        allNodesSelectors = enhance.selectors;
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
            allNodesSelectors = enhance.selectors;
            isMatched = true;
            break;
        }
      }
      if(isMatched){
        break;
      }
    }
  }
  return allNodesSelectors;
}
const allBlocksSelectors = getAllBlocksSelectors();

function getContainerSelector(){
    const currentUrl = window.location.href;
    const currentUrlObj = new URL(currentUrl);
    const currentUrlWithoutSearch = currentUrlObj.origin + currentUrlObj.pathname;
    const currentHostname = currentUrlObj.hostname;
    for(const containerSelector of containerSelectorConfigs){
      if(containerSelector.hostname && containerSelector.hostname === currentHostname){
        const container = document.querySelector(containerSelector.selector);
        return container;
      }else if(containerSelector.regex && new RegExp(containerSelector.regex).test(currentUrlWithoutSearch)){
        const container = document.querySelector(containerSelector.selector);
        if(container){
          return container;
        }
      }
    }
}
const containerSelector = getContainerSelector();

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
let isInitedTitle = false;
function getTitleContainer(root,hostname){
  if(!isInitedTitle){
    
    if(hostname==='news.yahoo.com'){
    let ele = document.querySelector('h1[data-test-locator="headline"]');
      if(ele){
        isInitedTitle = true;
        return ele;
      }else{
        return null;
      }
    }else{
      let ele = document.querySelector('h1');
      if(ele){
        isInitedTitle = true;
        return ele;
      }else{
        return null;
      }
    }
  
  }
}
function getNodesThatNeedToTranslate(root,hostname,options){
  options = options || {};
  // all block nodes, nodes should have a order from top to bottom
  let allNodes = [];

  const currentUrl = window.location.href;
  const currentUrlObj = new URL(currentUrl);
  const currentUrlWithoutSearch = currentUrlObj.origin + currentUrlObj.pathname;
  const currentHostname = currentUrlObj.hostname;
  let currentTargetLanguage = twpConfig.get("targetLanguage")

  // check sites
  if(allBlocksSelectors.length>0){
    for(const selector of allBlocksSelectors){
      const nodes = root.querySelectorAll(selector);
      for(const node of nodes){
        if(hostname==="twitter.com"){
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

        if(isValidNode(node)){
          allNodes.push(node);
        }
      }
    }
  }else{
    const titleContainer = getTitleContainer(root,hostname);
    if(titleContainer){
      allNodes.push(titleContainer);
    }
    // }
    const contentContainer = getContainer(root);
    if(contentContainer){
      // get all paragraphs
      for(const blockTag of blockElements){
        const paragraphs = contentContainer.querySelectorAll(blockTag.toLowerCase());
        for (const paragraph of paragraphs) {
          if(isValidNode(paragraph)){
            allNodes.push(paragraph);
          }
        }
      }
    }else{
      for(const blockTag of blockElements){
        const paragraphs = root.querySelectorAll(blockTag.toLowerCase());
        for (const paragraph of paragraphs) {
          if(isValidNode(paragraph)){
            allNodes.push(paragraph);
          }
        }
      }
    }
  }
  // sort allNodes, from top to bottom
  allNodes.sort(function(a, b) {
    return a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
  })

  // is pdf, if pdf, then treat it as a special case
  const isPdf = new RegExp(pdfSelectorsConfig.regex).test(currentUrlWithoutSearch);
  if(isPdf){
    // add flex container to div
    for(const node of allNodes){
      const parent = node.parentNode;
      const pdfContainer = document.createElement("div");
      pdfContainer.style.display = "flex";
      // set the wrapper as child (instead of the element)
      parent.replaceChild(pdfContainer, node);
      // set element as child of wrapper
      pdfContainer.appendChild(node);
    }
  }

  for(const node of allNodes){
    // check if there is a copy already
    const previousSibling = node.previousSibling;
    // console.log("previousSibling.hasAttribute(markAttributeName)", previousSibling.hasAttribute(markAttributeName))
    if(!previousSibling || !previousSibling.hasAttribute || !previousSibling.hasAttribute(enhanceMarkAttributeName)){
      const copyNode = node.cloneNode(true);
      if(inlineElements.includes(copyNode.nodeName.toLowerCase())){
        // add a space
        copyNode.style.paddingRight = "8px";
      }else{
        copyNode.style.paddingBottom = "8px";
      }
      copyNode.setAttribute(enhanceMarkAttributeName, "copiedNode");
      // get original display value
      const originalDisplay = node.style.display;
      // add data-translationoriginaldisplay
      if(originalDisplay){
        copyNode.setAttribute(enhanceOriginalDisplayValueAttributeName, originalDisplay);
      }
      // add display none
      copyNode.style.display = "none";
      // add notranslate class
      copyNode.classList.add("notranslate");
      node.parentNode.insertBefore(copyNode, node)
    }
  }
  // copy 
  return allNodes;
}

// get the main container, copy from: https://github.com/ZachSaucier/Just-Read/blob/master/content_script.js

function getContainer(root) {
    
    if(containerSelector){
      const container = root.querySelector(containerSelector);
      if(container){
        return container;
      }
    }

    if(!(root && root.innerText)){
      return null
    }
    let selectedContainer;
    const numWordsOnPage = root.innerText.match(/\S+/g).length;
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
    && selectedContainer.parentElement.innerText) {
        selectedContainer = selectedContainer.parentElement;
        wordCountSelected = selectedContainer.innerText.match(/\S+/g).length;
    }

    // Make sure a single p tag is not selected
    if(selectedContainer.tagName === "P") {
        selectedContainer = selectedContainer.parentElement;
    }

    return selectedContainer;
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
