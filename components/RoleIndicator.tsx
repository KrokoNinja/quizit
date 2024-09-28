interface RoleIndicatorProps {
  isAdmin: boolean | undefined;
  isTutor: boolean;
}

const RoleIndicator = ({ isAdmin, isTutor }: RoleIndicatorProps) => {
  return (
    <div className="flex gap-4">
      {isAdmin && (
        <span className="rounded-full bg-red-200 px-3 py-1 text-red-800">
          Admin
        </span>
      )}
      {isTutor && (
        <span className="rounded-full bg-green-200 px-3 py-1 text-green-800">
          Tutor
        </span>
      )}
    </div>
  );
};

export default RoleIndicator;
