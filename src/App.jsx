import FilterableCandidateSection from "./components/FilterableCandidateSection";
import candidateService from "./services/candidateService";
import partyService from "./services/partyService";
import { useState, useEffect } from "react";

function App() {
    const [candidates, setCandidates] = useState([]);
    const [parties, setParties] = useState([]);

    useEffect(() => {
        async function fetchData() {
            setParties(await partyService.findAll());
            setCandidates(await candidateService.findAll());
        }
        fetchData();
    }, []);

    return (
        <main>
            <FilterableCandidateSection candidates={candidates} />
        </main>
    );
}

export default App;
