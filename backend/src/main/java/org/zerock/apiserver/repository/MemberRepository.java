package org.zerock.apiserver.repository;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.zerock.apiserver.domain.Member;

@Repository
public interface MemberRepository extends JpaRepository<Member, String> {

    //fetch join을 넣기 위함
    //쿼리 실행 시 memberRoleList를 같이 가져오기 위함
    @EntityGraph(attributePaths = "memberRoleList") //만약 쿼리로 쓸 경우 => @Query("select m from Member m join fetch m.memberRoleList where m.email = :email ")
    @Query("select m from Member m where m.email = :email")
    Member getWithRoles(@Param("email") String email);
}
