
import $ from 'jquery';

export default class ToolsFrame {
  selectFrame(e) {
    const frames = document.querySelectorAll('.frames')[0];
    const framesChildren = frames.children;
    if (e.target.classList.contains('frame_canvas') && framesChildren.length) {
      for (let i = 0; i < framesChildren.length; i += 1) framesChildren[i].classList.remove('activeFrame');
      e.target.parentNode.classList.add('activeFrame');
      const canvas = document.querySelectorAll('.activeCanvas')[0];
      const parent = e.target.parentNode.children[0];
      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
      canvas.getContext('2d').drawImage(parent, 0, 0);
    }
  }

  tools(e, canvas2) {
    const frame = document.querySelectorAll('.frame');
    if (e.target.classList.contains('delete')) {
      let current = e.target;
      while (!current.classList.contains('frame')) {
        current = current.parentNode;
      }
      if (current.classList.contains('activeFrame')) {
        const canvas = document.querySelectorAll('.activeCanvas')[0];
        canvas.getContext('2d').clearRect(0, 0, canvas2.width, canvas2.width);
      }
      if (frame.length !== 1) {
        current.remove();
      }
      if (frame.length === 1) {
        current.children[0].getContext('2d').clearRect(0, 0,
          current.children[0].width, current.children[0].width);
      }
    }
    if (e.target.parentNode.classList.contains('copy') || e.target.classList.contains('copy')) {
      let current = e.target;
      while (!current.classList.contains('frame')) {
        current = current.parentNode;
      }
      const oldFrame = current;
      const newFrame = oldFrame.cloneNode(true);
      newFrame.classList.remove('activeFrame');
      newFrame.children[0].getContext('2d').drawImage(oldFrame.children[0], 0, 0);
      $(newFrame).insertAfter($(oldFrame));
    }
  }
}
