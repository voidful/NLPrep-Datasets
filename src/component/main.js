import React from 'react';
import '../App.css';

class MAIN extends React.Component {

    constructor(props) {
        super(props);
        const {selected, task_res, datasets} = this.props
        this.selected = selected
        this.datasets = datasets
        this.task_res = task_res

        this.state = {
            search: []
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.taskSelected = this.taskSelected.bind(this)
    }

    taskSelected = (task) => {
        this.setState({
            search: task.split(' ')
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }


    render() {
        let dataset_name_list;
        if (this.state.search.length) {
            const searchPattern = new RegExp(this.state.search.map(term => `(?=.*${term})`).join(''), 'i');
            dataset_name_list = Object.keys(this.datasets).filter(option =>
                option.match(searchPattern)
            );
        } else {
            dataset_name_list = Object.keys(this.datasets);
        }

        return (
            <div id="main">
                <article className="post">
                    <header>
                        <div className="title">
                            <h2>Search for datasets</h2>
                            <input type="text" name={"query"}
                                   onChange={(e) => this.setState({search: e.target.value.split(' ')})}/>
                            <br/>
                            <div className="posts">
                                {this.task_res['list'].map((key, index) => (
                                    <div key={key + index} onClick={() => this.taskSelected(key+"_")}>
                                        <div className="author">
                                            <img
                                                src={this.task_res['tag2img'][key]} alt={key}/>
                                            <span className="name">{this.task_res['tag2name'][key]}</span>

                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </header>

                    <div className="mini-posts">
                        {dataset_name_list.map((key, index) => (
                            <article className="mini-post" key={key + index} onClick={() => this.selected(key)}>
                                <header>
                                    <h3>{key}</h3>
                                    <time className="published">{this.task_res['tag2name'][this.datasets[key]['task']]}</time>
                                    <div className="author"><img alt={key} src={this.task_res['tag2img'][this.datasets[key]['task']]}/></div>
                                </header>
                            </article>
                        ))}
                    </div>

                </article>
            </div>
        );
    }
}

export default MAIN;
