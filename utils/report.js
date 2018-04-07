/**
 * @param  {Object} data
 * @return {[type]}
 */
let entry = {};

function report(data) {
  const url = `http://127.0.0.1:3003`;
  if (!data) {
    return
  }
  let image = document.createElement('img');
  let items = [];
  for (let key in data) {
    if (data[key]) {
      items.push(`${key}=${JSON.stringify(data[key])}`)
    }
  }
  const name = `img_${new Date()}`;
  entry[name] = image;
  image.onload = image.onerror = function() {
    entry[name] =
      image =
      image.onload =
      image.onerror = null
    delete entry[name]
  }
  image.src = `${url}/_ga.png${url.indexOf('?')<0?'?':'&'}${items.join('&')}`
}

export default report;