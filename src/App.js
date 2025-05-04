import React from 'react';
import {Counter} from './components/Counter'
import UserList from './components/UserList';

const App = () => {
    return(
        <>
        <h1>My React Application</h1>
        <Counter />
        <UserList />
        </>
    )
}

export default App