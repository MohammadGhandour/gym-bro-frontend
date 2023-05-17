import React, { useEffect, useRef, useState } from 'react';
import { Form, Stack, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserData } from '../App';

type UserFormProps = {
    onSubmit: (data: UserData) => void
    buttonText: string
    errorMessage: string,
    formText: string
    goTo: string
    linkText: string
};

function UserForm({ onSubmit, errorMessage, buttonText, formText, goTo, linkText }: UserFormProps) {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        onSubmit({
            username: usernameRef.current!.value,
            password: passwordRef.current!.value
        });
    };

    console.log(errorMessage);


    return (
        <div className='card mt-4 p-4 flex flex-column gap-4'>
            {errorMessage && <p className={`text-danger error fw-500 fs-5 mb-0 ${errorMessage ? 'animate-me' : ''}`}>{errorMessage}</p>}
            <Form className='' onSubmit={handleSubmit}>
                <Stack gap={4}>
                    <Form.Group controlId='username'>
                        <Form.Control className='input'
                            type='text'
                            required
                            autoComplete='off'
                            placeholder='Dwayne Johnson'
                            autoFocus
                            ref={usernameRef} />
                    </Form.Group>
                    <Form.Group controlId='password'>
                        <Form.Control className='input'
                            type='password'
                            required
                            autoComplete='off'
                            placeholder='Password'
                            ref={passwordRef} />
                    </Form.Group>
                    <Button className='btn-secondary outline-none fs-5 text-light' type='submit'>{buttonText}</Button>
                    <Form.Text className="mt-0 fs-1rem text-start">
                        {formText} <Link to={goTo}
                            className='text-decoration-none text-secondary'>{linkText}</Link>
                    </Form.Text>
                </Stack>
            </Form>
        </div>
    )
}

export default UserForm;
