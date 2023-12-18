import React from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';

// Тут список пользователей: https://reqres.in/api/users

function App() {

  const [ users, setUsers ] = React.useState([])
  const [ isLoading, setLoading ] = React.useState(true)
  const [ searchValue, setSearchValue ] = React.useState('')
  const [ invitedUsers, setInvitedUsers ] = React.useState([])
  const [ success, setSuccess ] = React.useState(false)

  // При первом рендере отправляем запрос на бэкенд (используем fetch)
  React.useEffect(() => {
    fetch('https://reqres.in/api/users')
    .then(res => res.json())
    .then((json) => {
      setUsers(json.data)
    }).catch(err => {
      console.warn(err)
      alert('Ошибка при получении пользователя')
    }).finally(() => setLoading(false))
  }, [])

  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value)
  }

  const onClickInvite = (id) => {
    if (invitedUsers.includes(id)) {
      setInvitedUsers(prev => prev.filter(_id => _id !== id))
    } else {
      setInvitedUsers(prev => [...prev, id])
    }
  }

  const onClickSendInvitation = () => {
    setSuccess(true)
  }


  return (
    <div className="App">
      {success ? (
        <Success />
      ) : (
        <Users
          onChangeSearchValue={onChangeSearchValue}
          searchValue={searchValue}
          items={users}
          isLoading={isLoading}
          invitedUsers={invitedUsers}
          onClickInvite={onClickInvite}
          onClickSendInvitation={onClickSendInvitation}
        />
      )}
    </div>
  );
}

export default App;
