package org.zerock.apiserver.repository.search;

import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.zerock.apiserver.domain.Product;
import org.zerock.apiserver.domain.QProduct;
import org.zerock.apiserver.domain.QProductImage;
import org.zerock.apiserver.dto.PageRequestDTO;
import org.zerock.apiserver.dto.PageResponseDTO;
import org.zerock.apiserver.dto.ProductDTO;

import java.util.List;

@Log4j2
public class ProductSearchImpl extends QuerydslRepositorySupport implements ProductSearch {

    public ProductSearchImpl() {
        super(Product.class);
    }

    // ElementCollection을 querydsl로 만들 때 문제 없음을 보여주기 위한 코드
    @Override
    public PageResponseDTO<ProductDTO> searchList(PageRequestDTO pageRequestDTO) {

        log.info("-------------------------------searchList--------------------------------");

        Pageable pageable = PageRequest.of(
                pageRequestDTO.getPage() - 1,
                pageRequestDTO.getSize(),
                Sort.by("pno").descending()
        );

        QProduct product = QProduct.product;
        QProductImage productImage = QProductImage.productImage;

        JPQLQuery<Product> query = from(product);
        query.leftJoin(product.imageList, productImage);
        query.where(productImage.ord.eq(0));

        getQuerydsl().applyPagination(pageable, query);

        List<Product> productList = query.fetch();

        long count = query.fetchCount();

        log.info("===================================================");
        log.info(productList);
        return null;
    }
}
