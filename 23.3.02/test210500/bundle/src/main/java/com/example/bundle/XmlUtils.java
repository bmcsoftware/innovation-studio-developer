package com.example.bundle;

import com.bmc.arsys.rx.services.action.domain.Action;
import com.bmc.arsys.rx.services.action.domain.ActionParameter;
import com.bmc.arsys.rx.services.common.Service;
import com.bmc.arsys.rx.services.common.domain.Scope;
import com.bmc.arsys.rx.services.record.domain.Attachment;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.XML;

import javax.validation.constraints.NotNull;
import java.nio.charset.StandardCharsets;

/**
 * Sources:
 * https://mkyong.com/java/how-do-convert-byte-array-to-string-in-java/
 * https://stackoverflow.com/questions/1823264/quickest-way-to-convert-xml-to-json-in-java
 */

public class XmlUtils implements Service {

    /**
     *
     * @param xmlAttachment, Attachment object
     * @param maxIndentation, Maximum indentation to go through, usually 100.
     * @return String, The converted Xml into Json, as a String.
     */
    @Action(name = "XmlAttachmentToJson", scope = Scope.PUBLIC)
    public String XmlAttachmentToJson(@ActionParameter(name = "xmlAttachment") @NotNull Attachment xmlAttachment,
                                      @ActionParameter(name = "maxIndentation") int maxIndentation) {
        String xmlText = "";
        String jsonString = "";
        int indentation = maxIndentation > 0 ? maxIndentation : 4;

        if (xmlAttachment != null) {
            xmlText = new String(xmlAttachment.getBinaryData(), StandardCharsets.UTF_8);

            // Trying to convert from Xml to Json
            try {
                JSONObject xmlJSONObj = XML.toJSONObject(xmlText);
                jsonString = xmlJSONObj.toString(indentation);
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }

        return jsonString;
    }
}
