let x1; let y1;


export default class Move {
  work(e) {
    const canvas2 = document.querySelectorAll('.activeCanvas')[0];
    x1 = e.offsetX;
    y1 = e.offsetY;
    const newCanvas = document.createElement('canvas');
    const context = newCanvas.getContext('2d');
    newCanvas.width = canvas2.width;
    newCanvas.height = canvas2.height;
    context.drawImage(canvas2, 0, 0);
    canvas2.onmousemove = (event) => {
      const x2 = event.offsetX;
      const y2 = event.offsetY;
      canvas2.getContext('2d').clearRect(0, 0, canvas2.width, canvas2.height);
      canvas2.getContext('2d').drawImage(newCanvas, x2 - x1, y2 - y1);
    };
    canvas2.addEventListener('mouseup', () => {
      const canvasMini = document.querySelectorAll('.activeFrame')[0].children[0];
      canvas2.onmousemove = null;
      canvasMini.getContext('2d').clearRect(0, 0, canvasMini.width, canvasMini.height);
      canvasMini.getContext('2d').drawImage(canvas2, 0, 0);
    });
  }

  rotate() {
    const canvas3 = document.querySelectorAll('.activeFrame')[0].children[0];
    const canvas2 = document.querySelectorAll('.activeCanvas')[0];
    const ctx = canvas2.getContext('2d');
    const ctxMini = canvas3.getContext('2d');
    ctx.save();
    ctx.clearRect(0, 0, canvas2.width, canvas2.width);
    ctx.translate(canvas2.width / 2, canvas2.width / 2);
    ctx.rotate((Math.PI / 180) * 90);
    ctx.drawImage(canvas3, -canvas2.width / 2, -canvas2.width / 2);
    ctxMini.clearRect(0, 0, canvas3.width, canvas3.width);
    ctxMini.drawImage(canvas2, 0, 0);
    ctx.restore();
  }

  flip() {
    const canvas3 = document.querySelectorAll('.activeFrame')[0].children[0];
    const canvas2 = document.querySelectorAll('.activeCanvas')[0];
    const ctx = canvas2.getContext('2d');
    const ctxMini = canvas3.getContext('2d');
    ctx.save();
    ctx.clearRect(0, 0, canvas2.width, canvas2.width);
    ctx.scale(-1, 1);
    ctx.drawImage(canvas3, -canvas2.width, 0);
    ctxMini.clearRect(0, 0, canvas3.width, canvas3.width);
    ctxMini.drawImage(canvas2, 0, 0);
    ctx.restore();
  }
}
