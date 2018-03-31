/**
 * @param  {String} url
 * @param  {Object} data
 * @return {[type]}
 */
let entry = {};
function report(url,data){
  if (!url||!data) {
    return
  }
  const image = document.createElement('img');
  let items=[];
  for(let key in data){
    if (data[key]) {
      items.push(`${key}=${encodeURIComponent(data[key])}`)
    }
  }
  const name = `img_${new Date()}`;
  entry[name]=image;
  imgae.onload = image.onerror = function(){
    entry[name]=
    image=
    image.onload=
    image.onerror = null
    delete entry[name]
  }
  image.src = `${url}/_ga.png${url.indexOf('?')<0?'?':'&'}${items.join('&')}`
}

export default report;
