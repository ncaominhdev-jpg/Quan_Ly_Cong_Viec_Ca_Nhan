export default function TaskFilter({ filter, setFilter, searchTerm, setSearchTerm }) {
    const filters = [
        { value: 'ALL', label: 'Tất Cả', icon: '📋' },
        { value: 'TODO', label: 'Cần Làm', icon: '📝' },
        { value: 'In Progress', label: 'Đang Làm', icon: '⚙️' },
        { value: 'Done', label: 'Hoàn Thành', icon: '✅' },
    ];

    return (
        <div className="space-y-3">
            
            {/* Search Input */}
            <div className="relative">
                <input
                    type="text"
                    placeholder="🔍 Tìm kiếm công việc..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                />
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2">
                {filters.map(f => (
                    <button
                        key={f.value}
                        onClick={() => setFilter(f.value)}
                        className={`px-4 py-2 rounded-full font-medium transition ${
                            filter === f.value
                                ? 'bg-blue-500 text-white shadow-lg'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        {f.icon} {f.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
