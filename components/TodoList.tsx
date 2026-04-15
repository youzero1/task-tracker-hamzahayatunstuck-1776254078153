'use client';

import { useState } from 'react';
import type { Todo } from '@/types';
import TodoItem from '@/components/TodoItem';

type FilterType = 'all' | 'active' | 'completed';

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [filter, setFilter] = useState<FilterType>('all');

  function addTodo(): void {
    const trimmed = inputValue.trim();
    if (trimmed === '') return;

    const newTodo: Todo = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
      text: trimmed,
      completed: false,
      createdAt: Date.now(),
    };

    setTodos((prev) => [newTodo, ...prev]);
    setInputValue('');
  }

  function toggleTodo(id: string): void {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  function deleteTodo(id: string): void {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }

  function editTodo(id: string, newText: string): void {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  }

  function clearCompleted(): void {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.filter((todo) => todo.completed).length;

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
    if (e.key === 'Enter') {
      addTodo();
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInputValue(e.target.value)
          }
          onKeyDown={handleKeyDown}
          placeholder="What needs to be done?"
          className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-100 placeholder-violet-300/40 shadow-sm backdrop-blur-sm transition-colors focus:border-amber-400/50 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
        />
        <button
          onClick={addTodo}
          disabled={inputValue.trim() === ''}
          className="rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-3 text-sm font-medium text-slate-900 shadow-sm transition-all hover:from-amber-400 hover:to-orange-400 hover:shadow-md hover:shadow-amber-500/20 focus:outline-none focus:ring-2 focus:ring-amber-400/20 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Add
        </button>
      </div>

      {/* Filters */}
      {todos.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            {(['all', 'active', 'completed'] as FilterType[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
                  filter === f
                    ? 'bg-amber-400/20 text-amber-300'
                    : 'text-violet-300/50 hover:bg-white/5 hover:text-violet-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-violet-300/50">
              {activeCount} item{activeCount !== 1 ? 's' : ''} left
            </span>
            {completedCount > 0 && (
              <button
                onClick={clearCompleted}
                className="text-xs text-rose-400/60 transition-colors hover:text-rose-400"
              >
                Clear completed
              </button>
            )}
          </div>
        </div>
      )}

      {/* Todo List */}
      {filteredTodos.length > 0 ? (
        <ul className="flex flex-col gap-2">
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={editTodo}
            />
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-white/10 py-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mb-3 h-12 w-12 text-violet-400/20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <p className="text-sm text-violet-300/40">
            {filter === 'all'
              ? 'No todos yet. Add one above!'
              : filter === 'active'
              ? 'No active todos.'
              : 'No completed todos.'}
          </p>
        </div>
      )}
    </div>
  );
}
