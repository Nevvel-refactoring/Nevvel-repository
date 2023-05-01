package com.ssafy.novvel.util;

import com.ssafy.novvel.asset.entity.Asset;
import com.ssafy.novvel.asset.entity.AssetType;
import com.ssafy.novvel.asset.entity.Tag;
import com.ssafy.novvel.memberasset.entity.DealType;
import com.ssafy.novvel.memberasset.entity.MemberAsset;
import com.ssafy.novvel.resource.entity.Resource;
import com.ssafy.novvel.member.entity.Member;

import java.util.Optional;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class TestUtil {

    public static Member getMember() {
        return Member.builder()
                .id(1L)
                .email("email@naver.com")
                .nickname("nickname")
                .point(0L)
                .build();
    }

    public static Member getTestMember() {
        return Member.builder()
                .email("user@naver.com")
                .role("ROLE_USER")
                .sub("Kakao_2755574745")
                .nickname("user")
                .refreshToken("testToken")
                .point(0L)
                .build();
    }

    public static Optional<Member> getGUESTMember() {
        return Optional.of(Member.builder()
                .id(1L)
                .email("user@naver.com")
                .role("ROLE_GUEST")
                .sub("Kakao_2755574745")
                .refreshToken("testToken")
                .build()
        );
    }

    public static Optional<Member> getUSERMember() {
        return Optional.of(Member.builder()
                .id(1L)
                .email("user@naver.com")
                .role("ROLE_USER")
                .sub("Kakao_2755574745")
                .nickname("user")
                .refreshToken("testToken")
                .point(0L)
                .build()
        );
    }

    public static Member getUSERMemberHasDesc() {
        return Member.builder()
                .id(1L)
                .email("user@naver.com")
                .role("ROLE_USER")
                .sub("Kakao_2755574745")
                .nickname("user")
                .point(0L)
                .description("test")
                .refreshToken("testToken")
                .profile(getMemberProfile())
                .build();
    }

    public static List<Member> getUSERMembers(int num) {
        List<Member> result = new ArrayList<>();
        for (int i = 0; i < num; i++) {
            result.add(Member.builder()
                    .id(Long.valueOf(i))
                    .email(i + "@naver.com")
                    .role("ROLE_USER")
                    .sub(String.valueOf(i))
                    .nickname(String.valueOf(i) + "nickname")
                    .point(0L)
                    .description("test")
                    .refreshToken("testToken")
                    .build()
            );
        }
        return result;
    }

    public static List<Tag> getTagList(int index) {
        List<Tag> result = new ArrayList<>();
        for (int i = 0; i < index; i++) {
            Tag tag = new Tag(Long.valueOf(i), Long.valueOf(i).toString());
            result.add(tag);
        }
        return result;
    }

    public static List<Asset> getAssetList(int index, List<Member> members, List<Resource> resources) {
        List<Asset> result = new ArrayList<>();
        for (int i = 0; i < index; i++) {
            Asset asset = Asset.builder()
                    .id(Long.valueOf(i))
                    .title(i + "title")
                    .type(AssetType.IMAGE)
                    .description(String.valueOf(i))
                    .point(100L)
                    .member(members.get(i))
                    .resource(resources.get(i))
                    .downloadCount(0L)
                    .build();
            result.add(asset);
        }
        return result;
    }

    public static List<Asset> getAssetList(int index, Member member, List<Resource> resources) {
        List<Asset> result = new ArrayList<>();
        for (int i = 0; i < index; i++) {
            Asset asset = Asset.builder()
                    .id(Long.valueOf(i))
                    .title(i + "title")
                    .type(AssetType.IMAGE)
                    .description(String.valueOf(i))
                    .point(100L)
                    .member(member)
                    .resource(resources.get(i))
                    .downloadCount(0L)
                    .build();
            result.add(asset);
        }
        return result;
    }

    public static List<Asset> getAssetList(int index) {
        List<Asset> result = new ArrayList<>();
        for (int i = 0; i < index; i++) {
            Asset asset = Asset.builder()
                    .id(Long.valueOf(i))
                    .title(i + "title")
                    .type(AssetType.IMAGE)
                    .description(String.valueOf(i))
                    .point(100L)
                    .downloadCount(0L)
                    .build();
            result.add(asset);
        }
        return result;
    }

    public static Resource getResource() {
        return new Resource(1L, "test.gif", "path", true, "thumbnailpath");
    }

    public static List<Resource> getResources(int index) {
        List<Resource> result = new ArrayList<>();
        for (int i = 0; i < index; i++) {
            result.add(new Resource(Long.valueOf(i), "test.gif", "path", true, "thumbnailpath"));

        }
        return result;
    }

    public static Resource getMemberProfile() {
        return new Resource(1L, "cat.jpeg", "path", true, "thumbnailpath");
    }

    public static Set<Tag> getTagSet(int index) {
        Set<Tag> result = new HashSet<>();
        for (int i = 0; i < index; i++) {
            Tag tag = new Tag(Long.valueOf(i), Long.valueOf(i).toString());
            result.add(tag);
        }
        return result;
    }

    public static List<MemberAsset> getMemberAssets(Member member, List<Asset> assets) {
        List<MemberAsset> result = new ArrayList<>();
        for (int i = 0; i < assets.size(); i += 2) {
            result.add(new MemberAsset(Long.valueOf(i), member, assets.get(i), DealType.BUY));
        }
        return result;
    }

    public static List<MemberAsset> getMemberAssets(List<Member> members, List<Asset> assets) {
        List<MemberAsset> result = new ArrayList<>();
        for (int i = 0; i < assets.size(); i += 2) {
            result.add(new MemberAsset(Long.valueOf(i), members.get(i), assets.get(i), DealType.BUY));
        }
        return result;
    }

}
