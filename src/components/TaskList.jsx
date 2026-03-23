import { useState } from 'react';

export default function TaskList({ tasks, deleteTask, updateTaskStatus, startEdit }) {
    const [openDropdown, setOpenDropdown] = useState(null);

    const getStatusBadgeStyle = (status) => {
        switch (status) {
            case 'TODO':
                return 'bg-slate-100 text-slate-700 border-slate-300';
            case 'In Progress':
                return 'bg-amber-100 text-amber-700 border-amber-300';
            case 'Done':
                return 'bg-emerald-100 text-emerald-700 border-emerald-300';
            default:
                return 'bg-gray-100 text-gray-700 border-gray-300';
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
        <div className="space-y-2">
            {tasks.map((task) => {
                const overdue = isOverdue(task.deadline, task.status);
                const nearDeadline = isNearDeadline(task.deadline, task.status);

                return (
                    <div
                        key={task.id}
                        className={`transition-all rounded-xl p-4 border-2 ${
                            overdue 
                                ? 'bg-red-50 border-red-200 hover:border-red-300' 
                                : nearDeadline 
                                ? 'bg-amber-50 border-amber-200 hover:border-amber-300'
                                : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                        } hover:shadow-md`}
                    >
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            
                            {/* Left Side - Title & Info */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start gap-3">
                                    <span className="text-xl mt-0.5 flex-shrink-0">
                                        {getStatusIcon(task.status)}
                                    </span>
                                    <div className="flex-1 min-w-0">
                                        <p className={`font-semibold text-gray-800 break-words text-base ${
                                            task.status === 'Done' ? 'line-through text-gray-500' : ''
                                        }`}>
                                            {task.title}
                                        </p>
                                        
                                        {/* Deadline */}
                                        {task.deadline && (
                                            <p className={`text-sm mt-2 font-medium ${
                                                overdue 
                                                    ? 'text-red-600' 
                                                    : nearDeadline 
                                                    ? 'text-amber-600'
                                                    : 'text-gray-600'
                                            }`}>
                                                Hạn: {formatDeadline(task.deadline)}
                                                {overdue && ' (Quá hạn)'}
                                                {nearDeadline && !overdue && ' (Sắp hạn)'}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Right Side - Status & Actions */}
                            <div className="flex items-center gap-2 justify-end">
                                
                                {/* Status Dropdown */}
                                <div className="relative">
                                    <button
                                        onClick={() => setOpenDropdown(openDropdown === task.id ? null : task.id)}
                                        className={`px-4 py-2 rounded-lg text-sm font-semibold border-2 transition cursor-pointer ${getStatusBadgeStyle(task.status)} hover:shadow-md`}
                                        title="Thay đổi trạng thái"
                                    >
                                        {task.status}
                                    </button>
                                    
                                    {/* Dropdown Menu */}
                                    {openDropdown === task.id && (
                                        <div className="absolute right-0 bottom-full mb-2 w-48 bg-white border-2 border-gray-300 rounded-lg shadow-xl z-50">
                                            {getStatusOptions(task.status).map(status => (
                                                <button
                                                    key={status}
                                                    onClick={() => {
                                                        updateTaskStatus(task.id, status);
                                                        setOpenDropdown(null);
                                                    }}
                                                    className="w-full text-left px-4 py-3 hover:bg-blue-50 transition text-sm font-medium text-gray-700 first:rounded-t-md last:rounded-b-md"
                                                >
                                                    {getStatusIcon(status)} {status}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Edit Button */}
                                <button
                                    onClick={() => startEdit(task)}
                                    className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-100 rounded-lg transition-all"
                                    title="Chỉnh sửa"
                                >
                                    Edit
                                </button>

                                {/* Delete Button */}
                                <button
                                    onClick={() => deleteTask(task.id)}
                                    className="p-2 text-red-600 hover:text-red-700 hover:bg-red-100 rounded-lg transition-all"
                                    title="Xóa"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
