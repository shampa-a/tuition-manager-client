interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: string;
  iconBg: string;
}

export default function StatCard({
  title,
  value,
  description,
  icon,
  iconBg,
}: StatCardProps) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>

          <h3 className="mt-2 text-3xl font-bold text-gray-800">
            {value}
          </h3>
        </div>

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl ${iconBg}`}
        >
          {icon}
        </div>
      </div>

      <p className="mt-4 text-xs text-gray-500">
        {description}
      </p>
    </div>
  );
}