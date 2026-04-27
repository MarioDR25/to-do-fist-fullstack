'use client'
import { actionUpdateTask } from "@/data/actions/task.actions"
import { Task } from "@/types/task"
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const CompleteButton = ({ task }: { task: Task }) => {

    const handleToggle = () => {
        const newState = !task.completed;
        const updatedTask = { ...task, completed: newState };
        actionUpdateTask(task.id, updatedTask);
    };

    return (
        <button className="cursor-pointer"
            onClick={() => handleToggle()}>
            <FontAwesomeIcon icon={faSquareCheck} className={`${task.completed ? 'text-emerald-500/80' : 'text-white/50'}`} />
        </button>
    )
}

export default CompleteButton;