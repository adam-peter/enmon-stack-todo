import { useMutation } from '@tanstack/react-query';
import { Button, Card, Checkbox, Form, Input } from 'antd';

const NewTodo = () => {
  const [form] = Form.useForm();

  const {} = useMutation({
    mutationFn: postTodo()
  })

  const onFinish = (values: { text: string; completed: boolean }) => {
    console.log(values);
  };

  return (
    <Card>
      <h2>Create new todo</h2>
      <Form form={form} onFinish={onFinish}>
        <Form.Item name="text" label="Todo text" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="completed">
          <Checkbox />
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
