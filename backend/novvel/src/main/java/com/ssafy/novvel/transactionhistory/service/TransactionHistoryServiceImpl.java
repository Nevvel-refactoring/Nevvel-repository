package com.ssafy.novvel.transactionhistory.service;

import com.siot.IamportRestClient.response.IamportResponse;
import com.siot.IamportRestClient.response.Payment;
import com.ssafy.novvel.exception.NotFoundException;
import com.ssafy.novvel.member.entity.Member;
import com.ssafy.novvel.member.repository.MemberRepository;
import com.ssafy.novvel.transactionhistory.dto.PointChargeDto;
import com.ssafy.novvel.transactionhistory.entity.PointChangeType;
import com.ssafy.novvel.transactionhistory.entity.TransactionHistory;
import com.ssafy.novvel.transactionhistory.repository.TransactionHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class TransactionHistoryServiceImpl implements TransactionHistoryService{

    private final TransactionHistoryRepository historyRepository;
    private final MemberRepository memberRepository;

    @Override
    @Transactional
    public void verifyIamportService(Member member, IamportResponse<Payment> irsp, PointChargeDto pointChargeDto) {
        member = memberRepository.save(member);
        if(irsp.getResponse().getAmount().intValue()!=pointChargeDto.getChargePoint().intValue())
            throw new NotFoundException("값이 다릅니다.");
        historyRepository.save(new TransactionHistory(member, PointChangeType.POINT_CHARGE, pointChargeDto.getChargePoint()));
        member.setPoint(member.getPoint() + pointChargeDto.getChargePoint());
    }
}
