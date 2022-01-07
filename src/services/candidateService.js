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
        return fetch(`${apiUrl}/parties/${party.id}/candidates`)
            .then(response => response.json());
    },
    delete: (candidate) => {
        return fetch(`${apiUrl}/parties/${candidate.party.id}/candidates/${candidate.id}`, {
            method: 'DELETE'
        }).then(response => response.json());
    },
    create: (candidate) => {
        return fetch(`${apiUrl}/parties/${candidate.party.id}/candidates`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(candidate)
        }).then(response => response.json());
    },
    save: (candidate) => {
        return fetch(`${apiUrl}/parties/${candidate.party.id}/candidates/${candidate.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(candidate)
        }).then(response => response.json());
    }
};

export default candidateService;
