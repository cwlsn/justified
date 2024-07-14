import { getName } from "@/utils/supabase/functions";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AuthButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };

  if (!user) {
    return (
      <Link
        href="/login"
        className="flex px-3 py-2 no-underline rounded-md bg-btn-background hover:bg-btn-background-hover"
      >
        Login
      </Link>
    );
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select()
    .eq("id", user.id)
    .single();

  const displayName = profileError
    ? user.email
    : getName(profile.preferred_name, profile.full_name);

  return (
    <div className="flex flex-row items-center gap-2 text-sm">
      <span className="">{displayName}</span>
      <form action={signOut} className="p-0 m-0">
        <button className="px-2 py-1 m-0 text-xs no-underline rounded-md bg-white/15 hover:bg-btn-background-hover">
          Logout
        </button>
      </form>
    </div>
  );
}
