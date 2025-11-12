const PartnerBrands = () => {
  const brands = [
    "BERENICE",
    "MANOUSH",
    "THE FACTORY",
    "THE FACTORY ON",
    "ZARA",
    "H&M",
    "MASSIMO DUTTI"
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container">
        <div className="mx-auto max-w-4xl text-center mb-16">
          <h2 className="mb-6 text-5xl font-bold tracking-tight">
            Our Partner Brands
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Trusted by leading fashion brands worldwide. We manufacture premium textiles 
            for some of the most recognized names in the industry.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {brands.map((brand, index) => (
            <div
              key={brand}
              className="flex items-center justify-center p-6 bg-muted/30 rounded-sm hover:bg-muted/50 transition-colors animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <span className="text-lg font-semibold tracking-wide text-foreground/80">
                {brand}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerBrands;
