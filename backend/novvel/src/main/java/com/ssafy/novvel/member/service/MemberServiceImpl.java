package com.ssafy.novvel.member.service;

import com.ssafy.novvel.member.dto.MemberInfoRegistDto;
import com.ssafy.novvel.member.entity.Member;
import com.ssafy.novvel.member.repository.MemberRepository;
import com.ssafy.novvel.resource.entity.Resource;
import com.ssafy.novvel.resource.service.ResourceService;
import java.io.IOException;
import javax.transaction.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class MemberServiceImpl implements MemberService {

    private final ResourceService resourceService;
    private final MemberRepository memberRepository;

    public MemberServiceImpl(ResourceService resourceService,
        MemberRepository memberRepository) {
        this.resourceService = resourceService;
        this.memberRepository = memberRepository;
    }

    @Override
    @Transactional
    public Member addMemberInfo(MultipartFile multipartFile, MemberInfoRegistDto memberInfoRegistDto,
        Member member) throws IOException {

        Resource resource = resourceService.saveFile(multipartFile);

        Member fullInfoMember = new Member(member.getId(), resource,
            memberInfoRegistDto.getNickname(),
            member.getEmail(), member.getSub(), "ROLE_USER",
            memberInfoRegistDto.getDescription(), member.getRefreshToken(), member.getPoint());

        return memberRepository.save(fullInfoMember);
    }
}
