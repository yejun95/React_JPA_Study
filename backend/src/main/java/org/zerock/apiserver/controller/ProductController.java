package org.zerock.apiserver.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.zerock.apiserver.dto.PageRequestDTO;
import org.zerock.apiserver.dto.PageResponseDTO;
import org.zerock.apiserver.dto.ProductDTO;
import org.zerock.apiserver.service.ProductService;
import org.zerock.apiserver.util.CustomFileUtil;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/products")
public class ProductController {

    private final CustomFileUtil fileUtil;
    private final ProductService productService;

    // 파일 등록
//    @PostMapping("/")
//    public Map<String, String> register(ProductDTO productDTO) {
//
//        log.info("register: " + productDTO);
//
//        List<MultipartFile> files = productDTO.getFiles();
//        List<String> uploadedFileNames = fileUtil.saveFiles(files);
//        productDTO.setUploadFileNames(uploadedFileNames);
//
//        log.info("uploadedFileNames" + uploadedFileNames);
//
//        return Map.of("RESULT", "SUCCESS");
//    }

    // 파일 조회
    @GetMapping("/view/{fileName}")
    public ResponseEntity<Resource> viewFileGET(@PathVariable("fileName") String fileName) {

        return fileUtil.getFile(fileName);
    }

    // 목록 데이터 조회
    //PreAuthorize 메서드가 실행되기 전에 인증을 거친다.
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @GetMapping("/list")
    public PageResponseDTO<ProductDTO> list(PageRequestDTO pageRequestDTO) {
        return productService.getList(pageRequestDTO);
    }

    // 상품 저장
    @PostMapping("/")
    public Map<String, Long> register(ProductDTO productDTO) {

        List<MultipartFile> files = productDTO.getFiles();

        List<String> uploadFileNames = fileUtil.saveFiles(files);

        productDTO.setUploadFileNames(uploadFileNames);

        log.info(uploadFileNames);

        Long pno = productService.register(productDTO);

        // 화면에서 Loading 모달을 보여주기 위한 강제 슬립
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }

        return Map.of("result", pno);
    }

    // 상품 조회
    @GetMapping("/{pno}")
    public ProductDTO read(@PathVariable("pno") Long pno) {
        return productService.get(pno);
    }

    //상품 변경
    @PutMapping("/{pno}")
    public Map<String, String> modify(@PathVariable("pno") Long pno, ProductDTO productDTO) {
        productDTO.setPno(pno);

        //원래 상품 가져오기 (db에 저장되어 있는)
        ProductDTO oldProductDTO = productService.get(pno);

        //파일 업로드
        List<MultipartFile> files = productDTO.getFiles(); //새로운 파일
        List<String> currentUploadFileNames = fileUtil.saveFiles(files);

        //keep files
        List<String> uploadedFileNames = productDTO.getUploadFileNames(); //유지되고 있는 파일

        //새로 업로드된 파일이 있다면
        if (currentUploadFileNames != null && !currentUploadFileNames.isEmpty()) {
            uploadedFileNames.addAll(currentUploadFileNames);
        }

        productService.modify(productDTO);

        //지워져야 하는 파일
        List<String> oldFilesNames = oldProductDTO.getUploadFileNames();
        if (oldFilesNames != null && !oldFilesNames.isEmpty()) {
            List<String> removeFiles = oldFilesNames.stream().filter(fileName -> !uploadedFileNames.contains(fileName)).collect(Collectors.toList());
            fileUtil.deleteFiles(removeFiles);
        }//end if

        return Map.of("RESULT", "SUCCESS");
    }

    //상품 삭제
    @DeleteMapping("/{pno}")
    public Map<String, String> remove(@PathVariable("pno") Long pno) {
        List<String> oldFileNames = productService.get(pno).getUploadFileNames();

        productService.remove(pno);

        fileUtil.deleteFiles(oldFileNames);

        return Map.of("RESULT", "SUCCESS");
    }
}
