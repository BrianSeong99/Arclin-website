import { siteAdditions } from "@/lib/ds/tokens";

const th = "t-overline py-2 pr-4 text-left font-medium text-ink-subtle";
const td = "t-body-s border-t border-hairline py-3 pr-4 align-top";

/** Section 06 of the styleguide: every motion token the site uses, with its origin, plus the site-only radius and glass tokens. */
export function MotionTable() {
  return (
    <div className="space-y-12">
      <p className="t-body max-w-[36em] text-pretty text-attention">{siteAdditions.note}</p>

      <div className="overflow-x-auto">
        <h3 className="t-title-m">Durations</h3>
        <table className="mt-4 w-full border-collapse">
          <thead>
            <tr>
              <th className={th}>Id</th>
              <th className={th}>Token</th>
              <th className={th}>Value</th>
              <th className={th}>Pairs with</th>
              <th className={th}>What uses it</th>
              <th className={th}>Source</th>
            </tr>
          </thead>
          <tbody>
            {siteAdditions.durations.map((d) => (
              <tr key={d.id}>
                <td className={`${td} text-ink-subtle`}>{d.id}</td>
                <td className={`${td} t-label whitespace-nowrap`}>{d.name}</td>
                <td className={`${td} whitespace-nowrap text-ink-muted`}>{d.value}</td>
                <td className={`${td} whitespace-nowrap text-ink-muted`}>{d.pairsWith}</td>
                <td className={`${td} text-ink-muted`}>{d.usage}</td>
                <td className={`${td} whitespace-nowrap text-ink-muted`}>{d.source}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="overflow-x-auto">
        <h3 className="t-title-m">Easings</h3>
        <table className="mt-4 w-full border-collapse">
          <thead>
            <tr>
              <th className={th}>Id</th>
              <th className={th}>Token</th>
              <th className={th}>Value</th>
              <th className={th}>What uses it</th>
              <th className={th}>Source</th>
            </tr>
          </thead>
          <tbody>
            {siteAdditions.easings.map((e) => (
              <tr key={e.id}>
                <td className={`${td} text-ink-subtle`}>{e.id}</td>
                <td className={`${td} t-label whitespace-nowrap`}>{e.name}</td>
                <td className={`${td} whitespace-nowrap text-ink-muted`}>{e.value}</td>
                <td className={`${td} text-ink-muted`}>{e.usage}</td>
                <td className={`${td} whitespace-nowrap text-ink-muted`}>{e.source}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h3 className="t-title-m">Also added for the v3 site</h3>
        <p className="t-caption mt-1 text-ink-subtle">Radius and glass surfaces the home bands need; not in Kurogane v2.</p>
        <div className="mt-4">
          {[...siteAdditions.radius, ...siteAdditions.surfaces].map((t) => (
            <div key={t.id} className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-t border-hairline py-3">
              <p className="t-label w-40 shrink-0">
                <span className="text-ink-subtle">{t.id}</span> {t.name}
              </p>
              <p className="t-caption w-48 shrink-0 text-ink-muted">{t.value}</p>
              <p className="t-body-s text-ink-muted">{t.usage}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
