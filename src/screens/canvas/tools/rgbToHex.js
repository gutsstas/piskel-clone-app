export default class RgbToHex {
  static componentToHex(c) {
    const hex = c.toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  }

  static work(r, g, b) {
    return `#${RgbToHex.componentToHex(r)}${RgbToHex.componentToHex(g)}${RgbToHex.componentToHex(b)}`;
  }

  picker(e, ctx) {
    let color;
    if (e.which === 1) {
      color = document.getElementById('colorOne');
    }
    if (e.which === 3) {
      color = document.getElementById('colorTwo');
    }
    const imgData = ctx.getImageData(e.offsetX, e.offsetY, 1, 1);
    const red = imgData.data[0];
    const green = imgData.data[1];
    const blue = imgData.data[2];
    const newColor = RgbToHex.work(red, green, blue);
    if (newColor !== '#000000') color.value = newColor;
  }
}
