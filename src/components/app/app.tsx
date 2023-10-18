import MainScreen from '../../pages/main-screen/main-screen.tsx';

function App({countRentOffer}: {countRentOffer: number}) {
  return (
    <MainScreen
      countRentOffer = {countRentOffer}
    />
  );
}

export default App;
