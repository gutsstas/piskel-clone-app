let scale;
export default class СhangeSizeCanvas {
  work(sizeCanvas) {
    const canvasMiniActive = document.querySelectorAll('.activeFrame')[0].children[0];
    const canvasMini = document.querySelectorAll('.frame_canvas');
    const canvas = document.querySelectorAll('.activeCanvas')[0];
    const mainCanvas = document.querySelectorAll('.container_mainCanvas')[0];
    const previewCanvas = document.querySelectorAll('.previewCanvas')[0];
    canvas.style.width = `${sizeCanvas * 10}px`;
    canvas.style.height = `${sizeCanvas * 10}px`;
    canvas.width = `${sizeCanvas * 10}`;
    canvas.height = `${sizeCanvas * 10}`;
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    canvas.getContext('2d').drawImage(canvasMiniActive, 0, 0);
    previewCanvas.width = canvas.width;
    previewCanvas.height = canvas.height;

    for (let i = 0; i < canvasMini.length; i += 1) {
      const newCanvas = document.createElement('canvas');
      const context = newCanvas.getContext('2d');
      newCanvas.width = canvasMini[i].width;
      newCanvas.height = canvasMini[i].height;
      context.drawImage(canvasMini[i], 0, 0);
      canvasMini[i].width = canvas.width;
      canvasMini[i].height = canvas.height;
      canvasMini[i].getContext('2d').clearRect(0, 0, canvasMini[i].width, canvasMini[i].height);
      canvasMini[i].getContext('2d').drawImage(newCanvas, 0, 0);
    }
    scale = parseInt(window.getComputedStyle(mainCanvas).height, 10) / canvas.width;
    canvas.style.transform = `scale(${scale})`;
    return scale;
  }
}
