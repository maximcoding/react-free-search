import './App.css';
import {useEffect, useState} from "react";
import InputComponent from "./components/Input";
import useApi from "./hooks/useApi";


export const Results = ({data}) => {
    return (<ul>
        {data?.map(item => <li className={'item'}>{item}</li>)}
    </ul>)
}

function App() {

    const {isLoading, results, getResults} = useApi();

    const [pageUrl, setPageUrl] = useState('yahoo.com');
    const [search, setSearch] = useState('biden');
    const handlePageUrlChange = (event) => setPageUrl(event.target.value?.trim());
    const handleSearchChange = (event) => setSearch(event.target.value);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        getResults(pageUrl, search, signal);
        return () => controller.abort();
    }, [search]);

    return (
        <div>
            <div className={'containerStyle'}>
                <h2 className={'titleStyle'}>Let's Go</h2>
                <InputComponent placeholder={'Insert url'} onChange={handlePageUrlChange} value={pageUrl}/>
                <InputComponent placeholder={'Search...'} onChange={handleSearchChange} value={search}/>
                {isLoading && <div className={'titleStyle'}>{'Searching...'}</div>}
                {!isLoading && results.message && <div className={'titleStyle'}>{results.message}</div>}
            </div>
            {
                !isLoading && <Results {...results}/>
            }
        </div>
    )
        ;
}

export default App;
