const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

function createEmptyImage(){
  let outputPath = path.resolve(__dirname,'../_ga.png');
  if(fs.existsSync(outputPath)){
    return
  }
  sharp({
    create:{
      width:1,
      height:1,
      channels: 4,
      background: { r: 255, g: 0, b: 0, alpha: 128 }
    }
  })
  .toFile(outputPath,function(err,info){
    if (err) {
      throw Error(`create img err: ${err}`)
      return
    }
    console.log(`create img: ${info}`)
  })
}

export default createEmptyImage;
