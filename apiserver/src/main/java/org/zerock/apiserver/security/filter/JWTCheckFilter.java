package org.zerock.apiserver.security.filter;

import com.google.gson.Gson;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;
import org.zerock.apiserver.dto.MemberDTO;
import org.zerock.apiserver.util.JWTUtil;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@Log4j2
//모든 Request에 대해 검사하는 Filter > OncePerRequestFilter
public class JWTCheckFilter extends OncePerRequestFilter {

    //제외할 url
    private static final List<String> EXCLUDE_URL = List.of("/api/member/login");

    //예외 경로 설정 가능
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {

        String path = request.getRequestURI();
        log.info("check url-------------{}", path);

        //true == not checking
        //return false == check
        return EXCLUDE_URL.stream().anyMatch(exclude -> exclude.equalsIgnoreCase(request.getServletPath()));
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        log.info("------------------");

        log.info("------------------");

        log.info("------------------");

        //JWT Check
        String authHeaderStr = request.getHeader("Authorization");

        //Bearer //7 JWT문자열
        try {
            //Bearer accesstoken...
            String accessToken = authHeaderStr.substring(7);
            Map<String, Object> claims = JWTUtil.validateToken(accessToken);

            log.info("JWT claims: {}", claims);

            //destination

            /**
             * 1번 방안 -> 바로 filterChain 사용
             */
            /* filterChain.doFilter(request, response);
                SecurityContextHolder 사용하는 방법으로 전환
             */

            /**
             * 2번 방안 > SecurityContextHolder 이용 후 filterChain 사용
             */
            String email = (String) claims.get("email");
            String pw = (String) claims.get("pw");
            String nickname = (String) claims.get("nickname");
            Boolean social = (Boolean) claims.get("social");
            List<String> roleNames = (List<String>) claims.get("roleNames");

            MemberDTO memberDTO = new MemberDTO(email, pw, nickname, social.booleanValue(), roleNames);

            log.info("------------------------------------");
            log.info(memberDTO);
            log.info(memberDTO.getAuthorities());

            // Spring Security가 사용하는 토큰
            UsernamePasswordAuthenticationToken authenticationToken
                    = new UsernamePasswordAuthenticationToken(memberDTO, pw, memberDTO.getAuthorities());

            SecurityContextHolder.getContext().setAuthentication(authenticationToken);

            filterChain.doFilter(request, response);

        } catch (Exception e) {
            log.error("JWT Check Error............");
            log.error(e.getMessage());

            Gson gson = new Gson();
            String msg = gson.toJson(Map.of("error", "ERROR_ACCESS_TOKEN"));

            response.setContentType("application/json");
            PrintWriter printWriter = response.getWriter();
            printWriter.println(msg);
            printWriter.close();
        }
    }
}
