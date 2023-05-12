package com.ssafy.novvel.util;

import com.ssafy.novvel.util.token.CustomUserDetails;

public class ControllerUtils {

    public static CustomUserDetails isCustomUserDetails(Object obj) {
        CustomUserDetails customUserDetails;
        customUserDetails = (obj instanceof String) ? null : (CustomUserDetails) obj;

        return customUserDetails;
    }
}
