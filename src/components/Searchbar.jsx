import { useState, useEffect } from "react";

function Searchbar(props) {
    const [searchQuery, setSearchQuery] = useState("");

    const handleChange = (e) => {
        setSearchQuery(e.target.value);
        props.onSearchChanged(e.target.value);
    };
    
    return (
        <div className="flex flex-1 flex-col mb-6 mr-2">
            <input onChange={handleChange} value={searchQuery} placeholder="Søg efter en kandidat"
                className="border-2 p-2 w-full mb-4" type="text" />
            {searchQuery.length > 0 && (
                <p>
                    Viser resultater for <strong>{searchQuery}</strong>
                </p>
            )}
        </div>
    );
}

export default Searchbar;
