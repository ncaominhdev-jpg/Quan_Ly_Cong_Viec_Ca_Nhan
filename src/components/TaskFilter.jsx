export default function TaskFilter({ filter, setFilter, searchTerm, setSearchTerm }) {
    const filters = [
        { value: 'ALL', label: 'Tất cả' },
        { value: 'TODO', label: 'Cần làm' },
        { value: 'In Progress', label: 'Đang làm' },
        { value: 'Done', label: 'Hoàn thành' },
    ];

    return (
        <div className="space-y-4">
            
            {/* Search Input */}
            <div className="relative">
                <input
                    type="text"
                    placeholder="Tìm kiếm công việc..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-5 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all bg-white font-medium placeholder-gray-400"
                />
                <span className="absolute right-4 top-3.5 text-gray-400">Search</span>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2">
                {filters.map(f => (
                    <button
                        key={f.value}
                        onClick={() => setFilter(f.value)}
                        className={`px-5 py-2 rounded-lg font-semibold transition-all ${
                            filter === f.value
                                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
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
