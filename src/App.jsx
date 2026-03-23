import { useState, useEffect } from 'react'
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskFilter from './components/TaskFilter';
import TaskStats from './components/TaskStats';
import './App.css'

function App() {
  // Initialize tasks from localStorage
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [filter, setFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (taskData) => {
    if (editingId) {
      // Update existing task
      setTasks(tasks.map(t => 
        t.id === editingId 
          ? { ...t, ...taskData, updatedAt: new Date().toISOString() }
          : t
      ));
      setEditingId(null);
    } else {
      // Add new task
      const newTask = {
        id: Date.now(),
        ...taskData,
        createdAt: new Date().toISOString(),
      };
      setTasks([...tasks, newTask]);
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const updateTaskStatus = (id, newStatus) => {
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, status: newStatus } : t
    ));
  };

  const startEdit = (task) => {
    setEditingId(task.id);
  };

  // Filter tasks based on status and search term
  const filteredTasks = tasks.filter(task => {
    const matchStatus = filter === 'ALL' || task.status === filter;
    const matchSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchStatus && matchSearch;
  });

  // Calculate statistics
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

  // Find editing task
  const editingTask = editingId ? tasks.find(t => t.id === editingId) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-2 tracking-tight">
            Quản Lý Công Việc
          </h1>
          <p className="text-lg text-purple-200">Tối ưu hóa năng suất với ứng dụng quản lý công việc hiện đại</p>
          <div className="mt-4 h-1 w-16 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded-full"></div>
        </div>

        {/* Stats */}
        <TaskStats stats={stats} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 my-8">
          
          {/* Form Section */}
          <div className="lg:col-span-1">
            <div className="bg-white bg-opacity-95 backdrop-blur rounded-2xl shadow-2xl p-8 sticky top-8 border border-purple-100">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                {editingId ? 'Chỉnh sửa công việc' : 'Tạo công việc mới'}
              </h2>
              <TaskForm 
                addTask={addTask}
                editingTask={editingTask}
                cancelEdit={() => setEditingId(null)}
              />
            </div>
          </div>

          {/* Tasks Section */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Filter */}
            <TaskFilter 
              filter={filter}
              setFilter={setFilter}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />

            {/* Task List */}
            <div className="bg-white bg-opacity-95 backdrop-blur rounded-2xl shadow-2xl overflow-hidden border border-purple-100">
              {filteredTasks.length === 0 ? (
                <div className="p-12 text-center">
                  <div className="text-6xl mb-4">📭</div>
                  <p className="text-xl font-semibold text-gray-700 mb-2">Không có công việc</p>
                  <p className="text-gray-500">Bắt đầu bằng cách tạo công việc mới</p>
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
