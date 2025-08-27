import {
    faCalendarDay, faCheckCircle, faEdit, faList, faPlus,
    faSearch, faSignOutAlt, faStar, faTrash, faUser, faTimes
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where, 
  orderBy, 
  onSnapshot 
} from 'firebase/firestore';

const Todos = () => {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('due-date');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [newTodo, setNewTodo] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
    completed: false
  });

  useEffect(() => {
    if (!user) return;

    console.log('Setting up Firestore listener for user:', user.uid);

    // Subscribe to real-time updates from Firestore
    const q = query(
      collection(db, 'todos'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const todosData = [];
      querySnapshot.forEach((doc) => {
        todosData.push({ id: doc.id, ...doc.data() });
      });
      console.log('Received todos from Firestore:', todosData);
      setTodos(todosData);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching todos:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddTodo = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', newTodo);
    
    if (!newTodo.title.trim()) {
      alert('Please enter a task title');
      return;
    }
    
    if (!user) {
      alert('Please log in to add tasks');
      return;
    }
    
    setSubmitting(true);
    
    try {
      const todoData = {
        ...newTodo,
        userId: user.uid,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      console.log('Saving todo data:', todoData);
      
      const docRef = await addDoc(collection(db, 'todos'), todoData);
      console.log('Task added successfully with ID:', docRef.id);
      
      // Reset form and close modal
      setNewTodo({
        title: '',
        description: '',
        dueDate: '',
        priority: 'medium',
        completed: false
      });
      setShowModal(false);
      setSubmitting(false);
      
      // Show success message
      alert('Task added successfully!');
    } catch (error) {
      console.error('Error adding todo:', error);
      setSubmitting(false);
      alert(`Failed to add task: ${error.message}`);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await deleteDoc(doc(db, 'todos', id));
    } catch (error) {
      console.error('Error deleting todo:', error);
      alert('Failed to delete task. Please try again.');
    }
  };

  const handleToggleComplete = async (id) => {
    try {
      const todoRef = doc(db, 'todos', id);
      const todo = todos.find(t => t.id === id);
      if (todo) {
        await updateDoc(todoRef, {
          completed: !todo.completed,
          updatedAt: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('Error updating todo:', error);
      alert('Failed to update task. Please try again.');
    }
  };

  const handleEditTodo = async (id, updates) => {
    try {
      const todoRef = doc(db, 'todos', id);
      await updateDoc(todoRef, {
        ...updates,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error updating todo:', error);
      alert('Failed to update task. Please try again.');
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    // Reset form when closing modal
    setNewTodo({
      title: '',
      description: '',
      dueDate: '',
      priority: 'medium',
      completed: false
    });
  };

  const filteredTodos = todos.filter(todo => {
    // Filter by selected filter
    if (filter === 'today') {
      const today = new Date().toISOString().split('T')[0];
      return todo.dueDate === today;
    }
    if (filter === 'important') {
      return todo.priority === 'high';
    }
    if (filter === 'completed') {
      return todo.completed;
    }
    return true;
  }).filter(todo => {
    // Filter by search term
    if (!searchTerm) return true;
    return todo.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
           todo.description.toLowerCase().includes(searchTerm.toLowerCase());
  }).sort((a, b) => {
    // Sort by selected sort option
    if (sortBy === 'due-date') {
      return new Date(a.dueDate) - new Date(b.dueDate);
    }
    if (sortBy === 'priority') {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }
    if (sortBy === 'created') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    return 0;
  });

  const completedCount = todos.filter(todo => todo.completed).length;

  if (loading) {
    return (
      <main className="todos-container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading your tasks...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="todos-container">
      <div className="sidebar">
        <div className="user-profile">
          <div className="avatar">
            <FontAwesomeIcon icon={faUser} />
          </div>
          <div className="user-info">
            <h3>{user?.displayName || user?.email?.split('@')[0] || 'User'}</h3>
            <p>{user?.email}</p>
          </div>
        </div>
        
        <div className="sidebar-menu">
          <button 
            className={`menu-item ${filter === 'all' ? 'active' : ''}`} 
            onClick={() => setFilter('all')}
          >
            <FontAwesomeIcon icon={faList} /> All Tasks
          </button>
          <button 
            className={`menu-item ${filter === 'today' ? 'active' : ''}`} 
            onClick={() => setFilter('today')}
          >
            <FontAwesomeIcon icon={faCalendarDay} /> Today
          </button>
          <button 
            className={`menu-item ${filter === 'important' ? 'active' : ''}`} 
            onClick={() => setFilter('important')}
          >
            <FontAwesomeIcon icon={faStar} /> Important
          </button>
          <button 
            className={`menu-item ${filter === 'completed' ? 'active' : ''}`} 
            onClick={() => setFilter('completed')}
          >
            <FontAwesomeIcon icon={faCheckCircle} /> Completed
          </button>
          <button 
            className="menu-item logout-btn" 
            onClick={handleLogout}
          >
            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
          </button>
        </div>
        
        <div className="stats">
          <div className="stat-item">
            <span className="stat-number">{todos.length}</span>
            <span className="stat-label">Total Tasks</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{completedCount}</span>
            <span className="stat-label">Completed</span>
          </div>
        </div>
      </div>
      
      <div className="todos-content">
        <div className="content-header">
          <h1>My Tasks</h1>
          <button 
            className="btn" 
            id="add-task-btn"
            onClick={openModal}
          >
            <FontAwesomeIcon icon={faPlus} /> Add Task
          </button>
        </div>
        
        <div className="task-filters">
          <div className="search-box">
            <FontAwesomeIcon icon={faSearch} />
            <input 
              type="text" 
              id="task-search" 
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="sort-options">
            <label>Sort by:</label>
            <select 
              id="task-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="due-date">Due Date</option>
              <option value="priority">Priority</option>
              <option value="created">Recently Added</option>
            </select>
          </div>
        </div>
        
        <div className="tasks-list" id="tasks-list">
          {filteredTodos.length === 0 ? (
            <div className="empty-state">
              <img src="https://cdn-icons-png.flaticon.com/512/4076/4076478.png" alt="No tasks" />
              <h3>No tasks yet</h3>
              <p>Click "Add Task" to create your first todo</p>
            </div>
          ) : (
            filteredTodos.map(todo => (
              <div 
                key={todo.id} 
                className={`task-item ${todo.priority}-priority ${todo.completed ? 'completed' : ''}`}
              >
                <div className="task-checkbox">
                  <input 
                    type="checkbox" 
                    checked={todo.completed}
                    onChange={() => handleToggleComplete(todo.id)}
                  />
                </div>
                <div className="task-content">
                  <h3 className="task-title">{todo.title}</h3>
                  {todo.description && (
                    <p className="task-description">{todo.description}</p>
                  )}
                  <div className="task-meta">
                    {todo.dueDate && (
                      <span className="task-due-date">
                        Due: {new Date(todo.dueDate).toLocaleDateString()}
                      </span>
                    )}
                    <span className={`task-priority priority-${todo.priority}`}>
                      {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
                    </span>
                  </div>
                </div>
                <div className="task-actions">
                  <button 
                    className="btn-icon"
                    onClick={() => {
                      const newTitle = prompt('Edit title:', todo.title);
                      if (newTitle && newTitle.trim()) {
                        handleEditTodo(todo.id, { title: newTitle.trim() });
                      }
                    }}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button 
                    className="btn-icon"
                    onClick={() => handleDeleteTodo(todo.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal for Add Task */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add New Task</h2>
              <button className="modal-close" onClick={closeModal}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            
            <form onSubmit={handleAddTodo} className="modal-form">
              <div className="form-group">
                <label htmlFor="modal-todo-title">Title *</label>
                <input 
                  type="text" 
                  id="modal-todo-title" 
                  placeholder="What needs to be done?" 
                  required
                  value={newTodo.title}
                  onChange={(e) => setNewTodo({...newTodo, title: e.target.value})}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="modal-todo-description">Description</label>
                <textarea 
                  id="modal-todo-description" 
                  placeholder="Add details..."
                  value={newTodo.description}
                  onChange={(e) => setNewTodo({...newTodo, description: e.target.value})}
                  rows="3"
                ></textarea>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="modal-todo-due-date">Due Date</label>
                  <input 
                    type="date" 
                    id="modal-todo-due-date"
                    value={newTodo.dueDate}
                    onChange={(e) => setNewTodo({...newTodo, dueDate: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Priority</label>
                  <div className="priority-options">
                    <button 
                      type="button" 
                      className={`priority-option ${newTodo.priority === 'low' ? 'active' : ''}`}
                      onClick={() => setNewTodo({...newTodo, priority: 'low'})}
                      data-priority="low"
                    >
                      Low
                    </button>
                    <button 
                      type="button" 
                      className={`priority-option ${newTodo.priority === 'medium' ? 'active' : ''}`}
                      onClick={() => setNewTodo({...newTodo, priority: 'medium'})}
                      data-priority="medium"
                    >
                      Medium
                    </button>
                    <button 
                      type="button" 
                      className={`priority-option ${newTodo.priority === 'high' ? 'active' : ''}`}
                      onClick={() => setNewTodo({...newTodo, priority: 'high'})}
                      data-priority="high"
                    >
                      High
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="modal-actions">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={closeModal}
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn" 
                  disabled={submitting}
                >
                  {submitting ? 'Adding Task...' : 'Add Task'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default Todos;