import React, { Component } from "react"
// what components do I need? In this list component I need to render the cards and fetch the data
import MySpellsCard from "./MySpellsCard"
import SpellBookManager from "../../modules/SpellBookManager"



class MySpellsList extends Component {

    state = {
        mySpells: [],
    };

    componentDidMount() {
        SpellBookManager.getAllMySpells().then(mySpells => { 
          this.setState({
            mySpells: mySpells
          });
        });
      }

      deleteMySpell = id => {
        SpellBookManager.deleteMySpell(id)
        .then(() => {
          SpellBookManager.getAllMySpells()
          .then((newMySpells) => {
            this.setState({
                mySpells: newMySpells
            })
          })
        })
      }

      editAddNotesButton = (obj, id) => {
        return SpellBookManager.editMySpellToAddNote(obj, id).then(() => {
          SpellBookManager.getAllMySpells().then(mySpells => {
            this.setState({
              mySpells: mySpells
            });
          });
        });
      };


    render() {
        console.log("SPELL LIST: Render");

        return (
            <React.Fragment>
                <div className="container__mySpells-cards">
                    {this.state.mySpells.map(mySpell => (
                        <MySpellsCard
                            key={mySpell.id}
                            mySpell={mySpell}
                            deleteMySpell={this.deleteMySpell}
                            editAddNotesButton={this.editAddNotesButton}
                            {...this.props}
                        />
                    ))}
                </div>
            </React.Fragment>
        )
    }
}

export default MySpellsList