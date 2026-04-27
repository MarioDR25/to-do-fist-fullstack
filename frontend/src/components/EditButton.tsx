'use client'
import { useTaskContext } from "@/context/TaskContext"
import { Task } from "@/types/task"
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const EditButton = ({ task }: { task: Task }) => {
    const { openModal } = useTaskContext();
    return (
        <button className="cursor-pointer"
            onClick={() => openModal(task)} >
            <FontAwesomeIcon icon={faPenToSquare} className="text-slate-400" />
        </button>
    )
}

export default EditButton;