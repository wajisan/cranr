type Props = { count: number };

export function Counter({ count }: Props) {
  return (
    <section className="counter-card" aria-live="polite">
      <p key={count} className="counter-value">
        {count}
      </p>
    </section>
  );
}
