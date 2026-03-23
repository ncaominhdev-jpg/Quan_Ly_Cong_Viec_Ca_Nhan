import { Calendar, Pencil, Trash2, Clock, Loader, CheckCircle2, AlertCircle } from 'lucide-react'
import Swal from 'sweetalert2'

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

    const isDeadlineNear = () => {
        if (!task.deadline || task.status === 'Done') return false;
        const now = new Date();
        const deadline = new Date(task.deadline);
        const diffHours = (deadline - now) / (1000 * 60 * 60);
        return diffHours > 0 && diffHours <= 24;
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

    const getStatusIcon = (status) => {
        switch (status) {
            case 'TODO':
                return Clock;
            case 'In Progress':
                return Loader;
            case 'Done':
                return CheckCircle2;
            default:
                return AlertCircle;
        }
    };

    const StatusIcon = getStatusIcon(task.status);

    const handleDelete = async () => {
        const result = await Swal.fire({
            title: 'Bạn chắc chưa?',
            text: 'Xóa là mất luôn đó!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy',
            allowOutsideClick: false,
            didOpen: (modal) => {
                modal.style.zIndex = "9999";
            }
        });

        if (result.isConfirmed) {
            deleteTask(task.id);
            await Swal.fire({
                icon: 'success',
                title: 'Đã xóa!',
                showConfirmButton: false,
                timer: 1200,
                allowOutsideClick: false,
                didOpen: (modal) => {
                    modal.style.zIndex = "9999";
                }
            });
        }
    };

    const handleEdit = () => {
        if (isDeadlineNear()) {
            Swal.fire({
                icon: 'warning',
                title: 'Lưu ý',
                text: 'Công việc sắp đến hạn!',
                confirmButtonColor: '#8b5cf6',
                allowOutsideClick: false,
                didOpen: (modal) => {
                    modal.style.zIndex = "9999";
                }
            });
        }
        startEdit(task);
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
                    <div className={`flex items-center gap-2 text-sm ${isOverdue() ? 'text-red-600 font-semibold' : 'text-gray-500'}`}>
                        <Calendar size={16} />
                        {formatDeadline(task.deadline)}
                        {isOverdue() && <span className="ml-2 font-bold">QUÁ HẠN</span>}
                    </div>
                </div>

                <span className={`flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full whitespace-nowrap ml-2 ${getStatusColor(task.status)}`}>
                    <StatusIcon size={14} />
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
                    onClick={handleEdit}
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-sm py-2 px-3 rounded-lg transition-all duration-200"
                >
                    <Pencil size={16} />
                    Sửa
                </button>
                <button
                    onClick={handleDelete}
                    className="flex-1 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white text-sm py-2 px-3 rounded-lg transition-all duration-200"
                >
                    <Trash2 size={16} />
                    Xóa
                </button>
            </div>
        </div>
    );
}