import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Plus,
  BrainCircuit,
  AlertTriangle,
  Wheat,
  HeartPulse,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { Badge, Button, Card } from '../../components/common/UI';
import { Donut, RiskLine } from '../../components/dashboard/Charts';
import { formatDate } from '../../utils/helpers';

export default function Dashboard() {
  const { user } = useAuth();
  const { cattle, predictions } = useApp();

  const mine = cattle.filter((c) => c.ownerId === user.id);
  const pred = predictions.filter((p) => p.ownerId === user.id);

  const counts = {
    healthy: mine.filter((c) => c.riskLevel === 'LOW').length,
    moderate: mine.filter((c) => c.riskLevel === 'MODERATE').length,
    high: mine.filter((c) =>
      ['HIGH', 'VERY HIGH'].includes(c.riskLevel)
    ).length,
    very: mine.filter((c) => c.riskLevel === 'VERY HIGH').length,
  };

  const donut = [
    {
      name: 'Healthy',
      value: counts.healthy,
    },
    {
      name: 'Moderate Risk',
      value: counts.moderate,
    },
    {
      name: 'High Risk',
      value: counts.high,
    },
  ];

  const trend = [...pred]
    .slice(0, 10)
    .reverse()
    .map((p, i) => ({
      date: `P${i + 1}`,
      risk: p.riskScore,
    }));

  const alerts = mine
    .filter(
      (c) =>
        c.riskLevel === 'HIGH' ||
        c.riskLevel === 'VERY HIGH'
    )
    .slice(0, 2);

  return (
    <div className="space-y-7">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="text-xs font-bold uppercase tracking-[.18em] text-[#6B8E7B]">
            {user.farmName}
          </div>

          <h1 className="serif mt-2 text-4xl font-bold">
            Your herd at a glance.
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            {user.location}, {user.district}, {user.state}
          </p>
        </div>

        <div className="flex gap-2">
          <Link to="/cattle/new">
            <Button variant="ghost">
              <Plus size={17} />
              Add Cattle
            </Button>
          </Link>

          <Link to="/prediction/new">
            <Button>
              <BrainCircuit size={17} />
              Run Prediction
            </Button>
          </Link>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          [
            Wheat,
            'Total Cattle',
            mine.length,
            'text-[#243B35]',
          ],
          [
            HeartPulse,
            'Healthy',
            counts.healthy,
            'text-emerald-700',
          ],
          [
            AlertTriangle,
            'At Risk',
            counts.moderate,
            'text-amber-700',
          ],
          [
            AlertTriangle,
            'High Risk',
            counts.high,
            'text-orange-700',
          ],
        ].map(([Icon, title, value, iconColor]) => (
          <Card className="p-5" key={title}>
            <div className="flex items-center justify-between">
              <div className="text-sm text-slate-500">
                {title}
              </div>

              <Icon
                size={19}
                className={iconColor}
              />
            </div>

            <div className="mt-3 text-3xl font-bold">
              {value}
            </div>

            <div className="mt-2 text-xs text-slate-400">
              Live from local records
            </div>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-5 xl:grid-cols-[.8fr_1.2fr]">
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold">
                Herd Health Overview
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Current cattle risk distribution
              </p>
            </div>
          </div>

          <Donut data={donut} />

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div>
              <div className="font-bold">
                {counts.healthy}
              </div>

              <div className="text-slate-500">
                Healthy
              </div>
            </div>

            <div>
              <div className="font-bold">
                {counts.moderate}
              </div>

              <div className="text-slate-500">
                Moderate
              </div>
            </div>

            <div>
              <div className="font-bold">
                {counts.high}
              </div>

              <div className="text-slate-500">
                High
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold">
                Risk Trend
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Recent prototype prediction scores
              </p>
            </div>

            <Link
              className="text-xs font-semibold text-[#6B8E7B]"
              to="/analytics"
            >
              View analytics
            </Link>
          </div>

          <RiskLine data={trend} />
        </Card>
      </div>

      {/* Recent Predictions + Alerts */}
      <div className="grid gap-5 xl:grid-cols-[1.25fr_.75fr]">
        <Card className="overflow-hidden">
          <div className="flex items-center justify-between p-5">
            <div>
              <h2 className="font-semibold">
                Recent Predictions
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Latest completed analyses
              </p>
            </div>

            <Link
              className="text-xs font-semibold text-[#6B8E7B]"
              to="/predictions"
            >
              View history
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#F5F7F1] text-xs text-slate-500">
                <tr>
                  <th className="px-5 py-3">
                    Cow
                  </th>

                  <th className="px-5 py-3">
                    Date
                  </th>

                  <th className="px-5 py-3">
                    Risk
                  </th>

                  <th className="px-5 py-3">
                    Status
                  </th>

                  <th />
                </tr>
              </thead>

              <tbody>
                {pred.slice(0, 5).map((prediction) => (
                  <tr
                    className="border-t border-[#EDF0E9]"
                    key={prediction.id}
                  >
                    <td className="px-5 py-4 font-semibold">
                      {prediction.cowId}
                    </td>

                    <td className="px-5 py-4 text-slate-500">
                      {formatDate(prediction.date)}
                    </td>

                    <td className="px-5 py-4 font-semibold">
                      {prediction.riskScore}%
                    </td>

                    <td className="px-5 py-4">
                      <Badge
                        level={prediction.riskLevel}
                      />
                    </td>

                    <td className="px-5 py-4 text-right">
                      <Link
                        className="text-xs font-semibold"
                        to={`/prediction/${prediction.id}`}
                      >
                        Review
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* High Risk Alerts */}
        <Card className="p-5">
          <div className="flex items-center gap-2">
            <AlertTriangle
              className="text-orange-600"
              size={19}
            />

            <h2 className="font-semibold">
              High Risk Alerts
            </h2>
          </div>

          {alerts.length ? (
            <div className="mt-4 space-y-3">
              {alerts.map((cattle) => (
                <div
                  key={cattle.id}
                  className="rounded-xl border border-orange-200 bg-orange-50 p-4"
                >
                  <div className="font-semibold">
                    {cattle.cowId}
                  </div>

                  <p className="mt-1 text-sm text-slate-600">
                    Mastitis risk detected at {cattle.riskScore}%.
                  </p>

                  <Link
                    className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-orange-700"
                    to={`/cattle/${cattle.id}`}
                  >
                    Review Prediction
                    <ArrowRight size={13} />
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-10 text-center text-sm text-slate-500">
              No high-risk cases in current records.
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}