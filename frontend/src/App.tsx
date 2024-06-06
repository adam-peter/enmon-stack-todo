import { useQuery } from '@tanstack/react-query';
import { TodoType } from './types';
import { Todo } from './components/Todo';
import NewTodo from './components/NewTodo';

const App = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['todos'],
    queryFn: () => getTodos(),
  });

  if (isLoading) return <div>...loading</div>;

  if (error)
    return (
      <div>
        Error while fetching data. ({`${error.name}: ${error.message}`})
      </div>
    );

  return (
    <div>
      <NewTodo />
      <div>
        {data.map((todo: TodoType) => {
          return <Todo todo={todo} key={todo._id} />;
        })}
      </div>
    </div>
  );
};

export default App;

const getTodos = async () => {
  const url = `${import.meta.env.VITE_API_URL}/todos`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`API request failed with status ${res.status}`);
  }

  const textData = await res.text();

  try {
    const data = JSON.parse(textData);
    return data;
  } catch (error) {
    throw new Error('Failed to parse response as JSON');
  }
};
