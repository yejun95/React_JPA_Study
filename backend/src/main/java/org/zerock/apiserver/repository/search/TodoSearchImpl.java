package org.zerock.apiserver.repository.search;

import com.querydsl.jpa.JPQLQuery;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.zerock.apiserver.domain.QTodo;
import org.zerock.apiserver.domain.Todo;
import org.zerock.apiserver.dto.PageRequestDTO;

import java.util.List;

@Log4j2
public class TodoSearchImpl extends QuerydslRepositorySupport implements TodoSearch {

    public TodoSearchImpl() {
        super(Todo.class);
    }

    @Override
    public Page<Todo> search1(PageRequestDTO pageRequestDTO) {

        log.info("search1............");
        log.info(pageRequestDTO);

        QTodo todo = QTodo.todo;

        JPQLQuery<Todo> query = from(todo);

        //query.where(todo.title.contains("1"));

        Pageable pageable = PageRequest.of(pageRequestDTO.getPage() -1, pageRequestDTO.getSize(), Sort.by("tno").descending());

        this.getQuerydsl().applyPagination(pageable, query);

        return new PageImpl<>(query.fetch(), pageable, query.fetchCount());
    }
}
