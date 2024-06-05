import { useQuery } from '@tanstack/react-query';
import { Checkbox } from 'antd';
import { Todo } from './types';
import styled from 'styled-components';

const StyledTodo = styled.div`
  display: flex;
  gap: 1rem;
`

const App = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['todos'],
    queryFn: () => getTodos(),
  });

  console.log(data);

  if (isLoading) return <div>...loading</div>;

  if (error)
    return (
      <div>
        Error while fetching data. ({`${error.name}: ${error.message}`})
      </div>
    );

  return (
    <div>
      <h1>Todos</h1>
      <div>
        {data.map((todo: Todo) => (
          <StyledTodo>
            <p>{todo.id}</p>
            <p>{todo.text}</p>
            <Checkbox checked={todo.completed} />
          </StyledTodo>
        ))}
      </div>
    </div>
  );
};

export default App;

const getTodos = async () => {
  const url = `${import.meta.env.VITE_API_URL}/todos`; // Ensure correct URL construction
  console.log(url); // Log the constructed URL for verification

  const res = await fetch(url);

  if (!res.ok) {
    // Check for successful response (status code 200-299)
    throw new Error(`API request failed with status ${res.status}`);
  }

  // Since bodyUsed is true, we can't use res.json() directly
  const textData = await res.text(); // Read the response body as text

  try {
    const data = JSON.parse(textData); // Attempt to parse the text as JSON
    return data;
  } catch (error) {
    throw new Error('Failed to parse response as JSON');
  }
};
