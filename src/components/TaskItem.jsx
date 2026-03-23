export default function TaskItem({ task, deleteTask, updateTaskStatus, startEdit }) {
    const formatDeadline = (deadline) => {
        return new Date(deadline).toLocaleString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const isOverdue = () => {
        if (!task.deadline || task.status === 'Done') return false;
        return new Date(task.deadline) < new Date();
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'TODO':
                return 'bg-yellow-100 text-yellow-700';
            case 'In Progress':
                return 'bg-indigo-100 text-indigo-700';
            case 'Done':
                return 'bg-green-100 text-green-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    const getStatusLabel = (status) => {
        const labels = {
            'TODO': 'Cần làm',
            'In Progress': 'Đang làm',
            'Done': 'Hoàn thành',
        };
        return labels[status] || status;
    };

    return (
        <div className={`p-4 border rounded-lg transition-all duration-200 ${
            isOverdue() ? 'bg-red-50 border-red-300' : 'bg-white border-gray-200'
        } hover:shadow-md`}>
            
            <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 text-lg mb-2">
                        {task.title}
                    </h3>
                    <div className={`text-sm ${isOverdue() ? 'text-red-600 font-semibold' : 'text-gray-500'}`}>
                        📅 {formatDeadline(task.deadline)}
                        {isOverdue() && <span className="ml-2 font-bold">QUÁ HẠN</span>}
                    </div>
                </div>

                <span className={`px-3 py-1 text-xs font-semibold rounded-full whitespace-nowrap ml-2 ${getStatusColor(task.status)}`}>
                    {getStatusLabel(task.status)}
                </span>
            </div>

            {/* Status Dropdown */}
            {task.status !== 'Done' && (
                <div className="mb-3 flex gap-2">
                    {['TODO', 'In Progress', 'Done'].filter(s => s !== task.status).map(s => (
                        <button
                            key={s}
                            onClick={() => updateTaskStatus(task.id, s)}
                            className={`text-xs px-2 py-1 rounded ${getStatusColor(s)} opacity-70 hover:opacity-100 transition-all`}
                        >
                            → {getStatusLabel(s)}
                        </button>
                    ))}
                </div>
            )}

            {/* Actions */}
            <div className="flex gap-2 mt-4">
                <button
                    onClick={() => startEdit(task)}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-sm py-2 px-3 rounded-lg transition-all duration-200"
                >
                    ✏️ Sửa
                </button>
                <button
                    onClick={() => deleteTask(task.id)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm py-2 px-3 rounded-lg transition-all duration-200"
                >
                    🗑️ Xóa
                </button>
            </div>
        </div>
    );
}