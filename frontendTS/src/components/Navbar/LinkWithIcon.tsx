import { NavLink } from 'react-router-dom';
import './LinkWithIcon.css';

interface LinkWithIconProps {
  id?: string;
  title: string;
  link: string;
  emoji: string;
  sidebar?: boolean;
}

export function LinkWithIcon({
  title,
  link,
  emoji,
  sidebar = true,
}: LinkWithIconProps) {
  return (
    <NavLink
      to={link}
      className={sidebar ? 'align_center sidebar_link' : 'align_center'}
    >
      {title} <img src={emoji} alt="" className="link_emoji" />
    </NavLink>
  );
}
