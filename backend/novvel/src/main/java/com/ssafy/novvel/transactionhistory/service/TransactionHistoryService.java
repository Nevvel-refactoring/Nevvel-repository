package com.ssafy.novvel.transactionhistory.service;

import com.siot.IamportRestClient.response.IamportResponse;
import com.siot.IamportRestClient.response.Payment;
import com.ssafy.novvel.member.entity.Member;
import com.ssafy.novvel.transactionhistory.dto.PointChargeDto;

public interface TransactionHistoryService {
    void verifyIamportService(Member member, IamportResponse<Payment> irsp, PointChargeDto pointChargeDto);
}
