export default function TaskFilter({ filter, setFilter, searchTerm, setSearchTerm }) {
    const filters = [
        { value: 'ALL', label: 'Tất cả' },
        { value: 'TODO', label: 'Cần làm' },
        { value: 'In Progress', label: 'Đang làm' },
        { value: 'Done', label: 'Hoàn thành' },
    ];

    return (
        <div className="space-y-4">
            {/* Search */}
            <input
                type="text"
                placeholder="Tìm kiếm công việc..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
            />

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2">
                {filters.map(f => (
                    <button
                        key={f.value}
                        onClick={() => setFilter(f.value)}
                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                            filter === f.value
                                ? 'bg-purple-500 text-white shadow-lg'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        {f.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
