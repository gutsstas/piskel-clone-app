
export default class PenSize {
  work(e, penSize) {
    let size;
    for (let i = 0; i < penSize.children.length; i += 1) penSize.children[i].classList.remove('activeSize');
    if (e.target.classList.contains('size')) {
      e.target.classList.add('activeSize');
    }
    if (e.target.classList.contains('one')) {
      size = 1;
    }
    if (e.target.classList.contains('two')) {
      size = 2;
    }
    if (e.target.classList.contains('three')) {
      size = 3;
    }
    if (e.target.classList.contains('four')) {
      size = 4;
    }
    return size;
  }
}
