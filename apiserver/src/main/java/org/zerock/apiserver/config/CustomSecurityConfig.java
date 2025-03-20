package org.zerock.apiserver.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.zerock.apiserver.security.filter.JWTCheckFilter;
import org.zerock.apiserver.security.handler.APILoginFailHandler;
import org.zerock.apiserver.security.handler.APILoginSuccessHandler;

import java.util.Arrays;

@Configuration
@Log4j2
@RequiredArgsConstructor
@EnableMethodSecurity //controller에서 @PreAuthorize annotaion을 통해 메서드가 실행되기 전 인증을 거친다.
public class CustomSecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        log.info("--------------------------security config-----------------------");

        //CORS 설정
        http.cors(httpSecurityCorsConfigurer -> {
            httpSecurityCorsConfigurer.configurationSource(corsConfigurationSource());
        });

        //api서버는 기본적으로 무상태여야되기 때문에 세션을 유지하면 안됨 -> 세션 ID를 만들지 않기 위한 설정
        http.sessionManagement(httpSecuritySessionManagementConfigurer ->
                httpSecuritySessionManagementConfigurer.sessionCreationPolicy(SessionCreationPolicy.NEVER));

        //CSRF 미설정 - 위조 방지
        http.csrf(httpSecurityCsrfConfigurer -> httpSecurityCsrfConfigurer.disable());

        //로그인 페이지 설정
        http.formLogin(config -> {
            config.loginPage("/api/member/login");

            //로그인에 성공하면 무엇을 실행할것인가? -> 직접 만든 클래스 사용
            config.successHandler(new APILoginSuccessHandler());

            //로그인에 실패한다면
            config.failureHandler(new APILoginFailHandler());
        });

        //filter 추가 > UsernamePasswordAuthenticationFilter 클래스가 동작하기전에 JWTCheckFilter를 실행
        http.addFilterBefore(new JWTCheckFilter(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    //패스워드 인코더
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    //CORS 설정
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOriginPatterns(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "cache-Control", "Content-Type"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}
