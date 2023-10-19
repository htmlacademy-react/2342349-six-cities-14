import MainScreen from '../../pages/main-screen/main-screen.tsx';

interface AppProps {
  countRentOffer: number;
}

function App({countRentOffer}: AppProps) {
  return (
    <MainScreen
      countRentOffer = {countRentOffer}
    />
  );
}

export default App;
