import React from "react";
import ToyCard from "./ToyCard";

function ToyContainer({ toyList, deleteToy, addLikes}) {

  const displayToys = toyList.map(toy => <ToyCard addLikes={addLikes} deleteToy={deleteToy} toy={toy} key={toy.id}/>)

  return (
    <div id="toy-collection">{displayToys}</div>
  );
}

export default ToyContainer;
