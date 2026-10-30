import type { ReactElement } from 'react';
import {
  ArrowRightIcon,
  CheckIcon,
  ClockIcon,
  ShieldCheckIcon,
  WhatsAppIcon,
} from '@/components/icons';
import type { HeroData } from '@/types/hero';

export interface HeroProps {
  readonly data: HeroData;
}

export function Hero({ data }: HeroProps): ReactElement {
  return (
    <section
      id="beranda"
      className="relative overflow-hidden bg-ink text-white"
      aria-labelledby="hero-title"
    >
      <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-40" />
      <div aria-hidden="true" className="hero-glow absolute inset-0" />
      <div className="container-page relative grid items-center gap-14 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:py-28">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold" />
            {data.eyebrow}
          </p>

          <h1
            id="hero-title"
            className="mt-6 font-display text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
          >
            {data.title}
            <span className="mt-2 block text-[#f0c75e]">{data.highlight}</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-white/70 sm:text-lg">
            {data.description}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                {data.pricePrefix}
              </p>
              <p className="font-display text-3xl font-extrabold text-white">
                {data.price}
              </p>
            </div>
            <p className="max-w-xs text-sm leading-6 text-white/55">
              {data.priceNote}
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={data.primaryCta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <WhatsAppIcon className="h-4 w-4" />
              {data.primaryCta.label}
            </a>
            <a href={data.secondaryCta.href} className="btn btn-outline-light">
              {data.secondaryCta.label}
              <ArrowRightIcon className="h-4 w-4" />
            </a>
          </div>

          <p className="mt-4 text-xs text-white/45">{data.trustNote}</p>

          <dl className="mt-10 grid max-w-xl grid-cols-3 gap-4 border-t border-white/10 pt-7">
            {data.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-display text-2xl font-extrabold text-white sm:text-3xl">
                    {stat.value}
                  </span>
                  <span className="mt-1 block text-xs leading-5 text-white/55 sm:text-sm">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-md" aria-hidden="true">
          <div className="absolute -inset-8 rounded-[2.5rem] bg-brand-600/20 blur-3xl" />
          <div className="relative rounded-[2rem] border border-white/15 bg-white/5 p-4 backdrop-blur">
            <div className="rounded-3xl bg-white p-6 text-ink shadow-card sm:p-7">
              <div className="flex items-center justify-between gap-4 border-b border-ink/10 pb-5">
                <div>
                  <p className="font-display text-base font-extrabold">
                    {data.documentTitle}
                  </p>
                  <p className="mt-1 text-xs text-ink/50">PT Navary Glory Vajra</p>
                </div>
                <span className="rounded-full bg-amber-50 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-amber-700">
                  {data.documentStatus}
                </span>
              </div>

              <ul className="space-y-4 py-6">
                {data.documentItems.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                      <CheckIcon className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-sm font-medium leading-6 text-ink/75">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="border-t border-ink/10 pt-5">
                <div className="flex items-center justify-between text-xs font-semibold text-ink/60">
                  <span>{data.documentFooter}</span>
                  <span className="text-emerald-600">100%</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-ink/5">
                  <div className="h-full w-full rounded-full bg-gradient-to-r from-brand-600 to-brand-400" />
                </div>
              </div>
            </div>
          </div>

          <div className="absolute -left-6 top-14 hidden items-center gap-3 rounded-2xl bg-white px-4 py-3 text-ink shadow-float sm:flex">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-50 text-brand-600">
              <ClockIcon className="h-4 w-4" />
            </span>
            <div>
              <p className="font-display text-sm font-extrabold">7 hari kerja</p>
              <p className="text-[0.65rem] text-ink/55">Rata-rata proses</p>
            </div>
          </div>

          <div className="absolute -right-4 bottom-12 hidden items-center gap-3 rounded-2xl bg-white px-4 py-3 text-ink shadow-float sm:flex">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <ShieldCheckIcon className="h-4 w-4" />
            </span>
            <div>
              <p className="font-display text-sm font-extrabold">1.000+ klien</p>
              <p className="text-[0.65rem] text-ink/55">Telah terlayani</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
