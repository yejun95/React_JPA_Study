package org.zerock.apiserver.repository;

import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;
import org.zerock.apiserver.domain.Product;

import java.util.Optional;
import java.util.UUID;

@SpringBootTest
@Log4j2
public class ProductRepositoryTests {

    @Autowired
    private ProductRepository productRepository;

    @Test
    public void testInsert() {
        Product product = Product.builder()
                .pname("Test")
                .pdesc("Test Desc")
                .price(10000)
                .build();

        product.addImageString(UUID.randomUUID() + "_" + "IMAGE1.jpg");
        product.addImageString(UUID.randomUUID() + "_" + "IMAGE1.jpg");

        productRepository.save(product);
    }

    // product와 oneToMany 관계인 getImageList를 동시에 호출했을 때 에러 발생 테스트
    // 세션이 종료된 후 getImageList를 하였기 때문
    @Test
    public void testRead() {

        Long pno = 1L;
        Optional<Product> result = productRepository.findById(pno);
        Product product = result.orElseThrow();

        log.info(product);
        log.info(product.getImageList());
    }

    // EntityGraph를 imageList에 적용하여 진행
    @Test
    public void testRead2() {

        Long pno = 1L;
        Optional<Product> result = productRepository.selectOne(pno);
        Product product = result.orElseThrow();

        log.info(product);
        log.info(product.getImageList());
    }
}
