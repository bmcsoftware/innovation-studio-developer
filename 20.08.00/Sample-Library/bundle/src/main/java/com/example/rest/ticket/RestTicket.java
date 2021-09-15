/*
 * Those Rest Apis are to show how to get and pass information when a class involves
 * a List of another Class.
 * Here Ticket class contains a method which is a List<Note>
 * The example show for Get and POST calls.
 *
 * This is to specifically address a question on BMC Communities:
 * https://communities.bmc.com/message/778045#778045
 */

package com.example.rest.ticket;

import com.bmc.arsys.rx.services.common.RestfulResource;
import com.bmc.arsys.rx.services.common.annotation.AccessControlledMethod;
import com.bmc.arsys.rx.services.common.annotation.RxDefinitionTransactional;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.ArrayList;
import java.util.List;

/**
 * Main Class
 * REST root url:
 * http{s}://{server}:{port}/api/com.example.samplelibrary/restTicket
 */
@Path("restTicket")
public class RestTicket implements RestfulResource {
    /**
     * @return Note    (JSON)      Note object in JSON format.
     * Url to call:
     * http{s}://{server}:{port}/api/com.example.samplelibrary/restTicket/note/{noteId}
     * @summary Returns a Note object.
     * @statuscode 200 If the fetch is successful.
     */
    @GET
    @Path("/note/{noteId}")
    @RxDefinitionTransactional(readOnly = true)
    @AccessControlledMethod(authorization = AccessControlledMethod.AuthorizationLevel.ValidUser)
    @Produces(MediaType.APPLICATION_JSON)
    public Note getNote(@PathParam("noteId") String noteId) {
        Note myNote = new Note();

        myNote.setTitle(noteId);

        return myNote;
    }

    /**
     * @return Ticket    (JSON)      Ticket object in JSON format.
     * Url to call:
     * http{s}://{server}:{port}/api/com.example.samplelibrary/restTicket/ticket/{ticketId}
     * @summary Returns a Ticket object.
     * @statuscode 200 If the fetch is successful.
     */
    @GET
    @Path("/ticket/{ticketId}")
    @RxDefinitionTransactional(readOnly = true)
    @AccessControlledMethod(authorization = AccessControlledMethod.AuthorizationLevel.ValidUser)
    @Produces(MediaType.APPLICATION_JSON)
    public Ticket getTicket(@PathParam("ticketId") String ticketId) {
        Ticket myTicket = new Ticket();
        List<Note> NoteList = new ArrayList<>();

        for (int k = 0; k < 10; k++){
            Note myNote = new Note();

            myNote.setTitle("Note " + k);
            NoteList.add(myNote);
        }

        myTicket.setTitle(ticketId);
        myTicket.setNoteList(NoteList);

        return myTicket;
    }

    /**
     * @return Ticket    (JSON)      Ticket object in JSON format.
     * Url to call:
     * http{s}://{server}:{port}/api/com.example.samplelibrary/restTicket/ticket
     * @summary Returns a Ticket object.
     * @statuscode 200 If the POST is successful.
     *
     * Payload example:
     * {"RECORDTYPE":"EVENT","NoteList":[{"RECORDTYPE":"NOTE","title":"Note 00"},{"RECORDTYPE":"NOTE","title":"Note 11"},{"RECORDTYPE":"NOTE","title":"Note 22"},{"RECORDTYPE":"NOTE","title":"Note 33"},{"RECORDTYPE":"NOTE","title":"Note 44"},{"RECORDTYPE":"NOTE","title":"Note 55"},{"RECORDTYPE":"NOTE","title":"Note 66"},{"RECORDTYPE":"NOTE","title":"Note 77"},{"RECORDTYPE":"NOTE","title":"Note 88"},{"RECORDTYPE":"NOTE","title":"Note 99"}],"Title":"Comes from the post :)"}
     */
    @POST
    @Path("/ticket")
    @Consumes(MediaType.APPLICATION_JSON)
    @RxDefinitionTransactional(readOnly = true)
    @AccessControlledMethod(authorization = AccessControlledMethod.AuthorizationLevel.ValidUser)
    @Produces(MediaType.APPLICATION_JSON)
    public Ticket createTicket(final Ticket ticket) {
        Ticket myTicket = new Ticket();

        myTicket = ticket;
        myTicket.setTitle("Comes from the Post :)");

        return myTicket;
    }
}
