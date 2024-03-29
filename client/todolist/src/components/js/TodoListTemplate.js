import React from "react";
import '../css/TodoListTemplate.css';


const TodoListTemplate = ({form, children}) => {
    return (
        <main className="todo-list-template">
            <div className="todo-list-title">
                To-do List
            </div>
            <section className="form-wrapper">
                {form}
            </section>
            <section className="todoItemList-wrapper">
                {children}
            </section>
        </main>
    );
};

export default TodoListTemplate;