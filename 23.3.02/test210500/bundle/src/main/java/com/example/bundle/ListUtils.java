package com.example.bundle;

import com.bmc.arsys.rx.services.action.domain.Action;
import com.bmc.arsys.rx.services.action.domain.ActionParameter;
import com.bmc.arsys.rx.services.common.Service;
import com.bmc.arsys.rx.services.common.domain.Scope;

import java.util.List;

public class ListUtils  implements Service {
    /**
     * This custom activity returns the size of a list of Object.
     * Setting the scope to PUBLIC will allow this Java Action to be used in any
     * other library or Application.
     *
     * @param list, list of Objects.
     * @return int, number of elements in the list, or 0.
     */
    @Action(name = "getListSize", scope = Scope.PUBLIC)
    public int getListSize(@ActionParameter(name = "list") List<Object> list) {
        int listSize = 0;

        if (list != null && !list.isEmpty()) {
            listSize = list.size();
        }

        return listSize;
    }

    /**
     * This custom activity returns one specific Object from a list of Object.
     * Setting the scope to PUBLIC will allow this Java Action to be used in any
     * other library or Application.
     *
     * @param list, list of Objects.
     * @param index, index to be retrieved in the list of Objects.
     * @return Object, selected Object (list[index]), or null.
     */
    @Action(name = "getListValueByIndex", scope = Scope.PUBLIC)
    public Object getListValueByIndex(@ActionParameter(name = "list") List<Object> list,
                                      @ActionParameter(name = "index") int index) {
        Object value = null;

        if (list != null && !list.isEmpty() && index < list.size()) {
            value = list.get(index);
        }

        return value;
    }
}
