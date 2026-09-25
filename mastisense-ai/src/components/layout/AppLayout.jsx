import { Link, Outlet, useLocation } from 'react-router-dom';
import Brand from './Brand';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import {
  Bell,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Wheat,
  BrainCircuit,
  History,
  BarChart3,
  UserRound,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';

const items = [
  ['/dashboard', 'Dashboard', LayoutDashboard],
  ['/cattle', 'My Cattle', Wheat],
  ['/prediction/new', 'New Prediction', BrainCircuit],
  ['/predictions', 'Prediction History', History],
  ['/analytics', 'Farm Analytics', BarChart3],
  ['/notifications', 'Notifications', Bell],
  ['/profile', 'My Profile', UserRound],
  ['/settings', 'Settings', Settings],
  ['/faq', 'Help & FAQ', HelpCircle],
];

export default function AppLayout({ admin = false }) {
  const [open, setOpen] = useState(false);
  const loc = useLocation();

  const { user, logout } = useAuth();
  const { notifications } = useApp();

  const unread = notifications.filter(
    (n) => !n.read && n.userId === user?.id
  ).length;

  const nav = admin
    ? items.filter(
        ([, label]) =>
          ![
            'My Cattle',
            'New Prediction',
            'Prediction History',
            'Farm Analytics',
            'Notifications',
            'My Profile',
            'Help & FAQ',
          ].includes(label)
      )
    : items;

  const adminItems = [
    ['/admin/dashboard', 'Dashboard', LayoutDashboard],
    ['/admin/users', 'Users', UserRound],
    ['/admin/cattle', 'Cattle', Wheat],
    ['/admin/predictions', 'Predictions', History],
    ['/admin/faqs', 'FAQs', HelpCircle],
    ['/admin/analytics', 'Analytics', BarChart3],
    ['/admin/activity', 'Activity Logs', History],
    ['/admin/settings', 'Settings', Settings],
  ];

  const links = admin ? adminItems : nav;

  return (
    <div className="min-h-screen bg-[#F7F3E8]">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#243B35] p-5 text-white transition-transform lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between">
          <Brand dark />

          <button
            type="button"
            className="rounded-lg p-2 hover:bg-white/10 lg:hidden"
            onClick={() => setOpen(false)}
            aria-label="Close navigation"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mt-8 rounded-2xl bg-white/5 p-3">
          <div className="text-xs uppercase tracking-widest text-[#B7C9B1]">
            {admin ? 'Administration Console' : 'Farm workspace'}
          </div>

          <div className="mt-1 text-sm font-semibold">
            {admin
              ? 'System operations'
              : 'Cattle health intelligence'}
          </div>
        </div>

        <nav className="mt-7 grid gap-1">
          {links.map(([to, label, Icon]) => (
            <Link
              onClick={() => setOpen(false)}
              key={to}
              to={to}
              className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                loc.pathname === to
                  ? 'bg-[#B7C9B1] text-[#243B35]'
                  : 'text-[#D7E1D5] hover:bg-white/10'
              }`}
            >
              <Icon size={18} />

              <span>{label}</span>

              {label === 'Notifications' && unread > 0 ? (
                <span className="ml-auto rounded-full bg-red-500 px-2 py-0.5 text-[10px] text-white">
                  {unread}
                </span>
              ) : null}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={logout}
          className="absolute bottom-5 left-5 right-5 flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-[#D7E1D5] hover:bg-white/10"
        >
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      {/* Main area */}
      <div className="lg:pl-72">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-[#DDE4D8] bg-[#F7F3E8]/95 px-5 backdrop-blur lg:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="rounded-xl border border-[#D5DED1] bg-white p-2 lg:hidden"
              onClick={() => setOpen(true)}
              aria-label="Open navigation"
            >
              <Menu size={20} />
            </button>

            <div>
              <div className="text-xs text-slate-500">
                {admin ? 'Administration' : 'Farm workspace'}
              </div>

              <div className="font-semibold text-[#243B35]">
                {admin
                  ? 'Administration Console'
                  : `Good ${
                      new Date().getHours() < 12
                        ? 'Morning'
                        : new Date().getHours() < 18
                        ? 'Afternoon'
                        : 'Evening'
                    }, ${user?.name?.split(' ')[0] || 'Farmer'}`}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Notifications */}
            <Link
              className="relative rounded-xl border border-[#D5DED1] bg-white p-2.5"
              to={admin ? '/admin/activity' : '/notifications'}
              aria-label="Notifications"
            >
              <Bell size={18} />

              {!admin && unread > 0 ? (
                <span className="absolute -right-1 -top-1 h-4 min-w-4 rounded-full bg-red-500 px-1 text-center text-[9px] leading-4 text-white">
                  {unread}
                </span>
              ) : null}
            </Link>

            {/* User profile */}
            <div className="hidden items-center gap-3 rounded-xl border border-[#D5DED1] bg-white px-3 py-2 sm:flex">
              <div className="grid h-8 w-8 place-items-center rounded-lg bg-[#E4EDE0] text-xs font-bold text-[#243B35]">
                {user?.name?.slice(0, 1)?.toUpperCase() || 'U'}
              </div>

              <div>
                <div className="text-xs font-semibold text-[#243B35]">
                  {user?.name || 'User'}
                </div>

                <div className="text-[10px] text-slate-500">
                  {admin
                    ? 'Administrator'
                    : user?.farmName || 'Farm workspace'}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="mx-auto max-w-[1500px] p-5 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}