const apiUrl = 'http://localhost:8080';
const partyService = {
    findAll: () => {
        return fetch(apiUrl + '/parties')
            .then(response => response.json());
    },
    findByAbbreviation: (abbreviation) => {
        return fetch(`${apiUrl}/parties/${abbreviation}`)
            .then(response => response.json());
    }
};

export default partyService;