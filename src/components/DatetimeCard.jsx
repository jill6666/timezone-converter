const Card = ({
  backgroundColor = "",
  label,
  datetime,
  onChange,
  canBeEdited,
  onRemove = () => {},
}) => {
  const cardStyle = `w-full text-[#282c34] rounded-md bg-white flex justify-between p-4 text-[#282c34] items-center space-x-4 relative`;
  return (
    <div className={cardStyle} style={{ backgroundColor }}>
      <span className="text-xl text-[#555] text-semibold">{label}</span>
      <input
        type="datetime-local"
        value={datetime}
        onChange={onChange}
        step="1"
        className="p-2 rounded-md bg-transparent"
      />
      {canBeEdited && (
        <div
          className="cursor-pointer editCard w-4 h-full absolute top-0 right-0 items-center flex items-center justify-center"
          style={{ borderRadius: "0 0.375rem 0.375rem 0" }}
          onClick={onRemove}
        >
          <span className="text-center text-white opacity-0">Remove</span>
        </div>
      )}
    </div>
  );
};
export default Card;
