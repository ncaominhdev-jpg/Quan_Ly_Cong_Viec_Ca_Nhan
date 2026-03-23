import { ListTodo, Clock, Loader, CheckCircle2, AlertCircle } from 'lucide-react'

export default function TaskStats({ stats }) {
    const items = [
        { label: 'Tổng', value: stats.total, bg: 'bg-blue-100', text: 'text-blue-700', icon: ListTodo },
        { label: 'Cần làm', value: stats.todo, bg: 'bg-yellow-100', text: 'text-yellow-700', icon: Clock },
        { label: 'Đang làm', value: stats.inProgress, bg: 'bg-indigo-100', text: 'text-indigo-700', icon: Loader },
        { label: 'Hoàn thành', value: stats.completed, bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle2 },
        { label: 'Quá hạn', value: stats.overdue, bg: 'bg-red-100', text: 'text-red-700', icon: AlertCircle },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {items.map((item, idx) => {
                const Icon = item.icon;
                return (
                    <div key={idx} className={`${item.bg} rounded-xl p-4 transition-all duration-200 hover:scale-[1.02]`}>
                        <div className="flex items-center gap-2 mb-2">
                            <Icon size={20} className={item.text} />
                            <div className={`text-2xl font-bold ${item.text}`}>{item.value}</div>
                        </div>
                        <div className={`text-xs font-medium ${item.text} opacity-75`}>{item.label}</div>
                    </div>
                );
            })}
        </div>
    );
}
