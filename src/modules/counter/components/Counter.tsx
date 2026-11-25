type Props = { count: number; total: number };

export function Counter({ count, total }: Props) {
  return (
    <section className="counter-card" aria-live="polite">
      <p key={count} className="counter-value">
        <span className="counter-number">
          {count}
          <span className="counter-total" title="Jours ouvrés du mois">
            {total}
          </span>
        </span>
      </p>
    </section>
  );
}
