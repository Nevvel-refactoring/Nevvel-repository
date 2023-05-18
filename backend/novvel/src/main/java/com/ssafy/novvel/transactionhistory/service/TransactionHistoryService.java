package com.ssafy.novvel.transactionhistory.service;

import com.siot.IamportRestClient.exception.IamportResponseException;
import com.ssafy.novvel.member.entity.Member;
import com.ssafy.novvel.transactionhistory.dto.PointChargeDto;

import java.io.IOException;

public interface TransactionHistoryService {
    void verifyIamportService(Member member, PointChargeDto pointChargeDto)  throws IamportResponseException, IOException;
}
