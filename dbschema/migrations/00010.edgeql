CREATE MIGRATION m1jagjeceanng572onzg4ccygoai3kcq33rcpd4anq4btr2o3774kq
    ONTO m1iwfoxege4mji6ir5gfmbi3ol6dvz2xs46k3qsyjs62kes5xywcrq
{
  ALTER GLOBAL default::currentUser USING (SELECT
      default::User
  FILTER
      (.identity = GLOBAL ext::auth::ClientTokenIdentity)
  );
};
