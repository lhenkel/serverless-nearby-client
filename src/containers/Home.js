import React, { useEffect } from "react";

import { useAppContext } from "../libs/contextLib";
//import { onError } from "../libs/errorLib";
import "./Home.css";
import { Link } from "react-router-dom";
//import LocationsList from "../containers/LocationsList";
import LocationsList from "../components/LocationsList";

export default function Home({ coords }) {
    //const [locations, setLocations] = useState([]);
    const { isAuthenticated } = useAppContext();
    //const [isLoading, setIsLoading] = useState(true);
    //const [position, setPosition] = useState(null);

    useEffect(() => {
        async function onLoad() {
            if (!isAuthenticated) {
                return;
            }

            return (
                <LocationsList />
            );
            //setIsLoading(false);
        }

        onLoad();
    }, [isAuthenticated]);

    function renderLander() {
        return (
            <div className="lander">
                <h1>Cust-Dar</h1>
                <p>This is a demo version of something I did at work.
                Since I didn't want to expose real customer data, I loaded
                a list of Starbucks and made some fake orders instead.
                It will actually authenticate, but you can use
                the fake credentials that will be auto-filled.
                </p>
                <div>
                    <Link to="/login" className="btn btn-info btn-lg">
                        Login
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="Home">
            {isAuthenticated ? <LocationsList /> : renderLander()}
        </div>
    );
}