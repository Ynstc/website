import { NextPageWithAuth } from "../helpers/generalInterfaces";

const Crud: NextPageWithAuth = () => {
    return (
        <div>
            TODO blog Crud <b>protected</b> should be
        </div>
    );
};

Crud.auth = {authorized: true};

export default Crud;
