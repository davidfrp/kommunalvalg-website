import { useState, useEffect } from "react";
import partyService from "../services/partyService";

function PartiesSection() {
    const [parties, setParties] = useState([]);

    useEffect(() => {
        async function fetchData() {
            setParties(await partyService.findAll());
        }
        fetchData();
    }, []);

    return (
        <ul>
            {parties.map(p => ``).join('')}
        </ul>
    );
}

export default PartiesSection;
