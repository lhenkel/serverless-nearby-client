import React, { useState, useEffect } from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { useAppContext } from "../libs/contextLib";
import { LinkContainer } from "react-router-bootstrap";
import { onError } from "../libs/errorLib";
import { API } from "aws-amplify";
import "./Home.css";
import { Link } from "react-router-dom";

export default function Home({ coords }) {
    const [locations, setLocations] = useState([]);
    const { isAuthenticated } = useAppContext();
    const [isLoading, setIsLoading] = useState(true);
    const [position, setPosition] = useState(null);

    function loadLocations(position) {
        return API.post("find-nearby", "/find", {
            body: { "lat": position.latitude, "lng": position.longitude }
        });
    }

    useEffect(() => {
        async function onLoad() {
            if (!isAuthenticated) {
                return;
            }
            try {
                if (position == null) {
                    const settings = {
                        enableHighAccuracy: false,
                        timeout: Infinity,
                        maximumAge: 0,
                    };

                    const onChange = ({ coords, timestamp }) => {
                        setPosition({
                            latitude: coords.latitude,
                            longitude: coords.longitude,
                            accuracy: coords.accuracy,
                            timestamp,
                        });
                    };

                    if (!navigator || !navigator.geolocation) {
                        onError('Geolocation is not supported');
                    }
                    await navigator.geolocation.getCurrentPosition(onChange, onError, settings);
                } else {
                    console.log(position);
                    const queryResults = await loadLocations(position);
                    setLocations(queryResults);
                }

                if (locations) {
                    renderLocationList(locations);
                }
            } catch (e) {
                onError(e);
            }
            setIsLoading(false);
        }

        onLoad();
    }, [isAuthenticated, position, locations]);

    function renderLocationList(locations) {
        //console.log(locations);
        if (!locations) {
            return;
        }
        if (locations.length == 0) {
            return;
        }
        return [{}].concat(locations).map((curLocation, i) =>
            i !== 0 ? (
                <LinkContainer key={curLocation.hashKey.N} to={`/notes/${curLocation.hashKey}`}>
                    <ListGroupItem header={curLocation.name.S}>
                        {curLocation.address.S}
                    </ListGroupItem>
                </LinkContainer>
            ) : (
                    <span> </span>
                )
        );

    }

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

    function renderLocations() {
        return (
            <div className="locations">
                <PageHeader>Nearby Locations
                    {(position == null) ? '' : ' [' + position.longitude.toString().slice(0, 8) + ', '}
                    {(position == null) ? '' : position.latitude.toString().slice(0, 7) + ']'}
                </PageHeader>
                <ListGroup>
                    {!isLoading && renderLocationList(locations)}
                </ListGroup>
            </div>
        );
    }

    return (
        <div className="Home">
            {isAuthenticated ? renderLocations() : renderLander()}
        </div>
    );
}