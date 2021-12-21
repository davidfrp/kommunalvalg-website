import Modal from "./Modal";
import CandidateListItem from "./CandidateListItem";
import candidateService from "../services/candidateService";
import { useState, useEffect } from "react";

function CandidateList(props) {
    const handleCandidateChanged = (candidate) => {
        const candidates = props.candidates.map(c => {
            if (c.id === candidate.id) {
                return candidate;
            }
            return c;
        });

        props.onCandidatesChanged(candidates);
    };

    const handleCandidateRemoved = (candidate) => {
        const candidates = props.candidates.filter(c => c.id !== candidate.id);
        props.onCandidatesChanged(candidates);
    };

    return props.filteredCandidates.map(c => 
        <CandidateListItem 
            key={c.id} 
            candidate={c} 
            onCandidateChanged={handleCandidateChanged} 
            onCandidateRemoved={handleCandidateRemoved} />
    );
}

export default CandidateList;
