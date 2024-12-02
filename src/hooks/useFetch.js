import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = (url) => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const response = await axios.get(url);
                setData(response);
                setError(null);
                setLoading(false);
            } catch (error) {
                setData(null);
                setError(error);
                setLoading(false);
            }
        }
        fetchData()
    }, [url]);
    return { apiResponse: data, apiLoading: loading, apiError: error }

}

export default useFetch;