import { useState } from "react";
import {
    useMutation,
    useQuery,
    useQueryClient,
} from "react-query";
import toast from "react-hot-toast";
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { AiTwotoneDelete, AiOutlineForm } from 'react-icons/ai';

import { UpdateTodo } from "components/todos/UpdateTodo";
import { Modal } from "components/ui/modal";
import Loader from "components/ui/loader";
import styles from 'styles/components/todos.module.scss';


export const Todos = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<{
        id: number;
        name: string;
    }>();
    const supabaseClient = useSupabaseClient()
    const queryClient = useQueryClient();

    //Get All Todos from user
    const { data, isLoading, isError, isSuccess } = useQuery(
        "todos",
        async () => {
            const { data, error } = await supabaseClient
                .from("todos")
                .select('*')
                .order("id", { ascending: true });

            if (error) {
                toast.error('There was problem to fetch list');
                throw new Error(error.message);
            }

            return data;
        }
    );
    //Delete Todo
    const { mutate } = useMutation(
        async (id: number) => {
            const { data, error } = await supabaseClient
                .from("todos")
                .delete()
                .match({ id });

            if (error) {
                toast.error("There was problem with deleting item");
                throw new Error(error.message);
            }

            return data;
        },
        {
            onSuccess: () => {
                toast.success("Item Deleted successfully");
                return queryClient.refetchQueries("todos");
            },
        }
    );

    const handleUpdateModalClose = () => {
        setIsOpen(!isOpen);
    };

    const onItemClick = (todo: { id: number; name: string }) => {
        setSelectedItem(todo);
        setIsOpen(true);
    };

    const onDeleteItemClick = async (id: number) => {
        await mutate(id);
    };

    return (
        <>
            {isLoading ? <Loader /> :
                <>
                    <div className={styles.todoList}>
                        {
                            data ? data.map((todo: any) => (
                                <div key={todo.id} className={styles.todoList__item}>
                                    <span className={styles.todoList__itemName}>{todo.name}</span>
                                    <AiTwotoneDelete
                                        className={styles.trashIcon}
                                        onClick={() => onDeleteItemClick(todo.id)}
                                    />
                                    <AiOutlineForm
                                        className={styles.editIcon}
                                        onClick={() => onItemClick(todo)}
                                    />
                                </div>
                            )) : null
                        }
                    </div>
                    <Modal
                        setModalOpen={handleUpdateModalClose}
                        isModalOpen={isOpen}
                    >
                        {selectedItem === undefined ? null : <UpdateTodo
                            todo={selectedItem}
                            onClose={handleUpdateModalClose}
                        />}
                    </Modal>
                </>
            }
        </>
    );
};

