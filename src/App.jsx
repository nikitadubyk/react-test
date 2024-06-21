import './App.css';
import { Text } from './components/Text';
import { Input } from './components/Input';
import { Form } from './components/Form/Form';
import { Title } from './components/Title/Title';
import { useCreateUser } from './hooks/use-create-user';

function App() {
  const { errorMessage, onError, onSubmit, onSuccess, successMessage } =
    useCreateUser();

  return (
    <>
      <Title>Create user</Title>
      <Form onSubmit={onSubmit} onSuccess={onSuccess} onError={onError}>
        <Input label="User name" name="name" />
        <Input label="Password" name="password" type="password" />
        <Input type="submit" value="Create user" />
      </Form>
      {successMessage && <Text isSuccess>{successMessage}</Text>}
      {errorMessage && <Text isError>{errorMessage}</Text>}
    </>
  );
}

export default App;
