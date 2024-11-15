import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PawPrint, User, Calendar, BarChart3 } from 'lucide-react';

export function Header() {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: PawPrint, label: 'Home' },
    { path: '/profile', icon: User, label: 'Perfil' },
    { path: '/activities', icon: Calendar, label: 'Atividades' },
    { path: '/dashboard', icon: BarChart3, label: 'Dashboard' },
  ];

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <PawPrint className="w-8 h-8 text-brand-500" />
            <h1 className="text-2xl font-bold text-brand-500">Pawtracker</h1>
          </Link>
          <nav className="flex gap-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-1 px-3 py-2 rounded-md transition-colors ${
                  location.pathname === item.path
                    ? 'bg-brand-100 text-brand-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}