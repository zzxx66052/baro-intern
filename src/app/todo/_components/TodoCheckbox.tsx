const TodoCheckbox = ({
  isCompleted,
  onToggle,
}: {
  isCompleted: boolean;
  onToggle: () => void;
}) => {
  return (
    <input
      type="checkbox"
      checked={isCompleted}
      onChange={onToggle}
      className="mr-2 w-5 h-5 cursor-pointer accent-green-500"
    />
  );
};

export default TodoCheckbox;
