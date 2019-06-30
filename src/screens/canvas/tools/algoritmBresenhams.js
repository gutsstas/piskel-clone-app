let cX0; let cY0;
export default class AlgoritmBresenhams {
  work(X0, Y0, cX1, cY1, divider) {
    const canvas2 = document.querySelectorAll('.activeCanvas')[0];
    const ctx = canvas2.getContext('2d');
    cX0 = X0;
    cY0 = Y0;
    const dx = Math.abs(cX1 - cX0);
    const dy = Math.abs(cY1 - cY0);
    const sx = cX0 < cX1 ? 1 : -1;
    const sy = cY0 < cY1 ? 1 : -1;
    let err = dx - dy;

    while (true) {
      if (cX0 === cX1 && cY0 === cY1) {
        break;
      }
      const err2 = 2 * err;
      if (err2 >= -dy) {
        err -= dy;
        cX0 += sx;
      }
      if (err2 <= dx) {
        err += dx;
        cY0 += sy;
      }
      ctx.fillRect(cX0 * divider, cY0 * divider, divider, divider);
    }
  }
}
