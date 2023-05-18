package com.ssafy.novvel.transactionhistory.controller;

import com.siot.IamportRestClient.exception.IamportResponseException;
import com.ssafy.novvel.transactionhistory.dto.PointChargeDto;
import com.ssafy.novvel.transactionhistory.service.TransactionHistoryService;
import com.ssafy.novvel.util.token.CustomUserDetails;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.io.IOException;

@Controller
@RequiredArgsConstructor
public class TransactionHistoryController {

    private final TransactionHistoryService historyService;

    @PostMapping("/point-charge")
    @Operation(summary = "포인트 충전", description = "<strong>포인트를 충전</strong> 합니다.")
    public ResponseEntity<?> chargePoint(@RequestBody PointChargeDto pointChargeDto,
                                         @AuthenticationPrincipal CustomUserDetails customUserDetails)
                                         throws IamportResponseException, IOException {

        historyService.verifyIamportService(customUserDetails.getMember(),pointChargeDto);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
