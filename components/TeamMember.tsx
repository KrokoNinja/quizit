import RoleIndicator from './RoleIndicator';

interface TeamMemberProps {
  user: any;
}

const TeamMember = ({ user }: TeamMemberProps) => {
  return (
    <li
      key={user.username}
      className="flex items-center gap-6 rounded bg-slate-400 px-4 py-2">
      {user.username}{' '}
      <RoleIndicator isAdmin={user.isAdmin} isTutor={user.isTutor} />
    </li>
  );
};

export default TeamMember;
