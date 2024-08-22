export const QR_CODE_GENERATOR_OPTIONS = {
  fontList: [
    'sans-serif',
    'Arial',
    'Verdana',
    'Helvetica',
    'Tahoma',
    'Trebuchet MS',
    'Times New Roman',
    'Georgia',
    'Garamond',
    'Courier New',
    'Brush Script MT'
  ],
  defaultValues: {
    // Our color picker requires hexadecimal color codes, so values like "red" would not work.
    color: '#000000',
    backgroundColor: '#FFFFFF',
    fontColor: '#FF0000',
    fontName: 'sans-serif',
    label: '"FooBar"',
    fontSize: 30,
    // This is a 1x1 transparent pixel in png.
    emptyPicture: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=='
  },
  displayModes: {
    plain: 'plain',
    label: 'label',
    image: 'image',
    imagelabel: 'imagelabel'
  }
}
