import { useState, useRef } from "react";

function Searchbar(props) {
    const [searchTerm, setSearchTerm] = useState("");
    const inputRef = useRef(null);

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
        props.onSearchChanged(e.target.value);
    };

    const handleClick = () => {
        setSearchTerm("");
        props.onSearchChanged("");
        inputRef.current.focus();
    };
    
    return (
        <div className="mb-8 w-full">
            <input type="text" ref={inputRef} onChange={handleChange} value={searchTerm}
                className="p-2 w-full border-2" placeholder="Søg efter en kandidat" />
            {searchTerm.length > 0 && (
                <>
                    <p className="mt-2">
                        Viser resultater med "{searchTerm.trim()}"
                    </p>
                    <button onClick={handleClick} className="font-semibold hover:underline">Ryd søgning</button>
                </>
            )}
        </div>
    );
}

export default Searchbar;
