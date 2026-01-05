'use client'
import { usePathname } from "next/navigation";

const Sidebar = () => {
    const pathname = usePathname();
    console.log(pathname)
  return (
    <aside className="hidden max-h-screen md:flex flex-col w-72 bg-card-light border-r border-slate-200 flex-shrink-0 z-40">
        
      <div className="h-20 flex items-center gap-3 px-6 border-b border-slate-100">
        <div className="size-8 text-primary bg-primary/10 rounded-lg flex items-center justify-center">
          <span className="material-symbols-outlined text-2xl">smart_toy</span>
        </div>
        <h2 className="text-slate-900 text-lg font-bold tracking-tight">
          AI Interviewer
        </h2>
      </div>
      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1.5">
        <p className="px-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
          Main Menu
        </p>
        {[
          {
            label: "Dashboard",
            icon: "dashboard",
            href: "/dashboard",
            active: pathname == "/dashboard",
          },
          {
            label: "Take an AI Interview",
            icon: "videocam",
            href: "/Interview",
            active: pathname == "/Interview"
          },
          {
            label: "Interview History",
            icon: "history",
            href: "#",
          },
          {
            label: "Profile & Resume",
            icon: "badge",
            href: "#",
          },
        ].map((item) => (
          <a
            key={item.label}
            className={
              "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm" +
              (item.active
                ? " bg-primary/10 text-primary font-semibold"
                : " text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium group")
            }
            href={item.href}
          >
            <span
              className={
                "material-symbols-outlined" +
                (item.active
                  ? ""
                  : " text-slate-400 group-hover:text-primary transition-colors")
              }
            >
              {item.icon}
            </span>
            {item.label}
          </a>
        ))}

        <div className="pt-6 mt-2">
          <p className="px-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
            Community &amp; Growth
          </p>
          {[
            {
              label: "Practice",
              icon: "school",
              href: "#",
            },
            {
              label: "Community",
              icon: "forum",
              href: "#",
            },
          ].map((item) => (
            <a
              key={item.label}
              className="flex items-center text-sm gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium transition-colors group"
              href={item.href}
            >
              <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">
                {item.icon}
              </span>
              {item.label}
            </a>
          ))}
        </div>
      </nav>
      {/* <div className="p-4 border-t border-slate-200">
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-4 border border-slate-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="size-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-lg">bolt</span>
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">Pro Plan</p>
              <p className="text-[10px] text-slate-500 font-medium">
                Refreshes in 12 days
              </p>
            </div>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-1.5 mb-2 overflow-hidden">
            <div
              className="bg-primary h-1.5 rounded-full"
              style={{ width: "60%" }}
            />
          </div>
          <p className="text-xs text-slate-500 text-center">
            2 credits remaining
          </p>
        </div>
      </div> */}
    </aside>
  );
};

export default Sidebar;
