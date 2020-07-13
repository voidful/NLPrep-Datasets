import React from 'react';
import logo from './logo.png';
import './App.css';
import MAIN from "./component/main";
import DETAIL from "./component/detail";
import datasets from './assets/datasets.json';

class App extends React.Component {

    task_res = {
        'list': ['tag', 'clas', 'gen', 'qa'], 'tag2name': {
            'tag': 'Tagging',
            'qa': 'Question Answering',
            'gen': "Generation",
            'clas': 'Classification'
        }, 'tag2img': {
            'tag': 'images/tag_icon.jpg',
            'clas': 'images/clas_icon.jpg',
            'gen': 'images/gen_icon.jpg',
            'qa': 'images/qa_icon.jpg',
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            selected_id: ''
        }
        this.selected = this.selected.bind(this)
    }

    selected(id) {
        this.setState({selected_id: id});
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <div id="wrapper">
                        <header id="header">
                            <h1>
                                <a href="index.html"><img alt="logo" src={logo} href="index.html"/>NLPrep Datasets</a>
                            </h1>
                        </header>
                        {this.state.selected_id.length < 1 && (
                            <MAIN selected={this.selected}
                                  datasets={datasets}
                                  task_res={this.task_res}/>
                        )}
                        {this.state.selected_id.length > 0 && (
                            <DETAIL dataset_id={this.state.selected_id}
                                    datasets={datasets}
                                    task_res={this.task_res}/>
                        )}
                    </div>
                </header>
            </div>
        );
    }
}

export default App;
