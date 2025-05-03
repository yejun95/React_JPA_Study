package org.zerock.apiserver.repository;

import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Commit;
import org.springframework.transaction.annotation.Transactional;
import org.zerock.apiserver.domain.Cart;
import org.zerock.apiserver.domain.CartItem;
import org.zerock.apiserver.domain.Member;
import org.zerock.apiserver.domain.Product;

import java.util.Optional;

@SpringBootTest
@Log4j2
public class CartRepositoryTests {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Transactional
    @Commit
    @Test
    public void testInsertByProduct() {

        String email = "user1@aaa.com";
        Long pno = 4L;
        int qty = 4;

        // 이메일과 상품번호로 장바구니 아이템 확인 -> 없으면 추가, 있으면 수량 변경해서 저장
        CartItem cartItem = cartItemRepository.getItemOfPno(email, pno);

        // 이미 사용자 장바구니에 담겨있는 상품
        if (cartItem != null) {
            cartItem.changeQty(qty);
            cartItemRepository.save(cartItem);
            return;
        }

        // 사용자 장바구니에 아이템을 만들어서 저장
        // 장바구니가 아예 없는 경우
        Optional<Cart> result = cartRepository.getCartOfMember(email);
        Cart cart = null;

        if (result.isEmpty()) {

            // 새로운 카트 생성
            Member member = Member.builder().email(email).build();
            Cart tempCart = Cart.builder().owner(member).build();
            cart = cartRepository.save(tempCart);
        } else {
            // 장바구니는 있으나 사용자 장바구니에 담겨있지 않은 상품인 것
            cart = result.get();
        }

        Product product = Product.builder().pno(pno).build();
        cartItem = CartItem.builder().cart(cart).product(product).qty(qty).build();

        cartItemRepository.save(cartItem);
    }

    @Test
    public void testListOfMember() {

        String email = "user1@aaa.com";

        cartItemRepository.getItemsOfCartDTOByEmail(email);
    }

    @Transactional
    @Commit
    @Test
    public void testUpdateByCino() {

        Long cino = 1L;
        int qty = 4;

        Optional<CartItem> result = cartItemRepository.findById(cino);

        CartItem cartItem = result.orElseThrow();

        cartItem.changeQty(qty);

        cartItemRepository.save(cartItem);
    }

}
