import React, { useState } from 'react';
import { Button, ButtonGroup, Container, Form, FormGroup, Input } from 'reactstrap';

export default function RegisterUser () {
    return (
        <Container>
            <Form>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Input type="text" name="firstName" id="firstName" placeholder="Your first name" />
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Input type="text" name="lastName" id="lastName" placeholder="Your last name" />
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Input type="email" name="email" id="email" placeholder="johndoe@example.com" />
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Input type="password" name="password" id="password" placeholder="Your password" />
                </FormGroup>
                <ButtonGroup>
                    <Button color="primary">Signup</Button>
                </ButtonGroup>
            </Form>
        </Container>
    );
}