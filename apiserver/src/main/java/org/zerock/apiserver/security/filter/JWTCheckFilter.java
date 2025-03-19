package org.zerock.apiserver.security.filter;

import com.google.gson.Gson;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.filter.OncePerRequestFilter;
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
