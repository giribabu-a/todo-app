import { useState } from "react";

import "./TodoItem.css";

function TodoItem({ todoitem, deleteItem, updateStatus, updateTitle }) {

    const [editIndex, setEditIndex] = useState(null)
    const [editedTitle, setEditedTitle] = useState("")

    const handleEdit = (id, title)=> {
        setEditIndex(id)
        setEditedTitle(title)
    };

    const handleSave = (id) => {
        if (editedTitle.trim() !== "") {
            updateTitle(id, editedTitle);
        }
        setEditIndex(null);
    };

    return (
        <div className="mt-5">
            {
                todoitem.map((item) => (
                    <div className="todo_item_container" key={item.id}>
                        {
                            editIndex === item.id ? (
                                <div className="todo_item_title">
                                    <input type="text"
                                        className="form-control"
                                        value={editedTitle}
                                        onChange={(event)=> {setEditedTitle(event.target.value)}} />
                                </div>
                            ) : (
                                <div className="todo_item_title">
                                    {item.title}
                                </div>
                            )
                        }

                        <div className="form-check form-switch">
                            <input type="checkbox" 
                                className="form-check-input" 
                                onChange={(event) => updateStatus(event, item.id)}
                                checked={item.status} 
                            />
                            <label className={item.status ? "text-success form-check-label" : "form-check-label text-danger"}>
                                {item.status ? "Completed" : "Pending"}
                            </label>
                        </div>

                        {
                            editIndex === item.id ? (
                                <div>
                                    <button className="saveBtn" onClick={()=> handleSave(item.id)}>Save</button>
                                </div>
                            ) : (
                                <div>
                                    <i className="bi bi-pencil-fill editBtn" onClick={()=> handleEdit(item.id, item.title)}></i>
                                    <i className="bi bi-trash3-fill deleteBtn" onClick={()=> deleteItem(item.id)}></i>
                                </div>
                            )
                        }

                    </div>
                ))
            }
        </div>
    )
};

export default TodoItem;