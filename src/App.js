import React from "react";
import "./App.css";
import DynamicUITable from "./components/DynamicUITable";

class App extends React.Component {
  constructor(props) {
    super(props);

    // ### DEFINE THE HEADERS
    const headers = [
      {
        title: "Name",
        accessor: "name",
        index: 0
      },
      {
        title: "Director",
        accessor: "director",
        index: 1
      },
      {
        title: "Release Year",
        accessor: "release",
        index: 2
      },
      {
        title: "Length (mins)",
        accessor: "length",
        index: 3
      },
      {
        title: "Rating ",
        accessor: "rating",
        index: 4
      }
    ];

    // ### DEFINE LIST OF OBJECTS, WITH DATA FOR EACH HEADER
    const data = [
      {
        name: "Inception",
        index: 0,
        director: "Christopher Nolan",
        releaseYear: 2010,
        length: 148,
        rating: 8.8,
      },
      {
        name: "The Shawshank Redemption",
        index: 1,
        director: "Frank Darabont",
        releaseYear: 1994,
        length: 142,
        rating: 9.3,
      },
      {
        name: "The Dark Knight",
        index: 2,
        director: "Christopher Nolan",
        releaseYear: 2008,
        length: 152,
        rating: 9.0,
      },
      {
        name: "Pulp Fiction",
        index: 3,
        director: "Quentin Tarantino",
        releaseYear: 1994,
        length: 154,
        rating: 8.9,
      },
      {
        name: "Forrest Gump",
        index: 4,
        director: "Robert Zemeckis",
        releaseYear: 1994,
        length: 142,
        rating: 8.8,
      },
      {
        name: "The Godfather",
        index: 5,
        director: "Francis Ford Coppola",
        releaseYear: 1972,
        length: 175,
        rating: 9.2,
      },
      {
        name: "Schindler's List",
        index: 6,
        director: "Steven Spielberg",
        releaseYear: 1993,
        length: 195,
        rating: 8.9,
      },
      {
        name: "The Lord of the Rings: The Return of the King",
        index: 7,
        director: "Peter Jackson",
        releaseYear: 2003,
        length: 201,
        rating: 8.9,
      },
      {
        name: "The Matrix",
        index: 8,
        director: "The Wachowskis",
        releaseYear: 1999,
        length: 136,
        rating: 8.7,
      },
      {
        name: "The Silence of the Lambs",
        index: 9,
        director: "Jonathan Demme",
        releaseYear: 1991,
        length: 118,
        rating: 8.6,
      },
      {
        name: "Inglourious Basterds",
        index: 10,
        director: "Quentin Tarantino",
        releaseYear: 2009,
        length: 153,
        rating: 8.3,
      },
      {
        name: "Fight Club",
        index: 11,
        director: "David Fincher",
        releaseYear: 1999,
        length: 139,
        rating: 8.8,
      },
      {
        name: "The Green Mile",
        index: 12,
        director: "Frank Darabont",
        releaseYear: 1999,
        length: 189,
        rating: 8.6,
      },
      {
        name: "The Departed",
        index: 13,
        director: "Martin Scorsese",
        releaseYear: 2006,
        length: 151,
        rating: 8.5,
      },
      {
        name: "Goodfellas",
        index: 14,
        director: "Martin Scorsese",
        releaseYear: 1990,
        length: 146,
        rating: 8.7,
      },
      {
        name: "The Shawshank Redemption",
        index: 15,
        director: "Frank Darabont",
        releaseYear: 1994,
        length: 142,
        rating: 9.3,
      },
      {
        name: "Gladiator",
        index: 16,
        director: "Ridley Scott",
        releaseYear: 2000,
        length: 155,
        rating: 8.5,
      },
      {
        name: "The Prestige",
        index: 17,
        director: "Christopher Nolan",
        releaseYear: 2006,
        length: 130,
        rating: 8.5,
      },
      {
        name: "The Usual Suspects",
        index: 18,
        director: "Bryan Singer",
        releaseYear: 1995,
        length: 106,
        rating: 8.5,
      },
      {
        name: "Saving Private Ryan",
        index: 19,
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

  onDragStart = (e, i) => {
    e.dataTransfer.setData('text/plain', i)
  };

  onDragOver = (e) => {
    e.preventDefault();
  };

  onDragDrop = (e, target) => {
    e.preventDefault();
    let src = e.dataTransfer.getData('text/plain');
    let headers = [...this.state.headers];
    let srcHdr = headers[src];
    let trgtHdr = headers[target];
    let currentIndex = srcHdr.index;
    srcHdr.index = trgtHdr.index;
    trgtHdr.index = currentIndex;
    headers.sort((a, b) => a.index - b.index);

    let newData = this.state.data.map((item)=>{
      const keysArray = Object.keys(item);
      let currentTDIndex = keysArray[currentIndex];
      keysArray[src] = keysArray[target];
      keysArray[target] = currentTDIndex;
      /*const newItem = keysArray.reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {});*/
      //return newItem;
    });

    this.setState({
      headers: headers,
      //data: newData
    })
  };

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
              onDragStart={this.onDragStart}
              onDragOver={this.onDragOver}
              onDragDrop={this.onDragDrop}
            />
          </div>
        </main>
      </div>
    );
  }
}

export default App;
