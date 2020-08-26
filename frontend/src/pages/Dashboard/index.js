import React, { useEffect, useState } from 'react';
import { Button } from 'reactstrap';

import api from '../../services/api';

export default function Dashboard ({history}) {
    const [todos, setTodos] = useState([]);

    const userId = localStorage.getItem('userId');
    
    const getTodos = async () => {
        const response = await api.get('/todos', { headers: { user_id: userId } })
        setTodos(response.data);
    }

    useEffect(() => {
        getTodos();
    }, []);
    
    return (
        <>
            <Button onClick={ () => history.push('/create') }>New</Button>
            <ul>
                { todos.map(todo => {
                    return (
                        <li key={todo._id}>
                            {todo.title}: {todo.startDate}-{todo.targetDate} {todo.description}
                        </li>
                    );
                })}
            </ul>
        </>
    );
};