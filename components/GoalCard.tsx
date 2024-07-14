import Link from "next/link";

type GoalCardProps = {
  id: number;
  title: string;
  description: string | null;
};

export default function GoalCard({ id, title }: GoalCardProps) {
  return (
    <aside className="p-2 mb-2 border-2 rounded border-white/50">
      <Link href={`/goal/${id}`} className="font-bold">
        {title}
      </Link>
      <p className=""></p>
    </aside>
  );
}
