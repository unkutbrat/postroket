import Link from 'next/link';
import { BarChart2, FileText, LayoutDashboard, Megaphone, Settings, Users, Wrench, Briefcase } from 'lucide-react';

const links = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/tools', label: 'Tools', icon: Wrench },
  { href: '/admin/jobs', label: 'Jobs', icon: Briefcase },
  { href: '/admin/docs', label: 'Documents', icon: FileText },
  { href: '/admin/ads', label: 'Ads', icon: Megaphone },
  { href: '/admin/seo', label: 'SEO & Content', icon: BarChart2 },
  { href: '/admin/users', label: 'Users', icon: Users },
  { href: '/admin/settings', label: 'Settings', icon: Settings }
];

export function AdminSidebar() {
  return (
    <aside className="w-full md:w-64 border-r border-slate-200 bg-white">
      <div className="p-4 border-b border-slate-200 font-semibold text-slate-800">Postroket Admin</div>
      <nav className="flex flex-col">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 text-sm text-slate-700">
            <link.icon className="w-4 h-4 text-slate-500" />
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
