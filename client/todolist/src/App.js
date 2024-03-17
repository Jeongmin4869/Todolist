import React from "react";
import Form from "./components/js/Form";
import TodoItemList from "./components/js/TodoItemList";
import TodoListTemplate from "./components/js/TodoListTemplate";

class App extends React.Component{

  constructor(props){
    super(props);
    /*
    this.id = 2;
    this.state = {
      input:"",
      todos:[
        {id:0, content:'리엑트를 공부하자0', isComplete:false},
        {id:1, content:'리엑트를 공부하자1', isComplete:true}
      ]
    }*/
    this.state = {
      /* Form.js에서 Hook(useState)사용으로 인해 제거 */ 
      // input:"",
      todos:[]
    }
    // this.handleChange = this.handleChange.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    // this.handelKeyPress = this.handelKeyPress.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handelRemove = this.handelRemove.bind(this);
    this.handleInitInfo = this.handleInitInfo.bind(this);
  }

  componentDidMount(){
    /*
    fetch("/api/todos")
      .then(res => res.json())
      .then(todos => this.setState({todos:todos}))
      .catch(err => console.log(err))
    */
    this.handleInitInfo()
  }

  handleInitInfo(){
    fetch("/api/todos")
    .then(res => res.json())
    .then(todos => this.setState({todos:todos}))
    .catch(err => console.log(err))
  }

  /* Form.js에서 Hook(useState)사용으로 인해 제거 */ 
  // input 값 변경 
  /*
  handleChange(event){
    // this.state안에 있는 값을 바꿔주려면 반드시 this.setState 를 사용
    this.setState({
      input: event.target.value
    });
  }
  */

  /* Form.js에서 Hook(useState)사용으로 인해 state 에서 input을 제외하고 parameter로 받는다.*/ 
  // 등록
  handleCreate(inputValue){
    const{todos} = this.state;
    if(inputValue === ""){
      alert("Input todo-list");
      return;
    }
    
    /* 화면에서 먼저 변경사항을 보여주는 방법으로 이용하는 부분 */
    this.setState({
      // input:"",
      todos: todos.concat({ // concat : 두개 이상의 배열을 병합하는데 사용
        id:0, // 임의의 id를 부여하여 key error 방지
        content:inputValue,
        isComplete:false
      })
    });
  
  // 처리
  const data = {
    body : JSON.stringify({"content": inputValue}), // JavaScript 객체를 JSON 문자열로 변환
    headers:{'Content-Type':'application/json'},
    method:'post' // 등록 POST
  }
  fetch("api/todos",data)
    .then(res => {
      if(!res.ok){
        throw new Error(res.status);
      } else {
        return this.handleInitInfo();
      }
    })
    .catch(err => console.log(err));
  }

  /* Form.js에서 Hook(useState)사용으로 인해 제거 */ 
  // Enter key 이벤트
  /*
  handelKeyPress(event){
    if(event.key === "Enter"){
      this.handleCreate();
    }
  }
  */

  // 수정
  handleToggle(id){

    const todos = this.state.todos;
    const isComplete = todos.find(todo => todo.id === id).isComplete;
    if(!window.confirm(isComplete?"미완료 처리 하겠습니까?":"완료처리 하겠습니까?")){
      return;
    }
    
    // 파라미터로 받은 id를 사용해 아이템의 index 찾는다.
    const index = todos.findIndex(todos => todos.id === id);

    // 선택한 객체를 저장
    const selected = todos[index];

    // 배열 복사
    const nextTodos = [...todos];

    // 기존의 값 복사 후 isComplete값을 덮어씀
    nextTodos[index] = {
      ...selected,
      isComplete : !selected.isComplete
    };

    this.setState({
      todos : nextTodos
    });

    const data = {
      header:{'Content-Type':'application/json'},
      method:'put' // 수정 PUT
    }
    fetch("api/todos/" + id,data)
    .then(res => {
      if(!res.ok){
        throw new Error(res.status);
      } else {
        return this.handleInitInfo();
      }
    })
    .catch(err => console.log(err));
  }

  // 삭제
  handelRemove(id){

    const todos = this.state.todos;

    const removeContext = todos.find(todo => todo.id === id).content;
    if(!window.confirm("'"+ removeContext + "'을 제거하시겠습니까?")){
      return;
    }

    this.setState({
      todos : todos.filter(todo => todo.id !== id)
    });

    const data = {
      header:{'Content-Type':'application/json'},
      method:'delete' // 삭제 DELETE
    }
    fetch("api/todos/"+id,data)
    .then(res => {
      if(!res.ok){
        throw new Error(res.status)
      }
      else {
        return this.handleInitInfo();
      }
    })
    .catch(err => console.log(err));
  }

  render(){
    return( 
      <TodoListTemplate form = {(
      <Form
        /* Form.js에서 Hook(useState)사용으로 인해 제거 */ 
        /*
        value={this.state.input}
        onChange={this.handleChange}
        onKeyPress={this.handelKeyPress}
        */
        onCreate={this.handleCreate}/>
      )}>
        <TodoItemList 
          todos={this.state.todos}
          onToggle={this.handleToggle}
          onRemove={this.handelRemove}
        />
      </TodoListTemplate>
    );
  }
}

export default App;