import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Eye,
  Edit3,
  Trash2,
  BrainCircuit,
  Plus,
} from 'lucide-react';

import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';

import {
  Badge,
  Button,
  Card,
  SearchBar,
  Select,
  EmptyState,
} from '../../components/common/UI';

import { Confirm } from '../../components/common/AppWidgets';

export default function Cattle() {
  const { user } = useAuth();
  const { cattle, deleteCattle } = useApp();

  const mine = cattle.filter(
    (c) => c.ownerId === user.id
  );

  const [q, setQ] = useState('');
  const [filter, setFilter] = useState('All');
  const [del, setDel] = useState(null);

  const rows = useMemo(
    () =>
      mine.filter(
        (c) =>
          (
            filter === 'All' ||
            (filter === 'Healthy' && c.riskLevel === 'LOW') ||
            (filter === 'Low Risk' && c.riskLevel === 'LOW') ||
            (filter === 'Moderate' &&
              c.riskLevel === 'MODERATE') ||
            (filter === 'High Risk' &&
              ['HIGH', 'VERY HIGH'].includes(c.riskLevel))
          ) &&
          `${c.cowId} ${c.name}`
            .toLowerCase()
            .includes(q.toLowerCase())
      ),
    [mine, q, filter]
  );

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="text-xs font-bold uppercase tracking-[.18em] text-[#6B8E7B]">
            Herd records
          </div>

          <h1 className="serif mt-2 text-4xl font-bold">
            My Cattle
          </h1>
        </div>

        <Link to="/cattle/new">
          <Button>
            <Plus size={17} />
            Add Cattle
          </Button>
        </Link>
      </div>

      {/* Search and Filter */}
      <Card className="p-4">
        <div className="flex flex-col gap-3 md:flex-row">
          <SearchBar
            value={q}
            onChange={setQ}
            placeholder="Search by Cow ID or Name"
          />

          <Select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option>All</option>
            <option>Healthy</option>
            <option>Low Risk</option>
            <option>Moderate</option>
            <option>High Risk</option>
          </Select>
        </div>
      </Card>

      {/* Cattle Records */}
      {rows.length ? (
        <Card className="overflow-hidden">

          {/* Desktop */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#F5F7F1] text-xs text-slate-500">
                <tr>
                  {[
                    'Cow ID',
                    'Name',
                    'Breed',
                    'Age',
                    'Weight',
                    'Lactation',
                    'Status',
                    'Risk',
                    'Last Prediction',
                    'Actions',
                  ].map((x) => (
                    <th
                      className="px-4 py-3"
                      key={x}
                    >
                      {x}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {rows.map((c) => (
                  <tr
                    className="border-t border-[#EDF0E9]"
                    key={c.id}
                  >
                    <td className="px-4 py-4 font-semibold">
                      {c.cowId}
                    </td>

                    <td className="px-4 py-4">
                      {c.name}
                    </td>

                    <td className="px-4 py-4 text-slate-500">
                      {c.breed}
                    </td>

                    <td className="px-4 py-4">
                      {c.age}
                    </td>

                    <td className="px-4 py-4">
                      {c.weight} kg
                    </td>

                    <td className="px-4 py-4">
                      L{c.lactationNumber}
                    </td>

                    <td className="px-4 py-4 text-xs">
                      {c.healthStatus}
                    </td>

                    <td className="px-4 py-4">
                      <Badge level={c.riskLevel} />
                    </td>

                    <td className="px-4 py-4 text-slate-500">
                      {c.lastPrediction
                        ? new Date(
                            c.lastPrediction
                          ).toLocaleDateString('en-IN')
                        : '—'}
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex gap-1">

                        <Link
                          className="rounded-lg p-2 hover:bg-[#EAF0E6]"
                          to={`/cattle/${c.id}`}
                        >
                          <Eye size={16} />
                        </Link>

                        <Link
                          className="rounded-lg p-2 hover:bg-[#EAF0E6]"
                          to={`/cattle/${c.id}/edit`}
                        >
                          <Edit3 size={16} />
                        </Link>

                        <Link
                          className="rounded-lg p-2 hover:bg-[#EAF0E6]"
                          to={`/prediction/new?cattle=${c.id}`}
                        >
                          <BrainCircuit size={16} />
                        </Link>

                        <button
                          className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                          onClick={() => setDel(c)}
                        >
                          <Trash2 size={16} />
                        </button>

                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile */}
          <div className="grid gap-3 p-3 md:hidden">
            {rows.map((c) => (
              <div
                className="rounded-xl border border-[#E0E7DC] p-4"
                key={c.id}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-semibold">
                      {c.cowId} · {c.name}
                    </div>

                    <div className="mt-1 text-xs text-slate-500">
                      {c.breed} · {c.age} years · {c.weight} kg
                    </div>
                  </div>

                  <Badge level={c.riskLevel} />
                </div>

                <div className="mt-3 flex gap-2">

                  <Link
                    to={`/cattle/${c.id}`}
                    className="flex-1"
                  >
                    <Button
                      variant="ghost"
                      className="w-full"
                    >
                      <Eye size={15} />
                      View
                    </Button>
                  </Link>

                  <Link to={`/cattle/${c.id}/edit`}>
                    <Button variant="ghost">
                      <Edit3 size={15} />
                    </Button>
                  </Link>

                  <button
                    onClick={() => setDel(c)}
                    className="rounded-xl border border-red-200 px-3 text-red-600"
                  >
                    <Trash2 size={15} />
                  </button>

                </div>
              </div>
            ))}
          </div>

        </Card>
      ) : (
        <Card>
          <EmptyState
            title="No cattle match your filters"
            text="Try another search or add a new cattle record."
          />
        </Card>
      )}

      {/* Delete Confirmation */}
      <Confirm
        open={!!del}
        onClose={() => setDel(null)}
        onConfirm={() => {
          if (del) {
            deleteCattle(del.id);
            setDel(null);
          }
        }}
        title="Delete cattle record"
        text={`Delete ${del?.cowId}? Its linked predictions will also be removed from the prototype.`}
      />

    </div>
  );
}