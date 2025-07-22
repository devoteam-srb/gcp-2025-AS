import './HeroSection.css';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  link: string;
  image: string;
}

export function HeroSection({
  title,
  subtitle,
  link,
  image,
}: HeroSectionProps) {
  return (
    <section className="hero_section">
      <div className="align_center">
        <h2 className="hero_title">{title}</h2>
        <p className="hero_subtitle">{subtitle}</p>
        <a href={link} className="hero_link">
          Buy now
        </a>
      </div>
      <div>
        <img src={image} alt="" className="hero_image" />
      </div>
    </section>
  );
}
