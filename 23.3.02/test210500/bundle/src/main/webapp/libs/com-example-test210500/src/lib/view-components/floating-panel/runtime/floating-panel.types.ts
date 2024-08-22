export const FLOATING_PANEL_OPTIONS = {
  defaultPanelConfiguration: {
    id: '',
    headerLogo: '<span class="logo-light logo-helix"></span>',
    headerTitle: '<span class="com-example-test210500-handler-panel-title">%PANEL_TITLE%</span>',
    theme: 'dark',
    position: {
      my: 'right-bottom',
      at: 'right-bottom',
      offsetX: -5,
      offsetY: -10,
    },
    onwindowresize: true,
    onbeforeclose: null,
    headerControls: {
      minimize: 'remove',
      smallify: 'remove'
    },
    content: '<iframe src="%IFRAME_URL%" class="com-example-test210500-handler-panel-iframe" id="%IFRAME_GUID%"></iframe>',
    contentSize: {
      width: 400,
      height: 540
    },
    resizeit: {
      // Containment is only for the resize operation, NOT the drag operation.
      // It is not the window resize operation.
      containment: [52, 5, 5, 5],
      minWidth: 400,
      minHeight: 500
    },
    dragit: {
      containment: [52, 5, 5, 5]
    },
    iconfont: [
      'd-icon-angle_up',
      'd-icon-minus',
      'd-icon-angle_down_square',
      'd-icon-angle_up_square',
      'd-icon-cross_adapt'
    ]
  },
  defaultPanelTheme: {
    bgPanel: '#414042',
    bgContent: '#FFFFFF',
    colorHeader: '#FFFFFF'
  }
}
