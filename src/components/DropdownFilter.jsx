function DropdownFilter(props) {
    return (
        <select onChange={(e) => props.onFilterChanged(e.target.value)}
            className="border-2 p-2">
            <option value="">Alle partier</option>
            {props.parties.map(p => 
                <option key={p.signature} value={p.signature}>{p.signature} - {p.name}</option>)
            }
        </select>
    );
}

export default DropdownFilter;
