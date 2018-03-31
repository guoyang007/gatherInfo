import Cookies from 'js-cookie';
import Report from './report.js';
/**
 * @return {Object}
 */
function collect(){
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

  global.ga = function(type,...params){
    if (type == 'create') {
      // TODO:the real user with _ga_account should be connected
      let _ga_account = Cookies.get(_ga_account);
      if(_ga_account){
        params.user = _ga_account
      }else{
        let mark = `UA-${Math.random().toString(36).substr(2)}`
        Cookies.set('_ga_account',mark);
        params.user = mark;
      }
    }
    if (type == 'send') {
      Report(`the url gatherinfo deployed`, params);
    }
  }

  // TODO: add eventListner to document to track the interactions

  // TODO: page view time
  
}