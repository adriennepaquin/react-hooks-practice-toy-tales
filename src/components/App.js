import React, { useEffect, useState } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toyList, setToyList] = useState([])

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  function addNewToy(newToyObj){
    let newArray = [...toyList, newToyObj]
    setToyList(newArray)
  }

  function deleteToy(e){
    console.log(e.target.parentElement.id)
    let id = parseInt(e.target.parentElement.id)
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "DELETE"
    })
    .then(res => res.json())
    .then(setToyList(toyList.filter(toy => toy.id !== parseInt(e.target.parentElement.id))))
  }

  function addLikes(e){
    let id = e.target.parentElement.id
    let oldLikes = (toyList[id - 1].likes)
    let newObj = {likes: oldLikes + 1}
    console.log(newObj)
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newObj)
    })
    .then(res => res.json())
    .then(data => setToyList(toyList[id - 1] = data))
  }

  useEffect(() => {
    fetch("http://localhost:3001/toys")
    .then(res => res.json())
    .then(data => setToyList(data))
  }, [])

  return (
    <>
      <Header />
      {showForm ? <ToyForm addNewToy={addNewToy}/> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toyList={toyList} deleteToy={deleteToy} addLikes={addLikes}/>
    </>
  );
}

export default App;
