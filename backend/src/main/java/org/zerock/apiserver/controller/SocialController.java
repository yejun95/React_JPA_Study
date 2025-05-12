package org.zerock.apiserver.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.*;
import org.zerock.apiserver.dto.MemberDTO;
import org.zerock.apiserver.dto.MemberModifyDTO;
import org.zerock.apiserver.service.MemberService;
import org.zerock.apiserver.util.JWTUtil;

import java.util.Map;

@RestController
@Log4j2
@RequiredArgsConstructor
public class SocialController {

    private final MemberService memberService;

    @GetMapping("/api/member/kakao")
    public Map<String, Object> getMemberFromKakao(String accessToken) {

        log.info("accessToken: {}", accessToken);

        MemberDTO memberDTO = memberService.getKakaoMember(accessToken);

        Map<String, Object> claims = memberDTO.getClaims();

        String jwtAccessToken = JWTUtil.generateToken(claims, 10);
        String jwtRefreshToken = JWTUtil.generateToken(claims, 60 * 24);

        claims.put("accessToken", jwtAccessToken);
        claims.put("refreshToken", jwtRefreshToken);

        // Spring MVC 이므로 Handler와 다르게 Gson을 쓰지 않아도 자동 변환이 된다.
        return claims;
    }

    @PutMapping("/api/member/modify")
    public Map<String, String> modify(@RequestBody MemberModifyDTO memberModifyDTO) {

        memberService.modifyMember(memberModifyDTO);

        return Map.of("result", "modified");
    }

}
