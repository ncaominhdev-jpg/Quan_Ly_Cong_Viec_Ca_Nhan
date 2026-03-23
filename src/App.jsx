import { useState, useEffect } from 'react'
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskFilter from './components/TaskFilter';
import TaskStats from './components/TaskStats';
import './App.css'

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (taskData) => {
    if (editingId) {
      setTasks(tasks.map(t => 
        t.id === editingId ? { ...t, ...taskData } : t
      ));
      setEditingId(null);
    } else {
      const newTask = {
        id: Date.now(),
        ...taskData,
      };
      setTasks([...tasks, newTask]);
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const updateTaskStatus = (id, newStatus) => {
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, status: newStatus } : t
    ));
  };

  const startEdit = (task) => {
    setEditingId(task.id);
  };

  const filteredTasks = tasks.filter(task => {
    const matchStatus = filter === 'ALL' || task.status === filter;
    const matchSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchStatus && matchSearch;
  });

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'Done').length,
    inProgress: tasks.filter(t => t.status === 'In Progress').length,
    todo: tasks.filter(t => t.status === 'TODO').length,
    overdue: tasks.filter(t => {
      if (!t.deadline || t.status === 'Done') return false;
      return new Date(t.deadline) < new Date();
    }).length,
  };

  const editingTask = editingId ? tasks.find(t => t.id === editingId) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-400 py-12">
      <div className="max-w-5xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-white mb-3">Quản Lý Công Việc</h1>
          <p className="text-purple-100 text-lg">Quản lý công việc cá nhân một cách hiệu quả</p>
        </div>

        {/* Stats */}
        <TaskStats stats={stats} />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          
          {/* Form Section */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-md shadow-lg rounded-xl p-6 sticky top-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                {editingId ? 'Chỉnh sửa công việc' : 'Công việc mới'}
              </h2>
              <TaskForm 
                addTask={addTask}
                editingTask={editingTask}
                cancelEdit={() => setEditingId(null)}
              />
            </div>
          </div>

          {/* List Section */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Filter */}
            <TaskFilter 
              filter={filter}
              setFilter={setFilter}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />

            {/* Task List */}
            <div className="bg-white/80 backdrop-blur-md shadow-lg rounded-xl p-6">
              {filteredTasks.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="text-xl text-gray-500 font-medium">Không có công việc nào</p>
                </div>
              ) : (
                <TaskList 
                  tasks={filteredTasks}
                  deleteTask={deleteTask}
                  updateTaskStatus={updateTaskStatus}
                  startEdit={startEdit}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
