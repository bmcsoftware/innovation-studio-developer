package com.example.service.simple;

import com.bmc.arsys.rx.services.action.domain.Action;
import com.bmc.arsys.rx.services.action.domain.ActionParameter;
import com.bmc.arsys.rx.services.common.Service;
import com.bmc.arsys.rx.services.common.domain.Scope;

import java.util.List;

public class ListUtils  implements Service {
    @Action(name = "getListSize", scope = Scope.PUBLIC)
    public int getListSize(@ActionParameter(name = "list") List<Object> list) {
        int listSize = 0;

        if (list != null && !list.isEmpty()) {
            listSize = list.size();
        }

        return listSize;
    }

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
