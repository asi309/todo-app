import React, { useState } from 'react';
import { Button, Container, Form, FormGroup, Label, Input } from 'reactstrap';

export default function RegisterUserComponent () {
    return (
        <Container>
            <Form>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label for="firstName" className="mr-sm-2">First Name</Label>
                    <Input type="text" name="firstName" id="firstName" placeholder="Your first name" />
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label for="lastName" className="mr-sm-2">Last Name</Label>
                    <Input type="text" name="lastName" id="lastName" placeholder="Your last name" />
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label for="email" className="mr-sm-2">Email</Label>
                    <Input type="email" name="email" id="email" placeholder="johndoe@example.com" />
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label for="password" className="mr-sm-2">Password</Label>
                    <Input type="password" name="password" id="password" placeholder="Your password" />
                </FormGroup>
                <br />
                <Button color="primary">Signup</Button>
            </Form>
        </Container>
    );
}