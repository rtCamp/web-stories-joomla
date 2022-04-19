# hues [HYOOZ] 

Hues [HYOOZ] is a very simple __zero-dependency__ javascript (tiny) tested color library built for accessibility, RGBa and HSLa manupulation.

Color Hues, Tints, Shades, and Tones, Hues is just another word for colors. 🙃

## How to install

```shell

npm install --save @ap.cx/hues

or 

yarn add @ap.cx/hues

```

## How to use

```js

import * as hues from "@ap.cx/hues";

```

or one by one ...

```js

import str2rgba from "@ap.cx/hues";

```
or

```js

const {
  str2rgba,
  rgba2hsla,
  rgb2hsl,
  hsla2rgba,
  hsl2rgb,
  rgba2hex,
  rgb2hex,
  contrast,
  relativeLuminance,
  aa,
  aaa,
} = require("@ap.cx/hues");

```

## hues [HYOOZ] definition

A color or shade of a color.

Hues is the property of colors that makes them distinct from each other, as determined by the dominant wavelength of light — The hue associated with the shortest wavelengths of the visible spectrum is violet.

- the sea has a magical turquoise hue today

- all the hues of the rainbow

This small lib is about RGBa and HSLa colors and Accessibility (AA, AAA).

## Functions

- [str2rgba](#str2rgba),
- [rgba2hsla](#rgba2hsla),
- [rgb2hsl](#rgb2hsl),
- [hsla2rgba](#hsla2rgba),
- [hsl2rgb](#hsl2rgb),
- [rgba2hex](#rgba2hex),
- [rgb2hex](#rgb2hex),
- [contrast](#contrast),
- [relativeLuminance](#relativeLuminance),
- [aa](#aa),
- [aaa](#aaa),
- [hslaVector3](#hslaVector3)

### SOON 

- is colors blind (soon)
- closest accessible color (soon)
- closest colors blind safe color (soon)



## rgb2hex

```js

import { rgb2hex } from "@ap.cx/hues";

const result = rgb2hex({
  r: 1.0,
  g: 1.0,
  b: 1.0,
});

console.log(result);

> #ffffff

```

## rgba2hex

```js

import { rgba2hex } from "@ap.cx/hues";

const result = rgba2hex({
  r: 1.0,
  g: 1.0,
  b: 1.0,
  a: 1.0
});

console.log(result);

> #ffffffff

```

## rgb2hsl

```js

import { rgb2hsl } from "@ap.cx/hues";

const result = rgb2hsl({
  r: 1.0,
  g: 1.0,
  b: 1.0,
});

console.log(result);

> {
  h: 0,
  s: 0,
  l: 100,
}

```

Convert {r, g, b } object to { h, s, l} object.

## rgba2hsla

```js

import { rgba2hsla } from "@ap.cx/hues";

const result = rgb2hsl({
  r: 1.0,
  g: 1.0,
  b: 1.0,
  a: 1.0
});

console.log(result);

> {
  h: 0,
  s: 0,
  l: 100,
  a: 1,
}

```

Convert {r, g, b, a } object to { h, s, l, a } object.

## relativeLuminance

```js

import { relativeLuminance } from "@ap.cx/hues";

const result = relativeLuminance({
  r: 1.0,
  g: 1.0,
  b: 1.0,
  a: 1.0
});

console.log(result);

> 1

```

https://www.topster.net/relative-luminance/

### WCAG definition of relative luminance
The relative brightness of any point in a colorspace, normalized to 0 for darkest black and 1 for lightest white.

https://www.w3.org/WAI/GL/wiki/Relative_luminance

## contrast (A11y Contrast)

Compare 2 Relative Luminance and calculate the Accessibility ratio.

| Text size          | Level AA     | Level AAA    |
| :----------------- | -----------: | -----------: |
| small text < 18    |         4.5+ |           7+ |
| large text >= 18   |           3+ |         4.5+ |
|                    |              |              |

 Minimum required contrast ratio values


```js

import { contrast, relativeLuminance } from "@ap.cx/hues";

const relativeLuminance1 = relativeLuminance({
  r: 1.0,
  g: 1.0,
  b: 1.0,
  a: 1.0
});

const relativeLuminance2 = relativeLuminance({
  r: 0.0,
  g: 0.0,
  b: 0.0,
  a: 0.0
});

const ratio = contrast(
  relativeLuminance1,
  relativeLuminance2,
);

console.log(ratio);

> 21

```

## aa

```js

import { aa } from "@ap.cx/hues";

const isAA = aa(ratio); // contrat ratio

console.log(isAA);

> true // or false

```

## aa

```js

import { aa } from "@ap.cx/hues";

const isAAA = aa(ratio); // contrat ratio

console.log(isAAA);

> true // or false

```

## str2rgba

```js

import { str2rgba } from "@ap.cx/hues";

```

Convert css color string to an rgba object of float.

```js

const result = str2rgba('#ffffffff')

console.log(result);

> {
r: 1.0,
g: 1.0,
b: 1.0,
a: 1.0,
}

```

## hslaVector3

```js

import { hslaVector3 } from "@ap.cx/hues";

```

change hsl value.

```js

const result = hslaVector3({ h: 0, s: 90, l: 90, a: 1 }, [0,0,1])

console.log(result);

> { h: 0, s: 90, l: 91, a: 1 };

```

---

## color-string

If you would like to use color string take a look to [https://github.com/Qix-/color-string](Qix-/color-string).

---

## What is Relative Luminance

Relative luminance follows the photometric definition of luminance, but with the values normalized to 1 or 100 for a reference white.[1] Like the photometric definition, it is related to the luminous flux density in a particular direction, which is radiant flux density weighted by the luminosity function y(λ) of the CIE Standard Observer. The use of relative values is useful in systems where absolute reproduction is impractical. For example, in prepress for print media, the absolute luminance of light reflecting off the print depends on the illumination and therefore absolute reproduction cannot be assured.

---

## What is WCAG

Web Content Accessibility Guidelines(WCAG) is developed by W3C WAI (The World Wide Web Consortium Web Accessibility Initiative) with a goal of providing a single shared standard for web content accessibility. The WCAG documents explain how to make web content more accessible to people with visual, auditory, physical, speech, cognitive, language, learning, and neurological disabilities.



## get code 

### https

```shell

git clone https://github.com/thierryc/hues.git

```

### SSH

```shell

git clone git@github.com:thierryc/hues.git

```


### gh (github official cli)

```shell

gh repo clone thierryc/hues

```


## npm publish --access public 

```txt
📦  @ap.cx/hues@2.0.1
=== Tarball Contents ===
9.0kB  dist/hues.cjs.js
8.8kB  dist/hues.esm.js
10.0kB dist/hues.umd.js
695B   package.json
1.9kB  README.md
=== Tarball Details ===
name:          @ap.cx/hues
version:       2.0.1
package size:  5.6 kB
unpacked size: 30.5 kB
shasum:        36d55d09a0030aba49dc0146367e29970d652908
total files:   5  
```

## License

[MIT](LICENSE).
