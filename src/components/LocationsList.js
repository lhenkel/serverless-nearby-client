import React, { useState, useEffect } from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { onError } from "../libs/errorLib";
import { API } from "aws-amplify";
import StoreCard from './StoreCard';
import { usePosition } from '../libs/usePosition';

export default function LocationsList() {

    const [isLoadingPosition, setIsLoadingPosition] = useState(true);
    const [isLoadingLocations, setIsLoadingLocations] = useState(false);
    const [locations, setLocations] = useState(false);
    const { latitude, longitude, error } = usePosition();
    const [storeId, setStoreId] = useState(false);

    const clearStore = () => {
        setStoreId(false);
    }

    useEffect(() => {
        async function onLoad() {
            try {
                if (latitude != null) {
                    setIsLoadingPosition(false);
                    if (!locations) {
                        if (!isLoadingLocations) {
                            setIsLoadingLocations(true);
                            const returnedLocations = await loadLocations(latitude, longitude);
                            setLocations(returnedLocations);
                            setIsLoadingLocations(false);
                        }
                    }
                }
            } catch (e) {
                onError(e);
            }
        }

        onLoad();
    }, [latitude, locations]);

    if (storeId) {
        const storeInfo = locations.filter(curLocation => curLocation.geohash.N == storeId)[0];
        return (
            <StoreCard StoreInfo={storeInfo} clearStore={clearStore} />
        )
    } else {
        if (locations) {
            return (
                <div className="locations">
                    <PageHeader>Nearby Locations
                        {' [' + longitude.toString().slice(0, 8) + ', '}
                        {latitude.toString().slice(0, 7) + ']'}
                    </PageHeader>
                    <ListGroup>
                        {renderLocationList()}
                    </ListGroup>
                </div>
            );
        } else {
            if (isLoadingLocations) {
                return (
                    <div>Loading Locations</div>
                );
            } else if (latitude == null) {
                return (
                    <div>Loading Position</div>
                );
            } else {
                return (
                    <div>no locations</div>
                );
            }
        }
    }

    function renderLocationList() {
        //console.log(locations);
        if (!locations) {
            return (
                <div></div>
            );
        }
        if (locations.length == 0) {
            return (
                <div></div>
            );

        }

        return [{}].concat(locations).map((curLocation, i) =>

            i !== 0 ? (
                <LinkContainer key={curLocation.geohash.N} onClick={(e) => setStoreId(curLocation.geohash.N)} to={'#'}>
                    <ListGroupItem header={curLocation.name.S} >
                        {curLocation.address.S}
                    </ListGroupItem>
                </LinkContainer>
            ) : (
                    <span> </span>
                )
        );

    }

    function loadLocations(latitude, longitude) {
        return API.post("find-nearby", "/find", {
            body: { "lat": latitude, "lng": longitude }
        });

    }
}