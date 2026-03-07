
function App() {

  const lists: List[] = [
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
  ]

  return (
    <>
      <h1>SAW TODO</h1>
      <div className="container">
        <input type="text"
          className="text-input"
          placeholder="Inserisci lista..." />
        {lists.map((list) => <List list={list} key={list.id}/>)}
      </div>
    </>
  )
}

export default App

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface List {
  id: string;
  title: string;
  tasks: Task[];
}

function List({ list }: { list: List }) {

  return <div className="list">
    <div className="list-title">
      <span className="title">{list.title}</span>
      <div>
        <EditButton />
        <OpenListButton />
        <DeleteListButton />
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

function DeleteListButton() {
  return <button className="btn">
    {/*<!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->*/}
    <svg xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512">
      <path
        d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
    </svg>
  </button>
}

function OpenListButton() {
  return <button className="btn">
    {/*<!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->*/}
    <svg xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512">
      <path
        d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM281 385c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l71-71L136 280c-13.3 0-24-10.7-24-24s10.7-24 24-24l182.1 0-71-71c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L393 239c9.4 9.4 9.4 24.6 0 33.9L281 385z" />
    </svg>
  </button>
}

function EditButton() {
  return <button className="btn">
    {/*<!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->*/}
    <svg xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512">
      <path
        d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
    </svg>
  </button>
}

