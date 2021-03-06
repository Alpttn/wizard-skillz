const remoteURL = "http://localhost:3001";

export default {
    getAllSpells() {
        return fetch(`${remoteURL}/spells`).then(result =>
            result.json()
        );
    },
    getSpell(id) {
        console.log("hi")
        console.log(`${remoteURL}/spells/${id}`)
        return fetch(`${remoteURL}/spells/${id}`).then(result =>
            result.json()
        );
    },
    postCanvasSpell(newSpell) {
        return fetch(`${remoteURL}/mySpells`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newSpell)
        }).then(data => data.json())
    },
    getAllMySpells() {
        return fetch(`${remoteURL}/mySpells`).then(result =>
            result.json()
        );
    },
    deleteMySpell(id) {
        return fetch(`${remoteURL}/mySpells/${id}`, {
            method: "DELETE"
        })
        .then(result => result.json())
    },
      editMySpellToAddNote(editedNoteObj, editedNoteId) {
        return fetch(`${remoteURL}/mySpells/${editedNoteId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedNoteObj)
        }).then(data => data.json());
    },
    getMySpell(id) {
        return fetch(`${remoteURL}/mySpells/${id}`).then(result =>
            result.json()
        );
    },
    editNote(editedNoteObj, editedNoteId) {
        return fetch(`${remoteURL}/mySpells/${editedNoteId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(editedNoteObj)
        }).then(data => data.json());
      }


};
