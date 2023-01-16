import { useSessionContext } from '@supabase/auth-helpers-react'

import { NextPageWithAuth } from "helpers/generalInterfaces";
import Todos from "components/Todos";
import AddTodo from "components/Todos/Add";

const Crud: NextPageWithAuth = () => {
    const { isLoading } = useSessionContext()

    if (isLoading) {
        return <div>Loading</div>;
    } else {
        return (
            <>
                <AddTodo />
                <Todos />
            </>
        );
    }
};

Crud.auth = { authorized: true };

export default Crud;
