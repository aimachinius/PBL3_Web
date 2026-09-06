package com.pbl.flightapp.webConfig;

import org.springframework.security.access.PermissionEvaluator;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import com.pbl.flightapp.appExc.PermissionException;

import java.io.Serializable;

@Component
public class CustomPermissionEvaluator implements PermissionEvaluator {

    @Override
    public boolean hasPermission(Authentication authentication, Object targetDomainObject, Object permission) {
        if (authentication == null || permission == null) {
            return false;
        }

        boolean isAccess = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .anyMatch(auth -> auth.equals(permission.toString()));
        if (!isAccess) {
            throw new PermissionException("Bạn không có quyền truy cập vào tài nguyên này", "PERMISSION_DENIED");
        }
        return true;
    }

    @Override
    public boolean hasPermission(Authentication authentication, Serializable targetId, String targetType,
            Object permission) {
        // Có thể mở rộng để phân quyền theo ID tài nguyên
        return hasPermission(authentication, null, permission);
    }
}
