const filter = ({ filter, onChange }) => {
    return (
        <div>
            <h2>Your contacts list</h2>
            <p>Find a contact by name</p>
            <input
                type="text"
                name="filter"
                value={filter}
                onChange={onChange}
                className="filter"
            />
        </div>
    );
};

export default filter;