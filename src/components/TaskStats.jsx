export default function TaskStats({ stats }) {
    const statItems = [
        {
            label: 'Tổng Công Việc',
            value: stats.total,
            icon: '📋',
            color: 'from-blue-400 to-blue-600'
        },
        {
            label: 'Cần Làm',
            value: stats.todo,
            icon: '📝',
            color: 'from-gray-400 to-gray-600'
        },
        {
            label: 'Đang Làm',
            value: stats.inProgress,
            icon: '⚙️',
            color: 'from-yellow-400 to-yellow-600'
        },
        {
            label: 'Hoàn Thành',
            value: stats.completed,
            icon: '✅',
            color: 'from-green-400 to-green-600',
            percentage: stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0
        },
        {
            label: 'Quá Hạn',
            value: stats.overdue,
            icon: '⚠️',
            color: 'from-red-400 to-red-600'
        },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
            {statItems.map((stat, idx) => (
                <div
                    key={idx}
                    className={`bg-gradient-to-br ${stat.color} text-white rounded-lg p-4 shadow-lg transition transform hover:scale-105`}
                >
                    <div className="text-3xl mb-2">{stat.icon}</div>
                    <div className="text-3xl font-bold">{stat.value}</div>
                    <div className="text-sm opacity-90">{stat.label}</div>
                    {stat.percentage !== undefined && (
                        <div className="mt-2 text-xs opacity-80">
                            {stat.percentage}% xong
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
