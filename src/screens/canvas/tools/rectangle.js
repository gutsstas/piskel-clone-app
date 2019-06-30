const rectangle = document.querySelectorAll('.rectangle')[0];

export default class Rectangle {
  workMouseMove(e, amountPx) {
    let color;
    if (e.which === 1) {
      color = document.getElementById('colorOne').value;
    }
    if (e.which === 3) {
      color = document.getElementById('colorTwo').value;
    }
    const canvas2 = document.querySelectorAll('.activeCanvas')[0];
    const ctx = canvas2.getContext('2d');
    ctx.fillStyle = color;
    const widthPixel = canvas2.width / amountPx;
    const x1 = e.offsetX;
    const y1 = e.offsetY;
    const coordX1 = Math.floor(x1 / widthPixel);
    const coordY1 = Math.floor(y1 / widthPixel);
    const startX = coordX1 * widthPixel;
    const startY = coordY1 * widthPixel;
    canvas2.onmousemove = (event) => {
      const canvas3 = document.querySelectorAll('.activeFrame')[0].children[0];
      const x2 = event.offsetX;
      const y2 = event.offsetY;
      const coordX2 = Math.floor(x2 / widthPixel);
      const coordY2 = Math.floor(y2 / widthPixel);
      const endX = coordX2 * widthPixel;
      const endY = coordY2 * widthPixel;
      ctx.clearRect(0, 0, canvas2.width, canvas2.width);
      canvas2.getContext('2d').drawImage(canvas3, 0, 0);
      ctx.fillRect(startX, startY, endX - startX, widthPixel);
      ctx.fillRect(startX, startY, widthPixel, endY - startY);
      ctx.fillRect(endX + widthPixel, endY, startX - endX - widthPixel, widthPixel);
      ctx.fillRect(endX, endY, widthPixel, startY - endY);
      canvas2.addEventListener('mouseup', () => {
        canvas2.onmousemove = null;
        if (rectangle.classList.contains('activeTool')) {
          const canvasMini = document.querySelectorAll('.activeFrame')[0].children[0];
          canvasMini.getContext('2d').drawImage(canvas2, 0, 0);
          canvasMini.getContext('2d').drawImage(canvas2, 0, 0);
          canvas2.getContext('2d').clearRect(0, 0, canvas2.width, canvas2.width);
          canvas2.getContext('2d').drawImage(canvasMini, 0, 0);
        }
      });
    };
  }
}
