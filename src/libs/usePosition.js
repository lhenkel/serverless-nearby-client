import { useState, useEffect } from 'react';



export const usePosition = () => {
    const watch = false;
    const settings = {
        enableHighAccuracy: false,
        timeout: Infinity,
        maximumAge: 0,
    };

    const [position, setPosition] = useState({});
    const [error, setError] = useState(null);

    const onChange = ({ coords, timestamp }) => {
        setPosition({
            latitude: coords.latitude,
            longitude: coords.longitude,
            accuracy: coords.accuracy,
            timestamp,
        });
    };

    const onError = (error) => {
        setError(error.message);
    };

    useEffect(() => {
        if (!navigator || !navigator.geolocation) {
            setError('Geolocation is not supported');
            return;
        }

        let watcher = null;
        if (watch) {
            watcher =
                navigator.geolocation.watchPosition(onChange, onError, settings);
        } else {
            navigator.geolocation.getCurrentPosition(onChange, onError, settings);
        }

        return () => watcher && navigator.geolocation.clearWatch(watcher);
    }, [
        settings.enableHighAccuracy,
        settings.timeout,
        settings.maximumAge,
    ]);

    return { ...position, error };
};