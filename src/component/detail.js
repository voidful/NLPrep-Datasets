import React from 'react';
import '../App.css';
import Iframe from 'react-iframe'
import {CodeBlock, github} from "react-code-blocks";

class DETAIL extends React.Component {

    constructor(props) {
        super(props);
        const {dataset_id, task_res, datasets} = this.props
        this.task_res = task_res
        this.dataset_id = dataset_id
        this.dataset = datasets[dataset_id]
    }

    render() {
        return (
            <div id="dataset">
                <section id="main">
                    <Iframe
                        url={process.env.PUBLIC_URL + '/reports/' + this.dataset['filename'] + '_report.html'}
                    />
                </section>

                <section id="sidebar">
                    <section id="intro">
                        <header>
                            <h2>{this.dataset_id}</h2>
                            <p>{this.dataset['fullname']}</p>
                            <p>{this.task_res['tag2name'][this.dataset['task']]}</p>
                            <a href="https://github.com/voidful/NLPrep">https://github.com/voidful/NLPrep</a>
                        </header>
                    </section>

                    <section>
                        <h2>Description</h2>
                        <p>
                            {this.dataset['description']}
                        </p>
                    </section>
                    <section className="blurb">
                        <h2>Usage</h2>
                        <div id="python">
                            Python
                        </div>
                        <CodeBlock
                            text={"import nlprep\n" +
                            "ds = nlprep.load_dataset('" + this.dataset['id'] + "')\n" +
                            "for ds_name, mf in nlprep.convert_middleformat(ds).items():\n" +
                            "   print(ds_name, mf.dump_list()[:10])"}
                            language={'python'}
                            showLineNumbers={false}
                            theme={github}
                        />
                        <br/>
                        <div>
                            BASH
                        </div>
                        <div id="bash">
                            <CodeBlock
                                text={"!pip install nlprep\n\n" +
                                "nlprep\\\n" +
                                "--dataset      " + this.dataset['id'] + "\\\n" +
                                "--outdir       dataset_" + this.dataset['id'] + " \n\n" +
                                "optional arguments:\n" +
                                "--util         #utility name,string\n" +
                                "--cachedir     #path,string\n" +
                                "--report       #bool"}
                                language={'text'}
                                showLineNumbers={false}
                                theme={github}
                            />
                            <br/>
                        </div>
                        <div>Tools</div>
                        <ul>
                            <li>
                                <a href="https://github.com/voidful/NLPrep" target="_blank" rel="noopener noreferrer">DATA
                                    DOWNLOAD - NLPrep</a>
                            </li>
                            <li>
                                <a href="https://github.com/voidful/TFkit" target="_blank" rel="noopener noreferrer">TRAIN
                                    MODEL - TFKit</a>
                            </li>
                            <li>
                                <a href="https://github.com/voidful/nlp2go" target="_blank" rel="noopener noreferrer">HOST
                                    MODEL - NLP2GO</a>
                            </li>
                        </ul>

                    </section>

                    <section>
                        <h2>Reference</h2>
                        <ul className="posts">
                            {Object.keys(this.dataset['ref']).map((key, index) => (
                                <li key={key + index}>
                                    <article>
                                        <header>
                                            <h3>
                                                {key}
                                            </h3>
                                            <time className="published">
                                                {this.dataset['ref'][key]}
                                            </time>
                                        </header>
                                    </article>
                                </li>
                            ))}
                        </ul>
                    </section>


                    <section id="footer">
                        <p className="copyright">&copy; voidful.
                            Design: <a href="http://html5up.net">HTML5 UP</a>.
                        </p>
                    </section>

                </section>
            </div>
        );
    }
}

export default DETAIL;
