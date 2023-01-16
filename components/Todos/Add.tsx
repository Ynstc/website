import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import toast from "react-hot-toast";
import { useUser, useSupabaseClient, User } from '@supabase/auth-helpers-react'

import Input from 'components/ui/input';


const AddTodo = () => {
    const [currentItem, setCurrentItem] = useState<string>("");
    const queryClient = useQueryClient();
    const supabaseClient = useSupabaseClient()
    const user = useUser()

    //Add Todo
    const { mutate: addTodoMutation } = useMutation(
        async (payload: { item: string; user: User }) => {

            const { data, error } = await supabaseClient
                .from("todos")
                .insert([
                    {
                        name: payload.item,
                        user_id: payload.user.id,
                    },
                ]);

            if (error) {
                toast.error('There was problem adding new item');
                throw new Error(error.message);
            }
            return data;
        },
        {
            onSuccess: () => {
                toast.success("Item Added successfully");
                setCurrentItem("");
                return queryClient.invalidateQueries("todos");
            },
        }
    );

    const _handleAddItem = async () => {
        if (user !== null && currentItem.length > 0) {
            addTodoMutation({ item: currentItem, user });
        }
    };

    return (
        <Input
            value={currentItem}
            placeholder="Enter item here"
            onChange={setCurrentItem}
            onKeyDown={_handleAddItem}
        />
    );
};

export default AddTodo;
