package com.ssafy.novvel.transactionhistory.service;

import com.siot.IamportRestClient.IamportClient;
import com.siot.IamportRestClient.exception.IamportResponseException;
import com.siot.IamportRestClient.response.IamportResponse;
import com.siot.IamportRestClient.response.Payment;
import com.ssafy.novvel.exception.BadRequestException;
import com.ssafy.novvel.exception.NotFoundException;
import com.ssafy.novvel.member.entity.Member;
import com.ssafy.novvel.member.repository.MemberRepository;
import com.ssafy.novvel.transactionhistory.dto.PointChargeDto;
import com.ssafy.novvel.transactionhistory.entity.PointChangeType;
import com.ssafy.novvel.transactionhistory.entity.TransactionHistory;
import com.ssafy.novvel.transactionhistory.repository.TransactionHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.IOException;

@Service
@RequiredArgsConstructor
public class TransactionHistoryServiceImpl implements TransactionHistoryService{

    private final TransactionHistoryRepository historyRepository;
    private final MemberRepository memberRepository;

    @Override
    @Transactional
    public void verifyIamportService(Member member, PointChargeDto pointChargeDto) throws IamportResponseException, IOException{
        member = memberRepository.save(member);
        IamportResponse<Payment> irsp = paymentLookup(pointChargeDto.getImpUid());
        if(irsp.getResponse().getAmount().intValue()!=pointChargeDto.getChargePoint().intValue())
            throw new BadRequestException("값이 다릅니다.");
        historyRepository.save(new TransactionHistory(member, PointChangeType.POINT_CHARGE, pointChargeDto.getChargePoint()));
        member.setPoint(member.getPoint() + pointChargeDto.getChargePoint());
    }

    @Value("${portone.imp_key}")
    private String imp_key;

    @Value("${portone.imp_secret}")
    private String imp_secret;

    private IamportResponse<Payment> paymentLookup(String impUid) throws IamportResponseException, IOException {
        IamportClient iamportClientApi = new IamportClient(imp_key, imp_secret);
        return iamportClientApi.paymentByImpUid(impUid);
    }
}
