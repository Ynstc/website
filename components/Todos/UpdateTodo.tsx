import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import toast from "react-hot-toast";
import { useSupabaseClient } from '@supabase/auth-helpers-react'

import { Input } from 'components/ui/input';

interface PropTypes {
    todo: {
        id: number;
        name: string;
    };
    onClose: () => void;
};

export const UpdateTodo = ({ todo, onClose }: PropTypes) => {
    const [currentItem, setCurrentItem] = useState('');
    const supabaseClient = useSupabaseClient();

    useEffect(() => {

        if (todo) {
            setCurrentItem(todo.name);
        }
    }, [todo]);

    const queryClient = useQueryClient();
    // Update Todo
    const { mutate } = useMutation(
        async (item: any) => {
            const { data, error } = await supabaseClient
                .from("todos")
                .update({ name: item.name })
                .match({ id: item.id });

            if (error) {
                toast.error("Something went wrong");
                throw new Error(error.message);
            }

            return data;
        },
        {
            onSuccess: () => {
                toast.success("Item Updated successfully");
                setCurrentItem("");
                onClose();
                return queryClient.refetchQueries("todos");
            },
        }
    );

    const _handleUpdate = () => {
        if (todo !== undefined) {
            mutate({ id: todo.id, name: currentItem });
        }
    };

    return (
        <div>
            <h2>Change item name</h2>
            <Input
                value={currentItem}
                placeholder="Enter item here"
                onChange={setCurrentItem}
                onKeyDown={_handleUpdate}
            />
        </div>
    );
};
