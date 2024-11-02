import { useState } from "react";

import "./AddTodo.css";
import TodoItem from "../todoItem/TodoItem.jsx";

function AddTodo() {

    const [userInput, setUserInput] = useState("")
    const [todoItems, setTodoItems] = useState([])

    const getUserInput = (event) => {
        setUserInput(event.target.value)
    };

    const addTodoItem = (event) => {

        // Prevents the form from refreshing the page
        event.preventDefault();

        // Avoid adding empty items
        if (userInput.trim() === "") return;

        let newItem = {
            // assign unique id
            id: Date.now(),
            title: userInput,
            status: false
        };
        setTodoItems([...todoItems, newItem]);

        // clear input field
        setUserInput("");
    };

    const updateStatus = (event, id) => {
        const updatedStatus = todoItems.map((item)=> 
            item.id === id ? {...item, status: event.target.checked} : item 
        );
        setTodoItems(updatedStatus)
    };

    const updateTitle = (id, newTitle)=> {
        const updatedTitle = todoItems.map((item)=> 
            item.id === id ? {...item, title: newTitle} : item
        );
        setTodoItems(updatedTitle)
    };

    const deleteItem = (id) => {
        const filteredData = todoItems.filter((item) => item.id !== id);
        setTodoItems(filteredData)
    };


    return (
        <div className="container py-4">
            <div className="row" id="header">
                <div className="col-12"></div>
                <h2 className="heading">To-Do List App</h2>
            </div>
            <form className="row" onSubmit={addTodoItem}>
                <div className="col-12 col-md-8 col-lg-6">
                    <input
                        type="text"
                        placeholder="Enter task"
                        className="form-control py-2"
                        value={userInput}
                        onChange={getUserInput}
                    />
                </div>
                <div className="col-12 col-md-4 col-lg-2">
                    <button className="btn btn-primary w-100" type="submit">Add Task</button>
                </div>
            </form>

            <TodoItem
                todoitem={todoItems}
                deleteItem={deleteItem}
                updateStatus={updateStatus}
                updateTitle={updateTitle}
            />
        </div>
    )
};

export default AddTodo;