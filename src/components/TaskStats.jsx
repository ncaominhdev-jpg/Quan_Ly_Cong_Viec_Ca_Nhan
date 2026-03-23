export default function TaskStats({ stats }) {
    const items = [
        { label: 'Tổng', value: stats.total, bg: 'bg-blue-100', text: 'text-blue-700' },
        { label: 'Cần làm', value: stats.todo, bg: 'bg-yellow-100', text: 'text-yellow-700' },
        { label: 'Đang làm', value: stats.inProgress, bg: 'bg-indigo-100', text: 'text-indigo-700' },
        { label: 'Hoàn thành', value: stats.completed, bg: 'bg-green-100', text: 'text-green-700' },
        { label: 'Quá hạn', value: stats.overdue, bg: 'bg-red-100', text: 'text-red-700' },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {items.map((item, idx) => (
                <div key={idx} className={`${item.bg} rounded-xl p-4 text-center transition-all duration-200 hover:scale-[1.02]`}>
                    <div className={`text-2xl font-bold ${item.text}`}>{item.value}</div>
                    <div className={`text-xs font-medium ${item.text} opacity-75 mt-1`}>{item.label}</div>
                </div>
            ))}
        </div>
    );
}
