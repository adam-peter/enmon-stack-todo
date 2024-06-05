import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, Card, Form, Input } from 'antd';

const NewTodo = () => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (newTodo: { text: string }) => {
      console.log("newTodo", newTodo);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/todos`, {
        method: 'POST',
        body: JSON.stringify(newTodo),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        }
      });
      console.log("res", res);

      return await res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  });

  const onFinish = (newTodo: { text: string }) => {
    mutate(newTodo);
  };

  return (
    <Card>
      <h2>Create new todo</h2>
      <Form form={form} onFinish={onFinish}>
        <Form.Item name="text" label="Todo text" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default NewTodo;

// const postTodo =
