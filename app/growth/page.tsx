import { createClient } from "@/utils/supabase/server";
import { formatDate, getName } from "@/utils/supabase/functions";
import { redirect } from "next/navigation";
import GoalCard from "@/components/GoalCard";
import { Enums } from "@/types/database";
import RoleBadge from "@/components/RoleBadge";
import Link from "next/link";
import Trait from "@/components/Trait";

export default async function Page() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login?from=/growth");
  }

  const { data: growthFramework, error: growthFrameworksError } = await supabase
    .from("growth_frameworks")
    .select()
    .eq("user", user.id)
    .single();

  if (growthFrameworksError) {
    return <>ya got got;</>;
  }

  const {
    strengths,
    focus_areas,
    role_name,
    role_start,
    role_target,
    role_target_date,
    updated_at,
    one_liner,
  } = growthFramework;

  const meta: Record<string, string> = {
    "Current Role": `${role_name}, ${formatDate(role_start)}`,
    "Last Update": formatDate(updated_at),
  };

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select()
    .eq("id", user.id)
    .single();

  if (profileError) {
    return <>ya got got;</>;
  }

  const { preferred_name, full_name, role } = profile;

  const { data: traits, error: traitsError } = await supabase
    .from("traits")
    .select()
    .eq("growth_framework", growthFramework.id);

  const activeTraits = traits ? traits.filter((t) => !t.archived) : [];
  const strengthTraits = activeTraits.filter((t) => t.trait === "strength");
  const focusAreaTraits = activeTraits.filter((t) => t.trait === "focus_area");

  const { data: goalsData, error: goalsError } = await supabase
    .from("goals")
    .select()
    .eq("growth_framework", growthFramework.id);

  const incomplete = goalsData ? goalsData.filter((g) => !g.complete) : [];
  const shortGoals = incomplete.filter((g) => g.duration === "short");
  const mediumGoals = incomplete.filter((g) => g.duration === "medium");
  const longGoals = incomplete.filter((g) => g.duration === "long");

  const { data: selfEvalsData, error: selfEvalsError } = await supabase
    .from("self_evals")
    .select()
    .eq("growth_framework", growthFramework.id);

  const selfEvals = selfEvalsData || [];

  return (
    <main className="flex flex-col gap-4 ">
      <h1 className="text-2xl font-bold">💼 Growth Framework</h1>
      <div className="flex flex-row w-full gap-2 mt-2">
        <div className="flex-col w-1/3 px-3 pt-2 pb-1 rounded-lg bg-white/5 shadow-[inset_0_2px_4px_-2px_rgba(0,0,0,0.6)]">
          <h2 className="inline-flex items-center gap-2 text-xl font-bold">
            {getName(preferred_name, full_name)} <RoleBadge role={role} />
          </h2>
          <div className="flex flex-col mt-2">
            {Object.keys(meta).map((key) => (
              <>
                <p className="text-xs font-bold text-white/60">{key}</p>
                <p className="mb-2 text-sm">{meta[key]}</p>
              </>
            ))}
          </div>
        </div>
        <div className="flex-col w-2/3 p-2">
          <h2 className="text-xl font-bold">💡 One-liner</h2>
          <p className="m-3 font-serif text-3xl italic text-white/80">
            {one_liner}
          </p>
        </div>
      </div>

      <div className="">
        <h2 className="text-xl font-bold">🤔 Traits</h2>
        <div className="flex flex-row w-full gap-4 mt-2">
          <div className="flex-col flex-1">
            <h3 className="inline-block px-2 py-1 text-xs font-semibold uppercase bg-green-600 rounded-sm">
              Strengths
            </h3>
            <div className="flex flex-col gap-2">
              {strengthTraits.map((trait) => (
                <Trait
                  id={trait.id}
                  key={trait.id}
                  title={trait.title}
                  description={trait.description}
                />
              ))}
            </div>
          </div>
          <div className="flex-col flex-1">
            <h3 className="inline-block px-2 py-1 text-xs font-semibold uppercase bg-blue-600 rounded-sm">
              Focus Areas
            </h3>
            <div className="flex flex-col gap-2">
              {focusAreaTraits.map((trait) => (
                <Trait
                  id={trait.id}
                  key={trait.id}
                  title={trait.title}
                  description={trait.description}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="">
        <h2 className="flex items-center justify-between text-xl font-bold">
          <span>🥅 Active Goals</span>
          <Link
            href="/goals/completed"
            className="px-2 py-1 text-sm rounded bg-red-950"
          >
            View Completed
          </Link>
        </h2>
        <table className="w-full mt-4 text-sm text-left text-white/75">
          <thead>
            <tr className="border-b-2 border-white/10">
              <th className="w-1/3 px-3 py-2 text-white bg-white/5">
                Short Term (3 months)
              </th>
              <th className="w-1/3 px-3 py-2 text-white bg-white/5">
                Medium Term (3-6 months)
              </th>
              <th className="w-1/3 px-3 py-2 text-white bg-white/5">
                Long Term (12+ months)
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-1 pt-2 align-top">
                {shortGoals.map((goal) => (
                  <GoalCard
                    key={goal.id}
                    id={goal.id}
                    title={goal.title}
                    description={goal?.description}
                  />
                ))}
              </td>
              <td className="p-1 pt-2 align-top">
                {mediumGoals.map((goal) => (
                  <GoalCard
                    key={goal.id}
                    id={goal.id}
                    title={goal.title}
                    description={goal?.description}
                  />
                ))}
              </td>
              <td className="p-1 pt-2 align-top">
                {longGoals.map((goal) => (
                  <GoalCard
                    key={goal.id}
                    id={goal.id}
                    title={goal.title}
                    description={goal?.description}
                  />
                ))}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="">
        <h2 className="text-xl font-bold">✅ Self Evaluations</h2>
        {selfEvals.map((ev) => (
          <p className="">{ev.notes}</p>
        ))}
      </div>
    </main>
  );
}
