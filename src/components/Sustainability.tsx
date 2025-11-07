import { Leaf, Recycle, Heart, Award } from "lucide-react";
import sustainabilityImage from "@/assets/sustainability.jpg";

const features = [
  {
    icon: Leaf,
    title: "Organic Materials",
    description: "We source certified organic cotton and natural fibers from sustainable farms",
  },
  {
    icon: Recycle,
    title: "Zero Waste",
    description: "Our production process is designed to minimize waste and maximize efficiency",
  },
  {
    icon: Heart,
    title: "Ethical Production",
    description: "Fair wages, safe working conditions, and respect for human rights",
  },
  {
    icon: Award,
    title: "Certified Excellence",
    description: "GOTS, OEKO-TEX, and Fair Trade certified manufacturing",
  },
];

const Sustainability = () => {
  return (
    <section className="py-24 bg-cream">
      <div className="container">
        {/* Header */}
        <div className="mb-16 text-center fade-in-up">
          <h2 className="mb-4 text-5xl font-bold tracking-tight">
            Sustainable by Design
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Our commitment to the planet is woven into every fabric we create
          </p>
        </div>

        {/* Hero Image */}
        <div className="mb-16 fade-in">
          <div className="relative aspect-[21/9] overflow-hidden rounded-sm">
            <img
              src={sustainabilityImage}
              alt="Sustainable cotton fields"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="fade-in-up text-center"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gold/20">
                <feature.icon className="h-8 w-8 text-gold-dark" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sustainability;
