const apiUrl = 'http://localhost:8080';
const candidateService = {
    findAll: (page = 1, perPage = 10) => {
        return fetch(`${apiUrl}/candidates?page=${page}&perPage=${perPage}`)
            .then(response => response.json());
    },
    findById: (id) => {
        return fetch(`${apiUrl}/candidates/${id}`)
            .then(response => response.json());
    },
    findByParty: (party) => {
        return fetch(`${apiUrl}/parties/${party}/candidates`)
            .then(response => response.json());
    },
    deleteById: (id) => {
        return fetch(`${apiUrl}/candidates/${id}`, {
            method: 'DELETE'
        }).then(response => response.json());
    },
    save: (candidate) => {
        return fetch(`${apiUrl}/parties/${candidate.party.abbreviation}/candidates`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(candidate)
        }).then(response => response.json());
    }
};

export default candidateService;