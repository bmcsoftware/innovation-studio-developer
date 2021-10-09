// Input Parameters from the View Component.
// Note:
// Name is in the list but not declared in the registration.module.ts.
export interface IStarRatingParameters {
  name: string;
  defaultNumberOfStars: number;
  numberOfStars: number;
  numberOfStarsSelected: number;
  hidden: boolean;
  disabled: boolean;
  label: string;
  size: string;
  cssStyles: string;
  labelColor: string;
  isRequired: boolean;
}
