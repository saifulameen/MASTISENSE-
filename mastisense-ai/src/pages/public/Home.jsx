import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BrainCircuit,
  Wheat,
  ShieldCheck,
  ClipboardCheck,
  BarChart3,
  Activity,
  CheckCircle2,
} from 'lucide-react';
import {
  Button,
  Card,
  SectionTitle,
} from '../../components/common/UI';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-5 pb-20 pt-14 lg:pt-20">
        <div className="grid items-center gap-14 lg:grid-cols-[1.02fr_.98fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#CBD8C6] bg-[#E8EFE5] px-3 py-1.5 text-xs font-bold text-[#536E60]">
              <BrainCircuit size={14} />
              AI-Powered Dairy Health Intelligence
            </div>

            <h1 className="serif mt-6 max-w-3xl text-5xl font-bold leading-[1.04] tracking-tight sm:text-6xl">
              Predict Mastitis{' '}
              <span className="text-[#6B8E7B]">Before</span> It Becomes
              Visible.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              MastiSense AI analyzes manually entered cattle health and
              production information to identify potential mastitis risk early
              and support timely veterinary attention.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/prediction/new">
                <Button>
                  Start Prediction
                  <ArrowRight size={17} />
                </Button>
              </Link>

              <Link to="/how-it-works">
                <Button variant="ghost">
                  Explore How It Works
                </Button>
              </Link>
            </div>

            <div className="mt-8 flex items-center gap-6 text-xs text-slate-500">
              <span className="flex items-center gap-2">
                <CheckCircle2
                  size={15}
                  className="text-[#6B8E7B]"
                />
                Manual data workflow
              </span>

              <span className="flex items-center gap-2">
                <CheckCircle2
                  size={15}
                  className="text-[#6B8E7B]"
                />
                Software-only prototype
              </span>
            </div>
          </div>

          <HeroMock />
        </div>
      </section>

      {/* Early Warning */}
      <section className="border-y border-[#DFE5DA] bg-[#FBFAF5] py-20">
        <div className="mx-auto max-w-7xl px-5">
          <SectionTitle
            eyebrow="Early warning by design"
            title="Turn everyday observations into a clearer next step."
            text="MastiSense AI brings cattle records, health observations and transparent prototype risk logic into one calm workspace."
          />

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              [
                Activity,
                'Early Detection',
                'Identify potential risk patterns before severe symptoms become apparent.',
              ],
              [
                BarChart3,
                'Data-Based Analysis',
                'Use manually entered cattle health and production information.',
              ],
              [
                ShieldCheck,
                'Actionable Insights',
                'Provide clear next-step recommendations for review.',
              ],
            ].map(([Icon, title, description]) => (
              <Card key={title} className="p-6">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#E4EDE0] text-[#243B35]">
                  <Icon size={21} />
                </div>

                <h3 className="mt-5 text-lg font-semibold">
                  {title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <SectionTitle
          eyebrow="Simple workflow"
          title="Four steps from observation to early warning."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-4">
          {[
            ['01', 'Enter Cattle Information', Wheat],
            ['02', 'Provide Health Observations', ClipboardCheck],
            ['03', 'AI Risk Analysis', BrainCircuit],
            ['04', 'Receive Early Warning', ShieldCheck],
          ].map(([number, title, Icon]) => (
            <div
              className="relative rounded-2xl border border-[#DDE4D8] bg-white p-6"
              key={number}
            >
              <div className="text-xs font-bold text-[#6B8E7B]">
                {number}
              </div>

              <Icon className="mt-7" size={22} />

              <h3 className="mt-4 font-semibold">
                {title}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="bg-[#243B35] py-20 text-white">
        <div className="mx-auto max-w-7xl px-5">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="text-xs font-bold uppercase tracking-[.18em] text-[#B7C9B1]">
                Dashboard preview
              </div>

              <h2 className="serif mt-3 text-4xl font-bold">
                A calm command center for herd health.
              </h2>

              <p className="mt-4 max-w-xl leading-7 text-[#C9D5C5]">
                Track herd status, review recent predictions, understand risk
                trends and act on alerts without a cluttered interface.
              </p>

              <Link
                className="mt-7 inline-block"
                to="/register"
              >
                <Button variant="soft">
                  Create Demo Farm
                </Button>
              </Link>
            </div>

            <HeroMock dark />
          </div>
        </div>
      </section>

      {/* Why Early Forecasting */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <SectionTitle
          eyebrow="Why early forecasting matters"
          title="Earlier visibility can support earlier attention."
          text="Mastitis can affect cattle health and milk production. A structured early-warning workflow can help farmers organize observations, identify unusual patterns and decide when professional veterinary attention may be appropriate."
        />

        <div className="mt-10 rounded-3xl border border-[#D9E1D5] bg-[#E7EFE3] p-7 sm:p-10">
          <div className="grid gap-7 sm:grid-cols-3">
            <div>
              <div className="text-3xl font-bold">
                01
              </div>

              <div className="mt-2 font-semibold">
                Observe
              </div>

              <p className="mt-1 text-sm text-slate-600">
                Record health and production changes.
              </p>
            </div>

            <div>
              <div className="text-3xl font-bold">
                02
              </div>

              <div className="mt-2 font-semibold">
                Analyze
              </div>

              <p className="mt-1 text-sm text-slate-600">
                Run the prototype risk engine.
              </p>
            </div>

            <div>
              <div className="text-3xl font-bold">
                03
              </div>

              <div className="mt-2 font-semibold">
                Respond
              </div>

              <p className="mt-1 text-sm text-slate-600">
                Review the recommendation and consider professional care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-5 pb-24">
        <div className="rounded-3xl bg-[#B7C9B1] p-8 sm:p-12">
          <h2 className="serif text-4xl font-bold">
            Start monitoring your cattle health smarter.
          </h2>

          <p className="mt-3 max-w-xl text-slate-700">
            Build a structured digital record and demonstrate an early-warning
            workflow in minutes.
          </p>

          <Link
            className="mt-6 inline-block"
            to="/register"
          >
            <Button>
              Get Started
              <ArrowRight size={17} />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}

function HeroMock({ dark = false }) {
  return (
    <div
      className={`relative rounded-[2rem] border p-5 shadow-soft ${
        dark
          ? 'border-white/10 bg-white/10'
          : 'border-[#DDE4D8] bg-white'
      }`}
    >
      {/* Cow Profile */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#E4EDE0]">
            <Wheat
              size={20}
              className="text-[#243B35]"
            />
          </div>

          <div>
            <div
              className={`text-xs ${
                dark ? 'text-[#B7C9B1]' : 'text-slate-500'
              }`}
            >
              Cattle profile
            </div>

            <div
              className={`font-semibold ${
                dark ? 'text-white' : 'text-[#243B35]'
              }`}
            >
              COW-024 · Lakshmi
            </div>
          </div>
        </div>

        <span className="rounded-full bg-orange-50 px-2.5 py-1 text-xs font-bold text-orange-700">
          HIGH RISK
        </span>
      </div>

      {/* Risk + AI Analysis */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div
          className={`rounded-2xl p-5 ${
            dark ? 'bg-white/10' : 'bg-[#F6F8F3]'
          }`}
        >
          <div className="text-xs text-slate-500">
            Mastitis Risk
          </div>

          <div
            className={`mt-1 text-5xl font-bold ${
              dark ? 'text-white' : 'text-[#243B35]'
            }`}
          >
            78%
          </div>

          <div className="mt-4 h-2 rounded-full bg-[#DCE6D8]">
            <div className="h-full w-[78%] rounded-full bg-[#243B35]" />
          </div>
        </div>

        <div
          className={`rounded-2xl p-5 ${
            dark ? 'bg-white/10' : 'bg-[#F6F8F3]'
          }`}
        >
          <div className="text-xs text-slate-500">
            AI analysis
          </div>

          <div
            className={`mt-2 text-sm leading-6 ${
              dark ? 'text-[#E7EFE3]' : 'text-slate-600'
            }`}
          >
            Elevated risk pattern detected from entered health observations.
          </div>

          <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-[#6B8E7B]">
            <BrainCircuit size={15} />
            Prototype analysis complete
          </div>
        </div>
      </div>

      {/* Recommendation */}
      <div
        className={`mt-4 rounded-2xl border p-4 ${
          dark
            ? 'border-white/10 bg-white/5'
            : 'border-[#E1E7DE] bg-white'
        }`}
      >
        <div className="text-xs text-slate-500">
          Recommended next action
        </div>

        <div
          className={`mt-1 text-sm font-semibold ${
            dark ? 'text-white' : 'text-[#243B35]'
          }`}
        >
          Consider physical examination and veterinary consultation if
          abnormalities persist.
        </div>
      </div>
    </div>
  );
}