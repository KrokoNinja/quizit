import RoleIndicator from './RoleIndicator';

interface TeamMemberProps {
  user: any;
}

const TeamMember = ({ user }: TeamMemberProps) => {
  return (
    <li
      key={user.username}
      className="flex flex-col justify-center md:flex-row md:items-center gap-2 md:gap-6 rounded bg-slate-400 py-4 px-4 md:py-2">
      {user.username}{' '}
      <RoleIndicator isAdmin={user.isAdmin} isTutor={user.isTutor} />
    </li>
  );
};

export default TeamMember;
