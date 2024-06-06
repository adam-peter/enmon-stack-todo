import styled from 'styled-components';
import { TodoType } from '../types';
import { Button, Checkbox, Input } from 'antd';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { EditOutlined } from '@ant-design/icons';

export const StyledTodo = styled.div<{ $completed: boolean }>`
  display: flex;
  align-items: center;
  gap: 1rem;
  text-decoration: ${(props) => (props.$completed ? 'line-through' : 'none')};
`;

export const Todo = ({ todo }: { todo: TodoType }) => {
  const queryClient = useQueryClient();
  const [isCompleted, setIsCompleted] = useState(todo.completed);
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(todo.text);

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
      {isEditing ? (
        <Input
          value={text}
          style={{ width: '80%' }}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && text.trim() !== '') {
              mutate({ text });
              setIsEditing(false);
            }
          }}
        />
      ) : (
        <p>{text}</p>
      )}
      <Button
        icon={<EditOutlined />}
        type="text"
        onClick={() => {
          setIsEditing((prev) => !prev);
        }}
      />
    </StyledTodo>
  );
};
