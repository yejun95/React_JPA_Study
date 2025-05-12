package org.zerock.apiserver.service;

import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.zerock.apiserver.dto.PageRequestDTO;
import org.zerock.apiserver.dto.TodoDTO;

import java.time.LocalDate;

@SpringBootTest
@Log4j2
public class TodoServiceTests {

    @Autowired
    TodoService todoService;

    @Test
    public void testGet() {

        Long tno = 50L;

        log.info(todoService.get(tno));
    }

    @Test
    public void testSave() {

        TodoDTO todoDTO = TodoDTO.builder()
                .title("title......")
                .content("content//////..")
                .dueDate(LocalDate.of(2023,12,12))
                .build();

        log.info(todoService.register(todoDTO));
    }

    @Test
    public void testGetList() {

        PageRequestDTO pageRequestDTO = PageRequestDTO.builder().build();

        log.info(todoService.getList(pageRequestDTO));
    }
}
