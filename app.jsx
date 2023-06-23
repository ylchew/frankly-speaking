const App = () => {
  const WelcomeScreen = () => {
    const [ language, selectLanguage ] = React.useState('English');
    const languages = ['English', '中文', 'Bahasa Melayu', 'தமிழ்'];
    
    return(
      <div className="welcome-screen">
        <div className="selected-language">
          {
            languages.map(item => (<div className="language">{item}</div>));
          }
        </div>    
      </div>
    )
  };
  return (
    <div className="app-interface">
      <WelcomeScreen /> 
    </div>
  );
};
