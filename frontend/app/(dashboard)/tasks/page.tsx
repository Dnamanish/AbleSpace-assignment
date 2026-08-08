import TaskBoard from "@/features/tasks/components/TaskBoard";

import TaskToolbar from "@/features/tasks/components/TaskToolbar";

export default function TasksPage(){
    return(
        <div className="p-4">
            <TaskToolbar></TaskToolbar>
            <TaskBoard></TaskBoard>

        </div>
    );
}