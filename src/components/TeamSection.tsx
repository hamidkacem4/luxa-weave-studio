import { useTranslation } from "react-i18next";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { teamMembers } from "@/data/teamMembers";
import { Phone, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const TeamSection = () => {
  const { t } = useTranslation();

  return (
    <section id="team" className="py-24 bg-white overflow-hidden">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20 fade-in-up">
          <Badge variant="outline" className="mb-4 border-gold text-gold-dark uppercase tracking-widest px-4 py-1">
            {t("team.badge", "Expertise")}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-charcoal">
            {t("team.title", "Our Dedicated Team")}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t("team.description", "Meet the experts behind MagTexco's world-class textile manufacturing, dedicated to quality and innovation.")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {teamMembers.map((member, index) => (
            <Card 
              key={member.id} 
              className="group border-none shadow-soft hover-lift overflow-hidden flex flex-col h-full bg-cream/20 fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 20vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                   <div className="flex gap-4 justify-center">
                      {member.phone && (
                        <a href={`tel:${member.phone}`} className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-gold transition-colors" title="Call">
                          <Phone className="w-5 h-5" />
                        </a>
                      )}
                      {member.whatsapp && (
                        <a 
                          href={`https://wa.me/${member.whatsapp}`} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-[#25D366] transition-colors"
                          title="WhatsApp"
                        >
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                          </svg>
                        </a>
                      )}
                      {member.email && (
                        <a href={`mailto:${member.email}`} className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-gold transition-colors" title="Email">
                          <Mail className="w-5 h-5" />
                        </a>
                      )}
                   </div>
                </div>
              </div>
              <CardHeader className="p-6 text-center">
                <CardTitle className="text-xl font-bold text-charcoal mb-1">{member.name}</CardTitle>
                <CardDescription className="text-gold-dark font-semibold tracking-wide uppercase text-xs">
                  {member.position}
                </CardDescription>
              </CardHeader>
              <CardContent className="px-6 pb-8 text-center flex-grow">
                {member.bio && (
                  <p className="text-sm text-muted-foreground leading-relaxed italic">
                    "{member.bio}"
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
