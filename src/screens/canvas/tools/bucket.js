const hexToRgba = require('hex-to-rgba');

// const canvas2 = document.querySelectorAll('.activeCanvas')[0];
// const ctx = canvas2.getContext('2d');
let startR; let startG; let startB;
let colorLayerData;

export default class Bucket {
  static convertHexToRgba(hex) {
    const regExp = /(.*?)(rgb|rgba)\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)/;
    const stringColor = hexToRgba(hex);
    const result = stringColor.match(regExp);
    const rgba = {
      r: +result[3],
      g: +result[4],
      b: +result[5],
      a: +result[6],
    };
    return rgba;
  }

  static matchStartColor(pixelPos) {
    const r = colorLayerData.data[pixelPos];
    const g = colorLayerData.data[pixelPos + 1];
    const b = colorLayerData.data[pixelPos + 2];
    return (r === startR && g === startG && b === startB);
  }


  static getPixelColor(imgData, x, y) {
    const index = (y * imgData.width + x) * 4;
    const rgba = {};
    rgba.r = imgData.data[index];
    rgba.g = imgData.data[index + 1];
    rgba.b = imgData.data[index + 2];
    rgba.a = imgData.data[index + 3];
    return rgba;
  }


  static colorPixel(pixelPos, fillColor) {
    colorLayerData.data[pixelPos] = fillColor.r;
    colorLayerData.data[pixelPos + 1] = fillColor.g;
    colorLayerData.data[pixelPos + 2] = fillColor.b;
    colorLayerData.data[pixelPos + 3] = 255;
    // return;
  }

  paint(e) {
    let color;
    const x0 = e.offsetX;
    const y0 = e.offsetY;
    if (e.which === 1) {
      color = document.getElementById('colorOne');
    }
    if (e.which === 3) {
      color = document.getElementById('colorTwo');
    }
    const startX = Math.floor(x0);
    const startY = Math.floor(y0);
    const pixelStack = [[startX, startY]];
    const canvas2 = document.querySelectorAll('.activeCanvas')[0];
    const ctx = canvas2.getContext('2d');
    const canvasMini = document.querySelectorAll('.activeFrame')[0].children[0];
    const imgData = ctx.getImageData(0, 0, canvas2.width, canvas2.height);
    const rgba0 = Bucket.getPixelColor(imgData, startX, startY);
    colorLayerData = ctx.getImageData(0, 0, canvas2.width, canvas2.height);
    startR = rgba0.r;
    startG = rgba0.g;
    startB = rgba0.b;
    const fillColor = Bucket.convertHexToRgba(color.value);
    if (startR === fillColor.r && startG === fillColor.g && startB === fillColor.b) return;
    ctx.fillStyle = fillColor;

    while (pixelStack.length) {
      let newPos = [];
      let x = null;
      let y = null;
      let pixelPos = null;
      let reachLeft = null;
      let reachRight = null;
      newPos = pixelStack.pop();
      [x, y] = [newPos[0], newPos[1]];
      pixelPos = (y * canvas2.width + x) * 4;

      while (y >= 0 && Bucket.matchStartColor(pixelPos)) {
        y -= 1;
        pixelPos -= canvas2.height * 4;
      }
      pixelPos += canvas2.height * 4;
      y += 1;
      reachLeft = false;
      reachRight = false;
      while (y < canvas2.height - 1 && Bucket.matchStartColor(pixelPos)) {
        y += 1;
        Bucket.colorPixel(pixelPos, fillColor);


        if (x > 0) {
          if (Bucket.matchStartColor(pixelPos - 4)) {
            if (!reachLeft) {
              pixelStack.push([x - 1, y]);
              reachLeft = true;
            }
          } else if (reachLeft) {
            reachLeft = false;
          }
        }

        if (x < canvas2.width - 1) {
          if (Bucket.matchStartColor(pixelPos + 4)) {
            if (!reachRight) {
              pixelStack.push([x + 1, y]);
              reachRight = true;
            }
          } else if (reachRight) {
            reachRight = false;
          }
        }

        pixelPos += canvas2.width * 4;
      }
    }
    ctx.putImageData(colorLayerData, 0, 0);
    canvasMini.getContext('2d').clearRect(0, 0, canvasMini.width, canvasMini.height);
    canvasMini.getContext('2d').drawImage(canvas2, 0, 0);
  }

  paintAll(e, canvas2, canvas3, amountPx) {
    let color;
    const widthPixel = canvas2.width / amountPx;
    const ctxMini = canvas3.getContext('2d');
    const ctx = canvas2.getContext('2d');
    const x0 = e.offsetX;
    const y0 = e.offsetY;
    const startX = Math.floor(x0 / widthPixel) * widthPixel;
    const startY = Math.floor(y0 / widthPixel) * widthPixel;
    if (e.which === 1) {
      color = document.getElementById('colorOne').value;
    }
    if (e.which === 3) {
      color = document.getElementById('colorTwo').value;
    }
    const imgData = ctx.getImageData(startX, startY, 1, 1);
    const red = imgData.data[0];
    const green = imgData.data[1];
    const blue = imgData.data[2];
    for (let x = 0; x < canvas2.width; x += widthPixel) {
      for (let y = 0; y < canvas2.height; y += widthPixel) {
        const imgDataPx = ctx.getImageData(x, y, 1, 1);
        if (imgDataPx.data[0] === red && imgDataPx.data[1] === green
          && imgDataPx.data[2] === blue) {
          ctxMini.fillStyle = color;
          ctx.fillStyle = color;
          ctx.fillRect(x, y, widthPixel, widthPixel);
        }
      }
      const canvasMini = document.querySelectorAll('.activeFrame')[0].children[0];
      canvasMini.getContext('2d').drawImage(canvas2, 0, 0);
    }
  }
}
