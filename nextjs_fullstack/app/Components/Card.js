import "./Card.css"
import Draggable from "react-draggable";
import { useRef } from "react";


const Card = ({user}) => {
  const listRef = useRef(null);
  return (
    <Draggable nodeRef={listRef}>
    <div className="card" ref={listRef} >
        <p className="card-title">{user.name}</p>
        <p className="small-desc">{user.email}</p>
        <p className="small-desc">{user.phone}</p>
        <p className="small-desc">{user.website}</p>
          <div className="go-corner">
        <div className="go-arrow">→</div>
      </div>

    </div>
    </Draggable>
  )
}

export default Card