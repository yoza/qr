CREATE MIGRATION m1iwfoxege4mji6ir5gfmbi3ol6dvz2xs46k3qsyjs62kes5xywcrq
    ONTO m13bzhnkrtbl4gm3cuuuvwwpphpyed4n43odgnujcibo7h3lix4qfa
{
  ALTER TYPE default::User {
      CREATE REQUIRED LINK identity: ext::auth::Identity {
          SET REQUIRED USING (<ext::auth::Identity>{});
      };
  };
  CREATE GLOBAL default::currentUser := (SELECT
      default::User
  FILTER
      (.identity ?= GLOBAL ext::auth::ClientTokenIdentity)
  );
  DROP GLOBAL default::currentUserId;
  ALTER TYPE default::Account {
      DROP CONSTRAINT std::exclusive ON ((.provider, .providerAccountId));
      DROP PROPERTY userId;
  };
  ALTER TYPE default::User {
      DROP LINK accounts;
      DROP LINK sessions;
      DROP PROPERTY createdAt;
      DROP PROPERTY email;
      DROP PROPERTY emailVerified;
      DROP PROPERTY image;
  };
  DROP TYPE default::Account;
  DROP TYPE default::Session;
  DROP TYPE default::VerificationToken;
};
