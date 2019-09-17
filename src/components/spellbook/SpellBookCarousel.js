import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Button } from 'reactstrap';
import './SpellBookCarousel.css'

import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption
} from 'reactstrap';


class SpellBookCarousel extends Component {

    constructor(props) {
        super(props);
        this.state = { activeIndex: 0 };
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
    }

    onExiting() {
        this.animating = true;
    }

    onExited() {
        this.animating = false;
    }

    next() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === this.props.spells.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }

    previous() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? this.props.spells.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    }

    goToIndex(newIndex) {
        if (this.animating) return;
        this.setState({ activeIndex: newIndex });
    }
    render() {
        const { activeIndex } = this.state;

        const slides = this.props.spells.map((spell) => {
            return (
                <CarouselItem className="carousel__item"
                    onExiting={this.onExiting}
                    onExited={this.onExited}
                    key={spell.id}
                >
                    <div className="carousel-inner"><img src={require(`../images/${spell.image}`)} alt='Spell' />
                        <Link to={`/practice/${spell.id}`}><Button color="primary" className="practiceButton">Practice</Button></Link>
                    </div>
                    <CarouselCaption captionText={spell.description} captionHeader={spell.spellName} />
                </CarouselItem>
            );
        });

        return (
            <Carousel className="carousel"
                activeIndex={activeIndex}
                next={this.next}
                previous={this.previous}
            >
                <CarouselIndicators items={this.props.spells} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                {slides}
                <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
            </Carousel>
        );
    }
}

export default SpellBookCarousel;