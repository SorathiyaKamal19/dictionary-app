import React, { useState } from 'react';
import { InputGroup, Form, Container, Button } from 'react-bootstrap';
import axios from 'axios';

const Dictionary = () => {
  const [search, setSearch] = useState("");
  const [definition, setDefinition] = useState(null);
  const [error, setError] = useState(null);

  const onHandleChange = (event) => {
    setSearch(event.target.value);
  };

  const onSearchClick = () => {
    axios
      .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${search}`)
      .then((response) => {
        setDefinition(response.data[0]);
        setError(null);
      })
      .catch((error) => {
        setDefinition(null);
        setError("Error fetching data");
      });
  };

  return (
    <div>
      <Container>
        <InputGroup className="mb-3">
          <Form.Control
            type="text"
            placeholder="Search"
            name="search"
            value={search}
            onChange={onHandleChange}
          />
          <Button variant="primary" onClick={onSearchClick}>
            Search
          </Button>
        </InputGroup>
        {definition ? (
          <div>
            <h2>{definition.word}</h2>
            <p>{definition.meanings[0].definitions[0].definition}</p>
          </div>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <p>Enter a word to get its definition.</p>
        )}
      </Container>
    </div>
  );
};

export default Dictionary;
