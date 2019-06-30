export default class Circle {
  work(e, amountPx) {
    let color;
    if (e.which === 1) {
      color = document.getElementById('colorOne').value;
    }
    if (e.which === 3) {
      color = document.getElementById('colorTwo').value;
    }
    const canvas2 = document.querySelectorAll('.activeCanvas')[0];
    const ctx = canvas2.getContext('2d');
    const widthPixel = canvas2.width / amountPx;
    const x = e.offsetX;
    const y = e.offsetY;
    canvas2.onmousemove = (event) => {
      const canvas3 = document.querySelectorAll('.activeFrame')[0].children[0];
      const [x0, y0] = [event.offsetX, event.offsetY];
      const radius = Math.sqrt(((x0 - x) ** 2) + ((y0 - y) ** 2));
      let x1 = 0;
      let y1 = radius;
      let gap = 0;
      let delta = (1 - 2 * radius);
      ctx.fillStyle = color;
      ctx.clearRect(0, 0, canvas2.width, canvas2.width);
      canvas2.getContext('2d').drawImage(canvas3, 0, 0);
      while (y1 >= 0) {
        ctx.fillRect(Math.ceil((x + x1) / widthPixel) * widthPixel,
          Math.ceil((y - y1) / widthPixel) * widthPixel, widthPixel, widthPixel);
        ctx.fillRect(Math.ceil((x - x1) / widthPixel) * widthPixel,
          Math.ceil((y - y1) / widthPixel) * widthPixel, widthPixel, widthPixel);
        ctx.fillRect(Math.ceil((x - x1) / widthPixel) * widthPixel,
          Math.ceil((y + y1) / widthPixel) * widthPixel, widthPixel, widthPixel);
        ctx.fillRect(Math.ceil((x + x1) / widthPixel) * widthPixel,
          Math.ceil((y + y1) / widthPixel) * widthPixel, widthPixel, widthPixel);
        gap = 2 * (delta + y1) - 1;
        if (delta < 0 && gap <= 0) {
          x1 += 1;
          delta += 2 * x1 + 1;
        } else if (delta > 0 && gap > 0) {
          y1 -= 1;
          delta -= 2 * y1 + 1;
        } else {
          x1 += 1;
          delta += 2 * (x1 - y1);
          y1 -= 1;
        }
      }
    };
    canvas2.addEventListener('mouseup', () => {
      canvas2.onmousemove = null;
      const circle = document.querySelectorAll('.circle')[0];
      if (circle.classList.contains('activeTool')) {
        const canvas3 = document.querySelectorAll('.activeFrame')[0].children[0];
        const ctxMini = canvas3.getContext('2d');
        ctxMini.drawImage(canvas2, 0, 0);
        canvas2.getContext('2d').clearRect(0, 0, canvas2.width, canvas2.width);
        canvas2.getContext('2d').drawImage(canvas3, 0, 0);
      }
    });
  }
}
