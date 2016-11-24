import React from 'react';
import SearchBox from './components/SearchBox';
import Carousel from './components/Carousel';

export default class Main extends React.Component {
    render() {
        return (
            <div>
                <main>
                    <h1>Libris</h1>
                    <SearchBox {...this.props} />
                </main>
                <aside>
                    <Carousel {...this.props} />
                </aside>
            </div>
        )
    }
}