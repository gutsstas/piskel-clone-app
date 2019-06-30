const canvas2 = document.querySelectorAll('.activeCanvas')[0];

export default class ZoomAndKey {
  work(e, zoom) {
    let scale = zoom;
    const delta = e.deltaY || e.detail || e.wheelDelta;
    if (scale < 0.15) return scale;
    if (delta > 0) scale += 0.04;
    else scale -= 0.04;
    canvas2.style.transform = `scale(${scale})`;
    e.preventDefault();
    return scale;
  }

  hotkey() {
    const tools = document.querySelectorAll('.tools')[0];
    const pen = document.querySelectorAll('.pen')[0];
    const picker = document.querySelectorAll('.picker')[0];
    const circle = document.querySelectorAll('.circle')[0];
    const paint = document.querySelectorAll('.paint')[0];
    const paintAll = document.querySelectorAll('.paintAll')[0];
    const eraser = document.querySelectorAll('.eraser')[0];
    const mirror = document.querySelectorAll('.mirror')[0];
    const rectangle = document.querySelectorAll('.rectangle')[0];
    const stroke = document.querySelectorAll('.stroke')[0];
    const move = document.querySelectorAll('.moves')[0];
    const dithering = document.querySelectorAll('.dithering')[0];
    const lighten = document.querySelectorAll('.lighten')[0];
    document.addEventListener('keydown', (e) => {
      if (e.code === 'KeyP') {
        for (let i = 0; i < tools.children.length; i += 1) {
          tools.children[i].classList.remove('activeTool');
        }
        pen.classList.add('activeTool');
      }
      if (e.code === 'KeyO') {
        for (let i = 0; i < tools.children.length; i += 1) {
          tools.children[i].classList.remove('activeTool');
        }
        picker.classList.add('activeTool');
      }
      if (e.code === 'KeyB') {
        for (let i = 0; i < tools.children.length; i += 1) {
          tools.children[i].classList.remove('activeTool');
        }
        paint.classList.add('activeTool');
      }
      if (e.code === 'KeyA') {
        for (let i = 0; i < tools.children.length; i += 1) {
          tools.children[i].classList.remove('activeTool');
        }
        paintAll.classList.add('activeTool');
      }
      if (e.code === 'KeyR') {
        for (let i = 0; i < tools.children.length; i += 1) {
          tools.children[i].classList.remove('activeTool');
        }
        rectangle.classList.add('activeTool');
      }
      if (e.code === 'KeyC') {
        for (let i = 0; i < tools.children.length; i += 1) {
          tools.children[i].classList.remove('activeTool');
        }
        circle.classList.add('activeTool');
      }
      if (e.code === 'KeyE') {
        for (let i = 0; i < tools.children.length; i += 1) {
          tools.children[i].classList.remove('activeTool');
        }
        eraser.classList.add('activeTool');
      }
      if (e.code === 'KeyV') {
        for (let i = 0; i < tools.children.length; i += 1) {
          tools.children[i].classList.remove('activeTool');
        }
        mirror.classList.add('activeTool');
      }
      if (e.code === 'KeyL') {
        for (let i = 0; i < tools.children.length; i += 1) {
          tools.children[i].classList.remove('activeTool');
        }
        stroke.classList.add('activeTool');
      }
      if (e.code === 'KeyM') {
        for (let i = 0; i < tools.children.length; i += 1) {
          tools.children[i].classList.remove('activeTool');
        }
        move.classList.add('activeTool');
      }
      if (e.code === 'KeyT') {
        for (let i = 0; i < tools.children.length; i += 1) {
          tools.children[i].classList.remove('activeTool');
        }
        dithering.classList.add('activeTool');
      }
      if (e.code === 'KeyU') {
        for (let i = 0; i < tools.children.length; i += 1) {
          tools.children[i].classList.remove('activeTool');
        }
        lighten.classList.add('activeTool');
      }
    });
  }
}
