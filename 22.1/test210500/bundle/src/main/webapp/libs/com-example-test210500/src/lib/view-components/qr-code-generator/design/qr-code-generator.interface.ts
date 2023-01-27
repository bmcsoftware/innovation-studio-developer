export interface IQrCodeGeneratorParameters {
  content: string;
  color: string;
  backgroundColor: string;
  // Label block.
  useLabel: boolean;
  label: string;
  fontName: string;
  fontColor: string;
  fontSize: number;
  // Picture block.
  usePicture: boolean;
  imageSize: number;
  pictureBase64: string;
  imageAsCode: boolean;
  cssClasses: string;
}

export interface IQrCodeGeneratorLabelParameters {
  label: string;
  fontName: string;
  fontSize: number;
  fontColor: string;
}

export interface IQrCodeGeneratorPictureParameters {
  pictureBase64: string;
  imageAsCode: boolean;
  imageSize: number;
}
