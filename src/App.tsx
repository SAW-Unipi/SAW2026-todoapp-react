import { useRef, useState } from 'react'
import type { List, Task } from './types'
import { BrowserRouter, Route, Routes, useNavigate, useParams } from 'react-router';
import { db, ListContext, useLists, useTasks } from './hooks';

function App() {

  const [lists, setLists] = useState<List[]>(db);

  return (
    <>
      <ListContext value={{ lists, setLists }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ListsPage />} />
            <Route path="lists/:id" element={<TodoPage />} />
          </Routes>
        </BrowserRouter>
      </ListContext>
    </>
  )
}

export default App

function TodoPage() {

  const { id } = useParams();
  const { tasks, addTask } = useTasks(id!);
  const navigate = useNavigate();

  return <>
    <header>
      <h1>SAW TODO</h1>
      <h2>HTML</h2>
      <button className="btn" onClick={() => navigate('/')}>
        <BackButton />
      </button>
    </header>
    <div className="container">
      <EditableText editing={true}
        className='text-input'
        value="I miei task"
        onChange={(title) => addTask(title)}
      />

      <section className="todos">
        <ul>
          {tasks.map(t => <li><TaskItem task={t} /></li>)}
        </ul>
      </section>

    </div>
  </>;
}

function TaskItem({ task }: { task: Task }) {
  const { id } = useParams();
  const { updateTask, deleteTask } = useTasks(id!);
  const [isEditing, setIsEditing] = useState(false);

  return <>
    <div className="item">
      <div onDoubleClick={() => setIsEditing(true)}>
        <input type="checkbox"
          onClick={() => updateTask({ completed: !task.completed }, task.id)}
          checked={task.completed} />

        <EditableText editing={isEditing}
          textClass={task.completed ? "completed" : ""}
          value={task.title}
          onCancel={() => { }}
          onChange={(title) => {
            updateTask({ title }, task.id);
            setIsEditing(false);
          }}
        />
        <button onClick={() => deleteTask(task.id)}>&times;</button>
      </div>

    </div >
  </>;
}

function BackButton() {
  return <svg xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512">
    <path
      d="M512 256A256 256 0 1 0 0 256a256 256 0 1 0 512 0zM217.4 376.9L117.5 269.8c-3.5-3.8-5.5-8.7-5.5-13.8s2-10.1 5.5-13.8l99.9-107.1c4.2-4.5 10.1-7.1 16.3-7.1c12.3 0 22.3 10 22.3 22.3l0 57.7 96 0c17.7 0 32 14.3 32 32l0 32c0 17.7-14.3 32-32 32l-96 0 0 57.7c0 12.3-10 22.3-22.3 22.3c-6.2 0-12.1-2.6-16.3-7.1z" />
  </svg>;
}

function EditableText({ editing, value, onChange, onCancel = () => { }, className = "", textClass = "title" }: {
  editing: boolean;
  value: string;
  onChange: (text: string) => void;
  onCancel?: () => void;
  className?: string;
  textClass?: string;
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
      ? <input className={`${className}`} ref={input} type="text" defaultValue={value} onKeyUp={onKeyUp} />
      : <span className={textClass}>{value}</span>
  }
  </>;
}


function ListsPage() {
  const { lists, addList, updateList, deleteList } = useLists();

  return <>
    <h1>SAW TODO</h1>
    <div className="container">
      <EditableText editing={true}
        className='text-input'
        value="Le mie liste"
        onChange={(title) => { addList(title); }}
      />
      {lists.map((list) => <List list={list} key={list.id} deleteList={deleteList} updateList={updateList} />)}
    </div >
  </>;
}

function List({ list, deleteList, updateList }: { list: List; deleteList: (id: string) => void; updateList: (newList: Partial<List>, listId: string) => void }) {

  const [isEditing, setIsEditing] = useState(false);
  const percentage = list.tasks.length === 0
    ? 0
    : Math.round(list.tasks.filter(t => t.completed).length / list.tasks.length * 100);

  return <div className="list">
    <div className="list-title">
      <EditableText editing={isEditing}
        value={list.title}
        className=''
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
    <CompleteListBar percentage={percentage} />
  </div>
}

function CompleteListBar({ percentage = 30 }: { percentage?: number }) {
  return <div className="bar">
    <span className="percentage" style={{ width: `${percentage}%` }}
      data-value="10%">
      <span className="tooltip">{percentage}%</span>
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

