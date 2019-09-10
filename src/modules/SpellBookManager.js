const remoteURL = "http://localhost:3001";

export default {
    getAllSpells() {
        return fetch(`${remoteURL}/spells`).then(result =>
            result.json()
        );
    },


};
