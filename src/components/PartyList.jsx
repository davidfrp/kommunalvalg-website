function PartyList(props) {
    return (
        props.parties.map(p => 
            <details className="p-4 border border-sky-500">
                <summary className="block">{p.name}</summary>
                <div key={p.id} className="p-4 text-white" style={{backgroundColor: p.hexColor}}>
                    <p><span className="font-bold mr-4 text-lg">{p.signature}</span>{p.name}</p>
                </div>
            </details>
        )
    );
}

export default PartyList;
