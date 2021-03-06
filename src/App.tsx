import { useCallback } from 'react';
import { IntlProvider } from 'react-intl';
import { WetProvider, useLanguage, Language } from '@arcnovus/wet-boew-react';
import { Route, useLocation, useNavigate } from 'react-router-dom';
import { AppLayout, LangLandingLayout } from './layouts';
import { HomePage, AboutPage, ExampleFormPage } from './pages';
import { LocalizedRoutes, i18nMessages } from './i18n';
import AppRoute from './AppRoute';

const App = () => {
  const { currentLanguage } = useLanguage(useLocation());
  const navigate = useNavigate();

  const handleClick = useCallback(
    (a) => {
      navigate(a.href.replace(window.location.origin, ''));
    },
    [navigate]
  );

  return (
    <WetProvider linkHandler={handleClick}>
      <IntlProvider
        locale={`${currentLanguage || 'en'}`}
        messages={
          currentLanguage === Language.FR ? i18nMessages.fr : i18nMessages.en
        }
      >
        {currentLanguage == null ? (
          <LangLandingLayout />
        ) : (
          <AppLayout>
            <LocalizedRoutes>
              <Route path={AppRoute.Landing} element={<HomePage />} />
              <Route path={AppRoute.Home} element={<HomePage />} />
              <Route path={AppRoute.About} element={<AboutPage />} />
              <Route
                path={AppRoute.ExampleForm}
                element={<ExampleFormPage />}
              />
            </LocalizedRoutes>
          </AppLayout>
        )}
      </IntlProvider>
    </WetProvider>
  );
};

export default App;
