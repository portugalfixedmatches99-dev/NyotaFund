import "./HowItWorks.css";

export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: "Apply",
      desc: "Fill out our quick application form",
    },
    {
      number: 2,
      title: "Approve",
      desc: "Get approved in minutes with instant decision",
    },
    {
      number: 3,
      title: "Receive",
      desc: "Funds transferred to your account instantly",
    },
  ];

  return (
    <section className="how-it-works">
      <div className="steps">
        {steps.map((step) => (
          <div className="step fade-up" key={step.number}>
            <div className="step-circle">{step.number}</div>
            <h3 className="step-title">{step.title}</h3>
            <p className="step-desc">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
