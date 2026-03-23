export default function TaskStats({ stats }) {
    const statItems = [
        {
            label: 'Tổng công việc',
            value: stats.total,
            icon: '📋',
            color: 'from-blue-500 to-blue-600',
            bgColor: 'bg-blue-50',
            textColor: 'text-blue-600'
        },
        {
            label: 'Cần làm',
            value: stats.todo,
            icon: '📝',
            color: 'from-slate-500 to-slate-600',
            bgColor: 'bg-slate-50',
            textColor: 'text-slate-600'
        },
        {
            label: 'Đang làm',
            value: stats.inProgress,
            icon: '⚡',
            color: 'from-amber-500 to-amber-600',
            bgColor: 'bg-amber-50',
            textColor: 'text-amber-600'
        },
        {
            label: 'Hoàn thành',
            value: stats.completed,
            icon: '✓',
            color: 'from-emerald-500 to-emerald-600',
            bgColor: 'bg-emerald-50',
            textColor: 'text-emerald-600',
            percentage: stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0
        },
        {
            label: 'Quá hạn',
            value: stats.overdue,
            icon: '⚠',
            color: 'from-red-500 to-red-600',
            bgColor: 'bg-red-50',
            textColor: 'text-red-600'
        },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
            {statItems.map((stat, idx) => (
                <div
                    key={idx}
                    className={`${stat.bgColor} rounded-xl p-6 border border-gray-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-default`}
                >
                    <div className={`text-4xl mb-3`}>{stat.icon}</div>
                    <div className={`text-3xl font-bold ${stat.textColor}`}>{stat.value}</div>
                    <div className={`text-sm font-medium ${stat.textColor} opacity-75 mt-1`}>{stat.label}</div>
                    {stat.percentage !== undefined && (
                        <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                                className={`h-full bg-gradient-to-r ${stat.color}`}
                                style={{width: `${stat.percentage}%`}}
                            ></div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
