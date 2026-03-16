import { createContext, useContext } from "react";
import type { List, Task } from "./types";

export const db: List[] = [
    {
        id: '1',
        title: 'HTML',
        tasks: [
            {
                id: 't-1',
                title: 'Imparare i tag semantici',
                completed: false,
            },
            {
                id: 't-2',
                title: 'Imparare a strutturare una pagina',
                completed: true,
            },
        ],
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
];

export const ListContext = createContext<{ lists: List[], setLists: React.Dispatch<React.SetStateAction<List[]>> } | undefined>(undefined);


export function useLists() {
    const context = useContext(ListContext);
    if (!context) {
        throw new Error("useLists must be used within a ListProvider");
    }
    const { lists, setLists } = context;

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

    return { lists, addList, deleteList, updateList };
}

export function useTasks(listId: string){
    const { lists, updateList } = useLists();
    const tasks = lists.find(l => l.id === listId)?.tasks || [];

    function deleteTask(id: string) {
        updateList({ tasks: tasks.filter(t => t.id !== id) }, listId);
    }
    
    function addTask(title: string) {
        const newTask = {
            id: crypto.randomUUID(),
            title,
            completed: false,
        }
        updateList({ tasks: [...tasks, newTask] }, listId);
    }
    
    function updateTask(updatedTask: Partial<Task>, taskId: string) {
        updateList({ tasks: tasks.map(t => t.id === taskId ? { ...t, ...updatedTask } : t) }, listId);
    }

    return { tasks, deleteTask, addTask, updateTask };

}