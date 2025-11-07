const AboutFactory = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container">
        <div className="mx-auto max-w-4xl text-center mb-12">
          <h2 className="mb-6 text-5xl font-bold tracking-tight">
            About Our Factory
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Step inside our state-of-the-art manufacturing facility where tradition meets innovation. 
            Watch how we transform raw materials into exceptional textiles through precision craftsmanship 
            and cutting-edge technology.
          </p>
        </div>
        
        <div className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-sm shadow-lg">
            <iframe
              src="https://player.cloudinary.com/embed/?cloud_name=duqbe1hoq&public_id=WhatsApp_Video_2025-11-06_at_11.20.21_AM_nc7fgl&profile=cld-default"
              width="640"
              height="360" 
              style={{ height: 'auto', width: '100%', aspectRatio: '640 / 360' }}
              allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
              allowFullScreen
              frameBorder="0"
              title="Factory Tour Video"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutFactory;
