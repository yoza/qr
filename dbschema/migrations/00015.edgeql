CREATE MIGRATION m1rsmyecnwso7e32qpqrr4rqf2lsifobtlrequjpjf42hgsxr5hh6a
    ONTO m1fhkctbs7yjteouokiiogabz5uub3dq3q46pptp4vz5s24vzxtaya
{
  ALTER TYPE default::User {
      CREATE ACCESS POLICY admin_only
          ALLOW ALL USING (((GLOBAL default::currentUser).is_admin ?? false));
  };
};
