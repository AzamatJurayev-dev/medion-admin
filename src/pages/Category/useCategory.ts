import { useMutation, useQuery } from "@tanstack/react-query";
import { getCategories } from "../../api/get";
import { postCatigories } from "../../api/post";
import { updateCategory } from "../../api/put";
import { deleteCategory } from "../../api/delete";


export const useCategory = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const createMutation = useMutation({
    mutationFn: postCatigories,
    onSuccess: () => refetch(),
  });

  const updateMutation = useMutation({
    mutationFn: updateCategory,
    onSuccess: () => refetch(),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => refetch(),
  });

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  return {
    data,
    isLoading,
    createMutation,
    updateMutation,
    deleteMutation,
    handleDelete,
  };
};
