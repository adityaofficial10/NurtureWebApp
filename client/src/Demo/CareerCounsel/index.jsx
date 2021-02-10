import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Card, CardDeck } from 'react-bootstrap';
import { scroller } from 'react-scroll';

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.scss';

// TODO: Make Navbar component

const data = {
    'After 10': ['Science', 'Commerce', 'Marketing'],
    'After 12': {
        Engineering: ['CS', 'MECH', 'ECE', 'EEE'],
        Medical: ['Botany', 'Psych', 'Neuro'],
        Business: ['CA'],
    },
    'After University': ['GATE', 'MBA', 'Job'],
};

function getFields(opt, d) {
    let listOfFields = [],
        field = opt.shift();
    const isArr = Array.isArray(d[field]);

    if (isArr) {
        if (d[field]) {
            let temp = [...d[field]];
            temp.unshift(field);
            return temp;
        } else {
            return field;
        }
    } else if (opt.length === 0) {
        let temp = [...Object.keys(d[field])];
        temp.unshift(field);
        listOfFields.push(temp);
    } else {
        let temp = [...Object.keys(d[field])];
        temp.unshift(field);
        listOfFields.push(temp);
        temp = [...getFields(opt, d[field])];
        listOfFields.push(temp);
    }
    return listOfFields;
}

function SchemeFields({ selected, options, showFields }) {
    const selectedScheme = options[0];
    const isArr = Array.isArray(data[selectedScheme]);
    let fields = [];

    if (isArr) {
        let temp = [...data[selectedScheme]];
        temp.unshift(selectedScheme);
        fields.push(temp);
    } else {
        fields = [...getFields([...options], data)];
    }

    return (
        <>
            {fields.map((f, i) => {
                console.log('Last level: ', i, fields.length - 1 === i);
                return (
                    <>
                        <div key={i} id={'level' + (i + 1)} name={f[0]} className='p-5'>
                            <CardDeck className='justify-content-around'>
                                {f.slice(1).map((v, ind) => {
                                    return (
                                        <Card
                                            key={ind}
                                            onClick={
                                                !isArr
                                                    ? () => showFields(v, false, i + 1)
                                                    : () =>
                                                          console.log(`Route to ${options[0]}/${v}`)
                                            }
                                        >
                                            <Card.Body>
                                                <Card.Title>{v}</Card.Title>
                                            </Card.Body>
                                        </Card>
                                    );
                                })}
                            </CardDeck>
                        </div>
                        <div className='field-break'></div>
                    </>
                );
            })}
        </>
    );
}

export default function CareerCounsel() {
    const schemes = [];
    const [scheme, setScheme] = useState();
    const [options, setOptions] = useState([]);
    const [level, setLevel] = useState(0);

    for (let k in data) {
        schemes.push(
            <Card key={k} onClick={() => showFields(k, true, 0)}>
                <Card.Body>
                    <Card.Title>{k}</Card.Title>
                </Card.Body>
            </Card>
        );
    }

    function showFields(sch, isScheme, i) {
        setScheme(sch);
        setLevel(i);

        if (isScheme) {
            setOptions([sch]);
        } else {
            let o = [...options];
            o.splice(i, 1, sch);
            setOptions([...o]);
        }
        let selectedFields = document.getElementsByName(sch);
        for (let i = 0; i < selectedFields.length; i++) {
            selectedFields[i].style.display = 'block';
        }
    }

    useEffect(() => {
        scroller.scrollTo(options[level], {
            smooth: true,
        });
    }, [scheme, options]);

    return (
        <>
            <Navbar variant='dark' bg='dark'>
                <Navbar.Brand className='mr-auto'>NURTURE</Navbar.Brand>
                <Nav>
                    <Nav.Link active>Career Counsel</Nav.Link>
                    <Nav.Link>Log Out</Nav.Link>
                </Nav>
            </Navbar>
            <h1 className='text-center py-5'>Career Counsel</h1>
            <div id='career-desc' className='mx-3 p-5'>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </div>
            <div id='schemes' className='p-5 text-center'>
                <CardDeck className='justify-content-around'>{schemes}</CardDeck>
            </div>
            <div id='fields' className='text-center'>
                {scheme && (
                    <SchemeFields selected={scheme} options={options} showFields={showFields} />
                )}
            </div>
        </>
    );
}
