import React from 'react';

class Tips extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            asvsItems: [],
            chapters: [],
            levels: []
        }
    }

    render() {
        return (
            <div className="container">
                <h1>Tips</h1>
                <ol>
                    <li>
                        Gebruik de <a rel="noreferrer" target="_blank" href="https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/">
                            quick reference guide</a>, daar wordt per requirement zoveel mogelijk naar verwezen.
                    </li>
                    <li>
                        Filter op level 1 en dan op een hoofdstuk. Zo kun je gestructureerd requirements verwerken.
                    </li>
                    <li>
                        Ga voor een requirement na of dit al afgevangen is door het framework. Voorbeeld behorend bij chapter Authentication, zoek op Google naar: 'identity framework password requirements'.
                    </li>
                </ol>
            </div>
        );
    }

}

export default Tips;
