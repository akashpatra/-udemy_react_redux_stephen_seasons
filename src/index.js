import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

class App extends React.Component {
    state = { lat: null, errorMessage: '' };

    componentDidMount() {
        console.log('My component was rendered to the screen');

        window.navigator.geolocation.getCurrentPosition(
            position => this.setState({ lat: position.coords.latitude }),
            error => this.setState({ errorMessage: error.message })
        );
    }

    componentDidUpdate() {
        console.log('My component was just updated - it rerendered');
    }

    renderContent() {
        if (this.state.errorMessage && !this.state.latitude) {
            return <div>Error: {this.state.errorMessage}</div>;
        }

        if (!this.state.errorMessage && this.state.lat) {
            return <SeasonDisplay lat={this.state.lat} />
        }

        return <Spinner message="Please accept Location Request" />;
    }

    // React says we have to define render!!
    render() {
        console.log('render called')

        return <div className="border red">{this.renderContent()}</div>
    }
}

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);