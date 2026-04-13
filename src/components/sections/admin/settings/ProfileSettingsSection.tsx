import Image from "next/image";
import { Camera, Lock } from "lucide-react";
import { Button, LinkButton } from "@/components/ui/buttons";
import { ADMIN_PROFILE } from "@/mock/AdminDashboard";

const ProfileSettingsSection = () => {
  return (
    <section className="mt-10 w-full max-w-[1240px] lg:grid lg:grid-cols-[152px_minmax(0,1fr)] lg:items-start lg:gap-8">
      <div className="flex justify-center lg:pt-2">
        <div className="relative h-[122px] w-[122px] overflow-visible rounded-full border-2 border-primary bg-white shadow-[0_2px_10px_rgba(49,103,234,0.14)] sm:h-[132px] sm:w-[132px] lg:h-[136px] lg:w-[136px]">
          <Image
            src={ADMIN_PROFILE.avatar}
            alt={ADMIN_PROFILE.name}
            fill
            sizes="136px"
            unoptimized
            className="rounded-full object-cover"
          />
          <button
            type="button"
            aria-label="Change profile photo"
            className="absolute -bottom-1 -right-1 inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white shadow-[0_10px_20px_rgba(49,103,234,0.26)] ring-2 ring-white transition-colors hover:bg-primary/90"
          >
            <Camera size={16} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="space-y-5 pt-6 lg:pt-0">
        <div className="rounded-lg border border-[#dfe6f3] bg-white p-5 sm:p-6">
          <div className="grid gap-5 md:grid-cols-1">
            <div className="flex flex-col gap-2">
              <label htmlFor="admin-profile-name" className="font-primary text-[18px] font-semibold text-content">
                Name
              </label>
              <input
                id="admin-profile-name"
                name="name"
                value={ADMIN_PROFILE.name}
                readOnly
                className="w-full rounded-lg border border-gray-200 px-4 py-3 font-primary text-sm text-content focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="admin-profile-email" className="font-primary text-[18px] font-semibold text-content">
                Email
              </label>
              <input
                id="admin-profile-email"
                name="email"
                value="example@gmail.com"
                readOnly
                className="w-full rounded-lg border border-gray-200 px-4 py-3 font-primary text-sm text-content focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10"
              />
            </div>
          </div>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-2 self-start font-primary text-sm font-medium text-primary transition-colors hover:text-primary/80"
        >
          <Lock size={15} aria-hidden="true" />
          Change Password
        </button>

        <div className="flex flex-wrap gap-3 pt-1">
          <Button type="button" variant="primary" size="md" className="min-w-[56px] px-5">
            Save
          </Button>
          <LinkButton href="/admin" variant="secondary" size="md" className="min-w-[72px] px-5">
            Cancle
          </LinkButton>
        </div>
      </div>
    </section>
  );
};

export default ProfileSettingsSection;