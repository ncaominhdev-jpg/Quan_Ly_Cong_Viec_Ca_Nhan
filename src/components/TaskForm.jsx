import { useState, useEffect } from "react";

export default function TaskForm({ addTask, editingTask, cancelEdit }) {
    const [title, setTitle] = useState("");
    const [deadline, setDeadline] = useState("");
    const [status, setStatus] = useState("TODO");

    useEffect(() => {
        if (editingTask) {
            setTitle(editingTask.title);
            setDeadline(editingTask.deadline || "");
            setStatus(editingTask.status || "TODO");
        } else {
            setTitle("");
            setDeadline("");
            setStatus("TODO");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editingTask?.id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title.trim()) {
            alert("Vui lòng nhập tiêu đề công việc");
            return;
        }

        addTask({
            title: title.trim(),
            deadline,
            status,
        });

        // Reset form
        setTitle("");
        setDeadline("");
        setStatus("TODO");
    };

    const handleCancel = () => {
        setTitle("");
        setDeadline("");
        setStatus("TODO");
        if (cancelEdit) cancelEdit();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {/* Title Input */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tiêu đề
                </label>
                <input
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all bg-gray-50 font-medium placeholder-gray-400"
                    placeholder="Nhập tiêu đề công việc..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>

            {/* Deadline Input */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Thời hạn
                </label>
                <input
                    type="datetime-local"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all bg-gray-50"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                />
            </div>

            {/* Status Select */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Trạng thái
                </label>
                <select
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all bg-gray-50 font-medium"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="TODO">Cần làm</option>
                    <option value="In Progress">Đang làm</option>
                    <option value="Done">Hoàn thành</option>
                </select>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
                <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all shadow-md hover:shadow-lg active:scale-95"
                >
                    {editingTask ? 'Lưu thay đổi' : 'Tạo công việc'}
                </button>
                {editingTask && (
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-3 px-4 rounded-lg transition-all shadow-md hover:shadow-lg active:scale-95"
                    >
                        Hủy
                    </button>
                )}
            </div>
        </form>
    );
}
