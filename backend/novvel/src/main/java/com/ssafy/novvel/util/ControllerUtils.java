package com.ssafy.novvel.util;

import com.ssafy.novvel.member.entity.Member;
import com.ssafy.novvel.util.token.CustomUserDetails;

public class ControllerUtils {

    public static Member isCustomUserDetails(Object obj) {
        CustomUserDetails customUserDetails;
        customUserDetails = (obj instanceof String) ? null : (CustomUserDetails) obj;

        if(customUserDetails == null) return null;

        return customUserDetails.getMember();
    }
}
