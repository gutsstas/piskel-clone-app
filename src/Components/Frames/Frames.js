export default class Frames {
  creatFrame(canvas2) {
    const colorCanvas = window.getComputedStyle(canvas2).backgroundColor;
    const activeCanvas = document.querySelectorAll('.activeCanvas')[0];
    const frames = document.querySelectorAll('.frames')[0];
    const framesChildren = frames.children;
    for (let i = 0; i < framesChildren.length; i += 1) {
      framesChildren[i].classList.remove('activeFrame');
    }
    const ctx = activeCanvas.getContext('2d');
    ctx.clearRect(0, 0, activeCanvas.width, activeCanvas.width);
    const frame = document.createElement('div');
    frame.className = 'frame activeFrame';
    frames.appendChild(frame);
    const canvas = document.createElement('canvas');
    canvas.className = 'frame_canvas';
    canvas.width = activeCanvas.width;
    canvas.height = activeCanvas.width;
    canvas.style.background = colorCanvas;
    frame.appendChild(canvas);
    // const ctxMini = canvas.getContext('2d');
    // ctxMini.fillStyle = colorCanvas;
    // ctxMini.fillRect(0, 0, canvas.width, canvas.width);
    const del = document.createElement('div');
    del.className = 'frameButton delete';
    frame.appendChild(del);
    const move = document.createElement('div');
    move.className = 'frameButton move';
    frame.appendChild(move);
    const copy = document.createElement('div');
    copy.className = 'frameButton copy';
    frame.appendChild(copy);
  }

  draws() {
    const mainCanvas = document.querySelectorAll('.container_mainCanvas')[0];
    const canvas2 = document.querySelectorAll('.activeCanvas')[0];
    canvas2.width = '320';
    canvas2.height = '320';
    const scale = parseInt(window.getComputedStyle(mainCanvas).height, 10) / canvas2.width;
    canvas2.style.transform = `scale(${scale})`;
    canvas2.style.width = '320px';
    canvas2.style.height = '320px';
    return scale;
  }
}
