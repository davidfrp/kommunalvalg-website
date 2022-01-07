import Searchbar from "./Searchbar";
import CandidateList from "./CandidateList";
import DropdownSelection from "./DropdownSelection";
import { useState, useEffect } from "react";
import candidateService from "../services/candidateService";

function FilterableCandidatesSection() {
    const [candidates, setCandidates] = useState([]);
    const [filteredCandidates, setFilteredCandidates] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("");
    const [sortingType, setSortingType] = useState("votes");

    useEffect(() => {
        async function fetchData() {
            setCandidates(await candidateService.findAll());
        }
        fetchData();
    }, []);

    useEffect(() => {
        setFilteredCandidates(candidates.filter((c) => {
            return (filterType === "" || c.party.signature === filterType) &&
                (searchTerm === "" || c.name.toUpperCase().includes(searchTerm.toUpperCase()));
        }).sort(handleSorting));
    }, [searchTerm, filterType, sortingType, candidates]);

    const handleSorting = (a, b) => {
        if (sortingType === "name") {
            return a.name.localeCompare(b.name);
        } else if (sortingType === "party") {
            return a.party.signature.localeCompare(b.party.signature);
        } else if (sortingType === "votes") {
            return b.amountOfVotes - a.amountOfVotes;
        } else {
            return 0;
        }
    };
    
    return (
        <>
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">
                    Kandidater fra Københavns Kommune
                </h2>
                <Searchbar onSearchChanged={setSearchTerm} />
                <div className="flex flex-wrap gap-4">
                    <DropdownSelection 
                        label="Filtér efter" 
                        onChange={setFilterType}>
                        <option value="">Alle partier</option>
                        {[...new Set(candidates.map(c => JSON.stringify(c.party)))].map(JSON.parse).map(p => 
                            <option key={p.id} value={p.signature}>
                                {p.signature} - {p.name}
                            </option>
                        )}
                    </DropdownSelection>
                    <DropdownSelection 
                        label="Sortér efter" 
                        defaultValue="votes"
                        onChange={setSortingType}>
                        <option value="votes">Antal stemmer</option>
                        <option value="name">Navn</option>
                        <option value="party">Parti</option>
                    </DropdownSelection>
                </div>
            </div>
            <CandidateList 
                filteredCandidates={filteredCandidates} 
                onCandidatesChanged={setCandidates} 
                candidates={candidates} />
        </>
    );
}

export default FilterableCandidatesSection;
