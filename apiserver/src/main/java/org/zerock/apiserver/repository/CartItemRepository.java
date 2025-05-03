package org.zerock.apiserver.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.zerock.apiserver.domain.Cart;
import org.zerock.apiserver.domain.CartItem;
import org.zerock.apiserver.dto.CartItemListDTO;

import java.util.List;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    // 특정한 사용자의 모든 장바구니 아이템들을 가져올 경우 : input -> email, output -> CartItemListDTO
    // Long cino, int qty, String pname, int price, String imageFile
    // 한 번에 DTO 까지 뽑는 방식
    @Query("SELECT new org.zerock.apiserver.dto.CartItemListDTO(ci.cino, ci.qty, p.pname, p.price, pi.fileName)" +
            "FROM CartItem ci " +
            "INNER JOIN Cart mc ON ci.cart = mc " +
            "LEFT JOIN  Product p ON ci.product = p " +
            "LEFT JOIN p.imageList pi " + // EmelementCollection이기 때문에 엔티티로 조인을 못함
            "WHERE pi.ord = 0 " +
            "AND mc.owner.email = :email " +
            "ORDER BY ci.cino desc ")
    List<CartItemListDTO> getItemsOfCartDTOByEmail(@Param("email") String email);

    // 이메일, 상품 번호로 해당 상품이 이미 장바구니 아이템으로 존재하는지 확인 필요
    @Query("SELECT ci " +
            "FROM CartItem ci " +
            "LEFT JOIN Cart c ON ci.cart = c " +
            "WHERE c.owner.email = :email " +
            "AND ci.product.pno = :pno")
    CartItem getItemOfPno(@Param("email") String email, @Param("pno") Long pno);

    // 장바구니 아이템 번호로 장바구니 번호를 얻어오려고 하는 경우
    @Query("SELECT c.cno " +
            "FROM Cart c " +
            "LEFT JOIN CartItem ci ON ci.cart = c " +
            "WHERE ci.cino = :cino")
    Long getCartFromItem(@Param("cino") Long cino);

    // 장바구니 번호로 모든 장바구니 아이템을 조회
    @Query("SELECT new org.zerock.apiserver.dto.CartItemListDTO(ci.cino, ci.qty, p.pname, p.price, pi.fileName) " +
            "FROM CartItem ci " +
            "INNER JOIN Cart c ON ci.cart = c " +
            "LEFT JOIN Product p ON ci.product = p " +
            "LEFT JOIN p.imageList pi " +
            "WHERE pi.ord = 0 " +
            "AND ci.cino = :cno")
    List<CartItemListDTO> getItemsOfCartDTOByCart(@Param("cno") Long cno);
}
