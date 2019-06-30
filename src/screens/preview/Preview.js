import GIF from 'gif.js.optimized';

let timerId = setInterval(() => {}, 1000);

export default class Frames {
  fun() {
    const range = document.querySelectorAll('.range')[0];
    const valueRange = document.querySelectorAll('.valueRange')[0];
    valueRange.innerHTML = range.value;
    const fps = range.value;
    let count = 0;
    function draw() {
      if (fps > 0) {
        const arrayCanvasFrame = document.querySelectorAll('.frame');
        const n = arrayCanvasFrame.length;
        const previewCanvas = document.querySelectorAll('.previewCanvas')[0];
        const ctx = previewCanvas.getContext('2d');
        ctx.clearRect(0, 0, previewCanvas.width, previewCanvas.width);
        if (arrayCanvasFrame[count].children[0]) {
          ctx.drawImage(arrayCanvasFrame[count].children[0], 0, 0);
          if (count === n - 1) {
            count = 0;
          } else {
            count += 1;
          }
        }
      }
    }
    clearInterval(timerId);
    timerId = setInterval(draw, 1000 / fps);
  }

  fullScreen() {
    const preview = document.querySelectorAll('.previewCanvas')[0];
    if (preview.fullscreenElement) {
      preview.exitFullscreen();
    } else {
      preview.requestFullscreen();
    }
  }

  imortGIF() {
    const range = document.querySelectorAll('.range')[0];
    const frameCanvas = document.querySelectorAll('.frame_canvas');
    const save = document.querySelectorAll('.save')[0];
    save.innerHTML = '';
    const gif = new GIF({
      workers: 2,
      workerScript: './dist/gif.worker.js',
      quality: range.value,
      repeat: 0,
      width: frameCanvas[0].width,
      height: frameCanvas[0].height,
      background: frameCanvas[0].style.background,
    });
    for (let i = 0; i < frameCanvas.length; i += 1) {
      gif.addFrame(frameCanvas[i], { delay: range.value });
    }
    gif.on('finished', (blob) => {
      save.href = URL.createObjectURL(blob);
      save.innerHTML = 'Download';
    });
    gif.render();
  }
}
