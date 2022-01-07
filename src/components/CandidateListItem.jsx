import { useState, useEffect } from "react";
import DropdownSelection from "./DropdownSelection";
import Modal from "./Modal";
import candidateService from "../services/candidateService";
import partyService from "../services/partyService";

function CandidateListItem(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [candidate, setCandidate] = useState();
    const [parties, setParties] = useState([]);

    useEffect(() => {
        setCandidate(props.candidate);
    }, [props.candidate]);

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleModalOpen = async () => {
        setIsModalOpen(true);
        setParties(await partyService.findAll());
    };
    
    const handleCandidateChanged = (e) => {
        setCandidate({
            ...candidate,
            name: e.target.value,
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
                title={props.candidate.name}
                subTitle={props.candidate.party.name}>
                <form onSubmit={handleModalSubmit} className="flex flex-col">
                    <label className="mb-4">
                        Navn
                        <input type="text" 
                            className="border-2 p-2 w-full mt-1" 
                            value={candidate?.name} 
                            onChange={(e) => {
                                setCandidate({
                                    ...candidate,
                                    name: e.target.value,
                                });
                            }} 
                        />
                    </label>
                    <DropdownSelection 
                        label="Parti"
                        value={candidate?.party}
                        defaultValue={candidate?.party.id}
                        onChange={async (id) => {
                            const party = await partyService.findById(id);
                            setCandidate({
                                ...candidate,
                                party,
                            });
                        }}>
                        {parties.map(p =>
                            <option key={p.signature} value={p.id}>
                                {p.signature} - {p.name}
                            </option>
                        )}
                    </DropdownSelection>
                    <input type="submit" value="Gem ændringer" 
                        className="bg-slate-900 hover:bg-slate-800 text-white 
                        font-semibold p-3 cursor-pointer my-3"/>
                    <button onClick={handleModalClose} className="bg-slate-900 hover:bg-slate-800 text-white 
                        font-semibold p-3 cursor-pointer">Annullér</button>
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
