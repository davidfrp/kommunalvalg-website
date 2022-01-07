const apiUrl = 'http://localhost:8080';
const partyService = {
    findAll: () => {
        return fetch(apiUrl + '/parties')
            .then(response => response.json());
    },
    findById: (id) => {
        return fetch(`${apiUrl}/parties/${id}`)
            .then(response => response.json());
    }
};

export default partyService;