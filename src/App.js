import React from "react";
import "./App.css";
import DynamicUITable from "./components/DynamicUITable";

class App extends React.Component {
  constructor(props) {
    super(props);

    // ### DEFINE THE HEADERS
    const headers = [
      "Name",
      "Director",
      "Release Year",
      "Length (mins)",
      "Rating",
    ];

    // ### DEFINE LIST OF OBJECTS, WITH DATA FOR EACH HEADER
    const data = [
      {
        name: "Inception",
        director: "Christopher Nolan",
        releaseYear: 2010,
        length: 148,
        rating: 8.8,
      },
      {
        name: "The Shawshank Redemption",
        director: "Frank Darabont",
        releaseYear: 1994,
        length: 142,
        rating: 9.3,
      },
      {
        name: "The Dark Knight",
        director: "Christopher Nolan",
        releaseYear: 2008,
        length: 152,
        rating: 9.0,
      },
      {
        name: "Pulp Fiction",
        director: "Quentin Tarantino",
        releaseYear: 1994,
        length: 154,
        rating: 8.9,
      },
      {
        name: "Forrest Gump",
        director: "Robert Zemeckis",
        releaseYear: 1994,
        length: 142,
        rating: 8.8,
      },
      {
        name: "The Godfather",
        director: "Francis Ford Coppola",
        releaseYear: 1972,
        length: 175,
        rating: 9.2,
      },
      {
        name: "Schindler's List",
        director: "Steven Spielberg",
        releaseYear: 1993,
        length: 195,
        rating: 8.9,
      },
      {
        name: "The Lord of the Rings: The Return of the King",
        director: "Peter Jackson",
        releaseYear: 2003,
        length: 201,
        rating: 8.9,
      },
      {
        name: "The Matrix",
        director: "The Wachowskis",
        releaseYear: 1999,
        length: 136,
        rating: 8.7,
      },
      {
        name: "The Silence of the Lambs",
        director: "Jonathan Demme",
        releaseYear: 1991,
        length: 118,
        rating: 8.6,
      },
      {
        name: "Inglourious Basterds",
        director: "Quentin Tarantino",
        releaseYear: 2009,
        length: 153,
        rating: 8.3,
      },
      {
        name: "Fight Club",
        director: "David Fincher",
        releaseYear: 1999,
        length: 139,
        rating: 8.8,
      },
      {
        name: "The Green Mile",
        director: "Frank Darabont",
        releaseYear: 1999,
        length: 189,
        rating: 8.6,
      },
      {
        name: "The Departed",
        director: "Martin Scorsese",
        releaseYear: 2006,
        length: 151,
        rating: 8.5,
      },
      {
        name: "Goodfellas",
        director: "Martin Scorsese",
        releaseYear: 1990,
        length: 146,
        rating: 8.7,
      },
      {
        name: "The Shawshank Redemption",
        director: "Frank Darabont",
        releaseYear: 1994,
        length: 142,
        rating: 9.3,
      },
      {
        name: "Gladiator",
        director: "Ridley Scott",
        releaseYear: 2000,
        length: 155,
        rating: 8.5,
      },
      {
        name: "The Prestige",
        director: "Christopher Nolan",
        releaseYear: 2006,
        length: 130,
        rating: 8.5,
      },
      {
        name: "The Usual Suspects",
        director: "Bryan Singer",
        releaseYear: 1995,
        length: 106,
        rating: 8.5,
      },
      {
        name: "Saving Private Ryan",
        director: "Steven Spielberg",
        releaseYear: 1998,
        length: 169,
        rating: 8.6,
      },
    ];

    // ### ADD TO 'WRAPPER' STATE
    this.state = {
      headers: headers,
      data: data,
    };
  }

  // ### PASS AS PROPS INTO COMPONENT
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Dynamic UI Table</h1>
        </header>
        <main>
          <div>
            <DynamicUITable
              headers={this.state.headers}
              data={this.state.data}
            />
          </div>
        </main>
      </div>
    );
  }
}

export default App;
