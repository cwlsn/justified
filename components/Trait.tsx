type TraitProps = {
  id: number;
  title: string;
  description: string | null;
};

export default function Trait({ id, title, description }: TraitProps) {
  return (
    <div className="mt-2">
      <p className="text-lg font-semibold">{title}</p>
      {description && <p className="text-sm text-white/80">{description}</p>}
    </div>
  );
}
