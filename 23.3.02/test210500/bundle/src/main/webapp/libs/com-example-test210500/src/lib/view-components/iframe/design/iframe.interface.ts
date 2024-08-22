export interface IIframeParameters {
  url: string;
  // Since we allow multiple values the type is not simply a string but a string[].
  // The sandbox options are irrelevant now as we cannot set those options dynamically anymore
  // in the new version of Angular:
  // https://angular.io/errors/NG0910
  // sandboxOptions: string[];
  cssStyles: string;
  cssClasses: string;
  addAllowFromDomain: boolean;
}
