export default class LocalStorageClass {
  saveFrame() {
    localStorage.removeItem('frames');
    localStorage.removeItem('canvas');
    localStorage.removeItem('colorOne');
    localStorage.removeItem('colorTwo');
    const frameCanvas = document.querySelectorAll('.frame_canvas');
    const arrCanvas = [];
    for (let i = 0; i < frameCanvas.length; i += 1) {
      const objFrame = {
        key: frameCanvas[i].toDataURL(),
        width: frameCanvas[i].width,
      };
      arrCanvas.push(objFrame);
    }
    localStorage.setItem('canvas', JSON.stringify(arrCanvas));
    const frames = document.querySelector('.frames');
    localStorage.setItem('frames', frames.outerHTML);
    const colorOne = document.getElementById('colorOne').value;
    const colorTwo = document.getElementById('colorTwo').value;
    localStorage.setItem('colorOne', colorOne);
    localStorage.setItem('colorTwo', colorTwo);
  }

  saveScale(scale) {
    localStorage.setItem('scale', scale);
  }

  saveAmountPx(amountPx) {
    localStorage.setItem('amountPx', amountPx);
  }

  load() {
    if (localStorage.getItem('frames') !== null) {
      const frames = document.querySelector('.frames');
      frames.outerHTML = localStorage.getItem('frames');
    }

    if (localStorage.getItem('canvas') !== null) {
      const frameCanvas = JSON.parse(localStorage.getItem('canvas'));
      const сanvas = document.querySelectorAll('.frame_canvas');
      for (let i = 0; i < сanvas.length; i += 1) {
        const img = new Image();
        img.src = frameCanvas[i].key;
        img.onload = () => {
          сanvas[i].width = frameCanvas[i].width;
          сanvas[i].height = frameCanvas[i].width;
          сanvas[i].getContext('2d').drawImage(img, 0, 0);
          if (сanvas[i].parentNode.classList.contains('activeFrame')) {
            document.querySelectorAll('.activeCanvas')[0].width = frameCanvas[i].width;
            document.querySelectorAll('.activeCanvas')[0].height = frameCanvas[i].width;
            document.querySelectorAll('.previewCanvas')[0].width = frameCanvas[i].width;
            document.querySelectorAll('.previewCanvas')[0].height = frameCanvas[i].width;
            document.querySelectorAll('.activeCanvas')[0].style.width = `${frameCanvas[i].width}px`;
            document.querySelectorAll('.activeCanvas')[0].style.height = `${frameCanvas[i].width}px`;

            document.querySelectorAll('.activeCanvas')[0].getContext('2d').drawImage(сanvas[i], 0, 0);
          }
        };
      }

      if (localStorage.getItem('colorOne') !== null || localStorage.getItem('colorOne') !== null) {
        document.getElementById('colorOne').value = localStorage.getItem('colorOne');
        document.getElementById('colorTwo').value = localStorage.getItem('colorTwo');
      }

      const clearLocalStorage = document.querySelectorAll('.clearLocalStorage')[0];
      clearLocalStorage.addEventListener('click', () => {
        localStorage.clear();
      });
    }
  }
}
