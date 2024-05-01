import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxApplicationRegistryService, RxLocalizationService } from '@helix/platform/shared/api';
import * as defaultApplicationStrings from './i18n/localized-strings.json';
import { LabelRegistrationModule } from './view-components/label/label-registration.module';
import { LmameRegistrationModule } from './view-components/lmame/lmame-registration.module';
import { StarRatingRegistrationModule } from './view-components/star-rating/star-rating-registration.module';
import { StarRatingFieldRegistrationModule } from './view-components/star-rating-field/star-rating-field-registration.module';
import { NotificationActionModule } from './actions/notification';
import { GetUserInformationActionModule } from './actions/get-user-information';
import { GenerateGuidActionModule } from './actions/generate-guid';
import { MatrixActionModule } from './actions/matrix';
import { GetDataExampleRegistrationModule } from './view-components/get-data-example/get-data-example-registration.module';
import { YoutubePlayerRegistrationModule } from './view-components/youtube-player/youtube-player-registration.module';
import { GoogleMapsComponentRegistrationModule } from './view-components/google-maps-component/google-maps-component-registration.module';
import { ListIconsRegistrationModule } from './view-components/list-icons/list-icons-registration.module';
import { BarChartComponentRegistrationModule } from './view-components/bar-chart-component/bar-chart-component-registration.module';
import { UserPreferencesRegistrationModule } from './view-components/user-preferences/user-preferences-registration.module';
import { GeneratePasswordRegistrationModule } from './view-components/generate-password/generate-password-registration.module';
import { CallProcessRegistrationModule } from './view-components/call-process/call-process-registration.module';
import { ConfirmationActionModule } from './actions/confirmation';
import { FruitPickerActionModule } from './actions/fruit-picker';
import { DisplayGradientRegistrationModule } from './view-components/display-gradient/display-gradient-registration.module';
import { FloatingPanelRegistrationModule } from './view-components/floating-panel/floating-panel-registration.module';
import { TestDebugComponentRegistrationModule } from './view-components/test-debug-component/test-debug-component-registration.module';
import { CodeViewerRegistrationModule } from './view-components/code-viewer/code-viewer-registration.module';
import { IframeRegistrationModule } from './view-components/iframe/iframe-registration.module';
import { ConfirmationOotbActionModule } from './actions/confirmation-ootb';
import { AdminPreferencesRegistrationModule } from './view-components/admin-preferences/admin-preferences-registration.module';
import { CaptchaRegistrationModule } from './view-components/captcha/captcha-registration.module';
import { QrCodeGeneratorRegistrationModule } from './view-components/qr-code-generator/qr-code-generator-registration.module';
import { WebcamRegistrationModule } from './view-components/webcam/webcam-registration.module';
import { QrCodeScannerRegistrationModule } from './view-components/qr-code-scanner/qr-code-scanner-registration.module';
import { WizardRegistrationModule } from './view-components/wizard/wizard-registration.module';
import { LifecycleRegistrationModule } from './view-components/lifecycle/lifecycle-registration.module';
import { AccessGridRegistrationModule } from './view-components/access-grid/access-grid-registration.module';
import { CustomGridRegistrationModule } from './view-components/custom-grid/custom-grid-registration.module';
import { CallCommandRegistrationModule } from './view-components/call-command/call-command-registration.module';
import { CustomDatapagequeryRegistrationModule } from './view-components/custom-datapagequery/custom-datapagequery-registration.module';
import { DigitalSignatureRegistrationModule } from './view-components/digital-signature/digital-signature-registration.module';
import { ComExampleTest210500GlobalLoadModule } from './global-load/global-load.module';
import { OpenBladeRegistrationModule } from './view-components/open-blade/open-blade-registration.module';
import { ImageClickRegistrationModule } from './view-components/image-click/image-click-registration.module';
import { DelayRegistrationRegistrationModule } from './view-components/delay-registration/delay-registration-registration.module';
import { ComExampleTest210500Initializer } from './com-example-test210500-initializer.service';
import { ImageContainerRegistrationModule } from './view-components/image-container/image-container-registration.module';

// We declare here the custom view component and action Registration Modules.
// Those registration Modules take care of the view component / action
// design time and runtime.
@NgModule({
  imports: [
    CommonModule,
    // Custom View Components declaration (Registration Modules).
    LabelRegistrationModule,
    LmameRegistrationModule,
    StarRatingRegistrationModule,
    StarRatingFieldRegistrationModule,
    GetDataExampleRegistrationModule,
    YoutubePlayerRegistrationModule,
    GoogleMapsComponentRegistrationModule,
    ListIconsRegistrationModule,
    BarChartComponentRegistrationModule,
    UserPreferencesRegistrationModule,
    GeneratePasswordRegistrationModule,
    CallProcessRegistrationModule,
    DisplayGradientRegistrationModule,
    FloatingPanelRegistrationModule,
    TestDebugComponentRegistrationModule,
    CodeViewerRegistrationModule,
    IframeRegistrationModule,
    CaptchaRegistrationModule,
    QrCodeGeneratorRegistrationModule,
    WebcamRegistrationModule,
    QrCodeScannerRegistrationModule,
    WizardRegistrationModule,
    LifecycleRegistrationModule,
    AccessGridRegistrationModule,
    CustomGridRegistrationModule,
    CallCommandRegistrationModule,
    CustomDatapagequeryRegistrationModule,
    DigitalSignatureRegistrationModule,
    OpenBladeRegistrationModule,
    ImageClickRegistrationModule,
    DelayRegistrationRegistrationModule,
    ImageContainerRegistrationModule,
    // Custom Actions.
    GetUserInformationActionModule,
    NotificationActionModule,
    GenerateGuidActionModule,
    MatrixActionModule,
    ConfirmationActionModule,
    FruitPickerActionModule,
    ConfirmationOotbActionModule,
    AdminPreferencesRegistrationModule,
    // Global Load
    ComExampleTest210500GlobalLoadModule
  ],
  providers: [
    // The bundle Initializer.
    ComExampleTest210500Initializer
  ]
})
export class ComExampleTest210500Module {
  constructor(private rxLocalizationService: RxLocalizationService,
              private comExampleTest210500Initializer: ComExampleTest210500Initializer,
              private rxApplicationRegistryService: RxApplicationRegistryService) {
    this.rxLocalizationService.setDefaultApplicationStrings(defaultApplicationStrings["default"]);

    // We register the application initializer for our application bundle (com.example.test210500).
    //
    // The initializer will be called by the Platform at the very start of the bundle "execution", aka
    // when the application "com.example.test210500" will be served / launched at runtime.
    // The Platform will call the initializer "comExampleTest210500Initializer", for example accessing:
    // http://<server>.com:8008/helix/index.html#/com.example.test210500/view/com.example.test210500:TOC
    //
    // The Platform will not call the initializer in design time (Innovation Studio).
    this.rxApplicationRegistryService.register('com.example.test210500', this.comExampleTest210500Initializer);
  }
}
