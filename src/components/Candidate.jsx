import { useState, useEffect } from "react";
import Modal from "./Modal";
import candidateService from "../services/candidateService";

function Candidate(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [candidate, setCandidate] = useState();

    useEffect(() => {
        setCandidate({
            name: props.name,
            amountOfVotes: props.amountOfVotes,
            party: props.party
        });
    }, [props.name, props.party]);

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

    const handleModalSubmit = () => {
        candidateService.save(candidate);
    };

    const handleDeleteCandidate = () => {
        candidateService.deleteById(candidate.id);
    };
    
    return (
        <div>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={handleModalClose}
                title={props.name}>
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
                <div style={{backgroundColor: props.party.hexColor}}
                    className="text-white h-12 w-12 flex items-center justify-center">
                    <span className="font-bold text-2xl">{props.party.signature}</span>
                </div>
                <h1 className="flex-1 mx-2 text-lg whitespace-nowrap overflow-hidden text-ellipsis">{props.name}</h1>
                {/* <pre>{JSON.stringify(props, null, 2)}</pre> */}
                <button onClick={handleModalOpen} className="p-2 bg-emerald-500 hover:bg-emerald-400">Rediger</button>
                <button onClick={handleDeleteCandidate} className="p-2 bg-emerald-500 hover:bg-emerald-400">Fjern kandidat</button>
            </div>
        </div>
    );
}

export default Candidate;
