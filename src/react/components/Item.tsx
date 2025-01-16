export default function Item({
  title,
  bgColor,
  onSetActiveGroup,
}: {
  title: string;
  bgColor: string;
  onSetActiveGroup: (groupName: string) => void;
}) {
  return (
    <button className="flex flex-col justify-center items-center w-fit" onClick={() => onSetActiveGroup(title)}>
      <div className="h-14 w-14 rounded-xl" style={{ backgroundColor: bgColor }} />
      <p className="truncate w-14 text-center">{title}</p>
    </button>
  );
}
