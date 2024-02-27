CREATE MIGRATION m1pdekor5yf7tieezkvfz54hwvrvweecpywywe5ffkdslthlcg3jca
    ONTO m12cv564ylgmr66gdcxwwoknc7dikawt7hpbwalire7tzaclp3l2fa
{
  ALTER TYPE default::User {
      ALTER LINK identity {
          CREATE CONSTRAINT std::exclusive;
      };
  };
  CREATE GLOBAL default::currentUser := (SELECT
      default::User
  FILTER
      (.identity = GLOBAL ext::auth::ClientTokenIdentity)
  );
  DROP GLOBAL default::current_user;
};
