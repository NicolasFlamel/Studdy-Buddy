import { TypographyH2 } from '../ui/typography';

interface Props {
  username: string;
}
export const ProfileTitle = ({ username }: Props) => {
  return (
    <section className={'row buddy-card text-center'}>
      <TypographyH2>{username}</TypographyH2>
      <p>Profile & Schedule</p>
    </section>
  );
};
