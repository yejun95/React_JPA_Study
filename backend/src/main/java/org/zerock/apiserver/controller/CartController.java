package org.zerock.apiserver.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.zerock.apiserver.dto.CartItemDTO;
import org.zerock.apiserver.dto.CartItemListDTO;
import org.zerock.apiserver.service.CartService;

import java.security.Principal;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;

    // 로그인한 사용자와 security 값이 일치해야만 처리
    @PreAuthorize("#itemDTO.email == authentication.name")
    @PostMapping("/change")
    public List<CartItemListDTO> changeCart(@RequestBody CartItemDTO itemDTO) {
        log.info(itemDTO);

        // 음수 처리
        if (itemDTO.getQty() <= 0) {
            return cartService.remove(itemDTO.getCino());
        }

        return cartService.addOrModify(itemDTO);
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping("/items")
    public List<CartItemListDTO> getCartItems(Principal principal) { // principal : security에 들어있는 로그인 값 확인

        String email = principal.getName();

        log.info("email {}", email);

        return cartService.getCartItems(email);
    }

    @PreAuthorize("hasAnyRole('ROLE_USER')")
    @DeleteMapping("/{cino}")
    public List<CartItemListDTO> removeFromCart(@PathVariable("cino") Long cino) {

        log.info("cart item no: {}", cino);

        return cartService.remove(cino);
    }

}
