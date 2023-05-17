package com.ssafy.novvel.member.service;

import com.ssafy.novvel.member.dto.request.MemberInfoRegistDto;
import com.ssafy.novvel.member.dto.response.MemberChanged;
import com.ssafy.novvel.member.dto.response.MemberDescriptionDto;
import com.ssafy.novvel.member.entity.Member;
import com.ssafy.novvel.member.repository.MemberRepository;
import com.ssafy.novvel.resource.entity.Resource;
import com.ssafy.novvel.resource.repository.ResourceRepository;
import com.ssafy.novvel.resource.service.ResourceService;
import com.ssafy.novvel.util.token.UserDtoUtils;
import java.io.IOException;
import java.util.Map;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Service
public class MemberServiceImpl implements MemberService {

    private final ResourceService resourceService;
    private final MemberRepository memberRepository;
    private final ResourceRepository resourceRepository;
    private final UserDtoUtils userDtoUtils;

    public MemberServiceImpl(ResourceService resourceService,
        MemberRepository memberRepository,
        ResourceRepository resourceRepository,
        UserDtoUtils userDtoUtils) {
        this.resourceService = resourceService;
        this.memberRepository = memberRepository;
        this.resourceRepository = resourceRepository;
        this.userDtoUtils = userDtoUtils;
    }

    @Override
    public MemberDescriptionDto getMemberInfo(Member member) {

        return new MemberDescriptionDto(member.getDescription());
    }

    @Override
    @Transactional
    public MemberChanged addMemberInfo(MultipartFile multipartFile, MemberInfoRegistDto memberInfoRegistDto,
        Member member) throws IOException {

        MemberChanged memberChanged = new MemberChanged();

        Resource resource = member.getProfile();
        if(!multipartFile.isEmpty()) {
            resource = resourceService.saveFile(multipartFile);
        } else if(memberInfoRegistDto.getIsDefaultImage()) {
            resource = null;
        }


        Member fullInfoMember = new Member(member.getId(), resource,
            memberInfoRegistDto.getNickname(),
            member.getEmail(), member.getSub(), "ROLE_USER",
            memberInfoRegistDto.getDescription(), member.getRefreshToken(), member.getPoint());

        memberRepository.save(fullInfoMember);

        memberChanged.setMember(fullInfoMember);

        if(resource == null || !resource.equals(member.getProfile())) {
            if(member.getProfile() != null)
                resourceRepository.delete(member.getProfile());
            memberChanged.setRemovedResource(member.getProfile());
        }

        return memberChanged;
    }
}
