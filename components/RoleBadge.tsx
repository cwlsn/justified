type RoleBadgeProps = {
  role: number;
};

export default function RoleBadge({ role }: RoleBadgeProps) {
  const roleMap = {
    1: {
      title: "Individual Contributor",
      shortTitle: "IC",
      bg: "bg-green-500",
    },
    2: {
      title: "Manager",
      shortTitle: "EM",
      bg: "bg-violet-500",
    },
  };

  return (
    <span className="inline-block p-0 px-1 text-xs font-bold text-white rounded-sm bg-violet-600">
      RL
    </span>
  );
}
