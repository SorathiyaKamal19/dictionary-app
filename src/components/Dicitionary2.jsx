import axios from 'axios'
import React, { useState } from 'react'
import { Button, Card, CardBody } from 'react-bootstrap'
import '../styles/dictionary2.css'

const Dictionary2 = () => {
    const [search, setSearch] = useState("")
    const [meaning, setMeaning] = useState(null)
    const [error, setError] = useState(null)

    const onHandleChange = (event) => {
        setSearch(event.target.value)
    }

    const onHandleClick = () => {
        axios
            .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${search}`)
            .then((response) => {
                setMeaning(response.data[0])
                setError(null)
            })
            .catch((error) => {
                setMeaning(null)
                setError("Please Enter A Word !!!1")
            })
    }

    return (
        <div className="dictionary-container">
            <h1 className="title">Dictionary App</h1>
            <Card className="card">
                <CardBody className="card-body">
                    <input
                        type='text'
                        name='search'
                        placeholder='Search'
                        value={search}
                        onChange={onHandleChange}
                        className="search-input"
                    />
                    <Button onClick={onHandleClick} className="search-button">Search</Button>
                </CardBody>
            </Card>
            <div className="result-container">
                {
                    meaning ? (
                        <p>{meaning.meanings[0].definitions[0].definition}</p>
                    )
                        : error ? (
                            <p className="error">{error}</p>
                        ) : (
                            <p>Enter a Word</p>
                        )
                }
            </div>
        </div>
    )
}

export default Dictionary2
