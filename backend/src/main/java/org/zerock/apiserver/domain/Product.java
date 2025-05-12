package org.zerock.apiserver.domain;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Table(name = "tbl_product")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = "imageList")
public class Product {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pno;

    private String pname;
    private int price;
    private String pdesc;
    private boolean delFlag;

    // 상품에서 상품 이미지까지 같이 관리함
    @ElementCollection
    @Builder.Default
    private List<ProductImage> imageList = new ArrayList<>();

    public void changePrice(int price) {
        this.price = price;
    }

    public void changeDesc(String desc) {
        this.pdesc = desc;
    }

    public void changeName(String name) {
        this.pname = name;
    }

    public void changeDel(boolean delFlag) {
        this.delFlag = delFlag;
    }

    // 상품 이미지가 상품에 알아서 딸려가도록 함
    public void addImage(ProductImage image) {
        image.setOrd(imageList.size());
        imageList.add(image);
    }

    public void addImageString(String fileName) {
        ProductImage productImage = ProductImage.builder()
                .fileName(fileName)
                .build();

        addImage(productImage);
    }

    public void clearList() {
        this.imageList.clear();
    }
}
