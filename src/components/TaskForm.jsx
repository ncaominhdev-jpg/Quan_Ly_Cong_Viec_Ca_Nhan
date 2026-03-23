import { useState, useEffect } from "react";

export default function TaskForm({ addTask, editingTask, cancelEdit }) {
    const [title, setTitle] = useState("");
    const [deadline, setDeadline] = useState("");
    const [status, setStatus] = useState("TODO");
    const [error, setError] = useState("");

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
        setError("");
    }, [editingTask?.id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        if (!title.trim()) {
            setError("Vui lòng nhập tiêu đề");
            return;
        }

        if (!deadline) {
            setError("Vui lòng chọn thời hạn");
            return;
        }

        addTask({
            title: title.trim(),
            deadline,
            status,
        });

        setTitle("");
        setDeadline("");
        setStatus("TODO");
    };

    const handleCancel = () => {
        setTitle("");
        setDeadline("");
        setStatus("TODO");
        setError("");
        if (cancelEdit) cancelEdit();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {error}
                </div>
            )}

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tiêu đề
                </label>
                <input
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                    placeholder="Nhập tiêu đề công việc..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    maxLength="100"
                />
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Thời hạn <span className="text-red-500">*</span>
                </label>
                <input
                    type="datetime-local"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                />
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Trạng thái
                </label>
                <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="TODO">Cần làm</option>
                    <option value="In Progress">Đang làm</option>
                    <option value="Done">Hoàn thành</option>
                </select>
            </div>

            <div className="flex gap-2 pt-4">
                <button
                    type="submit"
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200"
                >
                    {editingTask ? 'Lưu thay đổi' : 'Tạo công việc'}
                </button>
                {editingTask && (
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-all duration-200"
                    >
                        Hủy
                    </button>
                )}
            </div>
        </form>
    );
}
