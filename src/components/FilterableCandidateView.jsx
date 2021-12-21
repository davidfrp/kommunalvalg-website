import Searchbar from "./Searchbar";
import CandidateList from "./CandidateList";
import DropdownFilter from "./DropdownFilter";
import { useState, useEffect } from "react";
import candidateService from "../services/candidateService";
import partyService from "../services/partyService";

function FilterableCandidateView() {
    const [parties, setParties] = useState([]);
    const [candidates, setCandidates] = useState([]);
    const [filteredCandidates, setFilteredCandidates] = useState([]);

    const [searchQuery, setSearchQuery] = useState("");
    const [partyFilter, setPartyFilter] = useState("");

    useEffect(() => {
        async function fetchData() {
            const data = await candidateService.findAll();
            setFilteredCandidates(data);
            setCandidates(data);
        }
        fetchData();
    }, []);

    useEffect(() => {
        async function fetchData() {
            setParties(await partyService.findAll());
        }
        fetchData();
    }, []);

    useEffect(() => {
        setFilteredCandidates(candidates.filter(c => {
            return (searchQuery === "" || c.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
                (partyFilter === "" || c.party.signature === partyFilter);
        }));
    }, [searchQuery, partyFilter]);

    const handleCandidatesChanged = (newCandidates) => {
        setCandidates(newCandidates);
        setFilteredCandidates(newCandidates);
        setSearchQuery(searchQuery);
        setPartyFilter(partyFilter);
    };

    const handleSearchChanged = (newSearchQuery) => {
        setSearchQuery(newSearchQuery);
    };

    const handleFilterChange = (newPartyFilter) => {
        setPartyFilter(newPartyFilter);
    }

    return (
        <div>
            <div className="flex items-start">
                <Searchbar onSearchChanged={handleSearchChanged} />
                <DropdownFilter parties={parties} onFilterChanged={handleFilterChange} />
            </div>
            <CandidateList 
                filteredCandidates={filteredCandidates} 
                onCandidatesChanged={handleCandidatesChanged} 
                candidates={candidates} />
        </div>
    );
}

export default FilterableCandidateView;
