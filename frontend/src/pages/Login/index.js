import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export default function Login () {
    return (
        <Form>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Input type="email" name="email" id="exampleEmail" placeholder="Your email" />
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Input type="password" name="password" id="examplePassword" placeholder="Password" />
            </FormGroup>
            <Button color="primary">Submit</Button>
        </Form>
    );
}