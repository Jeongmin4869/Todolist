package com.strongmin.todolist.service;

import com.strongmin.todolist.domain.Todo;
import org.springframework.data.domain.Sort;
import java.util.List;

public interface TodoService {

    // Sort를 파라미터로 가지며, Sort를 통해 Todo목록을 정렬하여 가져온다.
    List<Todo> getTodos(Sort sort) throws Exception;

    // Todo를 추가 및 수정한다.
    void postTodo(Todo todo) throws Exception;

    // Id에 해당하는 Todo를 삭제한다.
    void deleteTodo(Long id) throws Exception;

    // Id에 해당하는 Todo를 조회한다.
    Todo findTodoById(Long id) throws Exception;
}
