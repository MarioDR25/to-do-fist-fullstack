"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { useTaskContext } from "@/context/TaskContext"

const CreateButton = () => {
  const { openModal } = useTaskContext();
  return (
    <div
      className="w-64 h-64 border-2 border-dashed border-black/20 bg-transparent flex items-center justify-center cursor-pointer hover:border-black/40 transition-colors group rounded-sm"
      onClick={() => openModal()}
      >

      <button className="pointer-events-none">
        <FontAwesomeIcon icon={faPlus} size="4x" className="text-black/40 group-hover:text-black/80" />
      </button>
    </div>
  )
}

export default CreateButton;