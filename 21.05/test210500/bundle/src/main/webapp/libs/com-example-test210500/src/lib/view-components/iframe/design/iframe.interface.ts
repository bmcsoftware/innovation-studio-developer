export interface IIframeParameters {
  url: string;
  // Since we allow multiple values the type is not simply a string but a string[].
  sandboxOptions: string[];
  cssStyles: string;
  cssClasses: string;
  addAllowFromDomain: boolean;
}
