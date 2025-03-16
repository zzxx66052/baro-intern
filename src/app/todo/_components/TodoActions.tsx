import { DeleteIcon } from "@/components/icons/DeleteIcon";
import { UpdateIcon } from "@/components/icons/UpdateIcon";

const TodoActions = ({
  onEdit,
  onDelete,
}: {
  onEdit: () => void;
  onDelete: () => void;
}) => {
  return (
    <div className="flex justify-end gap-2">
      <button onClick={onEdit} className="text-blue-500">
        <UpdateIcon />
      </button>
      <button onClick={onDelete} className="text-red-500">
        <DeleteIcon />
      </button>
    </div>
  );
};

export default TodoActions;
