import { RxRatingSize } from '@bmc-ux/adapt-angular';

// We have to cast the Adapt enum as String to avoid a compilation error in
// the model when comparing the options object to ISelectFormControlOptions.
export const STAR_RATING_FIELD_SIZE_OPTIONS = {
  defaultSize: RxRatingSize.md,
  sizeOptions: {
    large: {
      id: String(RxRatingSize.lg),
      name: 'Large'
    },
    normal: {
      id: String(RxRatingSize.md),
      name: 'Normal'
    },
    small: {
      id: String(RxRatingSize.sm),
      name: 'Small'
    },
    extraSmall: {
      id: String(RxRatingSize.xs),
      name: 'Extra Small'
    }
  }
}
