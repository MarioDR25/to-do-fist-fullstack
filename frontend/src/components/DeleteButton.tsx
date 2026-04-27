'use client'
import { actionDeleteTask } from "@/data/actions/task.actions";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



const DeleteButton = ({ id }: {id:number}) => {
    return (
        <button 
        className="cursor-pointer"
         onClick={async ()=> actionDeleteTask(id)}> 
            <FontAwesomeIcon icon={faTrash} className="text-rose-400/90" />
        </button>
    )
}

export default DeleteButton;