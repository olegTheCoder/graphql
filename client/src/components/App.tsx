import { useEffect, useState } from 'react';
import { Button } from './Button';
import { GET_ALL_USERS } from '../query/user';
import { useQuery } from '@apollo/client';

export const App = () => {
  const [users, setUsers] = useState([]);

  const { data, loading } = useQuery(GET_ALL_USERS);

  useEffect(() => {
    if (!loading) {
      setUsers(data.getAllUsers);
    }
  }, [data]);

  return (
    <div>
      <h1>App</h1>
      <form>
        <input type="text" placeholder="text" />
        <input type="number" placeholder="number" />
        {/* <Button name="CREATE" onClick={} />
        <Button name="GET" onClick={} /> */}
      </form>
      <div>
        {users.map((el) => (
          <div key={el.id}>
            {el.id} -{el.username} -{el.age}
          </div>
        ))}
      </div>
    </div>
  );
};
