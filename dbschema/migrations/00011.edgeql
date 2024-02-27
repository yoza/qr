CREATE MIGRATION m12cv564ylgmr66gdcxwwoknc7dikawt7hpbwalire7tzaclp3l2fa
    ONTO m1jagjeceanng572onzg4ccygoai3kcq33rcpd4anq4btr2o3774kq
{
  DROP GLOBAL default::currentUser;
  CREATE GLOBAL default::current_user := (std::assert_single((SELECT
      default::User {
          id,
          name
      }
  FILTER
      (.identity = GLOBAL ext::auth::ClientTokenIdentity)
  )));
};
