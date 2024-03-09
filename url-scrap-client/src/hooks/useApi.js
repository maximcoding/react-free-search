import {useCallback, useState} from "react";
import debounce from "../utils/debounce";

const useApi = () => {

    const baseURL = 'http://localhost:3001/';
    const delay = 500;

    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getData = useCallback((pageUrl, search, signal) => {

        const queryString = new URLSearchParams();
        queryString.append('pageUrl', pageUrl);
        queryString.append('search', search);
        const fullURL = `${baseURL}?${queryString}`;
        setIsLoading(true);
        fetch(fullURL, {signal})
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            }).then(res => {
            setResults(res);
        }).catch(error => {
            console.error('There was an issue fetching data:', error);
        }).finally(() => {
            setIsLoading(false);
        });

    }, []);

    const getResults = debounce(getData, delay);

    return {
        isLoading,
        results,
        getResults
    }
}

export default useApi