export default class ActiveTool {
  work(e, tools) {
    for (let i = 0; i < tools.children.length; i += 1) tools.children[i].classList.remove('activeTool');
    if (e.target.classList.contains('pen')) {
      e.target.classList.add('activeTool');
    }
    if (e.target.classList.contains('picker')) {
      e.target.classList.add('activeTool');
    }
    if (e.target.classList.contains('paint')) {
      e.target.classList.add('activeTool');
    }
    if (e.target.classList.contains('rectangle')) {
      e.target.classList.add('activeTool');
    }
    if (e.target.classList.contains('circle')) {
      e.target.classList.add('activeTool');
    }
    if (e.target.classList.contains('paintAll')) {
      e.target.classList.add('activeTool');
    }
    if (e.target.classList.contains('eraser')) {
      e.target.classList.add('activeTool');
    }
    if (e.target.classList.contains('mirror')) {
      e.target.classList.add('activeTool');
    }
    if (e.target.classList.contains('stroke')) {
      e.target.classList.add('activeTool');
    }
    if (e.target.classList.contains('moves')) {
      e.target.classList.add('activeTool');
    }
    if (e.target.classList.contains('dithering')) {
      e.target.classList.add('activeTool');
    }
    if (e.target.classList.contains('lighten')) {
      e.target.classList.add('activeTool');
    }
  }
}
