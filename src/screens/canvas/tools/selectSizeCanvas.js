import СhangeSizeCanvas from './changeSizeCanvas';

const containerSizeCanvas = document.querySelectorAll('.container_sizeCanvas')[0];
let amountPx;
let scale;
export default class SelectSizeCanvas {
  work(e) {
    const sizeCanvasPreview = document.querySelectorAll('.sizeCanvasPreview')[0];

    const changeSizeCanvasClass = new СhangeSizeCanvas();
    for (let i = 0; i < containerSizeCanvas.children.length; i += 1) {
      containerSizeCanvas.children[i].classList.remove('activeSizeCanvas');
    }
    if (e.target.classList.contains('sizeCanvas')) {
      e.target.classList.add('activeSizeCanvas');
    }
    if (e.target.classList.contains('32x32')) {
      amountPx = 32;
      scale = changeSizeCanvasClass.work(amountPx);
      sizeCanvasPreview.innerHTML = '32x32';
    }
    if (e.target.classList.contains('64x64')) {
      amountPx = 64;
      scale = changeSizeCanvasClass.work(amountPx);
      sizeCanvasPreview.innerHTML = '64x64';
    }
    if (e.target.classList.contains('128x128')) {
      amountPx = 128;
      scale = changeSizeCanvasClass.work(amountPx);
      sizeCanvasPreview.innerHTML = '128x128';
    }
    return {
      am: amountPx,
      sc: scale,
    };
  }
}
