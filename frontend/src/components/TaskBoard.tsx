import { Task } from "@/types/task";
import { Session } from "@/types/session";
import TaskCard from "./TaskCard";
import CreateButton from "./CreateButton";
import FormModal from "./FormModal";
import LogoutButton from "./LogoutButton";
import { TaskProvider } from "@/context/TaskContext";

interface TaskBoardProps {
    tasks: Task[];
    session: Session;
}

const TaskBoard = ({ tasks, session }: TaskBoardProps) => {
    return (
        <TaskProvider session={session}>
            <div className="w-full bg-stone-700 px-4 py-2 flex justify-between items-center">
                <span className="text-stone-300 text-sm">Hola, <span className="font-bold text-white">{session.username}</span></span>
                <LogoutButton />
            </div>
            <div className="w-full h-full overflow-y-auto scrollbar-hide flex items-start justify-center">
                <div className="p-5 w-full grid grid-cols-[repeat(auto-fill,280px)] gap-6 justify-center">
                    <CreateButton />
                    {tasks.map((t, i) => (<TaskCard key={t.id} index={i} task={t} />))}
                    <FormModal />
                </div>
            </div>
        </TaskProvider>
    );
}

export default TaskBoard;