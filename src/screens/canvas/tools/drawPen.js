const canvas2 = document.querySelectorAll('.activeCanvas')[0];
const mirror = document.querySelectorAll('.mirror')[0];
let color;
const eraser = document.querySelectorAll('.eraser')[0];
const pen = document.querySelectorAll('.pen')[0];
const dithering = document.querySelectorAll('.dithering')[0];
const lighten = document.querySelectorAll('.lighten')[0];

export default class DrawPen {
  work(e, size, amountPx) {
    if (e.which === 1) {
      color = document.getElementById('colorOne').value;
    }
    if (e.which === 3) {
      color = document.getElementById('colorTwo').value;
    }
    let x0 = e.offsetX;
    let y0 = e.offsetY;
    const canvas3 = document.querySelectorAll('.activeFrame')[0].children[0];
    const ctxMini = canvas3.getContext('2d');
    const widthPixel = canvas2.width / amountPx;
    let x1 = null;
    let y1 = null;
    let coordX = null;
    let coordY = null;
    const ctx = canvas2.getContext('2d');

    canvas2.onmousemove = (event) => {
      x1 = event.offsetX;
      y1 = event.offsetY;
      const dx = Math.abs(x1 - x0);
      const dy = Math.abs(y1 - y0);
      const sx = x0 < x1 ? 1 : -1;
      const sy = y0 < y1 ? 1 : -1;
      let err = dx - dy;

      while (true) {
        coordX = Math.floor(x0 / widthPixel);
        coordY = Math.floor(y0 / widthPixel);
        ctx.fillStyle = color;
        ctxMini.fillStyle = color;
        let startX = coordX * widthPixel - widthPixel;
        let startY = coordY * widthPixel - widthPixel;
        if (size === 1) {
          startX = coordX * widthPixel;
          startY = coordY * widthPixel;
        }
        if (pen.classList.contains('activeTool') || mirror.classList.contains('activeTool')) {
          ctx.fillRect(startX, startY, widthPixel * size, widthPixel * size);
          ctxMini.fillRect(startX, startY, widthPixel * size, widthPixel * size);
        }

        if (mirror.classList.contains('activeTool')) {
          startX = coordX * widthPixel + widthPixel;
          if (size === 3) {
            startX = coordX * widthPixel + 2 * widthPixel;
          }
          if (size === 4) {
            startX = coordX * widthPixel + 3 * widthPixel;
          }
          ctx.fillRect(canvas2.width - startX, startY, widthPixel * size, widthPixel * size);
          ctxMini.fillRect(canvas2.width - startX,
            startY, widthPixel * size, widthPixel * size);
        }
        if (eraser.classList.contains('activeTool')) {
          ctx.clearRect(startX, startY, widthPixel * size, widthPixel * size);
          ctxMini.clearRect(startX, startY, widthPixel * size, widthPixel * size);
        }

        if (dithering.classList.contains('activeTool')) {
          startX = coordX * widthPixel;
          startY = coordY * widthPixel;
          if ((startX % 20 === 0 && startY % 20 === 0)
          || (startX % 20 !== 0 && startY % 20 !== 0)) {
            ctx.fillStyle = document.getElementById('colorOne').value;
            ctxMini.fillStyle = document.getElementById('colorOne').value;
            ctx.fillRect(startX, startY, widthPixel, widthPixel);
            ctxMini.fillRect(startX, startY, widthPixel, widthPixel);
          } else {
            ctx.fillStyle = document.getElementById('colorTwo').value;
            ctxMini.fillStyle = document.getElementById('colorTwo').value;
            ctx.fillRect(startX, startY, widthPixel, widthPixel);
            ctxMini.fillRect(startX, startY, widthPixel, widthPixel);
          }
        }
        if (lighten.classList.contains('activeTool')) {
          const imgData = ctx.getImageData(startX, startY, 1, 1);
          const arrColor = [];
          if ((imgData.data[0] === 0 && imgData.data[1] === 0
            && imgData.data[2] === 0 && imgData.data[3] === 0)) return;
          for (let i = 0; i < 4; i += 1) {
            if (imgData.data[i] === 0) imgData.data[i] = 10;
            arrColor.push(imgData.data[i]);
            color = `rgba(${arrColor[0] * 1.05}, ${arrColor[1] * 1.05}, ${arrColor[2] * 1.05})`;
            ctx.fillStyle = color;
            ctx.fillRect(startX, startY, widthPixel, widthPixel);
            ctxMini.fillRect(startX, startY, widthPixel, widthPixel);
          }
        }
        if (x0 === x1 && y0 === y1) break;
        const err2 = 2 * err;
        if (err2 > -dy) {
          err -= dy;
          x0 += sx;
        }
        if (err2 < dx) {
          err += dx;
          y0 += sy;
        }
      }
    };
    document.addEventListener('mouseup', () => {
      canvas2.onmousemove = null;
    });
  }
}
