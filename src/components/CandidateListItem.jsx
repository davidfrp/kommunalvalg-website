import { useState, useEffect } from "react";
import Modal from "./Modal";
import candidateService from "../services/candidateService";
import DropdownSelection from "./DropdownSelection";

function CandidateListItem(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [candidate, setCandidate] = useState();

    useEffect(() => {
        setCandidate(props.candidate);
    }, [props.candidate]);

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };
    
    const handleCandidateChanged = (e) => {
        setCandidate({
            ...candidate,
            name: e.target.value
        });
    };

    const handleModalSubmit = (e) => {
        e.preventDefault();
        candidateService.save(candidate);
        props.onCandidateChanged(candidate);
        handleModalClose();
    };

    const handleDeleteCandidate = () => {
        candidateService.delete(candidate);
        props.onCandidateRemoved(candidate);
    };
    
    return (
        <>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={handleModalClose}
                subTitle={props.candidate.party.name}>
                <header>
                    <div style={{backgroundColor: props.candidate.party.hexColor}} className="text-white 
                        h-10 w-10 flex-shrink-0 flex items-center justify-center mb-2">
                        <span className="font-bold text-2xl">{props.candidate.party.signature}</span>
                    </div>
                    <h1 className="text-2xl font-semibold">{props.candidate.name}</h1>
                </header>
                <form onSubmit={handleModalSubmit} className="flex flex-col">
                    <label className="mb-4">
                        Navn
                        <input type="text" value={candidate?.name} onChange={handleCandidateChanged} 
                            className="border-2 p-2 w-full mt-1"/>
                    </label>
                    <DropdownSelection 
                        label="Parti"
                        value={candidate?.party}
                        onChanged={() => {}}>
                        {props.parties.map(p =>
                            <option key={p.signature} value={p}>
                                {p.signature} - {p.name}
                            </option>
                        )}
                    </DropdownSelection>
                    <input type="submit" value="Gem ændringer" 
                        className="bg-slate-900 hover:bg-slate-800 text-white 
                        font-semibold p-4 cursor-pointer my-2"/>
                    <button onClick={handleModalClose} className="bg-slate-900 hover:bg-slate-800 text-white 
                        font-semibold p-4 cursor-pointer">Annullér</button>
                </form>
            </Modal>
            <button onClick={handleModalOpen} className="flex text-left cursor-pointer 
                bg-white transition hover:scale-105 focus:z-10">
                <div style={{backgroundColor: props.candidate.party.hexColor}} className="text-white 
                    h-12 w-12 flex-shrink-0 flex items-center justify-center">
                    <span className="font-bold text-3xl">{props.candidate.party.signature}</span>
                </div>
                <div className="flex-1 flex items-center max-w-[calc(100%-3rem)]" 
                    style={{backgroundColor: `${props.candidate.party.hexColor}11`}}>
                    <h1 className="flex-1 mx-4 text-lg whitespace-nowrap 
                        overflow-hidden text-ellipsis">
                        {props.candidate.name}
                    </h1>
                    <p className="mr-4">{props.candidate.amountOfVotes} stemmer</p>
                </div>
            </button>
        </>
    );
}

export default CandidateListItem;
