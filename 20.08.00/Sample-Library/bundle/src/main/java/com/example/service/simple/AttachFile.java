package com.example.service.simple;

import com.bmc.arsys.rx.application.common.ServiceLocator;
import com.bmc.arsys.rx.services.action.domain.Action;
import com.bmc.arsys.rx.services.action.domain.ActionParameter;
import com.bmc.arsys.rx.services.common.Service;
import com.bmc.arsys.rx.services.common.domain.Scope;
import com.bmc.arsys.rx.services.record.RecordService;
import com.bmc.arsys.rx.services.record.domain.Attachment;
import com.example.rest.simple.TestMe;
import org.hibernate.validator.constraints.NotBlank;

import javax.validation.constraints.NotNull;
import java.util.Base64;

public class AttachFile implements Service {
    /**
     * This action takes a base 64 String as an Input Parameter and converts it / attach
     * it to a record instance Attachment field.
     * This is used for the signature example which returns a base 64 picture.
     * Setting the scope to PUBLIC will allow this Java Action to be used in any
     * other library or Application.
     *
     * @param recordDefinitionName (String) The record definition name (fully qualified).
     * @param recordInstanceId (String) The record instance Id to update.
     * @param attachmentFieldId (String) The attached file Id.
     * @param fileName (String) the picture filename.
     * @param base64Payload (String) The picture file, in base64.
     * @return a boolean that will tell if the signature has been successfully attached.
     */
    @Action(name = "attachSignaturePicture", scope = Scope.PUBLIC)
    public boolean attachSignaturePicture(@ActionParameter(name = "recordDefinitionName") @NotBlank @NotNull String recordDefinitionName,
                                          @ActionParameter(name = "recordInstanceId") @NotBlank @NotNull String recordInstanceId,
                                          @ActionParameter(name = "attachmentFieldId") @NotBlank @NotNull String attachmentFieldId,
                                          @ActionParameter(name = "fileName") @NotBlank @NotNull String fileName,
                                          @ActionParameter(name = "base64Payload") @NotBlank @NotNull String base64Payload) {
        boolean isFileAttached = false;
        RecordService recordService = ServiceLocator.getRecordService();
        String cleanedBase64String = removeBase64Header(base64Payload);
        byte[] decompressedBytes = Base64.getDecoder().decode(cleanedBase64String);

        Attachment attachedSignature = new Attachment(
                recordDefinitionName,
                recordInstanceId,
                fileName,
                Integer.parseInt(attachmentFieldId),
                decompressedBytes
        );

        recordService.persistAttachment(attachedSignature);
        isFileAttached = true;

        return isFileAttached;
    }

    // We have to remove the base64 "header" if necessary
    // data:image/png;base64,
    private String removeBase64Header(String base64Payload) {
        String cleanedBase64String = base64Payload;
        String base64Header = ";base64,";
        int position;

        if (!cleanedBase64String.equals("")) {
            position = cleanedBase64String.indexOf(base64Header);

            if (position != -1) {
                cleanedBase64String = cleanedBase64String.substring(position + base64Header.length());
            }
        }

        return cleanedBase64String;
    }
}
