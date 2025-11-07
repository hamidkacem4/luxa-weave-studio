import aboutImage from "@/assets/about-craftsmanship.jpg";

const About = () => {
  return (
    <section className="py-24">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Image */}
          <div className="fade-in order-2 lg:order-1">
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
              <img
                src={aboutImage}
                alt="Craftsmanship in textile manufacturing"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="fade-in-up order-1 lg:order-2">
            <h2 className="mb-6 text-5xl font-bold tracking-tight">
              Tradition Meets Innovation
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                For over three decades, we've been at the forefront of textile manufacturing, 
                combining time-honored craftsmanship with cutting-edge technology.
              </p>
              <p>
                Our journey began with a simple vision: to create fabrics that inspire designers 
                and delight end consumers. Today, we partner with leading fashion brands worldwide, 
                delivering premium textiles that set new standards in quality and innovation.
              </p>
              <p>
                Every thread we weave carries our commitment to excellence. From the selection 
                of raw materials to the final quality check, we ensure that each fabric meets 
                our exacting standards.
              </p>
            </div>
            
            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-8">
              <div>
                <div className="text-4xl font-bold text-gold">30+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-gold">500+</div>
                <div className="text-sm text-muted-foreground">Brand Partners</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-gold">100%</div>
                <div className="text-sm text-muted-foreground">Quality Assured</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
