import Searchbar from "./Searchbar";
import CandidateList from "./CandidateList";
import DropdownSelection from "./DropdownSelection";
import { useState, useEffect } from "react";
import candidateService from "../services/candidateService";
import partyService from "../services/partyService";

function FilterableCandidateSection() {
    const [parties, setParties] = useState([]);
    const [candidates, setCandidates] = useState([]);
    const [filteredCandidates, setFilteredCandidates] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("");
    const [sortingType, setSortingType] = useState("votes");

    useEffect(() => {
        async function fetchData() {
            setParties(await partyService.findAll());
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
                        onChanged={setFilterType}>
                        <option value="">Alle partier</option>
                        {parties.map(p => 
                            <option key={p.signature} value={p.signature}>
                                {p.signature} - {p.name}
                            </option>
                        )}
                    </DropdownSelection>
                    <DropdownSelection 
                        parties={parties} 
                        label="Sortér efter" 
                        defaultValue="votes"
                        onChanged={setSortingType}>
                        <option value="name">Navn</option>
                        <option value="party">Parti</option>
                        <option value="votes">Antal stemmer</option>
                    </DropdownSelection>
                </div>
            </div>
            <CandidateList 
                filteredCandidates={filteredCandidates} 
                onCandidatesChanged={setCandidates} 
                candidates={candidates} 
                parties={parties} />
        </>
    );
}

export default FilterableCandidateSection;
