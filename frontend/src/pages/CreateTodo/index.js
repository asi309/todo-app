import React, { useState, useEffect } from 'react';
import { Alert, Button, ButtonGroup, Form, FormGroup, Input } from 'reactstrap';

import api from '../../services/api';

export default function CreateTodo ({ history }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [targetDate, setTargetDate] = useState('');
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        if (!userId) {
            history.push('/');
        }
    }, [userId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const todoData = new FormData();
        todoData.append('title', title);
        todoData.append('description', description);
        todoData.append('startDate', Date.now());
        todoData.append('title', targetDate);

        const response = await api.post('/todos/add', todoData, { headers: { user_id: userId } })
    }

    return (
        <Form onSubmit={ handleSubmit }>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Input
                    type='text'
                    id='title'
                    value={ title }
                    placeholder='Title for Todo'
                    onChange={ (e) => setTitle(e.target.value) }
                />
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Input
                    type='textarea'
                    id='description'
                    value={ description }
                    placeholder='Description of your todo'
                    onChange={ (e) => setDescription(e.target.value) }
                    style={{ resize: "none"}}
                />
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Input
                    type='date'
                    id='targetDate'
                    value={ targetDate }
                    placeholder='Enter a deadline'
                    onChange={ (e) => setTargetDate(e.targetDate) }
                />
            </FormGroup>
            <ButtonGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Button>Add</Button>
            </ButtonGroup>
        </Form>
    )
}