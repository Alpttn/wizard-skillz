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

    render() {
        console.log("SPELL LIST: Render");

        return (
            <React.Fragment>
                <div className="container__mySpells-cards">
                    {this.state.mySpells.map(mySpell => (
                        <MySpellsCard
                            key={mySpell.id}
                            mySpell={mySpell}
                            {...this.props}
                        />
                    ))}
                    hello delete this
                </div>
            </React.Fragment>
        )
    }
}

export default MySpellsList