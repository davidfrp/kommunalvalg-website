import { useState, useEffect } from "react";
import Modal from "./Modal";
import candidateService from "../services/candidateService";

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
        <div>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={handleModalClose}
                title={props.candidate.name}>
                <form onSubmit={handleModalSubmit} className="flex flex-col">
                    <label>
                        Name
                        <input type="text" value={candidate?.name} onChange={handleCandidateChanged} 
                            className="border-2 p-2 w-full mb-4 mt-1"/>
                    </label>
                    <input type="submit" value="Gem ændringer" 
                        className="bg-red-600 hover:bg-red-500 text-white 
                        font-semibold p-4 cursor-pointer"/>
                    <button onClick={handleModalClose} className="bg-red-700 hover:bg-red-800 text-white 
                        font-semibold p-4 cursor-pointer">Annullér</button>
                </form>
            </Modal>
            <div className="flex items-center">
                <div style={{backgroundColor: props.candidate.party.hexColor}}
                    className="text-white h-12 w-12 flex items-center justify-center">
                    <span className="font-bold text-2xl">{props.candidate.party.signature}</span>
                </div>
                <h1 className="flex-1 mx-2 text-lg whitespace-nowrap overflow-hidden text-ellipsis">{props.candidate.name}</h1>
                <code className="mr-8">{props.candidate.amountOfVotes}</code>
                <button onClick={handleModalOpen} className="p-2 hover:underline">Redigér navn</button>
                <button onClick={handleDeleteCandidate} className="p-2 hover:underline">Fjern</button>
            </div>
        </div>
    );
}

export default CandidateListItem;
