import TaskItem from './TaskItem';

export default function TaskList({ tasks, deleteTask, updateTaskStatus, startEdit }) {
    return (
        <div className="space-y-3">
            {tasks.map(task => (
                <TaskItem
                    key={task.id}
                    task={task}
                    deleteTask={deleteTask}
                    updateTaskStatus={updateTaskStatus}
                    startEdit={startEdit}
                />
            ))}
        </div>
    );
}
