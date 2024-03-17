import React from "react";
import '../css/TodoItem.css'

class TodoItem extends React.Component{

    /* Form.js에서 Hook(useState) 사용으로 인한 수정 */
    /*
    shouldComponentUpdate(nextProps, nextState){
        return this.props.isComplete !== nextProps.isComplete;
    }
    */

    render(){
        const {id, content, isComplete, onToggle, onRemove} = this.props;

        console.log(id);
        
        return(
            <div className="todo-item" onClick={() => onToggle(id)}>
                <div className="todo-item-remove" onClick={(e) => {
                    e.stopPropagation(); // onToggle이 실행되지 않도록 한다.
                    onRemove(id)
                }}>
                    &times;
                </div>
                <div className={`todo-item-text ${isComplete && 'isComplete'}`}>
                    <div>
                        {content}
                    </div>
                </div>
                {
                    isComplete && (<div className="isComplete-mark">✓</div>)
                }
            </div>
            
        )
    }

}

export default TodoItem;