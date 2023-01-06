import Link from "next/link";

import { NextPageWithAuth } from "../helpers/generalInterfaces";
import Button from "../components/button";

const Dashboard: NextPageWithAuth = () => {
    const userName: string = "Blah";

    return (
        <div>
            <div>
                <div>Signed in as: {userName}</div>
                <Link href="/" className="hover:underline ">
                    <Button>
                        Sign Out
                    </Button>
                </Link>
            </div>
            <div>
                {/* {itemElements} */}
                some items here
            </div>
            <div>
                <button>
                    Add Item
                </button>
            </div>
        </div>
    );
};

Dashboard.auth = { auth: false };

export default Dashboard;
