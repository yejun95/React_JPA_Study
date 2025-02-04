package org.zerock.apiserver.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {

    private Long pno;
    private String pname;
    private int price;
    private String pdesc;
    private boolean delFlag;

    // 업로드가 필요한 파일
    @Builder.Default
    private List<MultipartFile> files = new ArrayList<>();

    // 이미 업로드된 파일들
    @Builder.Default
    private List<String> uploadedFileNames = new ArrayList<>();
}
