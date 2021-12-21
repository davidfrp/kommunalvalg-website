const apiUrl = 'http://localhost:8080';
const candidateService = {
    findAll: () => {
        return fetch(`${apiUrl}/candidates`)
            .then(response => response.json());
    },
    findAllPageable: (page, perPage) => {
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
    delete: (candidate) => {
        return fetch(`${apiUrl}/parties/${candidate.party.abbreviation}/candidates/${candidate.id}`, {
            method: 'DELETE'
        }).then(response => response.json());
    },
    save: (candidate) => {
        return fetch(`${apiUrl}/parties/${candidate.party.abbreviation}/candidates/${candidate.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(candidate)
        });
    }
};

export default candidateService;