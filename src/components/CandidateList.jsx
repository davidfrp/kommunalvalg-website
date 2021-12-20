import Modal from "./Modal";
import Candidate from "./Candidate";
import candidateService from "../services/candidateService";
import { useState, useEffect } from "react";

function CandidateList() {
    const [candidates, setCandidates] = useState([]);
    
    useEffect(() => {
        async function fetchData() {
            setCandidates(await candidateService.findAll());
        }
        fetchData();
    }, []);

    return (
        candidates.map(c =>
            <Candidate 
                key={c.id} 
                name={c.name} 
                amountOfVotes={c.amountOfVotes}
                party={c.party} />)
    );
}

export default CandidateList;
