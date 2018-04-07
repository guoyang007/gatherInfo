import Cookies from 'js-cookie';
import report from './report.js';
/**
 * @return {Object}
 */
(window.onload=function(){
  collect();
})()

function collect() {
  let params = {};
  if (document) {
    params.domain = document.domain || '';
    params.url = document.URL || '';
    params.title = document.title || '';
    params.referrer = document.referrer || '';
  }
  if (window && window.screen) {
    params.screenHeight = window.screen.height || 0;
    params.screenWidth = window.screen.width || 0;
    params.screenColorDepth = window.screen.colorDepth || 0;
  }
  if (navigator) {
    params.lang = navigator.language || '';
  }

  global.ga = function(type, ...params) {
    if (type == 'create') {
      // TODO:the real user with _ga_account should be connected
      let _ga_account = Cookies.get(_ga_account);
      if (_ga_account) {
        params.user = _ga_account
      } else {
        let mark = `UA-${Math.random().toString(36).substr(2)}`
        Cookies.set('_ga_account', mark);
        params.user = mark;
      }
    }
    if (type == 'send') {
      report(params);
    }
  }

  // TODO: add eventListner to document to track the interactions
  window.addEventListener('click', function(e) {
    let target = e.target;
    const innerDocument = window.frames["epubContentIframe"].contentWindow.document;
    let currentUrl = innerDocument.location.href;
    let currentTitle = innerDocument.title;
    report({
      verb: {
        display: {
          "en-GB": "experienced"
        }
      },
      object: {
        id: currentUrl,
        definition: {
          name: {
            "en-GB": currentTitle
          }
        }
      }
    })
  })
  // TODO
  setTimeout(function(){
    document.getElementById('epubContentIframe').onload=function(){
      window.frames["epubContentIframe"].contentWindow.addEventListener('click', function(e) {
        let target = e.target;
        const innerDocument = window.frames["epubContentIframe"].contentWindow.document;
        let currentUrl = innerDocument.location.href;
        let currentTitle = innerDocument.title;
        report({
          verb: {
            display: {
              "en-GB": "experienced"
            }
          },
          object: {
            id: currentUrl,
            definition: {
              name: {
                "en-GB": currentTitle
              }
            }
          }
        })
        console.log('\n*******report************\n')
      })
    }
  },1000)
  

  window.addEventListener('mousedown', function(e) {

  })

  window.addEventListener('keydown', function(e) {

  })
  // TODO: page view time
  // refer to: https://blog.csdn.net/hxyascx/article/details/53374028

}