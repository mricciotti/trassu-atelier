import {sectionTitle} from './layoutStyles';

interface Props {
  title: string;
  text?: string;
  as?: 'h1' | 'h2';
  action?: React.ReactNode;
}

export function SectionHeading({title, text, as: Tag = 'h2', action}: Props) {
  return (
    <div className="mb-7 flex flex-wrap items-end justify-between gap-x-8 gap-y-3 md:mb-10">
      <div className="grid max-w-[60ch] gap-2.5">
        <Tag className={sectionTitle}>{title}</Tag>
        {text && <p className="text-[1.02rem] text-muted md:text-[1.075rem]">{text}</p>}
      </div>
      {action}
    </div>
  );
}
