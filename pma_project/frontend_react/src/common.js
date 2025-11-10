    import DatePicker from 'react-datepicker';

    
    export const validateLocation = async (locationName) => {
        if (!locationName) return null;

        const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(locationName)}&format=json&limit=1`;

        try {
            const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
            const data = await res.json();
            if (data && data.length > 0) {
                // Return the normalized location
                console.log(data)
                return {
                    display_name: data[0].display_name,
                    latitude: data[0].lat,
                    longitude: data[0].lon
                };
            } else {
                return null;
            }
        } catch (err) {
            console.error(err);
            return null;
        }
    };


    

    export const validateDateRange = (start_date,end_date) => {
        if (!start_date || !end_date) return false;
        return new Date(start_date) <= new Date(end_date);
    }

    export const isValidZip = (zip) => {
        // US ZIP code format: 5 digits or 5-4 digits
        return /^\d{5}(-\d{4})?$/.test(zip);
    };

    export const validateGPS = (gpsString) => {
        if (!gpsString) return null;

        const parts = gpsString.split(',').map(val => val.trim());
        if (parts.length !== 2) return null;

        const [lat, lon] = parts.map(Number);

        // Latitude must be between -90 and 90, Longitude between -180 and 180
        if (isNaN(lat) || isNaN(lon)) return null;
        if (lat < -90 || lat > 90) return null;
        if (lon < -180 || lon > 180) return null;

        return { latitude: lat, longitude: lon };
    };