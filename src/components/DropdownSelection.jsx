function DropdownSelection(props) {
    return (
        <label className="flex flex-col flex-1 mb-4">
            {props.label}
            <select onChange={(e) => props.onChanged(e.target.value)}
                defaultValue={props?.defaultValue} className="border-2 bg-inherit py-2.5 px-1.5 mt-1">
                {props.children}
            </select>
        </label>
    );
}

export default DropdownSelection;
