package com.company.ticketing.ticket_management_system_backend.exception;


import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.security.access.AccessDeniedException;

import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalExceptionHandler {


    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ApiErrorResponse> handleException(RuntimeException ex,
                                                            HttpServletRequest request) {
        ApiErrorResponse error= new ApiErrorResponse(
                LocalDateTime.now(),
                HttpStatus.BAD_REQUEST.value(),
                "Bad Request",
                ex.getMessage(),
                request.getRequestURI()

        );
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(error);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public  ResponseEntity<ApiErrorResponse> handleValidationExcepion(
            MethodArgumentNotValidException ex,
            HttpServletRequest request
    ){
            String firstErrorMessage= ex.getBindingResult()
                    .getFieldErrors()
                    .get(0)
                    .getDefaultMessage();

            ApiErrorResponse error= new ApiErrorResponse(
                    LocalDateTime.now(),
                    HttpStatus.BAD_REQUEST.value(),
                    "Validation Error",
                    firstErrorMessage,
                    request.getRequestURI()

            );
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(error);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ApiErrorResponse> handleAccessDeniedException(
            AccessDeniedException ex,
            HttpServletRequest request
    ) {
        ApiErrorResponse error = new ApiErrorResponse(
                LocalDateTime.now(),
                HttpStatus.FORBIDDEN.value(),
                "Forbidden",
                ex.getMessage(),
                request.getRequestURI()
        );
        return ResponseEntity
                .status(HttpStatus.FORBIDDEN)
                .body(error);


    }


}
