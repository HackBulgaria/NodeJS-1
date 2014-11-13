# Image filter library

We want to create a node module for applying simple image processing with convolution, defined with a [kernel](https://en.wikipedia.org/wiki/Kernel_%28image_processing%29). We want our module's API to be implemented with a promise interface.

# Interface and data format

Our module should expose two objects, with corresponding methods:

* `monochrome` - an object holding the methods for manipulating monochrome images
* `rgb` - an object holding the methods for manipulating rgb images

## Data formats

### Monochrome
All `imageData` objects passed to methods of `monochrome` are expected to be `Array`s of `Array`s of integer numbers. Here's a black square image with a white X mark on it.

```javascript
var xMarksTheSpot = [
[255,   0,   0,   0, 255],
[  0, 255,   0, 255,   0],
[  0,   0, 255,   0,   0]
[  0, 255,   0, 255,   0],
[255,   0,   0,   0, 255],
]
```

### RGB

All `imageData` objects passed to methods of `rgb` are expected to have `red`, `green` and `blue` properties, each of them holding one monochrome `imageData` as the one shown above(an `Array` of `Array`s of integers).

Applying a kernel to an RGB image is essentially applying it to each of its three colour components.

### Methods
Both the `monochrome` and `rgb` objects should have the following methods:

* `edgeDetection(imageData)` - accepts an image to apply edge detection to, returns a promise object that will be resolved once the image processing has finished.
* `boxBlur(imageData)` - accepts an image to apply box blur to, returns a promise object that will be resolved onec the image processing has finished.
* `applyKernel(imageData, kernel)` -  accepts an image and a kernel to apply to that image, returns a promise object, that will be resolved once the kernel has been applied to the image.


### Promise resolution values
* The promises returned by `monochrome`'s methods should eventually be resolved with a monochrome `imageData` object, that is an `Array` of `Array`s of integers.
* The promises returne by `rgb`'s methods should eventually be resolved with an RGB `imageData` object, that is an object with a `red`, `green` and `blue` property, each holding a monochrome `imageData` object.

## Notes
Expect `imageData` and `kernel` to be `Array`s of `Array`s containing integers. They're basically just matrices, that need to be manipulated in some manner.

This format implies that `imageData` will always be a monochrome image, not a coloured one.

Assuming our module is called `convolution`

When convolving a kernel and image treat any needed pixels outside the image as having a value of 0.

The input data could potentially be very big. Think of a good way to divide it into separate small units of execution, so as to not 

# Example usage
```javascript
  var convolution = require('convolution'),
      xMarksTheSpot = [
        [1, 0, 1],
        [0, 1, 0]
        [1, 0, 1],
      ],
      verticalBlur = [
        [0, 0.5, 0],
        [0,   0, 0],
        [0,   1, 0]
      ];

    convolution.monochrome.applyKernel(xMarksTheSpot, verticalBlur)
      .then(function (blurredX) {
        // [  0,   1,   0],
        // [1.5,   0, 1.5],
        // [  0, 0.5,   0]
      });
```
