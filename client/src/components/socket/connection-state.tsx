interface Props {
  isConnected: boolean;
}
export const ConnectionState = ({ isConnected }: Props) => {
  return <p>State {'' + isConnected}</p>;
};
