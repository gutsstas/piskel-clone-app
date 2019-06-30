import '../../screens/canvas/Canvas.css';
import $ from 'jquery';
import Header from '../Header';
import Frames from '../Frames';
import ToolsFrame from '../Frames/ToolsFrame';
import Preview from '../../screens/preview';
import ActiveTool from '../../screens/canvas/tools/activeTool';
import DrawPen from '../../screens/canvas/tools/drawPen';
import PenSize from '../../screens/canvas/tools/PenSize';
import RgbToHex from '../../screens/canvas/tools/rgbToHex';
import SelectSizeCanvas from '../../screens/canvas/tools/selectSizeCanvas';
import ZoomAndKey from '../../screens/canvas/tools/zoomAndKey';
import Rectangle from '../../screens/canvas/tools/rectangle';
import Stroke from '../../screens/canvas/tools/stroke';
import Bucket from '../../screens/canvas/tools/bucket';
import Move from '../../screens/canvas/tools/move';
import Circle from '../../screens/canvas/tools/circle';
import LocalStorageClass from '../localStorage';
import 'jquery-ui-dist/jquery-ui';

export default class App {
  start() {
    const canvas2 = document.querySelectorAll('.activeCanvas')[0];
    const ctx = canvas2.getContext('2d');
    const canvas3 = document.querySelectorAll('.activeFrame')[0].children[0];
    const ctxMini = canvas3.getContext('2d');
    const fullScreen = document.getElementById('fullScreen');
    const previewInput = document.querySelectorAll('.previewInput')[0];
    const tools = document.querySelectorAll('.tools')[0];
    const pen = document.querySelectorAll('.pen')[0];
    const picker = document.querySelectorAll('.picker')[0];
    const circle = document.querySelectorAll('.circle')[0];
    const paint = document.querySelectorAll('.paint')[0];
    const paintAll = document.querySelectorAll('.paintAll')[0];
    const eraser = document.querySelectorAll('.eraser')[0];
    const mirror = document.querySelectorAll('.mirror')[0];
    const rectangle = document.querySelectorAll('.rectangle')[0];
    const cursorCords = document.querySelectorAll('.cursorCords')[0];
    const stroke = document.querySelectorAll('.stroke')[0];
    const move = document.querySelectorAll('.moves')[0];
    const dithering = document.querySelectorAll('.dithering')[0];
    const lighten = document.querySelectorAll('.lighten')[0];
    const rotate = document.querySelectorAll('.rotate')[0];
    const flip = document.querySelectorAll('.flip')[0];
    const gif = document.querySelectorAll('.gif')[0];
    const containerFrames = document.querySelectorAll('.container_frames')[0];


    $(() => {
      $('#sortable').sortable();
      $('#sortable').disableSelection();
    });

    let amountPx = 32;
    let size = 1;
    let scale;

    const localSt = new LocalStorageClass();
    localSt.load();
    if (localStorage.getItem('amountPx') !== null) {
      amountPx = localStorage.getItem('amountPx');
    }
    if (localStorage.getItem('scale') !== null) {
      scale = localStorage.getItem('scale');
    }

    const headerClass = new Header();
    headerClass.init();

    const zoomAndKeyClass = new ZoomAndKey();
    canvas2.addEventListener('wheel', (e) => {
      scale = zoomAndKeyClass.work(e, scale);
      localSt.saveScale(scale);
    });

    zoomAndKeyClass.hotkey();

    canvas2.addEventListener('contextmenu', e => e.preventDefault());

    const frames = new Frames();
    const tool = new ToolsFrame();
    scale = frames.draws();

    const creatFrame = document.getElementById('creat_frame');
    // const frames = document.querySelectorAll('.frames')[0];

    creatFrame.addEventListener('click', () => frames.creatFrame(canvas2));

    document.addEventListener('click', (e) => {
      tool.selectFrame(e);
      tool.tools(e, canvas2);
    });

    containerFrames.addEventListener('click', (e) => {
      tool.tools(e, canvas2);
    });
    const preview = new Preview();
    previewInput.addEventListener('input', () => preview.fun());
    fullScreen.addEventListener('click', () => preview.fullScreen());

    const activeToolClass = new ActiveTool();
    tools.addEventListener('click', e => activeToolClass.work(e, tools));

    const penSize = document.querySelectorAll('.penSize')[0];
    const penSizeClass = new PenSize();
    penSize.addEventListener('click', (e) => {
      size = penSizeClass.work(e, penSize);
    });

    const drawPenClass = new DrawPen();
    const rgbToHexClass = new RgbToHex();
    const rectangleClass = new Rectangle();
    const strokeClass = new Stroke();
    const selectSizeCanvasClass = new SelectSizeCanvas();
    const bucketClass = new Bucket();
    const moveClass = new Move();
    const circleClass = new Circle();

    gif.addEventListener('click', () => preview.imortGIF());

    const containerSizeCanvas = document.querySelectorAll('.container_sizeCanvas')[0];
    containerSizeCanvas.addEventListener('click', (e) => {
      amountPx = selectSizeCanvasClass.work(e).am;
      scale = selectSizeCanvasClass.work(e).sc;
      localSt.saveScale(scale);
      localSt.saveAmountPx(amountPx);
    });

    canvas2.addEventListener('mousemove', (e) => {
      const canvas = document.querySelectorAll('.activeCanvas')[0];
      const widthPixel = canvas.width / amountPx;
      const cordX = Math.floor(e.offsetX / widthPixel) * widthPixel / 10;
      const cordY = Math.floor(e.offsetY / widthPixel) * widthPixel / 10;
      cursorCords.innerHTML = `${cordX} : ${cordY}`;
    });

    rotate.addEventListener('mousedown', () => {
      moveClass.rotate();
      rotate.classList.add('activeTool');
      rotate.addEventListener('mouseup', () => {
        rotate.classList.remove('activeTool');
      });
    });

    flip.addEventListener('mousedown', () => {
      moveClass.flip();
      flip.classList.add('activeTool');
      flip.addEventListener('mouseup', () => {
        flip.classList.remove('activeTool');
      });
    });

    canvas2.addEventListener('mousedown', (e) => {
      if (pen.classList.contains('activeTool')
      || mirror.classList.contains('activeTool')) {
        drawPenClass.work(e, size, amountPx);
      }

      if (picker.classList.contains('activeTool')) {
        rgbToHexClass.picker(e, ctx);
      }

      if (paint.classList.contains('activeTool')) {
        bucketClass.paint(e);
      }

      if (paintAll.classList.contains('activeTool')) {
        bucketClass.paintAll(e, canvas2, canvas3, amountPx);
      }

      if (eraser.classList.contains('activeTool')) {
        drawPenClass.work(e, size, amountPx);
      }

      if (rectangle.classList.contains('activeTool')) {
        rectangleClass.workMouseMove(e, amountPx);
      }

      if (stroke.classList.contains('activeTool')) {
        strokeClass.work(e, amountPx, ctx, ctxMini);
      }

      if (move.classList.contains('activeTool')) {
        moveClass.work(e);
      }

      if (dithering.classList.contains('activeTool')) {
        drawPenClass.work(e, size, amountPx);
      }

      if (lighten.classList.contains('activeTool')) {
        drawPenClass.work(e, size, amountPx);
      }
      if (circle.classList.contains('activeTool')) {
        circleClass.work(e, amountPx);
      }
    });

    if (localStorage.getItem('scale') !== null) {
      scale = localStorage.getItem('scale');
      canvas2.style.transform = `scale(${scale})`;
    }

    document.addEventListener('mouseup', () => {
      localSt.saveFrame();
    });
  }
}
