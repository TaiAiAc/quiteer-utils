'use strict';

function rgbToHsl({ r, g, b, a = 1 }) {
  if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255)
    throw new Error("\u65E0\u6548\u7684RGB\u503C");
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
    a
  };
}
function hslToRgb({ h, s, l, a = 1 }) {
  if (h < 0 || h >= 360 || s < 0 || s > 100 || l < 0 || l > 100)
    throw new Error("\u65E0\u6548\u7684HSL\u503C");
  h /= 360;
  s /= 100;
  l /= 100;
  let r;
  let g;
  let b;
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p2, q2, t) => {
      if (t < 0)
        t += 1;
      if (t > 1)
        t -= 1;
      if (t < 1 / 6)
        return p2 + (q2 - p2) * 6 * t;
      if (t < 1 / 2)
        return q2;
      if (t < 2 / 3)
        return p2 + (q2 - p2) * (2 / 3 - t) * 6;
      return p2;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
    a
  };
}
function rgbToHex({ r, g, b, a = 1 }) {
  const toHex = (n) => {
    const hex2 = Math.round(n).toString(16);
    return hex2.length === 1 ? `0${hex2}` : hex2;
  };
  const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  return a === 1 ? hex : `${hex}${toHex(Math.round(a * 255))}`;
}
function hexToRgb(hex) {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])([a-f\d])?$/i;
  const fullHex = hex.replace(shorthandRegex, (_, r2, g2, b2, a2) => r2 + r2 + g2 + g2 + b2 + b2 + (a2 ? a2 + a2 : ""));
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i.exec(fullHex);
  if (!result)
    throw new Error("Invalid hex color");
  const [, r, g, b, a] = result;
  return {
    r: Number.parseInt(r, 16),
    g: Number.parseInt(g, 16),
    b: Number.parseInt(b, 16),
    a: a ? Number.parseInt(a, 16) / 255 : 1
  };
}

function adjustBrightness(rgb, amount) {
  if (rgb.r < 0 || rgb.r > 255 || rgb.g < 0 || rgb.g > 255 || rgb.b < 0 || rgb.b > 255)
    throw new Error("\u65E0\u6548\u7684RGB\u503C");
  if (amount < 0 || amount > 100)
    throw new Error("\u65E0\u6548\u7684\u4EAE\u5EA6\u8C03\u6574\u503C");
  const hsl = rgbToHsl(rgb);
  hsl.l = Math.max(0, Math.min(100, amount));
  const result = hslToRgb(hsl);
  result.a = rgb.a !== void 0 ? rgb.a : 1;
  return result;
}
function adjustSaturation(rgb, amount) {
  if (rgb.r < 0 || rgb.r > 255 || rgb.g < 0 || rgb.g > 255 || rgb.b < 0 || rgb.b > 255)
    throw new Error("\u65E0\u6548\u7684RGB\u503C");
  if (amount < -100 || amount > 100)
    throw new Error("\u65E0\u6548\u7684\u9971\u548C\u5EA6\u8C03\u6574\u503C");
  const hsl = rgbToHsl(rgb);
  if (rgb.r === rgb.g && rgb.g === rgb.b) {
    hsl.s = 0;
  } else {
    hsl.s = Math.max(0, Math.min(100, hsl.s + amount));
  }
  const result = hslToRgb(hsl);
  result.a = rgb.a !== void 0 ? rgb.a : 1;
  return result;
}
function blendColors(color1, color2, mode = "normal") {
  const blend = {
    normal: (a, b) => b,
    multiply: (a, b) => a * b / 255,
    screen: (a, b) => 255 - (255 - a) * (255 - b) / 255,
    overlay: (a, b) => {
      if (a < 128) {
        return Math.round(2 * a * b / 255);
      } else {
        return Math.round(255 - 2 * (255 - a) * (255 - b) / 255);
      }
    },
    darken: (a, b) => Math.min(a, b),
    lighten: (a, b) => Math.max(a, b)
  };
  return {
    r: Math.round(blend[mode](color1.r, color2.r)),
    g: Math.round(blend[mode](color1.g, color2.g)),
    b: Math.round(blend[mode](color1.b, color2.b)),
    a: color1.a !== void 0 && color2.a !== void 0 ? (color1.a + color2.a) / 2 : 1
  };
}
function getComplementaryColor(rgb) {
  const hsl = rgbToHsl(rgb);
  hsl.h = (hsl.h + 180) % 360;
  hsl.a = rgb.a !== void 0 ? rgb.a : 1;
  return hslToRgb(hsl);
}
function getInvertColor(rgb) {
  return {
    r: 255 - rgb.r,
    g: 255 - rgb.g,
    b: 255 - rgb.b,
    a: rgb.a
  };
}
function getRandomColor(options = {}) {
  const {
    minBrightness = 20,
    maxBrightness = 80,
    saturation = 70
  } = options;
  const hsl = {
    h: Math.floor(Math.random() * 360),
    s: saturation,
    l: Math.floor(Math.random() * (maxBrightness - minBrightness) + minBrightness)
  };
  return hslToRgb(hsl);
}

exports.adjustBrightness = adjustBrightness;
exports.adjustSaturation = adjustSaturation;
exports.blendColors = blendColors;
exports.getComplementaryColor = getComplementaryColor;
exports.getInvertColor = getInvertColor;
exports.getRandomColor = getRandomColor;
exports.hexToRgb = hexToRgb;
exports.hslToRgb = hslToRgb;
exports.rgbToHex = rgbToHex;
exports.rgbToHsl = rgbToHsl;
