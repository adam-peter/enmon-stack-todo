import styled from 'styled-components';
import { TodoType } from '../types';
import { Checkbox } from 'antd';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const StyledTodo = styled.div<{ $completed: boolean }>`
  display: flex;
  gap: 1rem;
  text-decoration: ${(props) => (props.$completed ? 'line-through' : 'none')};
`;

export const Todo = ({ todo }: { todo: TodoType }) => {
  const queryClient = useQueryClient();
  const [isCompleted, setIsCompleted] = useState(todo.completed);

  const { mutate } = useMutation({
    mutationFn: async (updatedTodo: Partial<TodoType>) => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/todos/${todo._id}`,
        {
          method: 'PATCH',
          body: JSON.stringify(updatedTodo),
          headers: {
            'Content-type': 'application/json',
          },
        }
      );
      console.log('res', res);
      if (!res.ok)
        throw new Error(`Error while updating the todo. (${res.status})`);
      return updatedTodo;
    },
    onSuccess: (updatedTodo: Partial<TodoType>) => {
      queryClient.setQueryData(['todos'], (oldData: TodoType[]) =>
        oldData.map((t) => (t._id === updatedTodo._id ? updatedTodo : t))
      );
    },
  });

  const handleComplete = () => {
    setIsCompleted((prev) => !prev);
    mutate({ completed: !isCompleted });
  };

  return (
    <StyledTodo $completed={isCompleted}>
      <Checkbox checked={isCompleted} onChange={handleComplete} />
      <p>{todo.text}</p>
    </StyledTodo>
  );
};
