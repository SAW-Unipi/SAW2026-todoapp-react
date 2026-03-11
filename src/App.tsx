import { useRef, useState } from 'react'
import type { List } from './types'
import { BrowserRouter, Route, Routes, useNavigate, useParams } from 'react-router';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ListsPage />} />
          <Route path="lists/:id" element={<ListPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

function EditableText({ editing, value, onChange, onCancel = () => {} }: {
  editing: boolean;
  value: string;
  onChange: (text: string) => void;
  onCancel?: () => void
}) {
  const input = useRef<HTMLInputElement>(null);

  function onKeyUp(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      const text = input.current!.value.trim();
      if (text === '') { return; }
      onChange(text)
      return;
    }

    if (e.key === 'Escape') {
      input.current!.value = '';
      onCancel()
      return;
    }
  }

  return <>{
    editing
      ? <input ref={input} type="text" defaultValue={value} onKeyUp={onKeyUp} />
      : <span className="title">{value}</span>
  }
  </>;
}

function ListPage() {
  const { id } = useParams();

  return <>
    <p>Hello! {id}</p>
  </>;
}

function ListsPage() {
  const [lists, setLists] = useState<List[]>([
    {
      id: '1',
      title: 'HTML',
      tasks: [],
    },
    {
      id: '2',
      title: 'CSS',
      tasks: [],
    },
    {
      id: '3',
      title: 'JavaScript',
      tasks: [],
    },
  ]);


  function addList(title: string) {
    const l: List = {
      id: crypto.randomUUID(),
      title,
      tasks: [],
    }
    setLists(v => [...v, l]);
  }

  function deleteList(id: string) {
    setLists(v => v.filter(l => l.id !== id));
  }

  function updateList(updatedList: Partial<List>, listId: string) {
    setLists(ls => ls.map(l => l.id === listId ? { ...l, ...updatedList } : l));
  }

  const input = useRef<HTMLInputElement>(null);

  function onKeyUp(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      const title = input.current!.value.trim();
      if (title === '') { return; }
      addList(title);
      input.current!.value = '';
      return;
    }
    if (e.key === 'Escape') {
      input.current!.value = '';
      return;
    }
  }
  return <>
    <h1>SAW TODO</h1>
    <div className="container">
      <EditableText editing={true}
      value="Le mie liste"
      onChange={(title) => { addList(title); }}
      />
    <input type="text"
      ref={input}
      onKeyUp={onKeyUp}
      className="text-input"
      placeholder="Inserisci lista..." />
    {lists.map((list) => <List list={list} key={list.id} deleteList={deleteList} updateList={updateList} />)}
  </div >
  </>;
}

function List({ list, deleteList, updateList }: { list: List; deleteList: (id: string) => void; updateList: (newList: Partial<List>, listId: string) => void }) {

  const [isEditing, setIsEditing] = useState(false);

  return <div className="list">
    <div className="list-title">
      <EditableText editing={isEditing}
        value={list.title}
        onChange={(text) => {
          updateList({ title: text }, list.id);
          setIsEditing(false);
        }}
        onCancel={() => setIsEditing(false)}
      />
      <div>
        {!isEditing && <EditButton onClick={() => setIsEditing(true)} />}
        <OpenListButton id={list.id} />
        <DeleteListButton onClick={() => deleteList(list.id)} />
      </div>
    </div>
    <CompleteListBar />
  </div>
}

function CompleteListBar() {
  return <div className="bar">
    <span className="percentage"
      data-value="90%">
      <span className="tooltip">90%</span>
    </span>
  </div>
}

function DeleteListButton({ onClick }: { onClick: () => void }) {
  return <button className="btn" onClick={() => onClick()}>
    {/*<!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->*/}
    <svg xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512">
      <path
        d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
    </svg>
  </button>
}

function OpenListButton({ id }: { id: string }) {
  const navigate = useNavigate();

  return <button className="btn" onClick={() => navigate(`/lists/${id}`)}>
    {/*<!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->*/}
    <svg xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512">
      <path
        d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM281 385c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l71-71L136 280c-13.3 0-24-10.7-24-24s10.7-24 24-24l182.1 0-71-71c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L393 239c9.4 9.4 9.4 24.6 0 33.9L281 385z" />
    </svg>
  </button>
}

function EditButton({ onClick }: { onClick: () => void }) {
  return <button className="btn" onClick={() => onClick()}>
    {/*<!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->*/}
    <svg xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512">
      <path
        d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
    </svg>
  </button>
}

