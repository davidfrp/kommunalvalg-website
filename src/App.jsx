import partyService from './services/partyService';
import { useState, useEffect } from 'react';
import PartyList from './components/PartyList';

function App() {
    const [parties, setParties] = useState([]);
    
    useEffect(() => {
        async function fetchData() {
            setParties(await partyService.findAll());
        }
        fetchData();
    }, []);

    return (
        <main>
            <h1 className="text-3xl font-bold underline">
                Hello world!
            </h1>
            <PartyList parties={parties} />
        </main>
    );
}

export default App;
