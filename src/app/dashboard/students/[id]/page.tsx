import { redirect } from "next/navigation";

export default function Page({ params }: { params: { id: string } }) {
  // redirect to unified user profile route
  redirect(`/dashboard/users/${params.id}`);
}
