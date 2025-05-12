package org.zerock.apiserver.security;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.zerock.apiserver.domain.Member;
import org.zerock.apiserver.dto.MemberDTO;
import org.zerock.apiserver.repository.MemberRepository;

import java.util.stream.Collectors;

/**
 * 해당 클래스는 로그인을 처리할 때 동작
 */
@RequiredArgsConstructor
@Service
@Log4j2
public class CustomUserDetailsService implements UserDetailsService {

    private final MemberRepository memberRepository;

    // MemberDTO에서 상속받은 User 클래스가 UserDetailsService를 구현한 것 중에 하나
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        log.info("----------loadUserByUsername---------" + username);

        Member member = memberRepository.getWithRoles(username);

        if (member == null) {
            throw new UsernameNotFoundException("Not Found");
        }

        MemberDTO memberDTO = new MemberDTO(
                member.getEmail(),
                member.getPw(),
                member.getNickname(),
                member.isSocial(),
                member.getMemberRoleList()
                        .stream()
                        .map(memberRole -> memberRole.name()).collect(Collectors.toList())
        );

        log.info(memberDTO);

        //인증 후에 어떤 처리를 할 것인가?

        return memberDTO;
    }
}
