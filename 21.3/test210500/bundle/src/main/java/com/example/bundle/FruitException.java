package com.example.bundle;

import com.bmc.arsys.rx.services.RequestMessage;
import com.bmc.arsys.rx.services.RxException;

import java.util.Collection;

// We extend the RxException class to customize and localize the error messages.
public class FruitException extends RxException {
    private static final String BUNDLE_ID = "com.example.test210500";

    // Defining the error messages enum.
    public enum FruitMessage {
        IS_TOMATO_A_FRUIT(600100),
        IS_APPLE_A_FRUIT(600101);
        private final int intValue;

        FruitMessage(int intValue) {
            this.intValue = intValue;
        }

        public int intValue() {
            return intValue;
        }
    }

    // We need to override some constructors.
    public FruitException(FruitMessage errorMessage, String appendedText, RxException e) {
        super(errorMessage.intValue(), BUNDLE_ID, appendedText, e);
    }

    // We can leverage the localization here.
    public FruitException(FruitMessage errorMessage, Exception e) {
        super(errorMessage.intValue(), BUNDLE_ID, e.getLocalizedMessage(), null);
    }

    public FruitException(FruitMessage errorMessage, String appendedText) {
        super(errorMessage.intValue(), BUNDLE_ID, appendedText, null);
    }
}
