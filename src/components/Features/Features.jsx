import "./Features.css";

export default function Features() {
  const items = [
    {
      title: "New Loan",
      desc: "Apply for a new loan",
      icon: "💳",
    },
    {
      title: "Check Status",
      desc: "Track your application",
      icon: "📊",
    },
    {
      title: "Support",
      desc: "24/7 customer service",
      icon: "🎧",
    },
    {
      title: "Secure",
      desc: "Encrypted & safe",
      icon: "🔒",
    },
  ];

  return (
    <section className="features">
      <div className="features-grid">
        {items.map((item, index) => (
          <div className="feature-card fade-up" key={index}>
            <span className="feature-icon">{item.icon}</span>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
