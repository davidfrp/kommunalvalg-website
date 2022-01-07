import CandidateListItem from "./CandidateListItem";

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

    return (
        <div className="flex flex-col gap-0">
            {props.filteredCandidates.map(c => 
                <CandidateListItem 
                    key={c.id} 
                    candidate={c} 
                    parties={props.parties}
                    onCandidateChanged={handleCandidateChanged} 
                    onCandidateRemoved={handleCandidateRemoved} />
            )}
        </div>
    );
}

export default CandidateList;
