import { NextPageWithAuth } from "helpers/generalInterfaces";
import { Todos } from "components/todos";
import { AddTodo } from "components/todos/Add";


const Crud: NextPageWithAuth = () => {

    return (
        <>
            <h1>CRUD</h1>
            <ul>
                <li>This is simple CRUD application so you can <b>Create (and Read), Update, Delete</b></li>
                <li>The notes you add will only be accessible from the account in which you are signed in</li>
                <li>Feel free to test it.</li>
            </ul>
            <AddTodo />
            <Todos />
        </>
    );
};

Crud.auth = { authorized: true };

export default Crud;
