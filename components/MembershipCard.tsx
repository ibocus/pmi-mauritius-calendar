interface MembershipCardProps {
  name: string;
  memberId: string;
  memberSince: string;
  validThru: string;
}

export function MembershipCard({ name, memberId, memberSince, validThru }: MembershipCardProps) {
  return (
    <div className="relative aspect-[16/10] w-full max-w-sm overflow-hidden rounded-2xl bg-gradient-to-br from-blue-700 via-blue-600 to-slate-900 p-6 text-white shadow-xl">
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
      <div className="absolute -bottom-16 -left-10 h-48 w-48 rounded-full bg-white/5" />

      <div className="relative flex h-full flex-col justify-between">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-200">
              PMI Mauritius Chapter
            </p>
            <p className="text-sm text-blue-100">Digital Membership Card</p>
          </div>
          <div className="rounded-md bg-white/15 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide">
            Active
          </div>
        </div>

        <div>
          <p className="text-lg font-semibold leading-tight">{name}</p>
          <p className="mt-0.5 text-sm text-blue-100">Member ID {memberId}</p>
        </div>

        <div className="flex items-end justify-between text-xs text-blue-100">
          <div>
            <p className="uppercase tracking-wide text-blue-200">Member since</p>
            <p className="font-medium text-white">{memberSince}</p>
          </div>
          <div className="text-right">
            <p className="uppercase tracking-wide text-blue-200">Valid thru</p>
            <p className="font-medium text-white">{validThru}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
