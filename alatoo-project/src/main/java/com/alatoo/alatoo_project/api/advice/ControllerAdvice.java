package com.alatoo.alatoo_project.api.advice;

import com.alatoo.alatoo_project.dto.BaseResponse;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Order(Ordered.HIGHEST_PRECEDENCE)
public class ControllerAdvice {
    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<BaseResponse> handleEntityNotFound(EntityNotFoundException e) {
        return ResponseEntity.badRequest().body(BaseResponse.builder()
                .message(e.getMessage())
                .build());
    }
}
