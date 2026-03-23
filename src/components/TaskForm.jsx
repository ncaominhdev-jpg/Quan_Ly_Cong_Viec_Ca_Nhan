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
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title Input */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tiêu đề công việc *
                </label>
                <input
                    className="w-full border-2 border-gray-200 rounded-lg p-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                    placeholder="Nhập tiêu đề công việc..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>

            {/* Deadline Input */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Thời hạn (tùy chọn)
                </label>
                <input
                    type="datetime-local"
                    className="w-full border-2 border-gray-200 rounded-lg p-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                />
            </div>

            {/* Status Select */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Trạng thái
                </label>
                <select
                    className="w-full border-2 border-gray-200 rounded-lg p-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="TODO">📝 Cần Làm</option>
                    <option value="In Progress">⚙️ Đang Làm</option>
                    <option value="Done">✅ Hoàn Thành</option>
                </select>
            </div>

            {/* Buttons */}
            <div className="flex gap-2 pt-4">
                <button
                    type="submit"
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition shadow-md"
                >
                    {editingTask ? "💾 Lưu Thay Đổi" : "➕ Thêm Công Việc"}
                </button>
                {editingTask && (
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg transition shadow-md"
                    >
                        Hủy
                    </button>
                )}
            </div>
        </form>
    );
}
