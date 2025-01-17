import React, { useState } from "react";

function ToyForm({ addNewToy }) {

  const [name, setName] = useState("")
  const [image, setImage] = useState("")

  const handleName = (e) => {
    setName(e.target.value)
  }

  const handleImage = (e) => {
    setImage(e.target.value)
  }

  function handleForm(e){
    e.preventDefault()
    let newToyObj = {
      name: name,
      image: image,
      likes: 0
    }
    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newToyObj)
    })
    .then(res => res.json())
    .then(data => addNewToy(newToyObj))
  }

  return (
    <div className="container">
      <form className="add-toy-form" onSubmit={handleForm}>
        <h3>Create a toy!</h3>
        <input
          type="text"
          name="name"
          placeholder="Enter a toy's name..."
          className="input-text"
          value={name}
          onChange={handleName}
        />
        <br />
        <input
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          className="input-text"
          value={image}
          onChange={handleImage}
        />
        <br />
        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
        />
      </form>
    </div>
  );
}

export default ToyForm;
