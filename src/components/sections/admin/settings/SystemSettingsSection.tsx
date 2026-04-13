import { Camera } from "lucide-react";
import { Button, LinkButton } from "@/components/ui/buttons";
import Input from "@/components/ui/forms/Input";
import { Heading } from "@/components/ui/typography";

const SystemSettingsSection = () => {
  return (
    <section className="mt-10 w-full max-w-[1240px] space-y-5">
      <div className="rounded-lg border border-[#dfe6f3] bg-white p-6 sm:p-7">
        <div className="grid gap-5 md:grid-cols-2">
          <Input id="admin-settings-platform-name" name="platformName" label="Platform Name" value="TeamUp" readOnly />

          <Input id="admin-settings-language" name="defaultLanguage" label="Default Language" value="English(US)" readOnly />

          <Input id="admin-settings-timezone" name="timezone" label="Timezone" value="UTC (GMT+0)" readOnly />

          <Input id="admin-settings-date-format" name="dateFormat" label="Date Format" value="YYYY-MM-DD" readOnly />
        </div>

        <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Heading level="h6" className="text-[18px] font-semibold text-content">
              Platform Logo
            </Heading>
            <p className="mt-2 max-w-xl font-primary text-sm leading-6 text-[#5f728f]">
              Upload a square logo for the main platform and navigation surfaces.
            </p>

            <div className="mt-4">
              <div className="relative h-16 w-16 overflow-visible rounded-full bg-[#3167ea] text-white shadow-[0_2px_10px_rgba(49,103,234,0.2)] sm:h-[72px] sm:w-[72px]">
                <span className="absolute inset-0 flex items-center justify-center font-primary text-[12px] font-semibold">
                  Teamup
                </span>
                <button
                  type="button"
                  aria-label="Change platform logo"
                  className="absolute bottom-0 right-0 inline-flex h-6 w-6 translate-x-1/3 translate-y-1/3 items-center justify-center rounded-full bg-[#3167ea] text-white shadow-[0_8px_16px_rgba(49,103,234,0.22)] ring-1 ring-white transition-colors hover:bg-[#2858d4]"
                >
                  <Camera size={12} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="self-start pt-1 font-primary text-xs font-medium text-primary transition-colors hover:text-primary/80"
          >
            Upload New Logo
          </button>
        </div>
      </div>

      <div className="rounded-lg border border-[#dfe6f3] bg-white p-6 sm:p-7">
        <div className="space-y-3">
          <Input id="admin-settings-status" name="platformStatus" label="Platform Status" value="Live" readOnly />
          <p className="font-primary text-xs text-[#5f728f]">Platform is accessible to all users</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 pt-1">
        <Button type="button" variant="primary" size="md" className="min-w-[100px]">
          Save
        </Button>
        <LinkButton href="/admin" variant="secondary" size="md" className="min-w-[100px]">
          Cancle
        </LinkButton>
      </div>
    </section>
  );
};

export default SystemSettingsSection;