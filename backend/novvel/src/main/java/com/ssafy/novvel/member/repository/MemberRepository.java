package com.ssafy.novvel.member.repository;

import com.ssafy.novvel.member.entity.Member;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

public interface MemberRepository extends JpaRepository<Member, Long> {

    @Query(value = "SELECT m FROM Member AS m JOIN FETCH m.profile WHERE m.sub = :sub")
    Member findSubJoinFetchResource(@Param("sub") String sub);

    Optional<Member> findBySub(String sub);

    Optional<Member> findByRefreshToken(String refreshToken);
}
