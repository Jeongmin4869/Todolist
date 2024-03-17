package com.strongmin.todolist;

import com.strongmin.todolist.domain.Todo;
import com.strongmin.todolist.repository.TodoRepository;
import org.assertj.core.api.Assertions;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;

import java.time.LocalDate;
import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.*;

@RunWith(SpringRunner.class)
@DataJpaTest
public class JpaMappingTest {

    private final String content = "내용";

    @Autowired
    private TodoRepository todoRepository;

    @Autowired
    private TestEntityManager entityManager;

    private Todo getSaved() {
        Todo todo = Todo.builder()
                .content(content)
                .createdDateTime(LocalDateTime.now())
                .build();

        return entityManager.persist(todo);
    }

    @Test
    public void test_get() {
        //given
        Todo todo = getSaved();
        System.out.println("======================");
        System.out.println(todo.getId());
        System.out.println(todo.getContent());
        System.out.println(todo.getIsCompleted());
        System.out.println(todo.getCreatedDateTime());
        System.out.println("======================");
        Long id = todo.getId();

        //when
        Todo savedTodo = todoRepository.getOne(id);

        //then
        assertThat(savedTodo.getContent()).isEqualTo(content);
    }

    @Test
    public void test_save() {
        // given
        Todo todo = Todo.builder()
                .content("내용")
                .isCompleted(true)
                .createdDateTime(LocalDateTime.now())
                .build();
        // when
        Todo savedTodo = todoRepository.save(todo);
        System.out.println("======================");
        System.out.println(savedTodo.getId());
        System.out.println(savedTodo.getContent());
        System.out.println(savedTodo.getIsCompleted());
        System.out.println(savedTodo.getCreatedDateTime());
        System.out.println("======================");

        // then
        assertThat(savedTodo.getId()).isGreaterThan(0);
        assertThat(savedTodo.getContent()).isEqualTo("내용");
        assertThat(savedTodo.getIsCompleted()).isEqualTo(true);
    }

    @Test
    public void test_deleted() {
        //given
        Todo todo = getSaved();
        System.out.println("======================");
        System.out.println(todo.getId());
        System.out.println(todo.getContent());
        System.out.println(todo.getIsCompleted());
        System.out.println(todo.getCreatedDateTime());
        System.out.println("======================");
        Long id = todo.getId();

        //when
        todoRepository.deleteById(id);

        //then
        assertThat(entityManager.find(Todo.class, id)).isNull();
    }

}
