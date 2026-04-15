import TodoList from '@/components/TodoList';

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col px-4 py-12">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Todo App
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Stay organized. Get things done.
        </p>
      </header>
      <TodoList />
    </main>
  );
}
