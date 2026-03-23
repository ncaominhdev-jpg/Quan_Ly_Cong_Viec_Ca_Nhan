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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            📋 Quản Lý Công Việc
          </h1>
          <p className="text-gray-600">Quản lý công việc cá nhân hiệu quả</p>
        </div>

        {/* Stats */}
        <TaskStats stats={stats} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Form Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-4 text-gray-800">
                {editingId ? '✏️ Sửa Công Việc' : '➕ Thêm Công Việc'}
              </h2>
              <TaskForm 
                addTask={addTask}
                editingTask={editingTask}
                cancelEdit={() => setEditingId(null)}
              />
            </div>
          </div>

          {/* Tasks Section */}
          <div className="lg:col-span-2 space-y-4">
            
            {/* Filter */}
            <TaskFilter 
              filter={filter}
              setFilter={setFilter}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />

            {/* Task List */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {filteredTasks.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <p className="text-lg">Không có công việc nào</p>
                  <p className="text-sm mt-2">Hãy thêm công việc mới để bắt đầu</p>
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
