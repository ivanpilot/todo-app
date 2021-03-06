import React from 'react';
import styled from 'styled-components';
import FormTodo from '../components/FormTodo';
import Todos from '../components/Todos';

function Home(): JSX.Element {
    return (
        <Container>
            <H1>Task List</H1>
            <Wrapper>
                <FormTodo />
                <Todos />
            </Wrapper>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-content: stretch;
    align-items: center;
    padding: 10rem;
    max-width: 900px;
    width: 100%;
    margin: auto;
`;

const H1 = styled.h1`
    font-size: 6rem;
    padding: 2rem 0;
`;

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

export default Home;
