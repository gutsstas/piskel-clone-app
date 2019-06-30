import AlgoritmBresenhams from './algoritmBresenhams';

let x1; let y1; let coordX1; let coordY1;
const canvas2 = document.querySelectorAll('.activeCanvas')[0];


export default class Stroke {
  work(e, amountPx, ctx) {
    const algoritmBresenhamsClass = new AlgoritmBresenhams();
    const widthPixel = canvas2.width / amountPx;
    let color;
    if (e.which === 1) {
      color = document.getElementById('colorOne').value;
    }
    if (e.which === 3) {
      color = document.getElementById('colorTwo').value;
    }
    x1 = e.offsetX;
    y1 = e.offsetY;
    coordX1 = Math.floor(x1 / widthPixel);
    coordY1 = Math.floor(y1 / widthPixel);
    ctx.fillStyle = color;
    canvas2.onmousemove = (event) => {
      const canvas3 = document.querySelectorAll('.activeFrame')[0].children[0];
      const x2 = event.offsetX;
      const y2 = event.offsetY;
      canvas2.getContext('2d').clearRect(0, 0, canvas2.width, canvas2.width);
      canvas2.getContext('2d').drawImage(canvas3, 0, 0);
      const coordX2 = Math.floor(x2 / widthPixel);
      const coordY2 = Math.floor(y2 / widthPixel);
      algoritmBresenhamsClass.work(coordX1, coordY1,
        coordX2, coordY2, widthPixel);
    };
    document.addEventListener('mouseup', () => {
      canvas2.onmousemove = null;
      const stroke = document.querySelectorAll('.stroke')[0];
      if (stroke.classList.contains('activeTool')) {
        const canvas3 = document.querySelectorAll('.activeFrame')[0].children[0];
        canvas3.getContext('2d').drawImage(canvas2, 0, 0);
        canvas2.getContext('2d').clearRect(0, 0, canvas2.width, canvas2.width);
        canvas2.getContext('2d').drawImage(canvas3, 0, 0);
      }
    });
  }
}
