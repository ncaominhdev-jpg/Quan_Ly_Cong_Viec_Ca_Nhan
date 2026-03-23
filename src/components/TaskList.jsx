export default function TaskList({ tasks, deleteTask, updateTaskStatus, startEdit }) {
    const getStatusColor = (status) => {
        switch (status) {
            case 'TODO':
                return 'bg-blue-100 text-blue-800 border-blue-300';
            case 'In Progress':
                return 'bg-yellow-100 text-yellow-800 border-yellow-300';
            case 'Done':
                return 'bg-green-100 text-green-800 border-green-300';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-300';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'TODO':
                return '📝';
            case 'In Progress':
                return '⚙️';
            case 'Done':
                return '✅';
            default:
                return '•';
        }
    };

    const formatDeadline = (deadline) => {
        if (!deadline) return null;
        const date = new Date(deadline);
        return date.toLocaleString('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const isOverdue = (deadline, status) => {
        if (!deadline || status === 'Done') return false;
        return new Date(deadline) < new Date();
    };

    const isNearDeadline = (deadline, status) => {
        if (!deadline || status === 'Done') return false;
        const now = new Date();
        const deadlineDate = new Date(deadline);
        const hoursUntil = (deadlineDate - now) / (1000 * 60 * 60);
        return hoursUntil > 0 && hoursUntil < 24;
    };

    const getStatusOptions = (currentStatus) => {
        const statuses = ['TODO', 'In Progress', 'Done'];
        return statuses.filter(s => s !== currentStatus);
    };

    return (
        <div className="divide-y">
            {tasks.map((task) => {
                const overdue = isOverdue(task.deadline, task.status);
                const nearDeadline = isNearDeadline(task.deadline, task.status);

                return (
                    <div
                        key={task.id}
                        className={`p-4 hover:bg-gray-50 transition ${
                            overdue ? 'bg-red-50' : nearDeadline ? 'bg-yellow-50' : ''
                        }`}
                    >
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                            
                            {/* Left Side - Title & Info */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start gap-3 mb-2">
                                    <span className="text-lg mt-0.5 flex-shrink-0">
                                        {getStatusIcon(task.status)}
                                    </span>
                                    <div className="flex-1 min-w-0">
                                        <p className={`font-medium text-gray-800 break-words ${
                                            task.status === 'Done' ? 'line-through text-gray-500' : ''
                                        }`}>
                                            {task.title}
                                        </p>
                                        
                                        {/* Deadline */}
                                        {task.deadline && (
                                            <p className={`text-sm mt-1 ${
                                                overdue 
                                                    ? 'text-red-600 font-semibold' 
                                                    : nearDeadline 
                                                    ? 'text-orange-600 font-semibold'
                                                    : 'text-gray-500'
                                            }`}>
                                                ⏰ {formatDeadline(task.deadline)}
                                                {overdue && ' ⚠️ Quá hạn'}
                                                {nearDeadline && !overdue && ' ⚠️ Sắp đến hạn'}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Right Side - Status & Actions */}
                            <div className="flex items-center gap-2 flex-wrap justify-end">
                                
                                {/* Status Dropdown */}
                                <div className="relative group">
                                    <button
                                        className={`px-3 py-1.5 rounded-full text-sm font-semibold border-2 transition cursor-pointer ${getStatusColor(task.status)}`}
                                        title="Thay đổi trạng thái"
                                    >
                                        {task.status}
                                    </button>
                                    
                                    {/* Dropdown Menu */}
                                    <div className="absolute right-0 mt-1 w-40 bg-white border-2 border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                                        {getStatusOptions(task.status).map(status => (
                                            <button
                                                key={status}
                                                onClick={() => updateTaskStatus(task.id, status)}
                                                className="w-full text-left px-4 py-2 hover:bg-gray-100 transition text-sm text-gray-700"
                                            >
                                                {getStatusIcon(status)} {status}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Edit Button */}
                                <button
                                    onClick={() => startEdit(task)}
                                    className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 p-2 rounded-lg transition"
                                    title="Sửa công việc"
                                >
                                    ✏️
                                </button>

                                {/* Delete Button */}
                                <button
                                    onClick={() => deleteTask(task.id)}
                                    className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition"
                                    title="Xóa công việc"
                                >
                                    🗑️
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
