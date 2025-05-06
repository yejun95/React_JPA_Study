package org.zerock.apiserver.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.zerock.apiserver.domain.Cart;
import org.zerock.apiserver.domain.CartItem;
import org.zerock.apiserver.domain.Member;
import org.zerock.apiserver.domain.Product;
import org.zerock.apiserver.dto.CartItemDTO;
import org.zerock.apiserver.dto.CartItemListDTO;
import org.zerock.apiserver.repository.CartItemRepository;
import org.zerock.apiserver.repository.CartRepository;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Service
@Log4j2
@RequiredArgsConstructor
public class CartServiceImpl implements CartService{

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;

    @Override
    public List<CartItemListDTO> addOrModify(CartItemDTO cartItemDTO) {

        String email = cartItemDTO.getEmail();
        Long pno = cartItemDTO.getPno();
        int qty = cartItemDTO.getQty();
        Long cino = cartItemDTO.getCino();

        // 기존에 담겨 있는 상품에 대한 처리
        if (cino != null) {
            Optional<CartItem> cartItemResult = cartItemRepository.findById(cino);

            CartItem cartItem = cartItemResult.orElseThrow();
            cartItem.changeQty(qty);
            cartItemRepository.save(cartItem);

            return getCartItems(email);
        }

        Cart cart = getCart(email);

        CartItem cartItem = null;

        cartItem = cartItemRepository.getItemOfPno(email, pno);

        // 아이템이 카트에 담기지 않았다면
        if (cartItem == null) {
            Product product = Product.builder().pno(pno).build();
            cartItem = CartItem.builder().product(product).cart(cart).qty(qty).build();
        } else {
            cartItem.changeQty(qty);
        }

        cartItemRepository.save(cartItem);


        return getCartItems(email);
    }

    private Cart getCart(String email) {

        // 해당 email의 장바구니(Cart)가 있는지 확인
        // 장바구니가 없으면 Cart 객체 생성 후 추가하고 반환
        Cart cart = null;

        Optional<Cart> result = cartRepository.getCartOfMember(email);

        if (result.isEmpty()) {
            log.info("Cart of the member is not exist!!");

            Member member = Member.builder().email(email).build();

            Cart tempCart = Cart.builder().owner(member).build();

            cart = cartRepository.save(tempCart);
        } else {
            cart = result.get();
        }

        return cart;
    }

    @Override
    public List<CartItemListDTO> getCartItems(String email) {
        return cartItemRepository.getItemsOfCartDTOByEmail(email);
    }

    @Override
    public List<CartItemListDTO> remove(Long cino) {

        Long cno = cartItemRepository.getCartFromItem(cino);

        cartItemRepository.deleteById(cino);

        // 장바구니 아이템 삭제 후 해당 장바구니의 아이템 재조회
        return cartItemRepository.getItemsOfCartDTOByCart(cno);
    }
}
