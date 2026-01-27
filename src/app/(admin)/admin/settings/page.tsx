import { auth } from "@/lib/auth";
import { Settings, Key, Shield, Database } from "lucide-react";

export default async function SettingsPage() {
  const session = await auth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-600 mt-1">
          System configuration and admin settings
        </p>
      </div>

      {/* Current User */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-slate-100 rounded-lg">
            <Shield className="w-6 h-6 text-slate-600" />
          </div>
          <h2 className="text-lg font-semibold text-slate-900">
            Current Session
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 rounded-lg">
            <p className="text-sm text-slate-500">Logged in as</p>
            <p className="font-medium text-slate-900">{session?.user?.name}</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg">
            <p className="text-sm text-slate-500">Email</p>
            <p className="font-medium text-slate-900">{session?.user?.email}</p>
          </div>
        </div>
      </div>

      {/* Environment Variables */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-slate-100 rounded-lg">
            <Key className="w-6 h-6 text-slate-600" />
          </div>
          <h2 className="text-lg font-semibold text-slate-900">
            Environment Configuration
          </h2>
        </div>
        <div className="space-y-3">
          <EnvVariable
            name="NEXT_PUBLIC_GA_ID"
            value={process.env.NEXT_PUBLIC_GA_ID}
            description="Google Analytics 4 Measurement ID"
          />
          <EnvVariable
            name="GOOGLE_SITE_VERIFICATION"
            value={process.env.GOOGLE_SITE_VERIFICATION}
            description="Google Search Console verification code"
            masked
          />
          <EnvVariable
            name="NEXTAUTH_URL"
            value={process.env.NEXTAUTH_URL}
            description="Authentication callback URL"
          />
          <EnvVariable
            name="DATABASE_URL_ACCELERATE"
            value={process.env.DATABASE_URL_ACCELERATE}
            description="Prisma Postgres connection"
            masked
          />
        </div>
      </div>

      {/* Database Info */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-slate-100 rounded-lg">
            <Database className="w-6 h-6 text-slate-600" />
          </div>
          <h2 className="text-lg font-semibold text-slate-900">
            Database
          </h2>
        </div>
        <div className="p-4 bg-slate-50 rounded-lg">
          <p className="text-sm text-slate-500">Provider</p>
          <p className="font-medium text-slate-900">Prisma Postgres (Accelerate)</p>
        </div>
      </div>

      {/* Admin Tasks */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-slate-100 rounded-lg">
            <Settings className="w-6 h-6 text-slate-600" />
          </div>
          <h2 className="text-lg font-semibold text-slate-900">Admin Tasks</h2>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-slate-600">
            Use these commands to manage the system:
          </p>
          <div className="space-y-2">
            <CommandCard
              command="npm run db:seed:admin"
              description="Seed admin user and partner data"
            />
            <CommandCard
              command="npm run db:push"
              description="Push schema changes to database"
            />
            <CommandCard
              command="npm run db:studio"
              description="Open Prisma Studio for database management"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function EnvVariable({
  name,
  value,
  description,
  masked = false,
}: {
  name: string;
  value?: string;
  description: string;
  masked?: boolean;
}) {
  return (
    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
      <div>
        <code className="text-sm font-mono text-slate-700">{name}</code>
        <p className="text-sm text-slate-500">{description}</p>
      </div>
      <div>
        {value ? (
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-mono">
            {masked ? "••••••••" : value}
          </span>
        ) : (
          <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm">
            Not set
          </span>
        )}
      </div>
    </div>
  );
}

function CommandCard({
  command,
  description,
}: {
  command: string;
  description: string;
}) {
  return (
    <div className="p-3 bg-slate-800 rounded-lg">
      <code className="text-sm font-mono text-green-400">{command}</code>
      <p className="text-xs text-slate-400 mt-1">{description}</p>
    </div>
  );
}
